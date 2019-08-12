m.group =
    prop: [
        _ep 'title'

        m._textarea 'idea'


        _ep 'description'

        code: 'terms'
        xtype: 'listEditor'
        label: '守则'

        m._pic 'head'
        m._pic 'qrcode'
        m._pic 'slide'

    ]
    

#        tbItem:
#            title:
#                type: "text"
#            description:
#                w: 300
#                type: "text"
#            type:
#                w: 80
#                type: "map"
#            _btn: ["inEdit", 'showInTd', "del"]
#
#        item: [
#            'title'
#            'idea'
#            'introduction'
#            'terms'
#            'status'
#
#            'headPic'
#            'qrcodePic'
#            'slidePic'
#        ]
#item: [
#    'role'
#    'status'
#    'user'
#    'username'
#    'gender'
#]
meta.groupMember =
    prop:[
        m._select 'role',
            attrs:
                data:
                    leader: '组织者'
                    power: '高级用户'
                    member: '成员'

    ,
        code: 'user'
        type: 'text'
        xtype: 'selectBox'
        bind: true
        attrs:
            searchItem: 'username'
            setAttrs: 'username,gender'
            setVal: ->
                res = _.pick @data, @getAttrs().split(',')
                for k,v of res
                    @form.setVal "[name='#{k}']", v, k
                refFile = @form.model.get('refFile') || {}
                refFile.user = [@data._id + '.jpg']
                @form.model.set
                    refFile: refFile
                    uid: @data._id
                , silent: true
                @form.model.unset 'user'

            panelOpt:
                entity: 'user'
    ,
        _ep 'user:gender'
    ,
        _ep 'status'
    ,
        _ep 'description'

    ]

#cf.st.add


#    gender: meta.user.gender
#    group:
#        type: 'text'
#        xtype: 'selectBox'
#        bind: true
#        attrs:
#            setAttrs: 'title,refFile'
#            panelOpt:
#                entity: 'group'


