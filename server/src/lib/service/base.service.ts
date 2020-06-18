import { Model, IFindOptions, ICreateOptions } from 'sequelize-typescript'
import { IFindOrInitializeOptions } from 'sequelize-typescript/lib/interfaces/IFindOrInitializeOptions'
import {Op, UpdateOptions, DestroyOptions, BulkCreateOptions } from 'sequelize'
import _ = require('lodash')

//  Sequelize.Model<Sequelize.Instance<T>, T>

export type IModel<T> = typeof Model

export type ModelInstance<T> = (new () => T) & IModel<T>

export const operatorsAliases: {[key: string]: symbol} = _.mapKeys(Op, (v, k) => `$${k}`)

/**
 * @description 基础service
 * @export
 * @class BaseService
 * @template T
 */
export class BaseService<T extends IModel<T>> {

  private model: ModelInstance<T>

  constructor(model: any) {
    this.model = model
  }

  /**
   * @description 将model开放出去直接调用其上的方法
   * @returns {ModelInstance<T>}
   * @memberOf BaseService
   */
  public getModel(): ModelInstance<T> {
    return this.model
  }

  /**
   * @description 创建单条记录
   * @param {Partial<T>} record
   * @param {CreateOptions} [options]
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async create(record: Partial<T>, options?: ICreateOptions): Promise<any> {
    return this.model.create(record, options)
  }

  /**
   * @description
   * @param {IFindOrInitializeOptions<T>} options
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async findOrCreate(options: IFindOrInitializeOptions<T>): Promise<any> {
    return this.model.findOrCreate(options)
  }

  /**
   * @description
   * @param {Partial<T>[]} records
   * @returns {Promise<any>}
   *
   * @memberOf BaseService
   */
  public async bulkCreate(records: Array<Partial<T>>, options?: BulkCreateOptions): Promise<any[]> {
    return this.model.bulkCreate(records as T[], options as any)
  }

  /**
   * 使用较复杂的配置参数查询单条记录
   * @param {IFindOptions} options
   * @return {Promise<any>}
   */
  public async findOne(options: IFindOptions<T>): Promise<any> {
    return this.model.findOne(options)
  }

  /**
   * @description 使用主键(id)查询单条记录
   * @param {(number | string)} [identifier]
   * @param {IFindOptions<T>} [options]
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async findByPk(identifier?: number | string, options?: IFindOptions<T>): Promise<any> {
    return this.model.findByPk(identifier, options)
  }

  /**
   * @description 查询多条记录
   * @param {IFindOptions<T>} [options]
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async findAll(options?: IFindOptions<T>): Promise<any> {
    return this.model.findAll(options)
  }

  /**
   * 移除 where 中无关的信息
   * @param where
   * @returns {{}|{}}
   */
  trimWhere(where: object) {
    const {fieldRawAttributesMap} = this.model as any
    return _.pickBy(where, (v, k) => {
      return k in fieldRawAttributesMap || k in operatorsAliases || _.isSymbol(k)
    })
  }

  public async list(query: {page?: number, pageSize?: number, sortBy?: string, sortType?: string}): Promise<any[]> {
    const {page = 1, pageSize = 10, sortBy, sortType, ...rest} = query
    const pageIndex = page - 1
    return this.model.findAll({
      where: this.trimWhere(rest),
      offset: pageIndex * pageSize,
      limit: pageSize,
      order: sortBy ? [[sortBy, sortType || 'asc']] : undefined
    })
  }

  /**
   * @description 删除记录
   * @param {DestroyOptions} options
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async destory(options: DestroyOptions): Promise<any> {
    return this.model.destroy(options as any)
  }

  /**
   * @description 删除记录
   * @returns {Promise<any>}
   * @memberOf BaseService
   * @param id
   */
  public async destroyById(id: any): Promise<any> {
    return this.model.destroy({
      where: { id }
    })
  }

  /**
   * @description 更新
   * @param {Partial<T>} values
   * @param {UpdateOptions} options
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async update(values: Partial<T>, options: UpdateOptions): Promise<any> {
    return this.model.update(values, options as any)
  }

  /**
   * @description 查询记录并返回总条数
   * @param {IFindOptions<T>} [options]
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async findAndCountAll(options?: IFindOptions<T>): Promise<any> {
    return this.model.findAndCountAll(options)
  }

  /**
   * @description 查询记录总条数
   * @param {options: any}
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async count(options?: any): Promise<any> {
    return this.model.count(options)
  }
}
