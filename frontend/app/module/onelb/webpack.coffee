#webpack-dev-server --:server_cfg
#NODE_ENV=production webpack -p --:server_cfg

module.exports =
#    outPut: '/public/res/upload/zmzj/lib/'


#    entry: (path, lib, bower)->
#        main: [
#            path + 'app/main'
#        ]

    entry: (path, lib, bower)->
        packDir path, 'app'
