figure = (path)->
    cf.rtp(require('./figure.jade'),
        path: path
        title: prompt('请输入图片下方介绍信息')
    )
    
module.exports = (cb)->
    cf.dm.l 'fileCollection', 'air',
        type: 'img'
        multi: true
        title: '插入图片'
        toFetch: true
        closeBtn: true
        itemBtns: ['insertToPage']
        url: '/r/c/mg/file/list'
        foot: true
        preRender:->
        events:
            'click .insertToPage': (e)->
                cb figure(util.ct(e).parent().prev().attr('src').split('?')[0])
                @closeDlg()