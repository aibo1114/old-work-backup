m.task =
    label: '打卡'
    prop:[
        _ep 'title'

        m._select 'type',
            attrs:
                data:
                    day: '按天'
                    week: '按周'
    ,
        m._number 'number',
            label: '次数'

        m._number 'price'

        _ep 'timeRule',
            label: '打卡时间'

        m._n2o 'subData', 'exForm',
            label: '上报数据'
            attrs:
                setAttrs:'_id,title,code,entity,prop,rsMsg'

        _ep 'description'
    ]

m.inputData =
    prop:[
        _ep 'title'
        _ep 'code'
        _ep 'val'
    ]
m.groupMember =
    prop:[
        m._view 'group', 'title',
            noTb: true
        
        m._user()

        m._select 'role',
            attrs:
                data:
                    organizer: '发起人'
                    oper: '管理员'
                    member: '成员'

        _ep 'user:status'

        _ep 'row'

        _ep 'introduction'

    ]
    listOpt:
        colNum:4

m.group =
    prop: [
        m._link 'title'

        _ep 'subTitle'

        m._cat 'group'

        m._textarea 'idea'


        _ep 'content:content'

        m._markdown 'terms'

        m._markdown 'taskIntro'

        m._itemTable 'task',
            attrs:
                btns:['inlineAdd']
                itemBtns: ['inlineEdit','formDel']

        _ep 'startedDate'

        m._number 'week',
            label: '时长'
            group:
                suf: '周'

        m._number 'totalNumber',
            label: '人数'
            group:
                suf: '人'

        m._money 'price',
            valid:
                required: true
                min: 0

        m._n2o 'venue', 'venue',
            label: '线下活动'
            attrs:
                setAttrs: 'title,phone,address,schedule,refFile'

        code: 'ref'
        type: 'holder'
        xtype: 'ref'
        attrs:
            refClass: [
                'post'
                'activity'
                'book'
            ]
            setAttrs: '_e,_id,title,author,description,refFile'
        
        m._n2o 'applyForm', 'exForm',
            label: '报名数据'
            attrs:
                setAttrs: 'title,code,entity,isLogin,className,rsMsg,prop,prePage,sufPage,arrayMod,refFile,mergeUser'

#        _ep 'user'

        _ep 'content:status'

        m._checkbox 'applyEnd',
            label: '停止申请'

        m._pic 'head'

        m._pic 'qrcode'

        m._pic 'slide'
    ]

    listOpt:

        checkAll: true

        btns:['topAdd','copyAdd','trans','batchDel']

        itemBtns: ['showInTd', "edit", "del"]
        afterShow:(e,p)->
            group = @findData(e)
            gid = group.id
            app.dm.tb p, 'groupMember',
                style: 'panel-success'
                btns: ['popAdd']
                itemBtns: ['inlineView', 'del']
                criteriaOpt: ->
                    q:
                        'group._id': gid
                formAddOpt:
                    data: ->
                        group: group.pick '_id','title'
                        status: 1
                viewOpt:
                    editable: true
                    _showAll: true
                    mode: 'blank'
                    head: false
                    btns: ['newProp']



