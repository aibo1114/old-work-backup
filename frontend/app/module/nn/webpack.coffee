#webpack-dev-server --:server_cfg
#NODE_ENV=production webpack -p --:server_cfg

module.exports =
#    outPut: '/Users/alex/Projects/eclub/public/res/upload/pxxx/lib/'
    entry: (path, lib, bower)->
        packDir path, 'app'
#        admin: [
#            path + 'app/admin'
#        ]