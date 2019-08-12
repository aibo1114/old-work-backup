m.participant =
    prop:[

    ]

#
#meta.participant =
#    'report::start':
#        label: '开篇'
#        type: 'textarea'
#        val: "这个方面也同样展现了你的专业与格调。只有一个方面我觉得你不妨尝试改进一下:"
#
#    'report::english':
#        label: '英语口语与演讲技巧'
#        type: 'textarea'
#        val: "这个方面也同样展现了你的专业与格调。只有一个方面我觉得你不妨尝试改进一下:"
#
#    'report::material':
#        label: '分享材料准备与组织'
#        type: 'textarea'
#        val: "这个方面也同样展现了你的专业与格调。只有一个方面我觉得你不妨尝试改进一下:"
#
#    'report::organizing':
#        label: '现场组织控场能力'
#        type: 'textarea'
#        val: "这个方面也同样展现了你的专业与格调。只有一个方面我觉得你不妨尝试改进一下:"
#
#    'report::charisma':
#        label: '个人魅力'
#        type: 'textarea'
#        val: "这个方面也同样展现了你的专业与格调。只有一个方面我觉得你不妨尝试改进一下:"
#
#    'report::end':
#        label: '结束'
#        type: 'textarea'
#        val: "这次主持你做的非常成功，嘉许你的用心付出！你的专业使这里更加精彩，谢谢你。\n 下面是你在主持的过程中拍摄的录像 \n 下载链接：<a href=''>http://res.com</a>，下载密码：psd"


#        'report::link':
#            label: '资源链接'
#            type: 'text'
#
#        'report::psd':
#            label: '资源密码'
#            type: 'text'

#        feedbackStr:
#            label: '反馈统计'
#            xtype: _collection
#            attrs:
#                entity: 'participant'
#                criteriaOpt:->

#    email:
#        type: "email"
#        valid:
#            email: true
#    phone:
#        type: "tel"
#        valid:
#            number: true
#
#    _:
##        pf: 'info,feedback,report'
#
#        item: ["username", "email", 'phone', "info::english", 'info::social', 'info::intention']

#        handleData: (d)->
#            if location.hash.indexOf('feedbackForm') > -1
#                d.fb = util.del app.atHash(3), d.feedback
#            util.pStr d, 'report'
#            d
#
#        tbItem:
#            img:
#                prop: 'portarit'
#            username: {}
#            phone: {}
#            lastUpdated:
#                type: 'date'
#            _btn: ['popEdit','del']

#        tbItem:
#            category: {}
#            title:
#                type: "view"
#            expectedDate: {}
#            'user:username__phone':
#                label: '申请人'
#                val: (d)->
#                    d.user.username
#            phone:
#                w: 90
#                val: (d)->
#                    d.user.phone
#            tutor: {}

