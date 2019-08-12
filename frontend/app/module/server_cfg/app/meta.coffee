meta = require "../../../lib/meta/common"
form = require "../../../lib/view/form"

showInTd = require "../../../lib/func/showInTd"

$.extend meta.common,
    zkservers:
        type: 'text'
    key:
        type: 'text'
    name:
        type: 'text'
    data:
        type: 'text'

$.extend meta,
    server:
        _:
            item: [
                'name'
            ]
            action: ->
                ['del']
            event:
                popAdd:
                    type: 'click'
                    fun: (e)->
                        cl = @collection
                        new form
                            entity: @entity
                            toFetch: false
                            mode: 'modal'
                            _saveSuccess:(model,res)->
                                if res.retcode is 0
                                    cl.addByData key: model.get('name')
                                    model.view.closeDlg()
                        e.stopPropagation()
    idc:
        _:
            btn:
                comps: (it, e)->
                    util.iBtn "th", "comps"
            item: [
                'name'
            ]
            action: ->
                ['del']
            event:
                popAdd:
                    type: 'click'
                    fun: (e)->
                        cl = @collection
                        new form
                            modelOpt:
                                urlRoot: cl.url()
                            entity: @entity
                            toFetch: false
                            mode: 'modal'
                            _saveSuccess:(model,res)->
                                if res.retcode is 0
                                    cl.addByData key: model.get('name')
                                    model.view.closeDlg()
                        e.stopPropagation()
    version:
        _:
            btn:
                mod: (it, e)->
                    if it.key is 'edit'
                        util.iBtn "th-list", "mod"
                dup: (it, e)->
                    if it.key is 'edit'
                        util.iBtn "paste", "dup"
                vm: (it, e)->
                    if it.key isnt 'edit'
                        util.iBtn "search", "vm"
            event:
                mod:
                    type:'click'
                    fun: showInTd
                dup:
                    type:'click'
                    fun: (e)->
                        cl = @collection
                        new form
                            modelOpt:
                                urlRoot: cl.url()
                            entity: @entity
                            toFetch: false
                            mode: 'modal'
                            _saveSuccess:(model,res)->
                                if res.retcode is 0
                                    cl.addByData key: model.get('name')
                                    model.view.closeDlg()
                        e.stopPropagation()
                vm:
                    type:'click'
                    fun: (e)->
                        t = util.ct(e)
                        if t.attr('showTip') is 'true'
                            t.popover 'hide'
                            t.attr 'showTip', 'false'
                        else
                            url = "#{@collection.url()}/#{@findData(e).get('key')}"
                            $.get url, (res)->
                                t.popover
                                    title: '详细信息'
                                    trigger: 'manual'
                                    placement: 'left'
                                    content: res.body.replaceAll('\n','<br/>')
                                    html: true
                                t.popover('show')
                                t.attr 'showTip', 'true'

            tbItem:
                radio:
                    type:'radio'
                    name: 'cur'
                    noLabel: true
                    w: 40
                key: {}
                _opt:
                    type: 'btns'
                    w: 150
            item: [
                'name'
            ]
            action: ->
                ['mod', 'dup','vm']
    selection:
        _:
            btn:
                kv: (it, e)->
                    util.iBtn "th-large", "kv"
            event:
                kv:
                    type: 'click'
                    fun: showInTd
                popAdd:
                    type: 'click'
                    fun: (e)->
                        cl = @collection
                        new form
                            modelOpt:
                                urlRoot: cl.url()
                            entity: @entity
                            toFetch: false
                            mode: 'modal'
                            _saveSuccess:(model,res)->
                                if res.retcode is 0
                                    cl.addByData key: model.get('name')
                                    model.view.closeDlg()
                        e.stopPropagation()
            tbItem:
                key: {}
                _opt:
                    type: 'btns'
                    w: 150
            item: [
                'name'
            ]
            action: ->
                ['kv','del']
    kv:
        _:
            tbItem:
                key: {}
                value: {}
                _opt:
                    type: 'btns'
                    w: 150
            item: [
                'name'
                'data'
            ]
            event:
                popAdd:
                    type: 'click'
                    fun: (e)->
                        cl = @collection
                        new form
                            modelOpt:
                                urlRoot: cl.url()
                            entity: @entity
                            toFetch: false
                            mode: 'modal'
                            _saveSuccess:(model,res)->
                                if res.retcode is 0
                                    cl.addByData
                                        key: model.get('name')
                                        value: model.get('data')
                                    model.view.closeDlg()
                        e.stopPropagation()
            action: ->
                ['del']