// vue.config.js
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    // 使用运行时编译器的 Vue 构建版本
    runtimeCompiler: true,

    // 开启生产环境SourceMap
    productionSourceMap: false,

    // 关闭ESLint
    lintOnSave: false,

    devServer: {
        open: false, // 是否自动打开浏览器页面
        host: '0.0.0.0', // 指定使用一个 host。默认是 localhost
        port: 8080, // 端口地址
        https: false, // 使用https提供服务

        // 设置代理
        proxy: {
            "/api": {
                target: "http://api.zhuishushenqi.com", // 域名
                changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
    },

    configureWebpack: config => {
        // config.resolve.alias
        //     .set('vue$', 'vue/dist/vue.esm.js')
        // console.log(config)
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new BundleAnalyzerPlugin()
                ]
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
                @import "@/style/mixin.scss";
                @import "@/style/var.scss";
                `
            }
        }
    }
}
