import { EggPlugin } from 'midway'
const isProd = process.env.NODE_ENV === 'production'

export default {
  static: true, // default is true

  nunjucks: {
    enable: false,
    package: 'egg-view-nunjucks',
  },

  assets: {
    enable: isProd,
    package: 'egg-view-assets',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },

  // session: {
  //   enable: true,
  //   package: 'egg-session'
  // }
} as EggPlugin
