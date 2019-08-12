require '../../res/js/excellentexport/excellentexport.min'

cf.closeExTb = ->
    $('.modal').data('_item').closeDlg()
    app.cache.empty()

m._.btn.exExcel = (it, e) ->
    opt = util.tBtn 'export', null, 'floppy-save', 'btn btn-primary btn-sm'
    opt.attr =
        onclick: "cf._extb(this,'#{e}')"
    opt

cf._extb = (t,et)->
    tbv = $('#' + et + 'tb').closest('[data-cid]').data '_item'
    cl = tbv.collection
    app.dm.tb app.cache, et,
        colNum: 100
        _attrs: ->
            ''
        criteriaOpt: ->
            _.pick cl.criteria, 'offset', 'max'
        afterAddAll: ->
            @$('table').attr 'id', "#{et}_ex"
            cc = "return ExcellentExport.excel(this, '#{et}_ex', '#{et}_excel_export')"
            bstr = 'btn btn-primary btn-lg btn-block'
            cf.prompt '数据导出', "<a download=\"#{et}_#{new Date().getTime()}.xls\" onclick=\"#{cc}\" class='#{bstr}'>导出</a>", null, ->
                btn = @$('a.btn')
                btn.trigger 'click'
                btn.click cf.closeExTb

