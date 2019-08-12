module.exports = _exv 'inlineObj', 'tag',

    groupBtn: [
        icon: 'edit'
    ,
        icon: 'trash'
    ]

    init: ->
        se = @
        @parent.on 'click', '.trash', (e)->
            se.form.model.unset se.name

        @parent.on 'click', '.edit', (e)->
            app.dm.form 'air', se.entity,
                data: se.val
                btns: ['save']
                _save: ->
                    res = {}
                    for k, v of @model.attributes
                        if v
                            res[k] = v
                    se.form.model.set se.name, res
                    @closeDlg()

        @target = @parent.find('input[type=text]')
        @target.attr 'readonly', true
        if @groupBtn
            @target.wrap '<div class="input-group"></div>'
            @target.after cf.rtp 'inputBtnGroup',
                btns: @groupBtn