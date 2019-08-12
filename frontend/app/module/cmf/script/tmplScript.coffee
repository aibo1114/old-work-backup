module.exports =
    _init: (ctx)->
        wt: (cb)->
            dao.get ctx.c.code, 'pubAccount', {}, (res)->
                log res
                cb(null, res)

    index: (ctx, req, rsp)->


    mobReadThread: require '../../_mod/group/script/mobReadThread'


