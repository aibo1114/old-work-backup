module.exports =
    _init: (ctx, req, rsp)->
        ctx._cd =
            course:
                func: 'head'
                text: 'brief'
            post:
                func: 'head'
                text: 'brief'
            shop:
                func: 'slide'
                text: 'address'
            consultant:
                func: 'head'
                text: 'description'
            product:
                func: 'slide'
                text: 'description'
#        console.log '.........initCtx'
#        console.log ctx

        pageSetting:(cb)->
            dao.find ctx.c.code, 'lang', {}, {}, (res)->
                for it,i in res
                    ctx[it.key]=it.val
                cb(null, res)

        cat:(cb)->
            filter =
                UItab: true
            opt =
                limit: 5
                sort:
                    row: 1
            dao.find ctx.c.code, 'cat', filter, opt, (res)->
                cb(null, res)

        findRes: (cb,ct)->
            opt =
                limit: 10
            filter =
                cat : ct
            dao.find ctx.c.code, 'post', filter, opt, (res)->
                cb(null, res)
        findSideRes: (cb,tbl='tbl')->
            opt=
                limit:3
                sort:
                    row:1
            dao.find ctx.c.code, tbl, {}, opt, (res)->
                cb(null, res)
        findHeadRes: (cb,channel,single=false,lmt=3)->
            filter =
                channel: channel
            dao.find ctx.c.code, 'head', filter, {}, (res)->
                if res && res[0]
                    res= res[0].headItem

                    ret= []
                    if single
                        ret=res[0]
                    else if !single && res && res.length
                        i = 0
                        while i < lmt
                            ret.push res[i]
                            i++
                cb(null, ret)
        findSimilar:(cb,tbl='tbl')->
            filter=
                cat:ctx.cat
            opt=
                limit:5
            dao.find ctx.c.code, tbl, filter, opt, (res)->
                cb(null, res)

    index: (ctx)->
        head:(cb)->
            dao.get ctx.c.code, 'head', channel:'index', (res)->
                cb(null, res)
        #main
        course: (cb)->
            opt =
                limit: 10
            dao.find ctx.c.code, 'course', {}, opt, (res)->
                cb(null, res)
        redeem: (cb)->
            @findRes cb, 'redeem'
        reaching: (cb)->
            @findRes cb, 'reaching'
        skill: (cb)->
            @findRes cb, 'skill'
        movie: (cb)->
            @findRes cb, 'movie'

        #aside
        courseSide: (cb)->
            @findSideRes cb, 'course'
        fPost: (cb)->
            @findSideRes cb, 'forumPost'
        topic: (cb)->
            @findHeadRes cb, 'topic'
        pubCourse: (cb)->
            @findHeadRes cb, 'pubCourse', true
        vipCourse: (cb)->
            @findHeadRes cb, 'vipCourse', true

    post: (ctx)->
        similar:(cb)->
            @findSimilar cb, 'post'
    course: (ctx)->
        similar:(cb)->
            @findSimilar cb, 'course'

    entityList: (ctx, req)->
        entityPageOpt = (ctx, req, et)->
            opt =
                skip: +req.query.skip || 0
                limit: +req.query.limit || 10
                sort:
                    lastUpdated: -1
            ctx._skip = opt.skip
            ctx._limit = opt.limit
            ctx._e = et
            opt
        et = req.query.entity.toString()
        filter =
            status: 2
        if req.query.cat
            cat = req.query.cat.toString()
            filter.cat =
                $regex: ".*#{cat}.*"
        items: (cb)->
            opt = entityPageOpt(ctx, req, et)
            dao.find ctx.c.code, et, filter, opt, (res)->
                dao.count ctx.c.code, et, filter, (count)->
                    ctx._max = count
                    cb(null, res)
        pCats: (cb)->
            dao.find ctx.c.code, 'cat', {type: 'post'}, {}, (res)->
                if ctx.cat
                    cat = _.where(res, {code: ctx.cat.code})
                    ctx.cat = cat[0] if cat.length
                cb(null, res)
        cCats: (cb)->
            dao.find ctx.c.code, 'cat', {type: 'course'}, {}, (res)->
                if ctx.cat
                    cat = _.where(res, {code: ctx.cat.code})
                    ctx.cat = cat[0] if cat.length
                cb(null, res)
        recommendVideo: (cb)->
            @findHeadRes cb, 'recommendVideo', false, 5
    forum:(ctx, req)->
        cat=req.query.cat
        opt=
            limit:8
        areas:(cb)->
            dao.find ctx.c.code, 'forumType', {}, opt, (res)->
                cb(null, res)

#            dao.find ctx.c.code, 'cat', filter, opt, (res)->
#            dao.find ctx.c.code, tbl, filter, opt, (res)->

#        console.log req.query.area
#        dao.find
#        entityPageOpt = (ctx, req, et)->
#            opt =
#                skip: +req.query.skip || 0
#                limit: +req.query.limit || 10
#                sort:
#                    lastUpdated: -1
#            ctx._skip = opt.skip
#            ctx._limit = opt.limit
#            ctx._e = et
#            opt
#        et = req.query.entity.toString()
#        filter =
#            status: 2
#        if req.query.cat
#            cat = req.query.cat.toString()
#            filter.cat =
#                $regex: ".*#{cat}.*"
#        items: (cb)->
#            opt = entityPageOpt(ctx, req, et)
#            dao.find ctx.c.code, et, filter, opt, (res)->
#                dao.count ctx.c.code, et, filter, (count)->
#                    ctx._max = count
#                    cb(null, res)
#        cats: (cb)->
#            dao.find ctx.c.code, 'cat', {type: et}, {}, (res)->
#                if ctx.cat
#                    cat = _.where(res, {code: ctx.cat.code})
#                    ctx.cat = cat[0] if cat.length
#                cb(null, res)
#        opt=
#            limit:10
#
#        notice : (cb)->
#            filter =
#                type:'notice'
#            dao.find ctx.c.code, 'forumPost', filter, opt, (res)->
#                cb(null, res)
#
#        hot:(cb)->
#            filter =
#                hot:true
#            dao.find ctx.c.code, 'forumPost', filter, opt, (res)->
#                cb(null, res)
#
#        orthers:(cb)->
#            filter=
#                type:'others'
#            dao.find ctx.c.code, 'forumPost', filter, opt, (res)->
#                cb(null, res)
#
#        all:(cb)->
#            dao.find ctx.c.code, 'forumPost', {}, opt, (res)->
#                cb(null, res)