#webpack-dev-server --:server_cfg
#NODE_ENV=production webpack -p --:server_cfg

module.exports =
    outPut: '/Users/alex/Projects/gameMgr/customer'
    _publicPath: 'http://zhaohui.liebao.cn/forget/'

    entry: (path, lib, bower)->
        lib: [
            'jquery'
            'jquery-m'
            'bootstrap'
            'underscore'
        ]

        main: [
            path + 'app/main'
        ]



#    loaders: ()->
#        [
#            test: /\.css$/
#            loader: 'style-loader!css-loader'
#        ,
#            test: /\.jade$/
#            loader: "jade"
#
#        ,
#            test: /\.(png|woff|jpg|woff2|eot|ttf|svg)$/
#            loader: 'url-loader?limit=10000'
#        ]


