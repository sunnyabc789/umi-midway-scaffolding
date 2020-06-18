import { Context } from 'midway'
import {decompressUrlQuery, tryJsonParse} from '../../common/sugo-utils'

const isProd = process.env.NODE_ENV === 'production'

const emptyObj = Object.freeze({})

module.exports = () => {
  return async function urlcompress(ctx: Context, next: () => Promise<any>) {

    ctx.q = emptyObj

    if (ctx.query && ctx.query.q) {
      ctx.q = tryJsonParse(decompressUrlQuery(ctx.query.q))
    } else if (ctx.request.body && ctx.request.body.q) {
      ctx.q = tryJsonParse(decompressUrlQuery(ctx.request.body.q))
    }

    if (!isProd) {
      
      console.log(`ctx.q ==> ${JSON.stringify(ctx.q, null, 2)}`)
    }

    await next()
  }
}
