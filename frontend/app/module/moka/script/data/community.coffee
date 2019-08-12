module.exports = [
    name: '恋爱能量'
    code: code
    resPath: if app.env then '/res' else 'http://s.helpyoulove.com'
    url: if app.env then 't.moka.com' else 'helpyoulove.com'
    nav: [
        label: '首页'
        href: '/'
        code: 'index'
    ,
        label: '官方课程'
        href: '/entityList?entity=course'
        code: 'courses'
    ,
        label: '前任攻略'
        href: '/entityList?entity=post&cat=redeem'
        code: 'redeem'
    ,
        label: '真命狙击'
        href: '/entityList?entity=post&cat=reaching'
        code: 'reaching'
    ,
        label:'恋爱技巧'
        href: '/entityList?entity=post&cat=skill'
        code: 'skill'
    ,
        label:'看电影学恋爱'
        href: '/entityList?entity=post&cat=movie'
        code: 'movie'
    ,
        label: '论坛社区'
        href: '/forum'
        code: 'forum'
    ]
]