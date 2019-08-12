require './table.less'

table = cf.view.collection.extend
    tmpl: require './table.jade'
    mode: _st.mode
    parent: '#main'
    style: "#{_st.mode}-default"
    foot: true
    head: true
    btnWidth: '48'

    cleanAll: true
    max: 15
    foot: true
    itemView: require './trModel'
    tbStyle: _st.tb()
    thead: true
    colNum: 3
    toolbar: true

    init: ->
        @meta ?= m[@entity]
        unless @cols
            @cols = []
            i = 0
            for it in @meta.prop.slice()
                if i < @colNum
                    continue if it.noTb or !it.code or it.code.startsWith '_'
                    if it.xtype
                        if it.showText
                            i++
                            @cols.push it
                    else if it.code
                        i++
                        @cols.push it

            if !@noLastTime
                @cols.push
                    code: 'lastUpdated'
                    type: 'date'
                    w: '130px'

            @itemBtns ?= @meta.tbBtn || ['edit', 'del']

            if @itemBtns.length
                @cols.push
                    code: '_btn'
                    type: 'btn'

            if @checkAll
                @cols.unshift
                    type: 'ckb'
                    code: '_ckb'

        @colSize = @cols.length

    _attrs: ->
        if true
            ''
        else

            unless @cols
                @init()
            d = []
            for it in @cols
                if it.xtype is 'refFileCollection'
                    d.push 'refFile'
                else if !it.code.startsWith('_')
                    d.push it.code
            d.join(',')


    title: ->
        iin(@entity)

    context: ->
        cols: @cols
        colSize: @colSize
        tbStyle: @tbStyle
        entity: @entity
        thead: @thead
        btnLength: @itemBtns?.length
        btnWidth: @btnWidth

    getChecked:->
        @$('tbody tr.active')

    enhanceContent: ->
        if cf.mob
            @ctn.attr 'class', "table-responsive"
        if @mode is _st.mode
            @ctn.replaceWith @ctn.children()
            
        @ctn = @$('.refresh')

        @toolbar = @$('.toolbar')
        @toolbar.addClass 'btnCtn'

        @setTools?()

        if @checkAll
            @$('th:first').css 'text-align','center'
            @$el.on 'click', 'input[type=checkbox]', (e)=>
                cbs = @$('.ckb')
                t = util.ct e
                if t.parent().is('th')
                    if t.is ':checked'
                        cbs.prop "checked", true
                        @$('tbody tr').addClass 'active'
                    else
                        cbs.prop 'checked', false
                        @$('tbody tr').removeClass 'active'
                else if t.parent().is('td')
                    t.parent().parent().toggleClass('active')

                len = @checkLen = @getChecked().length

                @toolbar.find('.showL2')[if len then 'show' else 'hide']()
                @toolbar.find('.showL1')[if len > 0 then 'show' else 'hide']()
                @toolbar.find('.showO1')[if len is 1 then 'show' else 'hide']()

$.extend cf.dm,
    tb: (p, entity, opt = {})->
        init =
            title: iin(entity)
            cleanAll: true
            parent: p
            entity: entity
            btns: ->
                if user.entityAuth entity, 'add'
                    ['topAdd']
                else
                    null
        new table cf._packOpt(init, entity, 'list', opt)

cf.view.table = table
module.exports = table
