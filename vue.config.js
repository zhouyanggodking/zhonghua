const path = require('path')
const fs = require('fs')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const env = process.env.NODE_ENV || 'development'
fs.writeFileSync(path.join(__dirname, './config/env.js'), `export default '${env}'
`);
const BASE_URL = '/';

module.exports = {
  baseUrl: '/finance-icr',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/': {
        ws: false,
        // target: 'http://10.17.16.91:8080',
        target: 'http://10.17.17.151:8080',
        changeOrigin: true
        // pathRewrite: {
        //   '^/finance-icr': '/'
        // }
      }
    }
  }
};
