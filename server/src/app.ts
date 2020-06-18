import { DB } from './lib/models/db'

// build db connections when starting APP
export = (app: any) => {

  app.beforeStart(async () => {
    console.log('🚀 Your awesome APP is launching...')

    await DB.initDB(app.config.sequelize)

    console.log('✅  Your awesome APP launched')
  })
}
