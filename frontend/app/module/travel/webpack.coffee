#webpack-dev-server --:server_cfg
#NODE_ENV=production webpack -p --:server_cfg

module.exports =
#    outPut: '/Users/alex/Projects/eclub/public/res/upload/travel/lib/'

    entry: (path, lib_dir, bower)->
        packDir path, 'app'

#        car: [
#            path + 'app/car.js'
#        ]
#
#        tour: [
#            path + 'app/tour.js'
#        ]
#
#        router: [
#            path + 'app/router.js'
#        ]
#
#        main: [
#            path + 'app/main'
#        ]