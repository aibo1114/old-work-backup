#webpack-dev-server --:server_cfg
#NODE_ENV=production webpack -p --:server_cfg

packModule = (path, dir, name, lang)->
    mods = packDir path, 'app,app/mods'
    if name
        mods[name] = ["#{path}../#{name}/app/meta/admin"]
        mods[lang] = ["#{path}../#{name}/i18n/console_#{lang}"]
    mods

module.exports =
    outPut: (path, m)->
        "#{path}public/res/upload/#{m}/lib/console"

    entry: (path, lib, bower, name, lang)->
        if name
            packModule path, 'app,app/mods', name, lang
        else
#            packModule path, 'app/main,i18n/common_zh,app/common'
            main: [
                path + 'app/main'
            ]
            zh: [
                path + 'i18n/common_zh'
            ]
            common: [
                path + 'app/common'
            ]
            site: [
                path + 'app/mods/site'
            ]
            userRole: [
                path + 'app/mods/userRole'
            ]
            data: [
                path + 'app/mods/data'
            ]

