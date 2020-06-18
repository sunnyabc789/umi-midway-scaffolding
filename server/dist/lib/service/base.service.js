"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _ = require("lodash");
exports.operatorsAliases = _.mapKeys(sequelize_1.Op, (v, k) => `$${k}`);
/**
 * @description 基础service
 * @export
 * @class BaseService
 * @template T
 */
class BaseService {
    constructor(model) {
        this.model = model;
    }
    /**
     * @description 将model开放出去直接调用其上的方法
     * @returns {ModelInstance<T>}
     * @memberOf BaseService
     */
    getModel() {
        return this.model;
    }
    /**
     * @description 创建单条记录
     * @param {Partial<T>} record
     * @param {CreateOptions} [options]
     * @returns {Promise<any>}
     * @memberOf BaseService
     */
    async create(record, options) {
        return this.model.create(record, options);
    }
    /**
     * @description
     * @param {IFindOrInitializeOptions<T>} options
     * @returns {Promise<any>}
     * @memberOf BaseService
     */
    async findOrCreate(options) {
        return this.model.findOrCreate(options);
    }
    /**
     * @description
     * @param {Partial<T>[]} records
     * @returns {Promise<any>}
     *
     * @memberOf BaseService
     */
    async bulkCreate(records, options) {
        return this.model.bulkCreate(records, options);
    }
    /**
     * 使用较复杂的配置参数查询单条记录
     * @param {IFindOptions} options
     * @return {Promise<any>}
     */
    async findOne(options) {
        return this.model.findOne(options);
    }
    /**
     * @description 使用主键(id)查询单条记录
     * @param {(number | string)} [identifier]
     * @param {IFindOptions<T>} [options]
     * @returns {Promise<any>}
     * @memberOf BaseService
     */
    async findByPk(identifier, options) {
        return this.model.findByPk(identifier, options);
    }
    /**
     * @description 查询多条记录
     * @param {IFindOptions<T>} [options]
     * @returns {Promise<any>}
     * @memberOf BaseService
     */
    async findAll(options) {
        return this.model.findAll(options);
    }
    /**
     * 移除 where 中无关的信息
     * @param where
     * @returns {{}|{}}
     */
    trimWhere(where) {
        const { fieldRawAttributesMap } = this.model;
        return _.pickBy(where, (v, k) => {
            return k in fieldRawAttributesMap || k in exports.operatorsAliases || _.isSymbol(k);
        });
    }
    async list(query) {
        const { page = 1, pageSize = 10, sortBy, sortType } = query, rest = __rest(query, ["page", "pageSize", "sortBy", "sortType"]);
        const pageIndex = page - 1;
        return this.model.findAll({
            where: this.trimWhere(rest),
            offset: pageIndex * pageSize,
            limit: pageSize,
            order: sortBy ? [[sortBy, sortType || 'asc']] : undefined
        });
    }
    /**
     * @description 删除记录
     * @param {DestroyOptions} options
     * @returns {Promise<any>}
     * @memberOf BaseService
     */
    async destory(options) {
        return this.model.destroy(options);
    }
    /**
     * @description 删除记录
     * @returns {Promise<any>}
     * @memberOf BaseService
     * @param id
     */
    async destroyById(id) {
        return this.model.destroy({
            where: { id }
        });
    }
    /**
     * @description 更新
     * @param {Partial<T>} values
     * @param {UpdateOptions} options
     * @returns {Promise<any>}
     * @memberOf BaseService
     */
    async update(values, options) {
        return this.model.update(values, options);
    }
    /**
     * @description 查询记录并返回总条数
     * @param {IFindOptions<T>} [options]
     * @returns {Promise<any>}
     * @memberOf BaseService
     */
    async findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
    /**
     * @description 查询记录总条数
     * @param {options: any}
     * @returns {Promise<any>}
     * @memberOf BaseService
     */
    async count(options) {
        return this.model.count(options);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zZXJ2aWNlL2Jhc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRUEseUNBQStFO0FBQy9FLDRCQUE0QjtBQVFmLFFBQUEsZ0JBQWdCLEdBQTRCLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBRXpGOzs7OztHQUtHO0FBQ0gsTUFBYSxXQUFXO0lBSXRCLFlBQVksS0FBVTtRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUNwQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDbkIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBa0IsRUFBRSxPQUF3QjtRQUM5RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQW9DO1FBQzVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDekMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBMEIsRUFBRSxPQUEyQjtRQUM3RSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQWMsRUFBRSxPQUFjLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBd0I7UUFDM0MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8s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