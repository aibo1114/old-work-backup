app.enhance

    routes:
        '!/group/:id/thread/:tid': 'thread'

    thread: (gid, id)->
        app.dm.model ctn, 'thread', id,
            auto: false
            mode: null
            slideUrl: if app.prev() then true else false
            tmpl: 'groupTaskView'
            context: ->
                d = @model.toJSON()
                mg = app.myGroup.toJSON()
                cd = new Date(d.dateCreated)
                uInfo = {}
                app.groupMember.each (it)->
                    if it.get('user')._id is d.user._id
                        uInfo = it.toJSON()
                        cf.muid = uInfo._id
                if d.form
                    task = mg.task.findBy('subData.code', d.form.code)
                $.extend d,
                    group: mg
                    task: task
                    intro: _.compact [uInfo.industry, uInfo.jobTitle, uInfo.company]
                    statement: uInfo.statement
                    hasEdit: user.isOwner(d.user._id)
                    hasBack: app.inSlides()
                    hasAdv: false
                    hasComment: true
                    title: if d.title
                        util.adjustText d.title, 20
                    else
                        "#{d.user.username}的读书分享"
                    subTitle: cd.pattern('MM月dd日') + " 第#{(-new Date(mg.startedDate).minusTime(cd)) + 1}天"
                    
            events:
                'click .editIt': ->
                    o =
                        toFetch: false
                        model: @model
                        _saveSuccess: (model)->
                            model.trigger 'change'
                            cf.slider.slidePage()
                    opt = if @model.get('cat') is 'post'
                        o
                    else
                        code = @model.get('form').code
                        $.extend {}, app.myGroup.get('task').findBy('subData.code', code).subData, o
                    app.dm.edit 'slide', 'thread', null, opt

            afterAjax: ->
                ob = @model.toJSON()
                cf.userFunc(@$('.dBtns'),ob)
                cf.addComment(@$('.reply'), ob)
                oL = "mobReadThread?tid=#{id}&gmid=#{cf.muid}"
                if util.isWechat()
                    _.delay =>
                        url = wt.genWtUrl oL, null, null, 'snsapi_base'
                        wt.setShare @$('h2 strong').text(), url, @$('img').attr('src'), tu.adt(@model.get('content'), 50), "thread/_id/#{id}/share"
                    , 1500
                if user.username is 'alex'
                    @$('.dBtns').mk 'p',
                        class: 'text-xs-center m-t-1'
                    , tu.a('外链','/' + oL)