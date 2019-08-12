#webpack-dev-server --:server_cfg
#NODE_ENV=production webpack -p --:server_cfg

module.exports =
    entry: (path, lib, bower)->
        op = packDir path, 'app,app/mod,../_mod/exForm'
        op.en = path + 'i18n/en.js'
        op.zh = path + 'i18n/zh.js'
        op