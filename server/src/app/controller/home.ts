import {Context, controller, get, inject, priority, provide} from 'midway'
import * as path from 'path'
import send = require('koa-send')

@provide()
@priority(-1)
@controller('/')
export class HomeController {

  @inject()
  ctx: Context

  @get('/*')
  async index() {
    await send(this.ctx as any, 'index.html', {root: path.resolve(__dirname, '../public')})
  }

  @get('/test')
  async test() {
    this.ctx.body =  {
      success: true,
      message: 'ok',
      data: {}
    }
  }
}
