#npm install --save-dev style-loader css-loader
#extract-text-webpack-plugin
ExtractTextPlugin = require("extract-text-webpack-plugin")
SpritesmithPlugin = require('webpack-spritesmith')

root = exports ? this

fs = require('fs')
`
    _ = require('underscore');
    log = console.log;
    packDir = function (path, dir) {
        var d, i, it, j, len, len1, name, opt, ref, ref1;
        opt = {};
        ref = dir.split(',');
        for (i = 0, len = ref.length; i < len; i++) {
            d = ref[i];
            ref1 = fs.readdirSync(path + d);
            for (j = 0, len1 = ref1.length; j < len1; j++) {
                it = ref1[j];
                if (it.indexOf('.js') > -1) {
                    name = it.split('.')[0];
                    opt[name] = [path + d + '/' + name];
                }
            }
        }
        return opt;
    };
`
#packDir = (path, dir)->
#    opt = {}
#    for d in dir.split(',')
#        for it in fs.readdirSync(path + d)
#            if it.indexOf('.js') > -1
#                name = it.split('.')[0]
#                opt[name] = [path + d + '/' + name]
#    opt

devPath = fs.readFileSync "#{__dirname}/.dev", 'utf8'

m = null
mPath = null
moduleName = null
for it in process.argv
    if it.indexOf('--:') is 0
        [m,port,moduleName,lang] = it.substr(3).split(':')
        mPath = "./module/#{m}/"
        
lang ?= 'zh'

setting = require(mPath + 'webpack')

outPath = if setting.outPut
    if _.isString setting.outPut
        setting.outPut
    else
        setting.outPut(devPath, moduleName)
else
    "#{devPath}public/res/upload/#{m}/lib/"

path = require('path')
webpack = require('webpack')

app_dir = __dirname
module_dir = "#{app_dir}/module/#{m}"
lib_dir = "#{app_dir}/lib/"
bower_dir = path.join app_dir, 'res/js/'
node_dir = "#{app_dir}/node_modules/"

config =
    addVendor: (name, path) ->
        @resolve.alias[name] = path
        @module.noParse.push new RegExp('^' + name + '$')

    entry:
        lib: [
            'jquery'
            'bootstrap'
            'underscore'
            lib_dir + 'init_light'
        ]

    output:
        path: if process.env.NODE_ENV is 'production' then (outPath || mPath + '') else ''
        filename: '[name].js'
#        publicPath: 'http://zhaohui.liebao.cn/forget/'

    externals:
        ggMap: 'ggmap'

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js')
        new webpack.optimize.OccurenceOrderPlugin()
#        new webpack.HotModuleReplacementPlugin()
#        new webpack.NoErrorsPlugin()
#        new webpack.optimize.MinChunkSizePlugin(minSize)
#        new webpack.DedupePlugin()
#        new webpack.UglifyJSPlugin()
        new ExtractTextPlugin "[name].css"
#        , {allChunks: true}
        new webpack.ProvidePlugin
            $: "jquery",
            jQuery: "jquery"
            jquery: "jquery"
            "window.jQuery": "jquery"
#            $: "zepto",
#            jQuery: "zepto"
            _: 'underscore'
            Backbone: 'backbone'
            CodeMirror: 'CodeMirror'

        new SpritesmithPlugin
            src:
                cwd: path.resolve(module_dir, 'images/ico')
                glob: '*.png'
            target:
                image: path.resolve(module_dir, 'images/sprite.png')
                css: path.resolve(module_dir, 'app/style/sprite.css')
            apiOptions:
#                cssImageRef: "~sprite.png"
                cssImageRef: "/images/sprite.png"

    ]
    resolve:
        alias: {}
        modulesDirectories: ['node_modules', module_dir + '/images']
#        extensions:['.js','.css','jade']


    resolveLoader:
        root: node_dir

    module:
        noParse: []
        loaders: [
            test: /\.css$/
            loader: ExtractTextPlugin.extract("style", "css")
        ,
            test: /\.(png|gif|jpg)$/
            loader: 'url-loader?limit=10000'
        ,
            test: /\.(woff2|woff|eot|ttf|svg)$/
            loader: 'file'
        ,
            test: /\.jade$/
            loader: "jade"
        ,
            test: /\.less$/
#            loader: "style!css!less"
            loader: ExtractTextPlugin.extract("style", "css!less")

        ,
            test: /\.sass$/
#            loader: "style!css!sass"
            loader: ExtractTextPlugin.extract("style", "css!sass")
        ]

    devServer:
        contentBase: mPath
#        publicPath: '/'
#        https: true

#        host: '127.0.0.1'
        host: '0.0.0.0'

        hot: false
        inline: true
        lazy: false
#        quite: true
#        noInfo: true

#        info: false
        port: port || 8088
        colors: true
        stats:
            color: true

config.addVendor('zepto', bower_dir + 'zepto/zepto.min.js')
config.addVendor('bootstrap', bower_dir + 'bootstrap/dist/js/bootstrap.min.js')
config.addVendor('underscore', bower_dir + 'underscore/underscore-min.js')
config.addVendor('backbone', bower_dir + 'backbone/backbone-min.js')
config.addVendor('CodeMirror', bower_dir + 'codemirror/lib/codemirror.js')
config.addVendor('socket.io', bower_dir + 'socket.io-client/socket.io.js')

if setting.entry
    _.extend config.entry, setting.entry(mPath, lib_dir, bower_dir, moduleName,lang)

unless setting.noLang    
    config.entry[lang] or= [
         "#{mPath}i18n/#{lang}"
    ]



if setting.loaders
    config.module.loaders = if setting._ml
        config.module.loaders.concat setting.loaders()
    else
        setting.loaders()

if process.env.NODE_ENV is 'production' and setting._publicPath
    config.output.publicPath = setting._publicPath

if setting.jq is '11'
    config.addVendor('jquery', bower_dir + 'jquery-1.11.3.min.js')
    config.addVendor('jquery-m', bower_dir + 'jquery-migrate-1.2.1.min.js')
    config.entry.lib = [
        'jquery'
        'jquery-m'
        bower_dir + 'ie8.js'
#        'bootstrap'
        'underscore'
        "./lib/init_light_ie6.js"
    ]
else if setting.jq is '183'
    config.addVendor('jquery', bower_dir + 'jquery-1.8.3.min.js')
else
    config.addVendor('jquery', bower_dir + 'jquery/dist/jquery.min.js')


module.exports = config














#    loaders: [
#        test: /\.png$/
#        loaders: [
#            'file?name=i/[hash].[ext]'
#        ]
#    ]


#        ,
#            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
#            loader: 'file-loader?mimetype=image/svg+xml'
#        ,
#            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
#            loader: "file-loader?mimetype=application/font-woff"
#        ,
#            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
#            loader: "file-loader?mimetype=application/font-woff"
#        ,
#            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
#            loader: "file-loader?mimetype=application/octet-stream"
#        ,
#            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
#            loader: "file-loader"

