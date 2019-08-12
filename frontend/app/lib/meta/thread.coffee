require './content'
m.thread =
    prop: [
        _ep 'title'
        _ep 'content:content' 
        m._n2o 'group'
        m._pic 'head'
    ]

    listOpt:
        head: false
        _attrs: ->
            'title,user,createdDate'
        modelOpt:
            tagName: 'a'
            attributes: ->
                href: tu.navUrl('data/view/thread', @model.id)
            tmpl: 'threadItem'
#    title:
#        cols: -1
#        type: "textarea"
#        valid:
#            required: true
#            maxlength: 300
#            minlength: 5
#    refTitle:
#        type: 'hidden'
#    ref:
#        type: 'hidden'
#    uid:
#        type: 'hidden'
#        value: ->
#            user.id + '__' + user.username + if user.sina then user.sina.name else ''
#    column:
#        id: 'entityItem'
#        label: '栏目'
#        type: 'select'
#        trans: true
#        attrs:
#            data: ['topic', 'post', 'activity']
#            change: (evt)->
#                $('#ract .selectBox').data('sb').reset($(evt.currentTarget).val())
#    item:
#        id: 'ract'
#        label: '页面'
#        trans: true
#        type: 'selectBox'
#        attrs:
#            afterPick: (d)->
#                e = $('#entityItem select').val()
#                if d and e and e isnt '0'
#                    $('input[name=refTitle]').val(d.title)
#                    $('input[name=ref]').val(e + ':' + d.id)
#
#
#    _:
#        item: [
#            'title'
#            'cat'
#            'content'
#        ]