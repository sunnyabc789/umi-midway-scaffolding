/**
 * Created on 27/02/2017.
 * @file 定义服务器接口响应统一返回结构
 */


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

    this.success = success
    this.result = result
    this.message = message
    this.code = code
  }


  private _success: boolean
  public get success(): boolean {
    return this._success
  }
  public set success(v: boolean) {
    this._success = v
  }

  private _result: object
  public get result(): object {
    return this._result
  }
  public set result(v: object) {
    this._result = v
  }

  private _message: string
  public get message(): string {
    return this._message
  }
  public set message(v: string) {
    this._message = v
  }

  private _code: number
  public get code(): number {
    return this._code
  }
  public set code(v: number) {
    this._code = v
  }


  /** @return {ResponseStruct} */
  serialize() {
    return {
      success: this.success,
      result: this.result,
      message: this.message,
      code: this.code
    }
  }

  /**
   * 成功响应快捷接口
   * @param {*} result
   * @return {ResponseStruct}
   */
  static ok(result: any) {
    return new Response(true, result).serialize()
  }

  /**
   * 失败响应快捷接口
   * @param {string} message
   * @return {ResponseStruct}
   */
  static fail(message: any) {
    return new Response(false, {}, message).serialize()
  }

  /**
   * 服务的错误信息返回定义
   * @param {string} message
   * @return {ResponseStruct}
   */
  static error(ctx: any, message: string, status = 400) {
    ctx.status = status
    return new Response(false, {}, message).serialize()
  }
}

export { Response }
