m.product =
    prop: [
        m._link 'title'

        _ep 'row'

        m._select 'brand',
            attrs:
                entity: 'brand'
                keyVal: '_id,title'

        _ep 'pubTime',
            noVal: true
            attrs:
                noVal: true

        m._number 'price'

        m._select 'outline',
            attrs:
                data: [
                    '耳背式'
                    '迷你耳背式'
                    '外置受话器式'
                    '耳内式'
                    '开放式耳背机'
                    '耳道式'
                    '深耳道式'
                    '隐形式'
                    '标准式'
                ]
        m._checkbox 'performance',
            attrs:
                data: [
                    '智能降噪'
                    '方向性功能'
                    '言语提升技术'
                    '反馈消除技术'
                    '环境自适应功能'
                    '多信号处理模式'
                    '自主学习功能'
                    '自动电话功能'
                    '双耳电话功能'
                    '双耳程序音量同步'
                    '双耳自适应功能'
                    '风噪声管理功能'
                    '突发噪声控制'
                    '纳米技术'
                    '防水技术'
                    '可匹配遥控器'
                    '耳鸣治疗功能'
                    '移频技术'
                ]


        m._number 'channel'
        m._number 'frequency'
        m._select 'warranty',
            attrs:
                data: [
                    '一年'
                    '二年'
                    '三年'
                    '四年'
                    '五年'
                ]

        m._number 'level'

        m._radio 'seckilling',
            label: '是否秒杀'
            attrs:
                inline: true
                data:
                    0: '否'
                    1: '是'


        _ep 'description'

        m._itemTable 'comment'

        m.content.prop.codeBy 'status'

        m._pic 'slide'
    ]
    filter:
        title: 'text:s:mt'
    listOpt:
        btns: ['exExcel', 'topAdd']
#    seckilling:
#        type: 'radio'


#    brand:
#        type: 'select'

#
#    outline:
#        type: 'select'
#        data: [
#            '耳背式'
#            '迷你耳背式'
#            '外置受话器式'
#            '耳内式'
#            '开放式耳背机'
#            '耳道式'
#            '深耳道式'
#            '隐形式'
#            '标准式'
#        ]
#    performance:
#        type: 'checkbox'
#        inline: true

#    frequency: {}
#    channel: {}
#    warranty:
#        type: 'select'
#        inline: true
#        data: [
#            '一年'
#            '二年'
#            '三年'
#            '四年'
#            '五年'
#        ]
#    price:
#        type: 'number'



