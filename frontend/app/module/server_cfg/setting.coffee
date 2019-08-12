#webpack-dev-server --:server_cfg
#NODE_ENV=production webpack -p --:server_cfg
module.exports =
    outPut: '/Users/alex/Projects/k-zk-webmanager/src/main/webapp/static/js/'
    entry: (path)->
        main: [
            path + 'app/main'
        ]