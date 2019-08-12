tag = require '../view/tag'
entity = require '../model/entity'

_userBox = cf.view.collection.extend
    toFetch: true
    entity: 'user'
    criteriaOpt:
        score: 'eq_l_6'
        _attrs: 'username,refFile,score'
    addAll: ->
        w = screen.width / 15
        for d in @data
            util.pStr d, 'refFile'
            n = d.username
            if d.score > 6
                n += "(#{d.score})"
            p = util.resPath "portrait-#{d.id}.jpg"
            @ctn.append "<div class='lotImg'><img id='p-#{d.id}' width='#{w}' height='#{w}' src='#{p}'/><p>#{n}</p></div>"


module.exports = tag.extend
    init: ->
        @render()
    events:
        'click .start': (e)->
            t = util.ct(e)
            @num = 0
            t.hide()
            t.next().show()
            @renderUsers()
            @renderBox()

        'click .lotBtn': (e)->
            score = 6 + @lCount
            ok = @$('.wins')
            cl = 'turn'
            t = @$('.lotUser img').length
            for it in [0..@lCount - 1]
                n = Math.ceil(Math.random() * t)
                tg = @$('.lotUser img').eq(n - 1)
                #                        tg.addClass(cl)
                ok.append tg
                opt =
                    id: tg.attr('id').split('-')[1]
                    score: score
                    auth: true
                    _attrs: 'score'
                new _entity(opt,
                    entity: 'user'
                ).save()
                t--
        'click .pre': (e)->
            if @num > 0
                @num--
                @renderBox()

        'click .next': (e)->
            if @num < (@pData.length - 1)
                @num++
                @renderBox()

        'click .wed img': (e)->
            opt =
                id: util.getTargetId(e)
                score: 6
                auth: true
                _attrs: 'score'
            new entity(opt,
                entity: 'user'
            ).save()


    pickIt: ->

    renderBox: ->
        @$('h2').text @pData[@num].title
        @lCount = @pData[@num].num

    renderUsers: ->
        new _userBox
            cleanAll: false
            criteriaOpt:
                score: 'gt_l_6'
                _attrs: 'username,refFile,score'
                max: -1
            parent: $('.wed')
            addAll: ->
                w = screen.width / 15
                for d in @data
                    util.pStr d, 'refFile'
                    n = d.username
                    #                                if d.score is 11
                    #                                    n += "(#{d.score})"
                    #                                if d.refFile and d.refFile.portrait
                    #                                    p = util.resPath d.refFile.portrait[0]
                    #                                else
                    #                                    p = util.resPath 'logo.png'
                    p = util.resPath "portrait-#{d.id}.jpg"
                    $('.we' + (d.score - 6)).append "<div class='lotImg'><img id='p-#{d.id}' width='#{w}' height='#{w}' src='#{p}'/><p>#{n}</p></div>"
        new _userBox
            cleanAll: false
            pp: @
            criteriaOpt:
                score: 'eq_l_6'
                _attrs: 'username,refFile,score'
                max: -1
            parent: $('.lotUser')