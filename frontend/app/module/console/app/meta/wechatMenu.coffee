meta.wechatMenu =
    type:
        type: 'select'
        noChange: true
        data:
            file: 'File'
            'folder-close': 'Folder'
        events:
            change:(e)->
                v = util.ct(e).val()
                if v is 'folder-close'
                    if !@model.get(@p.subName)
                        @model.set @p.subName, []
                else
                    @model.unset @p.subName
    kind:
        type: 'select'
        data: [
            'click'
            'view'
            'scancode_push'
            'scancode_waitmsg'
            'pic_sysphoto'
            'pic_photo_or_album'
            'pic_weixin'
            'location_select'
        ]
        events:
            change: (e)->
                for it in ['key','url']
                    @rmInput it
                v = util.ct(e)
                @renderSpeProp @prop.codeBy(v)

    key:
        valid:
            required: true

    url:
        valid:
            required: true
    _:
        item: [
            'type'
            'kind'
            'label'
        ]