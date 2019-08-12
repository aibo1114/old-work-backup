#webpack-dev-server --:server_cfg
#NODE_ENV=production webpack -p --:server_cfg

module.exports =
    entry: (path, lib, bower)->
        packDir path, 'app'
        

#    entry: (path, lib, bower)->
#        main: [
#            path + 'app/main'
#        ]
#        mob: [
#            path + 'app/mob'
#        ]
#        router: [
#            path + 'app/router.js'
#        ]
#
#
#        search: [
#            path + 'app/search.js'
#        ]
#        apply: [
#            path + 'app/apply.js'
#        ]
#
#
#        home: [
#            path + 'app/home'
#        ]
#
#        qa: [
#            path + 'app/qa'
#        ]
#
#        order: [
#            path + 'app/order'
#        ]
#
#        my: [
#            path + 'app/my'
#        ]
