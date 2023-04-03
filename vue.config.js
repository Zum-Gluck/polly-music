const { resolve } = require("path")
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      hot: true
    },
    resolve: {
      alias: {
        //该别名默认存在（vue内部已经配置过）
        // this alias has already existed default (vue )
        "@": resolve(__dirname, "src"),

        //需要自己去配置
        "@components": resolve(__dirname, "src", 'components'),
      }
    }
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },
})


function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve(__dirname, './src/assets/style/var.less'),
      ],
    })
}