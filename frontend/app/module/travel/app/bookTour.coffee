
$('.tbHead input').click ->
    $(@).closest('table').find('.total').text $(@).data('price') * $(@).data('count')
    for it in $('.hoverLink')
        util.addHover $(it)

ct = $('.ratingView')

initRating = (ctn)->
    avg = 0
    lt = $('.starVal', ctn)
    if lt.length
        for it in lt
            v = +$(it).text()
            avg += v
            $(it).html util.starRating 5, v * 0.5
    $('.avg', ctn).html util.starRating 5, avg * 0.5 / lt.length

initRating(ct)

cf.rate = (t)->
    id = $(t).attr('tid')
    app.dm.form 'air', 'rating',
        title: 'Thank you for the valuable feedback'
        toFetch: false
        urlRoot: util.actUrl('push', 'tour', '_id', id, 'rate')
        cols: 'col-md-4:col-md-8'
        className: 'break'
        _saveSuccess: (model)->
            model.view.closeDlg()
        callback: ->
            @$('.starBox').parent().parent().children('label').addClass 'col-md-4'


cf.showRatingMore = (e)->
    id = $(e).attr('tid')
    app.dm.tag 'air',
        title: 'Recently Reviews'
        preRender: ->
            @ctn.css 'padding', '30px'
            $.get "/a/tour/_id/#{id}/rate", (res)=>
                for it in res.entities
                    nct = ct.clone()
                    for k,v of it
                        if k is 'lastUpdated'
                            v = v.dStr()
                        nct.find(".#{k}").text v
                    @ctn.append nct
                    initRating(nct)

m.traveler =
    prop: [
        m._radio 'title',
            attrs:
                data: ['Mr.', 'Mrs.', 'Miss']

        _ep 'firstName'

        _ep 'lastName'
    ]

pcvt = (v)->
    "#{v} Pax"

dcvt = (v)->
    if v is 'false'
        v = 0
    "#{v || 0}$"

$.extend meta.deal._,
    totalNum:
        showCvt: pcvt
    freeChild:
        showCvt: pcvt
    tourCost:
        showCvt: dcvt
    airportTransferCost:
        showCvt: dcvt
    total:
        showCvt: dcvt
    optionalServiceCost:
        showCvt: dcvt
    scheduledTakeoffTime:
        showCvt: dateCvt
    scheduledLandingTime:
        showCvt: dateCvt
    tourDate:
        showCvt: dateCvt

app.enhance
    routes:
        '!/bookTour/:id': 'bookTour'

    bookTour: (id)->
        steps = [
            'Select Services'
            'Input details'
            'Pay Deposit'
            'Booking Confirmation'
        ]
        
        obj = window["p_#{id}"]
        
        num = cf.orderNum()
        
        new cf.view.tabForm
            parent: @ctn.empty()
            saveByStep: false
            className: 'pay'
            entity: 'deal'
            toFetch: false
            tmpl: 'pay'
            syncBox: '.review'
            num: 0
            data:
                num: num
                title: 'Mr.'
                cat: 'tour'
                status: cf.st.init('deal')
                nationality: 'US'
                optionalService: {}
                tour:
                    title: obj.title
                    code: obj.code
                    _id: id
                    
            _saveSuccess: (model)->
                model.view.renderNextTab()
                
            exEvents:
                "change [name='airportTransferCost']": (e)->
                    t = util.ct(e)
                    md = m.deal.prop
                    if t.is(':checked')
                        md.codeBy('departureFlightNumber').valid.required = true
                        md.codeBy('arrivalFlightNumber').valid.required = true
                        md.codeBy('scheduledLandingTime').valid.required = true
                        md.codeBy('scheduledTakeoffTime').valid.required = true
                        @$('.adss').find('input,select').removeAttr('disabled')
                        @$("input[name='scheduledLandingTime']").removeAttr('disabled')
                        @$("input[name='scheduledTakeoffTime']").removeAttr('disabled')
                    else
                        md.codeBy('departureFlightNumber').valid.required = false
                        md.codeBy('arrivalFlightNumber').valid.required = false
                        md.codeBy('scheduledLandingTime').valid.required = false
                        md.codeBy('scheduledTakeoffTime').valid.required = false
                        @model.unset('scheduledTakeoffTime')
                        @model.unset('scheduledLandingTime')
                        @model.unset('departureFlightNumber')
                        @model.unset('arrivalFlightNumber')
                        @$('.adss').find('input,select').attr('disabled', 'disabled')
                        @$("input[name='scheduledLandingTime']").attr('disabled', 'disabled')
                        @$("input[name='scheduledTakeoffTime']").attr('disabled', 'disabled')

                'change .sti': (e)->
                    t = util.ct(e)
                    td = t.closest('td')
                    sid = td.data('sid')
                    rt = $(".#{sid}").empty()
                    total = 0
                    for it in td.find('select')
                        st = $(it)
                        v = +st.val()
                        if v > 0
                            p = st.data 'price'
                            total += v * p
                            rt.append "<div class='form-control-static'>#{p}$ x #{v}</div>"

                    td.next().find('.total').text total


                    osm = @model.get 'optionalService'

                    osm[sid] ?=
                        title: t.closest('.panel').find('.panel-heading').text()
                    osm[sid][t.data('price')] = t.val()

                    oscTotal = 0
                    for it in $('.totalBk .total')
                        sp = $(it)
                        oscTotal += +sp.text()

                    osc = @$("[name='optionalServiceCost']")
                    osc.val oscTotal
                    osc.trigger 'change'

                'change .dInput>select': dInputEvent

                "change input[name='optionalServiceCost'],input[name='tourCost'],input[name='airportTransferCost']": (e)->
                    tc = +@$("[name='tourCost']").val()
                    os = +@$("[name='optionalServiceCost']").val()
                    htfa = +@$("[name='airportTransferCost']:checked").val()

                    @setVal "input[name='total']", tc + os + (htfa || 0)

            totalNum_change: (v, e) ->
                t = v * util.ct(e).data('price')
                @$('.totalPt').text t
                @setVal "[name='tourCost']", t

            context: ->
                steps: steps
                title: 'Build Your Ideal Trip In Beijing'
                
            items: [
                tmpl: 'service'
                context: ->
                    tabTitle: steps[0]
                    prices: obj.prices
                    title: obj.title
                    code: obj.code
                    num: 1
                    shows: _shows
                callback: ->
                    util.initPC('#showList')
                    util.loadPic('#showList')
                    @$('.adss').find('input,select').attr 'disabled', 'disabled'
            ,
                tmpl: 'detail'
                context: ->
                    tabTitle: 'Input Your Information'
                    title: obj.title
                    num: 2
                callback: ->
                    cs = $('#cList')
                    for k,v of cf.cc
                        cs.append "<option value='#{k}'>#{v}</option>"
                    $('.total').text @model.get 'total'
                    new cf.view.jsonTable
                        title: 'Add Other Travelers'
                        entity: 'traveler'
                        _prop: 'otherTraveler'
                        form: @
                        parent: '.personBox'
                        data: []
                        afterRemove: ->
                            @renderSideBox()
                        afterSave: ()->
                            @renderSideBox()
                        renderSideBox: ->
                            c = $(".travelers", @form.syncBox).empty()
                            for it in @form.model.get 'otherTraveler'
                                c.append "<div class='form-control-static'>#{it.title} #{it.firstName} #{it.lastName}</div>"
            ,
                tmpl: 'deposit'
                num: 3
                context: ->
                    tabTitle: steps[2]
                    num: 3
                    title: obj.title
                    data: {}  # @model.attributes
                callback: ->
                    @$('.payNow').click =>
                        cf.paypalNow @model.attributes
#                        cmd: "_xclick",
#                        business: "charliwang@wikibeijing.com",
#                        item_name: "测试",
#                        item_number: "0001",
#                        amount: "1",
#                        currency_code: "USD",
#                        notify_url: "http://#{cf.community.url}/paypal/notify",
#                        no_note: 1
            ,
                tmpl: 'confirmation'
                num: 4
                context: ->
                    tabTitle: steps[3]
                    title: obj.title
                    num: 4
            ]
