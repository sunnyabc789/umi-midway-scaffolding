"use strict";
// import * as path from 'path'
// const isProd = process.env.NODE_ENV === 'production'
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_sugo_portal_app';
    config.middleware = ['urlcompress'];
    config.static = {
        // prefix: '',
        prefix: '/static-apps/portal/',
        gzip: true
    };
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
        origin: (ctx) => ctx.get('origin'),
    };
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
        database: 'sugo_portal_app',
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
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7QUFDL0IsdURBQXVEOztBQUV2RCxrQkFBZSxDQUFDLE9BQVksRUFBRSxFQUFFO0lBQzlCLE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQTtJQUV0Qix1RUFBdUU7SUFDdkUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFBO0lBRS9DLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUVuQyxNQUFNLENBQUMsTUFBTSxHQUFHO1FBQ2QsY0FBYztRQUNkLE1BQU0sRUFBRSxzQkFBc0I7UUFDOUIsSUFBSSxFQUFFLElBQUk7S0FDWCxDQUFBO0lBRUQsa0JBQWtCO0lBQ2xCLHVDQUF1QztJQUN2Qyx3REFBd0Q7SUFDeEQsZUFBZTtJQUNmLDJCQUEyQjtJQUMzQixPQUFPO0lBQ1AsSUFBSTtJQUVKLG9CQUFvQjtJQUNwQiwwQkFBMEI7SUFDMUIsSUFBSTtJQUNKLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIseUNBQXlDO0lBQ3pDLDREQUE0RDtJQUM1RCxzQkFBc0I7SUFDdEIsSUFBSTtJQUNKLE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDWixlQUFlO1FBQ2YseURBQXlEO1FBQ3pELFdBQVcsRUFBRSxJQUFJO1FBQ2pCLE1BQU0sRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7S0FDeEMsQ0FBQTtJQUVELHFCQUFxQjtJQUNyQiw2QkFBNkI7SUFDN0IsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQixJQUFJO0lBRUosdUJBQXVCO0lBQ3ZCLGtFQUFrRTtJQUNsRSx1QkFBdUI7SUFDdkIsa0JBQWtCO0lBQ2xCLGdEQUFnRDtJQUNoRCxzQkFBc0I7SUFDdEIsNkVBQTZFO0lBQzdFLHlCQUF5QjtJQUN6QiwwR0FBMEc7SUFDMUcsZ0dBQWdHO0lBQ2hHLHlHQUF5RztJQUN6Ryw4QkFBOEI7SUFDOUIsSUFBSTtJQUVKLE1BQU0sQ0FBQyxTQUFTLEdBQUc7UUFDakIsT0FBTyxFQUFFLE9BQU87UUFDaEIsSUFBSSxFQUFFLGVBQWU7UUFDckIsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxTQUFTO1FBQzdDLE9BQU8sRUFBRSxLQUFLO1FBRWQsb0JBQW9CO1FBQ3BCLHlCQUF5QjtRQUN6QixnQkFBZ0I7UUFDaEIsK0JBQStCO1FBQy9CLG9CQUFvQjtRQUNwQixpREFBaUQ7UUFDakQsaUJBQWlCO1FBRWpCLHFHQUFxRztRQUNyRywyRkFBMkY7UUFDM0Ysb0dBQW9HO1FBQ3BHLHlCQUF5QjtLQUM1QixDQUFDO0lBRUEsTUFBTSxDQUFDLFFBQVEsR0FBRztRQUNoQixJQUFJLEVBQUUsS0FBSztLQUNaLENBQUE7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9