

m.deal =
    prop: [
            m._select 'title',
                attrs:
                    data: ['Mr.', 'Mrs.', 'Miss']
        ,
            code: 'tourCost'
            valid:
                required: true
        ,
            code: 'arrivalFlightNumber'
            valid: {}
        ,
            code: 'departureFlightNumber'
            valid: {}
        ,
            code: 'scheduledLandingTime'
            type: 'date'
            valid: {}
        ,
            code: 'scheduledTakeoffTime'
            type: 'date'
            valid: {}
        ,
            _ep 'firstName'

            _ep 'lastName'

        ,
            _ep '_confirm'
        ,
            code: 'tourDate'
            type: 'date'
            valid:
                required: true

        ,
            code: 'hotelName'
            valid:
                required: true

    ]
    _:{}

require '../../../../lib/meta/_status'

cf.st.add 'deal',
    unpaid:
        v: 10
    paid:
        v: 20
    fullPaid:
        v: 30
    refund:
        v: -10
    error:
        v: -1