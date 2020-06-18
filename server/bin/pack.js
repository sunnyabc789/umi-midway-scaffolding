/**
 * 分扩展包打包程序
 * 每个包只打包一种扩展包
 * 全部打包 npm run pack
 * 只打包一种或者几种 PACK_NAME=saas,wxj npm run pack
 * 加入node包路径 NODE_PACK_PATH=path/to/node-release npm run pack
 * 最后生成 release/sugo-portal-app.tar.gz
 */
let start = new Date().getTime();
const cwd = process.cwd();
let { PACK_NAME, NODE_PACK_PATH } = process.env;
const { mkdir, cp, rm, exec, echo, cd } = require('shelljs');
const { readdirSync } = require('fs');
const { resolve } = require('path');
// const filterJs = require('sugo-analytics-common-tools/lib/filter-dist')
// let exts = PACK_NAME
//   ? PACK_NAME.split(',').map(n => `sugo-analytics-extend-${n}`)
//   : readdirSync(
//     resolve(__dirname, '../node_modules')
//   )
//     .filter(f => f.includes('sugo-analytics-extend-'))

cd(resolve(__dirname, '..'));

echo('clean',);
//rm('-rf', 'dist');
rm('-rf', 'release');
rm('-rf', '*.gz');

echo('mk release dir');
mkdir('-p', 'release/sugo-portal-app/portal');
echo('cp files...');
const files =  [
  'dist',
  'cmds',
  'node_modules',
  'package.json',
  'version',
  // 'pm2.yaml',
  'server.js',
  'server.json'
]

exec(`tar czf sugo-portal-app.tar.gz ${files.join(' ')}`)

cp(
  '-r',
  [
    'sugo-portal-app.tar.gz'
  ],
  'release/sugo-portal-app/portal'
);
rm('-rf', 'sugo-portal-app.tar.gz')
exec('cd release/sugo-portal-app/portal && tar xzf sugo-portal-app.tar.gz && rm -rf sugo-portal-app.tar.gz')
exec('cd release/sugo-portal-app/portal && cp cmds/pm2 cmds/pm2.yaml ./')

if (NODE_PACK_PATH) {
  echo('copy node release');
  cp('-r', NODE_PACK_PATH, 'release/sugo-portal-app/node');
}

echo('start packing...');
echo('remove unused package');
exec(
  `cd release/sugo-portal-app/portal && npm prune --production && ../../../node_modules/.bin/n-prune ${cwd}/release/sugo-portal-app/portal/node_modules -c ../../../bin/prune.json && cd ${cwd}`
);
rm('-rf', 'release/sugo-portal-app/portal/package-lock.json');
echo('build sugo-portal-app.tar.gz');
exec(`cd release && tar czf sugo-portal-app.tar.gz sugo-portal-app && cd ${cwd}`);
echo('done build sugo-portal-app.tar.gz');
