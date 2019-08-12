cfc = cf._carService = {}

$('.travels').on 'change', '.tt', (e)->
    t = util.ct(e)
    id = t.closest('.travels').attr('id')
    cl = (cfc[id] ?= [])
    if t.is(':checked') # 选中
        it =
            id: t.attr('id')
            price: t.data 'price'
            from: t.data 'from'
            to: t.data 'to'
            type: t.data 'type'

        title = switch it.type
            when 'pickup'
                "Airport Pickup<br/><small>$#{it.price} #{it.from} to #{it.to}</small>"
            when 'transfer'
                "Airport Transfer<br/><small>$#{it.price} #{it.from} to #{it.to}</small>"
            when 'greatWall'
                "Great Wall Transfer<br/><small>$#{it.price} #{it.from} to/from #{it.to}</small>"

        it.title = title
        cl.push it
    else
        cl.delBy(t.data('id'))

$.extend meta.deal._,
    pickupTime:
        showCvt: dateCvt
    departureTime:
        showCvt: dateCvt
    landingTime:
        showCvt: dateCvt

app.enhance
    routes:
        '!/bookCar/:id': 'bookCar'
    bookCar: (id)->
        obj = window["p_#{id}"]
        cars = cf._carService["#{id}"]
        if !cars or cars.length is 0
            popMsg 'Please choose service option firstly', 'warning'
            app.navigate '', trigger: true
            return

        steps = [
            'Select Services'
            'Pay Deposit'
            'Booking Confirmation'
        ]
        total = 0
        for it in cars
            total += it.price

        num = cf.orderNum()

        new cf.view.tabForm
            parent: @ctn.empty()
            saveByStep: false
            className: 'pay'
            entity: 'deal'
            toFetch: false
            tmpl: 'pay'
            syncBox: '.review'
            exEvents:
                'change .dInput>select': dInputEvent

            _saveSuccess: (model)->
                model.view.renderNextTab()

            before: (attr)->
                trip = attr.trip
                for k,v of attr
                    if k.indexOf(':') > -1
                        [kk,id] = k.split(':')
                        trip.find(id)[kk] = v
                        util.del k, attr
                attr

            context: ->
                steps: steps
                title: 'Build Your Private Car Service In Beijing'

            data:
                num: num
                cat: 'car'
                status: cf.st.init('deal')
                total: total
                trip: cars
                car:
                    title: obj.title
                    _id: id
                    
            items: [
                tmpl: 'carService'
                context: ->
                    steps: steps
                    title: obj.title
                    num: 1
                    cars: cars
                    total: total
            ,
                tmpl: 'deposit'
                context: ->
                    steps: steps
                    num: 2
                    title: obj.title
                callback:->
                    @$('.payNow').click =>
                        cf.paypalNow @model.attributes
            ,
                tmpl: 'confirmation'
                context: ->
                    steps: steps
                    title: obj.title
                    num: 3
            ]