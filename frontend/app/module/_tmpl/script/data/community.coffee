module.exports = [
    name: '豹厂外文社'
    code: code
    resPath: if app.env then '/res' else 'http://s.flg.liebao.cn'
    url: if app.env then 't.cmf.com' else 'flg.liebao.cn'
    nav: [
        label: '首页'
        href: '/'
        code: 'index'
    ,
        label: '活动'
        href: '/entityList?entity=activity'
        code: 'courses'
    ,
        label: '文章'
        href: '/entityList?entity=post'
        code: 'redeem'

    ]
]