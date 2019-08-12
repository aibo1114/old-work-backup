module.exports = _exv 'userReport', '_tag',
    _one: true
    tmpl: 'userReport'
    className: 'text-xs-center col-xs-12'
    events:
        'click .next': ->
            @setState @context.idx+1, @context
            @ctn.empty()
            @render()

        'click .prev': ->
            @setState @context.idx-1, @context
            @ctn.empty()
            @render()

        'click .lenBar': (e)->
            t = util.ct(e)
            if t.children().length
                log 'gg'
            else
                log 'lenbar'

        'click .readNote':(e)->
            wk = util.ct(e).attr 'week'
            sd = new Date(app.myGroup.get('startedDate')).monday().addDays(7*wk)
            wke = new Date(sd).addDays(7)
            cf.dm.l 'collection', 'slide',
                entity: 'thread'
                title: "第#{wk}周 读书笔记"
                mode: 'card'
                foot: false
                criteriaOpt: ->
                    q:
                        'group._id': app.myGroup.id
                        'user._id': user.id
                        dateCreated:
                            $gt__d: sd.pattern()
                            $lt__d: wke.pattern()
                addAll:->
                    @ctn.removeClass('loadingData')
                    @ctn = @$('.card-block')
                    @data = @collection.toJSON()
                    weekDate = "#{sd.pattern('yyyy-MM-dd')} - #{wke.pattern('yyyy-MM-dd')}"
                    tasks = for it in app.myGroup.get('task')
                        title: it.title
                        perWeek: it.perWeek
                        items: @data.findAllBy('form.code',it.subData.code)
#                    @ctn.append cf.rtp(require('./readNote.jade'),{tasks,weekDate})
                    util.loadPic @ctn

                    cf.dm.l sBtn, @$('.dBtns'),
                        prop: 'share'
                        item: user.id
                        color: 'warning m-l-3'
                        icon: 'share'
                        text:()->
                            "<div>分享</div>"
                        _clickBtn: ->
                            popMsg '分享您的阅读感悟给朋友们吧, 有精美的格式哦:)'


    init: ->
        @group = app.myGroup
        @stat = @data.stat ||[]
        @curWeek = Math.max(cf.curWeek - 1,0)
        @maxLen = @stat.length - 1

    setState: (idx,ctx)->
        cStat = @stat[idx] || {}
        dMap = {}
        if cStat.thread
            for it in cStat.thread
                m = Math.max(+it.dateCreated.substr(11, 2), 4)
                it.top = (m * 60 + +it.dateCreated.substr(14, 2) - 4 * 60) * 12 / (24 * 60)
                dk = it.dateCreated.substr(0, 10)
                dMap[dk] ?= []
                dMap[dk].push it
        dates = []
        dd = new Date(cStat.date)
        for it in [1..7]
            dates.push
                weekDay: "周#{dd.getDay() || '日'}"
                date: (dd.getMonth()+1) + '/' + dd.getDate()
                thread: dMap[dd.pattern('yyyy-MM-dd')]
            dd.addDays(1)

        $.extend ctx, {cStat,idx,dates}

    context: ->
        @setState @curWeek,
            maxLen: @maxLen
            curWeek: @curWeek
            timeLen: [
                '08:00'
                '12:00'
                '16:00'
                '20:00'
                '24:00'
            ]
    setContent: ->
        if @context.maxLen is -1
            @ctn.html tu.btn '开始统计'