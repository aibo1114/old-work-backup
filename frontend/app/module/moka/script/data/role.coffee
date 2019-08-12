module.exports = [
    title: 'admin'
    label: '管理员'
    type: 0
    entities: [
        key: '_biz'
        row: 101
    ,
        key: 'service'
        row: 110
    ,
        key: 'course'
        row: 120
    ,
        key: 'qa'
        row: 140
    ,
        key: 'forumType'
        row: 150
    ,
        key: 'forumPost'
        row: 160
    ,
        key: 'thread'
        row: 141
    ,
        key: 'group'
        row: 142
    ,
        key: 'exForm'
        row: 143
    ,
        key: 'media'
        row: 144
    ]
,
    title: 'user'
    label: '登录用户'
    type: 0
    menu: [
        label: '帖子管理'
        icon: 'th-large'
        href: '#!/home/forumPost/list'
        row: 20
    ,
        label: '文章管理'
        icon: 'file'
        href: '#!/home/post/list'
        row: 30
    ]
]
