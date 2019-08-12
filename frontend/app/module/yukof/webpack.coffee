#webpack-dev-server --:server_cfg
#NODE_ENV=production webpack -p --:server_cfg

module.exports =

    entry: (path, lib, bower)->
        packDir path, 'app'

#    entry: (path, lib, bower)->
#        main: [
#            path + 'app/main'
#        ]
#
#        router: [
#            path + 'app/router.js'
#        ]