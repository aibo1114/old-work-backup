require './meta/common'
require './meta/brand'
require './meta/product'
require './meta/shop'
require './meta/consultant'
require './meta/school'

_ot =
    '>10': '10年以上'
    '5-10': '5-10年'
    '1-5': '1-5年'

_otQuery = (key)->
    (v)->
        opt = {}
        d = new Date()
        year = d.getFullYear()
        if v.indexOf('-') > -1
            [s,b] = v.split('-')
            opt =
                $gt: d.setFullYear(year - b) && d.pattern()
                $lt: d.setFullYear(year - s) && d.pattern()
        else if v.indexOf('>') > -1
            opt.$lt = d.setFullYear(year - v.substr(1)) && d.pattern()

        res = {}
        res[key] = opt
        res

sOpt =
    cols: 'col-xs-2:col-xs-10'
    toFetch: false
    style: 'panel-default'
    toolbar: true
    callback:->
        @$('.toolbar').html tu.btn '重置', 'reset', 'default'
    btns: [
        label: '搜索'
        cls: 'btn btn-primary btn-lg save btn-block'
    ]
    noData: ->
        "<h3>没有搜索结果</h3>"
    _save: (t)->
        q =
            status: 2
        for k,v of @model.attributes
            if v
                if (pp = @prop.codeBy(k)) and pp.queryOpt
                    opt = pp.queryOpt(v)
                else
                    opt = {}
                    opt[k] = v

                $.extend q, opt
        $('#searchPanel').removeClass('in')
        util.saveLocal "_search", q
        cf.r "search/#{@entity}/#{util.randomChar(4)}"
        if cf.mob
            @closeDlg()
        else
            $('#searchPanel').hide()

cf.sShop = ->
    p = if cf.mob then 'air' else '#sShop'
    app.dm.form p, 'shop',
        $.extend {}, sOpt,
            title: '查找助听器中心'
            prop:[
                _ep 'shop:area'

                m._radio 'operTime',
                    attrs:
                        data: _ot
                    queryOpt: _otQuery 'operTime'

                m._radio 'space',
                    attrs:
                        data:
                            '>200': '200㎡以上'
                            '100-200': '100-200㎡'
                            '60-100': '60-100㎡'
                            '<60': '60㎡以下'
                    queryOpt: (v)->
                        space = {}
                        if v.indexOf('-') > -1
                            [space.$gt__i,space.$lt__i] = v.split('-')
                        else if v.indexOf('<') > -1
                            space.$lt__i = v.substr(1)
                        else if v.indexOf('>') > -1
                            space.$gt__i = v.substr(1)
                        space: space
                m._checkbox 'cust',
                    label: ' '
                    attrs:
                        data:
                            park: '可停车'
                            dropIn: '可上门服务'
                    queryOpt: (v)->
                        if v is 'part'
                            part: '是'
                        else
                            dropIn: '是'

                m._radio 'brand',
                    attrs:
                        entity: 'brand'
                        keyVal: '_id,title'
                        data:null
                    queryOpt: (v)->
                        if v
                            brand:
                                $elemMatch:
                                    _id: v
                        else
                            null
            ]

cf.sConsultant = ->
    p = if cf.mob then 'air' else'#sConsultant'
    app.dm.form p, 'consultant',
        $.extend {}, sOpt,
            title: '查找专业验配师'
            prop:[
                _ep 'area',
                    attrs:
                        prop: 'shop.postcode'

                m._radio 'exp',
                    attrs:
                        data: _ot
                    queryOpt: _otQuery 'exp'

                _ep 'consultant:workTitle',
                    type: 'checkbox'
                    attrs:
                        inline: true
                    queryOpt: (v)->
                        workTitle:
                            $in: v.split(',')

                _ep 'consultant:strength',
                    type: 'radio'
                    attrs:
                        inline: true
                    queryOpt: (v)->
                        strength:
                            $regex: ".*#{v}.*"

                _ep 'consultant:major',
                    type: 'radio'
                    attrs:
                        inline: true
                    queryOpt: (v)->
                        major:
                            $in: v.split(',')
            ]

cf.sProduct = ->
    p = if cf.mob then 'air' else '#sProduct'
    app.dm.form p, 'product',
        $.extend {}, sOpt,
            title: '查找助听器品牌'
            prop:[
                _ep 'brand:origin',
                    type: 'checkbox'
                    attrs:
                        inline: true
                    queryOpt: (v)->
                        'brand.origin':
                            $in: v.split(',')

                _ep 'product:outline',
                    type: 'checkbox'
                    attrs:
                        inline: true
                    queryOpt: (v)->
                        outline:
                            $in: v.split(',')

                _ep 'product:pubTime'

                _ep 'product:channel'

                _ep 'product:frequency'

                _ep 'product:performance',
                    checkAll: true
                    queryOpt: (v)->
                        performance:
                            $regex: ".*#{v}.*"

                _ep 'product:warranty',
                    type: 'checkbox'
                    attrs:
                        inline: true
                    queryOpt: (v)->
                        warranty:
                            $in: v.split(',')

            ,
                m._radio 'price',
                    attrs:
                        data:
                            '>40000': '4万以上'
                            '30000-40000': '3-4万'
                            '20000-30000': '2-3万'
                            '10000-20000': '1-2万'
                            '5000-10000': '5千-1万'
                            '<5000': '5千以下'
                    queryOpt: (v)->
                        price = {}
                        if v.indexOf('-') > -1
                            [price.$gt__i,price.$lt__i] = v.split('-')
                        else if v.indexOf('<') > -1
                            price.$lt__i = v.substr(1)
                        else if v.indexOf('>') > -1
                            price.$gt__i = v.substr(1)
                        price: price
            ]

cf.sSchool = ->
    p = if cf.mob then 'air' else '#sSchool'
    app.dm.form p, 'school',
        $.extend {}, sOpt,
            title: '查找语训康复学校'
            prop:[
                _ep 'area',
                    attrs:
                        prop: 'shop.postcode'

                code: 'title'
                type: 'text'
            ]


if cf.mob
    sOpt.fullScreen = true
else
    cf.sConsultant()
    cf.sProduct()
    cf.sShop()
    cf.sSchool()

app.enhance
    routes:
        '!/search/:ent/:p': 'search'

    search: (ent, p)->
        title = 'title'
        func = 'head'
        pp = switch ent
            when 'shop'
                func = 'slide'
                'address'
            when 'consultant'
                title = 'username'
                'description'
            when 'product'
                func = 'slide'
                'description'
            when 'school'
                'description'

        sk = util.readLocal "_search"
        if sk
            q = JSON.parse sk
        else
            cf.r ''
            return

        @dm.collection @ctn, ent,
            className: 'col-md-12 m3 searchPanel'
            _attrs: ->
                "refFile,#{pp},#{title},brand,outline"
            style: 'panel-info'
            btns: null
            title: ->
                ii(ent) + '搜索结果, 您找到了 <span class="resCount text-danger">0</span> 个结果'
            modelOpt:
                tagName: 'a'
            noFilter:true
            itemContext: (d)->
                $.extend d,
                    title: d[title]
                    attrs:
                        href: "/#{ent}/#{d._id}"
                    brief: tu.adt(d[pp],50)
                    func: func
                if ent is 'product' and d.brand.title
                    d.subTitle = "<br/>#{d.brand.title} #{d.outline}"
                d
            criteriaOpt: ->
                q: q
            callback: ->
                unless cf.mob
                    @$('.toolbar').append "<a class='btn btn-default' onclick='history.go(-1)'>返回</a>"
            afterAjax: ->
                $('.resCount').text @collection.count
