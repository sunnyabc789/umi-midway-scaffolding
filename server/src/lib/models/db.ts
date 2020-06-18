import { Sequelize } from 'sequelize-typescript'
import { provide, scope, ScopeEnum } from 'midway'

// providing DB.sequelize in case of hyper features
// of sequelize like "sequelize.transaction"
@scope(ScopeEnum.Singleton)
@provide('DB')
export class DB {

  public static sequelize: Sequelize

  public static async initDB(config: any) {
    const isProd = process.env.NODE_ENV === 'production'
    let logging = !!config.verbose || isProd
    if (config.verbose === false) {
      logging = false
    }
    DB.sequelize = new Sequelize({
      ...config,
      // tslint:disable-next-line:no-console
      logging: logging ? console.log : false,
      modelMatch: (filename: string, member) => {
        if (filename !== 'db') {
          return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase()
        }
        return false
      },
    })

    // add models here before using them
    DB.sequelize.addModels([
      __dirname + `/**/*.model${isProd ? '.js' : '.ts'}`
    ])

    try {
      await DB.sequelize.authenticate()
      await DB.sequelize.sync({
        alter: false
      })
    } catch (error) {
      error.message = `DB connection error: ${error.message}`
      throw error
    }
  }
}
