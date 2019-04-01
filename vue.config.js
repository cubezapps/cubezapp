let { projectEnv, ciVersion } = require('minimist')(process.argv.slice(2))
const { version } = require('./package.json')
projectEnv = projectEnv || 'production'
ciVersion = ciVersion || version
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 80
  },
  runtimeCompiler: isProd,
  publicPath:'./',
  css: {
    // extract CSS in components into a single CSS file (only in production)
    extract: isProd,
    modules: true,
    sourceMap: !isProd,
    loaderOptions: {
      css: {
        localIdentName: isProd ? '_[hash:base64:8]' : '[local]_[hash:base64:8]',
        camelCase: true
      }
    }
  },
  productionSourceMap: !isProd,
  configureWebpack (config) {
    switch (config.mode) {
      case 'production':
        config.optimization.splitChunks.name = true // 解决异步打包打到全局的bug
        if (projectEnv !== 'test') {
          // config.optimization.minimizer[0].options.uglifyOptions.compress.drop_console = true // 删除日志
        }
        break
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch') // pc 适合预加载
    config.plugin('define').tap(args => {
      args[0].PROJECT_ENV = `"${projectEnv}"`
      args[0].PROJECT_VERSION = `"${ciVersion}"`
      return args
    })
    config.module.rule('images').uses.clear()
    config.module.rule('images').use('file-loader')
      .loader('file-loader')
      .tap(options => {
        return {
          name: 'img/[name].[hash:8].[ext]'
        }
      })
  }
}
