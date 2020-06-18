"use strict";
/**
 * Created on 27/02/2017.
 * @file 定义服务器接口响应统一返回结构
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 服务器接口响应统一返回结构
 * @typedef {object} ResponseStruct
 * @property {boolean} success
 * @property {*} result
 * @property {?string} message
 * @property {number} code
 */
/**
 * 生成服务器响应数据结构类
 * @example <caption>不传参数</caption>
 * const resp = new Response()
 * resp.result = {list: [1,2,3]}
 * ctx.body = resp.serialize()
 * @class
 */
class Response {
    /**
     * @param {boolean} [success=true]
     * @param {*} [result={}}
     * @param {?string} [message=null]
     * @param {number} [code]
     */
    constructor(success = true, result = {}, message = '', code = 0) {
        this.success = success;
        this.result = result;
        this.message = message;
        this.code = code;
    }
    get success() {
        return this._success;
    }
    set success(v) {
        this._success = v;
    }
    get result() {
        return this._result;
    }
    set result(v) {
        this._result = v;
    }
    get message() {
        return this._message;
    }
    set message(v) {
        this._message = v;
    }
    get code() {
        return this._code;
    }
    set code(v) {
        this._code = v;
    }
    /** @return {ResponseStruct} */
    serialize() {
        return {
            success: this.success,
            result: this.result,
            message: this.message,
            code: this.code
        };
    }
    /**
     * 成功响应快捷接口
     * @param {*} result
     * @return {ResponseStruct}
     */
    static ok(result) {
        return new Response(true, result).serialize();
    }
    /**
     * 失败响应快捷接口
     * @param {string} message
     * @return {ResponseStruct}
     */
    static fail(message) {
        return new Response(false, {}, message).serialize();
    }
    /**
     * 服务的错误信息返回定义
     * @param {string} message
     * @return {ResponseStruct}
     */
    static error(ctx, message, status = 400) {
        ctx.status = status;
        return new Response(false, {}, message).serialize();
    }
}
exports.Response = Response;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL1Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7O0FBR0g7Ozs7Ozs7R0FPRztBQUVIOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFFBQVE7SUFDWjs7Ozs7T0FLRztJQUNILFlBQVksT0FBTyxHQUFHLElBQUksRUFBRSxNQUFNLEdBQUcsRUFBRSxFQUFFLE9BQU8sR0FBRyxFQUFFLEVBQUUsSUFBSSxHQUFHLENBQUM7UUFFN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7SUFDbEIsQ0FBQztJQUlELElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDdEIsQ0FBQztJQUNELElBQVcsT0FBTyxDQUFDLENBQVU7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUE7SUFDbkIsQ0FBQztJQUdELElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBQ0QsSUFBVyxNQUFNLENBQUMsQ0FBUztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQTtJQUNsQixDQUFDO0lBR0QsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUN0QixDQUFDO0lBQ0QsSUFBVyxPQUFPLENBQUMsQ0FBUztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQTtJQUNuQixDQUFDO0lBR0QsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFDRCxJQUFXLElBQUksQ0FBQyxDQUFTO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO0lBQ2hCLENBQUM7SUFHRCwrQkFBK0I7SUFDL0IsU0FBUztRQUNQLE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDaEIsQ0FBQTtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFXO1FBQ25CLE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQy9DLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFZO1FBQ3RCLE9BQU8sSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNyRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBUSxFQUFFLE9BQWUsRUFBRSxNQUFNLEdBQUcsR0FBRztRQUNsRCxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNuQixPQUFPLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDckQsQ0FBQztDQUNGO0FBRVEsNEJBQVEifQ==