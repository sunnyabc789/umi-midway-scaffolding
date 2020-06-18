// import * as path from 'path'
// const isProd = process.env.NODE_ENV === 'production'

export default (appInfo: any) => {
  const config: any = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_sugo_portal_app'

  config.middleware = ['urlcompress']

  config.static = {
    // prefix: '',
    prefix: '/static-apps/portal/',
    gzip: true
  }

  // config.view = {
  //   // templateViewEngine: 'nunjucks',
  //   // root: path.join(appInfo.appDir, 'src/app/view'),
  //   mapping: {
  //     '.html': 'nunjucks',
  //   },
  // }

  // config.assets = {
  //   publicPath: 'public',
  // }
  // config.cors = {
  //   origin: '*',
  //   allowHeaders: 'Accept,content-type',
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  //   credentials: true
  // }
  config.cors = {
    // origin: '*',
    // allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTION',
    credentials: true,
    origin: (ctx: any) => ctx.get('origin'),
  }

  // config.session = {
  //   key: 'sugo-portal:sess',
  //   signed: false,
  //   maxAge: null
  // }

  // config.sequelize = {
  //   dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  //   host: 'localhost',
  //   port: '3306',
  //   database: isProd ? 'postgres' : 'postgres',
  //   username: 'root',
  //   password: process.env.dbPassword || '123456',    // logging: console.log
  //   logging: console.log
  //   // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
  //   // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
  //   // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
  //   // more sequelize options
  // }

  config.sequelize = {
    dialect: 'mysql',
    host: '192.168.0.198',
    port: '3306',
    database: 'sugo_portal_app_bak',
    username: 'root',
    password: process.env.dbPassword || 'sugo123',
    logging: false

    // dialect: 'mysql',
    // host: '192.168.0.198',
    // port: '3306',
    // database: 'sugo_portal_app',
    // username: 'root',
    // password: process.env.dbPassword || 'sugo123',
    // logging: false

    // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
    // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
    // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
    // more sequelize options
};

  config.security = {
    csrf: false
  }

  return config
}
