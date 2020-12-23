// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/vue-pipeline/'
  : '/',
  configureWebpack: {
    output: {
      path: __dirname + '/dist'
    },
    resolve: {
      alias: {
        '@': __dirname + '/demo'
      }
    },
    entry: {
      app: './demo/main.js'
    }
  }
}
