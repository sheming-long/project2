const HtmlWebpackPlugin = require("html-webpack-plugin");
const path =require("path")
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {//1.配置对象
       // mode:process.env.NODE_ENV,
       mode: process.env.NODE_ENV ,
       output: {
        filename: './js/main.[contenthash:8].js',
      },
    devServer: {
     
        open: true,//自动打开页面
        proxy: {
            "^/api": {
                target://拦截process的值,从而分别访问不同的网站
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:3000"
                        : process.env.NODE_ENV === "production"
                        ? "http://api.cc0820.top:3000"
                        : "",
                pathRewrite: {"/api": " " },
            },
            "^/api1": {//拦截以api开头的,以服务区的名义发送//可以解决跨域问题 
                target: "http://127.0.0.1:3001",  //拦截后发送的地址
                pathRewrite: { './api': " " }   //自定义发送地址 将api字符串 换成 ' '
            }
        },
        client: {
            
            overlay: false
        }

    },

    plugins: [
        new WebpackBar(),
        new HtmlWebpackPlugin({   //打包生成index.html
            template: "./public/index.html",//设置原始模板
        }),
        new MiniCssExtractPlugin({
            filename: './css/main.[contenthash:8].css',
          })
    ],

    externals: { //外部扩展,防止将jq加载进去
        jquery: 'jQuery',
        lodash:"_",
    },
    resolve:{
        alias:{
            "@":path.resolve(__dirname,"./src")
        }
    },

    module: {
        rules: [
            // 解析txt文件
            {
                test: /\.txt$/,
                type: 'asset/source',
            },

            // 解析 png|jpe?g|gif 格式图片并输出到images文件夹内
            {
                test: /\.(png|jpe?g|gif)$/i, // 图片的格式
                type: 'asset/resource', // 载入资源
                generator: { // 输出格式
                    filename: './images/[contenthash:8][ext]'
                }
            },

            // 解析css文件
            {
                test: /\.css$/i, // 匹配所有.css文件
                use: [
                    MiniCssExtractPlugin.loader, // 使用MiniCssExtractPlugin.loader提取CSS为独立文件
                    'css-loader', // 处理CSS文件
                    "postcss-loader",
                ],
            },

            // 解析less文件
            {
                test: /\.less$/i, // 匹配所有.css文件
                use: [
                    MiniCssExtractPlugin.loader, // 使用MiniCssExtractPlugin.loader提取CSS为独立文件
                    'css-loader', // 处理CSS文件
                    "postcss-loader",
                    'less-loader' // 将Less编译为CSS
                ],
            },
        ],
    },
   
   
}