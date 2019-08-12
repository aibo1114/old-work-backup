module.exports =
    _init: (ctx)->
        ctx._cd =
            post:
                func: 'head'
                text: 'brief'
                
            content:
                func: 'head'
                text: 'brief'

        ctx.pWt = 'PETSNS'

        _cat: (cb)->
            dao.find ctx.c.code, 'cat', {}, {}, (res)->
                opt = {}
                for it in res
                    opt[it.code] = it
                cb(null, opt)

        wt: (cb)->
            dao.get ctx.c.code, 'pubAccount', {code: 'PostEnglishTime'}, (res)->
                cb(null, res)

    index: (ctx, req, rsp)->
        opt =
            limit: 5
            sort:
                row: -1
                lastUpdated: -1

        filter =
            status: 2

        head: (cb)->
            dao.get ctx.c.code, 'head', channel: 'index', (res)->
                cb(null, res)

        indexShow: (cb)->
            dao.get ctx.c.code, 'head', channel: 'indexShow', (res)->
                cb(null, res)


