module.exports = cf.view.tag.extend
    parent: 'body'
    className: 'msgBtn'
    init: ->
        @render()
        @listenTo @collection, 'update', @renderNum

    renderNum: ->
        @$('.label').remove()
        if len = @collection.length
            @ctn.append tu.label len, 'danger'

    setContent: ->
        @$el.append tu.icon 'inbox'
        @renderNum()

    events:
        'click i': (e)->
            app.dm.collection 'air', 'msg',
                fullScreen: true
                toFetch: false
                closeBtn: true
                collection: app.myMsgList
                title: '我的消息' #ii('myMsg')
                tagClass: 'list-group'
                noData: ->
                    "<p class='jumbotron text-xs-center'>您现在没有消息:)</p>"
                _filter: ->
                    cf.rtp 'filterBtnGroup',
                        btns: [
                            title: '未读'
                            selected: true
                            key: 'new'
                        ,
                            title: '已读'
                            key: 'like'
                        ]
                events:
                    'click a': (e)->
                        m = @findData(e)
                        m.set 'status', 2
                        m.saveAttr 'status'
                        @collection.remove m
                        @closeDlg()
                itemContext: (d)->
                    $.extend d,
                        title: d.msg
                        subTitle: d.dateCreated.dStr()
                        imgPath: util.resPath(cf.community, d.user._id)
                        attrs:
                            href: util.navUrl(d.link)
#                modelOpt:
#                    tagName: 'a'
