const webpack = require('webpack');

const config= {
    plugins :[
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         properties: false,  // 是否将常量属性名转为调用表达式。如 a["foo"] → a.foo（默认为true）
        //         warnings: false
        //     },
        //     output: {
        //         beautify: false,  //是否不将压缩代码格式化
        //         quote_keys: true
        //     },
        //     mangle: {
        //         screw_ie8: false
        //     },
        //     sourceMap: false
        // }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jquery': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib',
            minChunks: Infinity
        })
    ],

    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        },{
            test: /\.jade$/,
            loader: 'jade-loader'
        },{
            test: /\.less$/,
            use: [
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'less-loader'
            ]
        },{
            test: /\.(png|svg|jpg|jepg|gif|woff|woff2|eot|ttf)$/,
            use: ['file-loader']
        }]
    }
};

module.exports=config;



















/*
*
* const path= require('path');
 console.log('.....................................................');
 console.log(process.argv.length);
 console.log(process.argv);
 console.log(process.env);
 console.log(process.env.NODE_ENV);

 var ref=process.argv,
 ref1,
 m,port,
 mPath;
 for (var i=0,len=ref.length; i<len; i++){
 var it=ref[i];
 if (it.indexOf('--:')===0 ){
 ref1=it.substr(3).split(':'), m=ref1[0], port=ref1[1];
 ******************mPath='./module/'+m+'/';
 }
 }


 devServer: {
 contentBase: path.resolve(__dirname, mPath),
 port : port || 8088
 }
*
*
* */