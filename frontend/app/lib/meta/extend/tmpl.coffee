tmpl:
    type: 'select'
    id: 'eTmpl'
    attrs:
        callback: ->
            btn = $('<button type="button" class="btn" style="margin-left:10px">Get Content</button>').click (e)->
                $.ajax
                    url: util.actUrl('email', 'genEmail')
                    data:
                        tmpl: $(e.currentTarget).prev().val()
                        cid: cf.cid
                    success: (res)->
                        $('textarea[name=content]').data("editor").setSource(res.content)
            $('#eTmpl').after btn