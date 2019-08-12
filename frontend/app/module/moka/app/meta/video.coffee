m.video =
    prop: [
        _ep 'title',
            valid:
                require: true
        _ep 'cat',
        _ep 'vCode',
            ph: '请输入分享的通用代码格式（iframe）视频'
            label: '视频代码'
            valid:
                require: true
                pattern: /(^<iframe).+(>)(<\/iframe>$)/

        _ep 'description'
    ]