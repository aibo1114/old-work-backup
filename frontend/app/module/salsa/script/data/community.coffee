module.exports = [
    name: '火凤凰萨萨俱乐部'
    code: code
    resPath: if app.env then '/res' else 'http://salsa.postenglishtime.com'
    url: if app.env then 't.salsa.com' else 's.postenglishtime.com'
    nav: [
        label: ii('home')
        href: '/'
        code: 'index'
    ,
        label: ii('course')
        href: '/courseList'
        code: 'course'
    ,
        label: ii('team')
        href: '/team'
        code: 'team'
    ,
        label: ii('activity')
        href: '/activityList'
        code: 'activity'
    ,
        label: ii('gallery')
        href: '/gallery'
        code: 'activity'
    ,
        label: ii('club')
        href: '/club'
        code: 'club'
    ]
]