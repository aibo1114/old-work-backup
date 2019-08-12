require('../../../../lib/widget/itemSelect')
_exv 'moodTag', 'itemSelect',
    title: '态度标签'
    tips: '只能选择最多3个标签'
    max: 3
    fullScreen: true
    closeBtn: 'pull-xs-left'
    topBtns: [
        label: '保存'
        cls: 'btn btn-sm btn-info save'
        icon: 'save'
    ]
    addAll: ->
        @rsBox = @$('.modal-body').mk 'h3', {
            class: 'text-xs-center m-a-1 p-a-1 bg-faded text-faded',
            style: 'height: 62px'
        }, @tips, 'prepend'
        d = []
        for it in @data
            d.push
                title: it.title
                cls: 'btn-primary-outline m-r-1 m-t-1'
                key: it.code
        @ctn.append cf.rtp 'crBtn',
            btns: d
            cls: ' '
        if @val.length
            @renderBox()
    events:
        'click h3 .btn': (e)->
            t = util.ct(e)
            @val.delBy t.attr('key'), 'code'
            t.remove()
            unless @val.length
                @rsBox.html @tips

        'click label': (e)->
            util.esp e
            t = util.ct(e)
            k = t.attr('key')
            d = @data.findBy('code', k)
            if @val.findBy('code', k)
                @rsBox.find("[key='#{k}']").trigger 'click'
            else if @val.length < @max
                @val.push d
                @renderBox()
            else
                alert '只能选择3个'
        'click .save': (e)->
            ob = {}
            ob[user.id] = @val
            $.postJSON @entUrl, ob, (res)=>
                @closeDlg()
    renderBox: ->
        @rsBox.empty()
        for it in @val
            @rsBox.mk 'a', {key: it.code, class: 'btn btn-primary m-r-1'}, it.title