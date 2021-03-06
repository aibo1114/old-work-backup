
module.exports =
    _init: (ctx, req, rsp)->
        video:(cb)->
            dao.get ctx.c.code, 'video', channel: ctx.index, (res)->
                cb(null, res)
        partnerNav: (cb)->
            opt =
                limit: 8
                sort:
                    row: -1
            filter =
                type: 'partner'

            dao.find ctx.c.code, 'cat', filter, opt, (res)->
                cb(null, res)
        news: (cb)->
            opt =
                limit: 5
            filter =
                cat: 'news'
            dao.find ctx.c.code, 'post', filter, opt, (res)->
                cb(null, res)
        knowledge: (cb)->
            opt =
                limit: 5
            filter =
                cat: 'knowledge'
            dao.find ctx.c.code, 'post', filter, opt, (res)->
                cb(null, res)
        jobs: (cb)->
            opt =
                limit: 5
            filter =
                cat: 'jobs'
            dao.find ctx.c.code, 'post', filter, opt, (res)->
                cb(null, res)

    index: (ctx, req, rsp)->
        head: (cb)->
            dao.get ctx.c.code, 'head', type: 'index', (res)->
                cb(null, res)

        qa: (cb)->
            opt =
                limit: 5
                sort:
                    row: -1
            dao.find ctx.c.code, 'qa', {}, opt, (res)->
                cb(null, res)

        content: (cb)->
#filter=
#code:
#$regex: 'workShow_.*'
            filter =
                cat: 'workShow'
            opt =
                limit: 6
                sort:
                    row: -1
            dao.find ctx.c.code, 'content', filter, opt, (res)->
                cb(null, res)

    serviceChannel: (ctx, req, rsp) ->

        privateImageMgm_pp: (cb) ->
            opt =
                limit: 10
                sort:
                    row: -1
            filter =
                code: 'privateImageMgm_pp'

            dao.find ctx.c.code, 'service', filter, opt, (res)->
                cb(null, res)

        privateImageMgm_sp: (cb) ->
            opt =
                limit: 10
                sort:
                    row: -1
            filter = {
                code: 'privateImageMgm_sp'
            }
            dao.find ctx.c.code, 'service', filter, opt, (res)->
                cb(null, res)

        entrepreneurImagePositioning: (cb) ->
            opt =
                limit: 1
                sort:
                    row: -1
            filter = {
                cat: 'entrepreneurImagePositioning'
            }
            dao.find ctx.c.code, 'service', filter, {}, (res)->
                res = res[0]
                cb(null, res)
        actorSolidPackaging: (cb) ->
            opt =
                limit: 1
                sort:
                    row: -1
            filter = {
                cat: 'actorSolidPackaging'
            }
            dao.find ctx.c.code, 'service', filter, {}, (res)->
                res = res[0]
                cb(null, res)
        designOfTheBrideImage: (cb) ->
            opt =
                limit: 1
                sort:
                    row: -1
            filter = {
                cat: 'designOfTheBrideImage'
            }
            dao.find ctx.c.code, 'service', filter, {}, (res)->
                res = res[0]
                cb(null, res)
        intro: (cb) ->
            filter = {
                cat: 'intro'
            }
            dao.find ctx.c.code, 'service', filter, {}, (res)->
                cb(null, res[0])

    courseChannel: (ctx, req, rsp)->
        course: (cb)->
            opt =
                limit: 7
            dao.find ctx.c.code, 'course', {}, opt, (res)->
                cb(null, res)

    partnerChannel: (ctx, req, rsp)->
        post: (cb)->
            filter = {
                cat: 'partner'
            }
            dao.find ctx.c.code, 'post', filter, {}, (res)->
                cb(null, res[0])
