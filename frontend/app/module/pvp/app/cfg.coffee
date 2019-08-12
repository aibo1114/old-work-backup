module.exports = 
#    nav: [
#        title: '首页'
#        href: '/'
#    ,
#        title: '网游'
#        href: '/'
#    ,
#        title: '休闲'
#        href: '/'
#    ,
#        title: '轻游戏'
#        href: '/'
#    ,
#        title: '客服'
#        href: '/'
#    ]

    mod: [
        cls: 'head'
        view: 'slide'
        tmpl: 'headSlide'
        viewOpt:
            controller: false
            indicator: 4
        slideOpt:
            interval: 4000
        url: 'http://api.h5game.ksmobile.com/1/news/get_news_lm?tid=lbt'
    ,
        title: '我的游戏'
        cls: 'my'
        view: 'slide'
        tmpl: 'recSlide'
        viewOpt:
            controller: true
            indicator: false
            className: 'carousel slide'
        slideOpt:
            interval: false
        url: 'http://api.h5game.ksmobile.com/1/user/mygame'
        handleData: (d)->
            rs = []
            while d.length > 4
                rs.push d.splice(0, 4)
            if d.length
                rs.push d
            rs
    ,
        title: '今日推荐'
        cls: 'today'
        view: 'slide'
        tmpl: 'recSlide'
        viewOpt:
            controller: true
            indicator: false
            className: 'carousel slide'
        slideOpt:
            interval: false
        url: 'http://api.h5game.ksmobile.com/1/game/get_game_lm?tid=jrtj'
        handleData: (d)->
            rs = []
            while d.length > 4
                rs.push d.splice(0, 4)
            if d.length
                rs.push d
            rs
    ,
        cls: 'middle'
        url: 'http://api.h5game.ksmobile.com/1/news/get_news_lm?tid=ggt1'
        tmpl: 'img'
    ,
        title: '热门排行'
        subTitle: "更多游戏"
        cls: 'rank'
        url: 'http://api.h5game.ksmobile.com/1/game/get_game_lm?tid=rmph'
        tmpl: 'slat'
    ,
        cls: 'foot'
        url: 'http://api.h5game.ksmobile.com/1/news/get_news_lm?tid=ggt2'
        tmpl: 'img'
    ,
        title: '热门最爱'
        subTitle: "更多游戏"
        cls: 'favor'
        tmpl: 'round'
        url: 'http://api.h5game.ksmobile.com/1/game/get_game_lm?tid=rmyx'
#    ,
#        title: '更多游戏'
#        cls: 'rank'
#        url: util.restUrl('game')
#        tmpl: 'slat'

#    ,
#        title: '热门视频'
#        cls: 'video'
#        data: [
#            img: 'http://www.liebao.cn/game/img/zzx.png'
#            href: '/'
#            title: '诸神黄昏'
#        ,
#            img: 'http://www.liebao.cn/game/img/zzx.png'
#            href: '/'
#            title: '诸神黄昏'
#        ]
    ]

    foot: [
        title: '关于我们'
        href: util.navUrl 'aboutUs'
#    ,
#        title: '商务合作'
#        href: '/'

    ]