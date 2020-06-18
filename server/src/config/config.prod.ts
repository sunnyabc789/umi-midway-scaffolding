import * as path from 'path'

export default (appInfo: any) => {
  const config: any = {}

  // 自定义日志目录
  config.logger = {
     dir: path.join(appInfo.appDir, 'logs')
  }

  return config
}
