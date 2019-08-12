(->
    pm = (ob)->
        window.parent.postMessage(ob, '*');

    window.__pvp = (->
        @gmStart = ->
            pm
                uid: @uid
                rid: @rid
                type: 'GameRoundStart'

        @gmEnd = ->
            pm
                uid: @uid
                rid: @rid
                type: 'GameRoundStop'

        @gmProc = (op)->
            console.log 'uid'
            console.log @uid
            pm
                type: 'GameRoundProgress'
                uid: @uid
                rid: @rid
                opt: op

        @)()

    window.addEventListener 'message', (e)->
        console.log e.source
        console.log window.parent
        if e.source != window.parent
            return
        else if e.data.timeout
            @gmEnd()
            return
        unless __pvp.uid
            __pvp.uid = e.data.uid
            __pvp.rid = e.data.rid

        console.log 'game part started...'
        console.log __pvp.gmStart

        __pvp.gmStart()
)()
