import {HiveSQLAdapter} from './hive-adapter'
import _ from 'lodash'
import {guessDruidStrTypeByDbDataType} from '../offline-calc-model-helper'

export const ExpTypeEnum = {
  number: 'number',
  string: 'string',
  date: 'date'
}
export const OperationEnum = {
  add: 'add',
  subtract: 'subtract',
  multiply: 'multiply',
  divide: 'divide',
  importFromTable: 'importFromTable',
  aggregation: 'aggregation',
  cast: 'cast',
  logicIf: 'logicIf',
  exportGroupBy: 'exportGroupBy',
  exportAggregation: 'exportAggregation',
  exportJoin: 'exportJoin'
}

const SQLAdapterDict = {
  hive: HiveSQLAdapter
}

export class Expression {
  name = null
  op = null
  args = null
  type = null // number, string, date

  constructor(props) {
    Object.assign(this, props)
  }

  static calc(op, ...args) {
    return new Expression({
      name: op,
      op,
      type: ExpTypeEnum.number, // TODO guess type
      args
    })
  }

  static importFromTable(fieldInfo) {
    return new Expression({
      name: fieldInfo.fieldName,
      op: OperationEnum.importFromTable,
      type: fieldInfo.type,
      args: [fieldInfo]
    })
  }

  static aggregation(aggType, input) {
    return new Expression({
      name: input ? `${aggType}(${input.name})` : aggType,
      op: OperationEnum.aggregation,
      type: ExpTypeEnum.number,
      args: [aggType, input]
    })
  }
}

function getBaseField(exp) {
  let {op, args} = exp
  if (op !== OperationEnum.importFromTable) {
    const inner = _.find(args, v => v?.op)
    return inner && getBaseField(inner)
  }
  return args[0]
}

export async function expressionToSQL(modelOutputExpressions, opts, sqlAdapterName) {
  const {tableIdDict, fieldIdDict} = opts
  const sqlAdapter = SQLAdapterDict[sqlAdapterName]
  let groupByExps = modelOutputExpressions.filter(exp => exp.op === OperationEnum.exportGroupBy).map(exp => exp.args[0])
  let aggregationExps = modelOutputExpressions.filter(exp => exp.op === OperationEnum.exportAggregation).map(exp => exp.args[0])
  let joinExps = modelOutputExpressions.filter(exp => exp.op === OperationEnum.exportJoin)
  console.log(JSON.stringify(groupByExps, null, 2))
  console.log(JSON.stringify(aggregationExps, null, 2))
  console.log(JSON.stringify(joinExps, null, 2))
  debugger
  let filters = [] // TODO extract filters

  function valToSQL(val) {
    return _.isNil(val)
      ? 'null'
      : _.isNumber(val)
        ? val
        : `'${val.replace(/'/g, `\\'`)}'`
  }

  const dimInfoToSQL = ({dsId, tableName, fieldName, castTo, parseDateFormat, castToDateFormat}) => {
    let table = _.find(tableIdDict, t => t.data_source_id === dsId && t.name === tableName)
    let dbName = _.get(table, ['params', 'hiveDbName']) || ''
    let rawTableName = /*_.get(rawTableNameDict, tableName) ||*/ tableName
    // 避免不同数据库有同名的表，需要带上数据库前缀
    // 因为 select xx 不能带库名，所以需要在 from 子句里面重命名
    const tableNameWithDb = [dbName, rawTableName].filter(_.identity).join('.')
    const tableNameUniq = (dbName ? `${dbName}_${rawTableName}` : rawTableName).toLowerCase()
    const finalFieldName = /*fieldNameModer(fieldName, table)*/ fieldName
    if (finalFieldName) {
      // select db_tablename.field
      const fieldNameWithTableName = [tableNameUniq, finalFieldName].join('.')
/*
      if (castTo) {
        let field = _.find(_.get(table.params, 'fieldInfos') || [], f => f.field === fieldName)
        let srcDruidType = _.capitalize(guessDruidStrTypeByDbDataType(field && field.type))
        // https://blog.csdn.net/qq_24236769/article/details/79420457
        if (srcDruidType === 'String' && castTo === 'Date') {
          // 不用转，在 spec 那里标记为日期类型
          // str -> iso date str
          return `from_unixtime(unix_timestamp(${fieldNameWithTableName}, ${valToSQL(parseDateFormat)}), ${valToSQL(timestampFormatForHive)})`
        } else if (srcDruidType === 'Date' && castTo === 'String') {
          return `from_unixtime(unix_timestamp(${fieldNameWithTableName}, ${valToSQL(parseDateFormat)}), ${valToSQL(castToDateFormat)})`
        } else if (DruidColumnTypeInverted[DruidColumnType[srcDruidType]] === 'number' && castTo === 'Date') {
          return `from_unixtime(${fieldNameWithTableName}, ${valToSQL(timestampFormatForHive)})`
        } else if (srcDruidType === 'Date' && DruidColumnTypeInverted[DruidColumnType[castTo]] === 'number') {
          return `unix_timestamp(${fieldNameWithTableName}, ${valToSQL(parseDateFormat)})`
        }
        // 字符串 和 数值 互转
        return `cast(${fieldNameWithTableName} as ${castTo.toLowerCase()})`
      }
*/
      return fieldNameWithTableName
    }
    // from db.tablename db_tablename
    return `${tableNameWithDb} ${tableNameUniq}` // 省略 as
  }

  function singleFilterToSQL(flt) {
    let {col, op, eq, type = 'string'} = flt
    // col: dsId|tableName|fieldName
    let [dsId, tableName, fieldName] = col ? col.split('|') : []
    const colName = col && dimInfoToSQL({dsId, tableName, fieldName})
    switch (op) {
      case 'in':
      case 'not in':
        // db_tablename.field in (val1, val2)
        if (type === 'string') {
          return `${colName} ${op} (${eq.map(valToSQL).join(', ')})`
        }
        return `${colName} ${op.replace('in', 'between')} ${valToSQL(eq[0])} and ${valToSQL(eq[1])}`
      case 'contains':
      case 'not contains':
        return `${colName} ${op.replace('contains', 'like')} ${valToSQL(`%${eq}%`)}`
      default:
        throw new Error(`Unhandled op: ${op}`)
    }
  }

  function handleAggregationIdxAst(ast) {
    // useIdx({idxId: 'dimId'}) 使用现有指标
    // createIdx({dim: {func: 'useDim', args: [{dimId: 'xxx'}]}, aggregator: 'count'}) 创建指标
    if (!(ast instanceof Expression) && !_.isPlainObject(ast)) {
      // 一般是数值
      return ast
    }
    let {op, args: [first, second]} = ast
    switch (op) {
      case OperationEnum.importFromTable:
        const [dsId, tableName, fieldName] = first.id.split('/')
        const colName = dimInfoToSQL({dsId, tableName, fieldName})
        return colName
      case OperationEnum.add:
      case OperationEnum.subtract:
        return `(${handleAggregationIdxAst(first)} ${op} ${handleAggregationIdxAst(second)})`
      case OperationEnum.multiply:
      case OperationEnum.divide:
        return `${handleAggregationIdxAst(first)} ${op} ${handleAggregationIdxAst(second)}`
      case OperationEnum.aggregation: {
        let aggregator = first
        // const colNameWithFilter = _.isEmpty(sliceFilters)
        //   ? colName
        //   : `case when ${sliceFilters.map(singleFilterToSQL)} then 1 else 0 end`
        const colNameWithFilter = handleAggregationIdxAst(second)
        switch (aggregator) {
          case 'count':
            return `${aggregator}(${colNameWithFilter})`
          case 'countDistinct':
            return `count(distinct ${colNameWithFilter})`
          case 'max':
          case 'min':
          case 'sum':
          {
            // const colNameWithFilter = _.isEmpty(sliceFilters)
            //   ? colName
            //   : `case when ${sliceFilters.map(singleFilterToSQL)} then ${colName} end`
            return `${aggregator}(${colNameWithFilter})`
          }
          // TODO 处理 last，然后移除创建指标时的限制 src/client/components/OfflineCalc/create-index-in-formula-editor-modal.jsx 81 行
          //  https://blog.csdn.net/sunnyyoona/article/details/56484919
          // case 'last':
          default:
            throw new Error(`Unhandled aggregator: ${aggregator}`)
        }

      }
      default:
        throw new Error(`Unhandled op: ${op}`)
    }
  }

  const dealWithJoinLinks = (joinExps/*, tablesCount*/) => {
    let joinLinks = joinExps.map(jExp => {
      let [type, sourceExp, targetExp] = jExp.args
      return {
        type,
        source: getBaseField(sourceExp).id,
        target: getBaseField(targetExp).id
      }
    })
    debugger

    const TYPEMAP = {
      'leftJoin': 'left join',
      'innerJoin': 'inner join',
      'rightJoin': 'right join',
      'fullJoin': 'full join'
    }

    let joinInfoDict = _(joinLinks).map( i => {
        const { source, target, type } = i
        const [ sourceDsId, sourceTableName, sourceDimName ] = source.split('/')
        const [ targetDsId, targetTableName, targetDimName ] = target.split('/')
        const srcField = dimInfoToSQL({dsId: sourceDsId, tableName: sourceTableName, fieldName: sourceDimName})
        const targetField = dimInfoToSQL({dsId: targetDsId, tableName: targetTableName, fieldName: targetDimName})

        const filterMapKey = `${sourceDsId}/${sourceTableName}|${targetDsId}/${targetTableName}`
        return {
          key: filterMapKey,
          type: TYPEMAP[type],
          filter: `${srcField} = ${targetField}`
        }
      })
      .groupBy(joinInfo => joinInfo.key)
      .value()

    if (_.some(Object.keys(joinInfoDict), joinInfoKey => _.uniq(joinInfoDict[joinInfoKey].map(ji => ji.type)).length !== 1)) {
      throw Error('两张表间只能有一种类型链接方式')
    }

    //检测闭环和没链接表的逻辑
    // if (_.size(joinInfoDict) !== tablesCount - 1) {
    //   throw Error('有未链接的表或形成了闭环')
    // }

    let sqlJoinParts = Object.keys(joinInfoDict).map((k, pos) => {
      let joinInfos = joinInfoDict[k]
      const [head, tail] = k.split('|')
      const [sourceDsId, sourceTableName] = head.split('/')
      const [targetDsId, targetTableName] = tail.split('/')
      let headTableName = dimInfoToSQL({dsId: sourceDsId, tableName: sourceTableName, fieldName: ''})
      let tailTableName = dimInfoToSQL({dsId: targetDsId, tableName: targetTableName, fieldName: ''})

      const joinType = joinInfos[0].type
      const joinCond = joinInfos.map(ji => ji.filter).join(' and ')
      return pos === 0
        ? `${headTableName} ${joinType} ${tailTableName} on ${joinCond}`
        : `${joinType} ${tailTableName} on ${joinCond}`
    }).join(' ')

    return sqlJoinParts
  }

  let joinClause = ''
  if (_.isEmpty(joinExps)) {
    let field = getBaseField(aggregationExps[0])
    let table = tableIdDict[field.tableId]
    if (!table) {
      throw new Error('存在已经删除了的表格，无法生成 sql')
    }
    let [dsId, tableName] = field.id.split('/')
    joinClause = dimInfoToSQL({dsId, tableName, fieldName: ''})
  } else {
    joinClause = dealWithJoinLinks(joinExps)
  }

  let groupByCols = groupByExps.map(groupByExp => {
    const {name} = groupByExp
    let field = getBaseField(groupByExp)
    // const { dimId, renameTo, castTo, parseDateFormat, castToDateFormat } = oc
    let [ dsId, tableName, fieldName ] = field.id.split('/')
    const finalFieldName = _.snakeCase(name || fieldName)
    const dimClause = dimInfoToSQL({dsId: dsId, tableName: tableName, fieldName/*, castTo, parseDateFormat, castToDateFormat*/})
    return {
      colClause: `${dimClause}${finalFieldName === fieldName ? '' : ` as ${finalFieldName}`}`,
      groupByName: dimClause
    }
  })
  let aggregationCols = aggregationExps.map(aggregationExp => {
    const {name, op, args} = aggregationExp
    const aggClause = handleAggregationIdxAst(aggregationExp)
    const colName = _.snakeCase(name)
    return {
      colClause: `${aggClause} as ${colName}`
    }
  })

  let selectClause = [...groupByCols, ...aggregationCols].map(c => c.colClause).join(', ')

  const groupByClause = ` group by ${groupByCols.map(c => c.groupByName).join(', ')}`
  const whereClause = _.isEmpty(filters) ? '' : ` where ${filters.map(singleFilterToSQL).join(' and ')} `

  let sql = `select ${selectClause} from ${joinClause} ${whereClause} ${groupByClause}`
  return _.trim(sql)
}
