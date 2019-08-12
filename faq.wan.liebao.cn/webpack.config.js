const path = require('path');
const webpack = require('webpack');

module.exports = {
    // entry: [
        // 'es5-shim/es5-shim.js',
        // 'es5-shim/es5-sham.js',
        // path.resolve(__dirname, './src/graph.js'),
        // path.resolve(__dirname, './src/ui.js')
    // ],
    entry:{
        cm_hf: [
            path.resolve(__dirname, './src/mods/hf/graph.js'),
            path.resolve(__dirname, './src/mods/hf/ui.js')
        ],
        faq: [
            path.resolve(__dirname, './src/lib/json2.js'),
            path.resolve(__dirname, './src/mods/qa/app.js')
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath:'/dist/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                properties: false,  // 是否将常量属性名转为调用表达式。如 a["foo"] → a.foo（默认为true）
                warnings: false
            },
            output: {
                beautify: false,  //是否不将压缩代码格式化
                quote_keys: true
            },
            mangle: {
                screw_ie8: false
            },
            sourceMap: false
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            enforce: 'post', // post-loader处理
            loader: 'es3ify-loader'
        },{
            test : /\.jade$/,
            loader: 'jade-loader'
        },{
            test: /\.css$/,
            use: [
                // 'style-loader',
                'css-loader'
            ]
        },{
            test: /\.(png|svg|jpg|gif)$/,
            use:['file-loader']
        }]
    }
};