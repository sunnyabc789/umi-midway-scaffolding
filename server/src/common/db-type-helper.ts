
export function guessDruidTypeByDbDataType(dbType: string) {
  const dbTypeLowerCase = (dbType || '').toLowerCase()
  if (/text|clob|graphic|blob|binary|image|json|xml|raw|file/.test(dbTypeLowerCase)) {
    return 'Text'
  }
  if (/char|uid|rowid|enum|set/.test(dbTypeLowerCase)) {
    return 'String'
  }
  // 暂时不支持，先清洗成 string
  if (/bigdecimal|bigserial|bigint/.test(dbTypeLowerCase)) {
    return 'BigDecimal'
  }
  if (/double|real|num|decimal|dec|money/.test(dbTypeLowerCase)) {
    return 'Double'
  }
  if (/long/.test(dbTypeLowerCase)) {
    return 'Long'
  }
  if (/^int|int$|bit|bool|byte|serial/.test(dbTypeLowerCase)) {
    return 'Int'
  }
  if (/float/.test(dbTypeLowerCase)) {
    return 'Float'
  }
  if (/date|time/.test(dbTypeLowerCase)) {
    return 'Date'
  }
  return 'String'
}

export const SimpleType = {
  Long: 'NUMBER',
  Float: 'NUMBER',
  String: 'STRING',
  Date: 'TIME',
  Int: 'NUMBER',
  Text: 'STRING',
  Double: 'NUMBER',
  BigDecimal: 'NUMBER',
}

export function guessDruidStrTypeByDbDataType(dbType: string) {
  const druidType = guessDruidTypeByDbDataType(dbType)
  return (druidType || 'STRING').toUpperCase()
}

export function guessSimpleTypeByDbDataType(dbType: string) {
  const druidType = guessDruidTypeByDbDataType(dbType)
  return SimpleType[druidType] || 'STRING'
}
