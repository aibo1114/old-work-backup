#webpack-dev-server --:server_cfg
#NODE_ENV=production webpack -p --:server_cfg

module.exports =
#    outPut: '/Users/alex/Projects/gameMgr/dist/lib'
    outPut: '/Users/aibo/project/gameMgr/dist/lib'

#    entry: (path, lib, bower)->
#        lib: [
#            'jquery'
#            'bootstrap'
#            'underscore'
#        ]

    entry: (path, lib, bower)->
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
#            loader: 'url-loader?limit=1000000'
#            loader: 'url-loader?name=[path][name].[ext]'
#        ]

