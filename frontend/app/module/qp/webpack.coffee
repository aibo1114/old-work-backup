#webpack-dev-server --:server_cfg
#NODE_ENV=production webpack -p --:server_cfg

module.exports =
#    outPut: '/Users/alex/Projects/gameMgr/cmb'
#    _publicPath: 'http://zhaohui.liebao.cn/forget/'

    entry: (path, lib, bower)->
        main: [
            path + 'app/main'
        ]
#        data: [
#            './module/console/app/mods/data'
#        ]
#        zh: [
#            path + 'i18n/zh'
#        ]
#
#    loaders: ()->
#        [
#            test: /\.less$/,
#            loader: "style!css!less"
#        ,
#            test: /\.css$/
#            loader: 'style-loader!css-loader'
#        ,
#            test: /\.jade$/
#            loader: "jade"
#        ,
#            test: /\.(png|gif|woff|jpdg|woff2|eot|ttf|svg)$/
#            loader: 'url-loader?limit=1000000'
##            loader: 'url-loader?name=[path][name].[ext]'
#        ]
#
