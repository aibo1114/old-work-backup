#webpack-dev-server --:server_cfg
#NODE_ENV=production webpack -p --:server_cfg

module.exports =
    entry: (path, lib, bower)->
        packDir path,   'app,../_mod/exForm'