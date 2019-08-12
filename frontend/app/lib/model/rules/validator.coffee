module.exports =
    required: (v, p)->
        p && (_.isUndefined(v) || v is null || v.length is 0)

    min: (v, p)->
        +v < +p

    max: (v, p)->
        +v >= +p

    minlength: (v, p)->
        v and v.length < parseInt(p)

    maxlength: (v, p)->
        v and v.length > parseInt(p)

    number: (v)->
        v and !/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(v)

    date: (v, p)->

    dateTime: (v, p)->

    homePhone:(v,p)->
        !/^0\d{2,3}-?\d{7,8}$/.test v

    telephone: (v, p)->
        !/^1\d{10}$/.test v

#    phone: (v,p)->
#        !/^(1\d{10}|\d{10,12})$/.test v

    time: (v, p)->

    digits: (v, p)->

    alphabet: (v, p)->
        !/^[A-Za-z]+$/.test v

    char: (v, p)->
        !/^[A-Za-z0-9_-]+$/.test v

    equalTo: (v, p)->
        v isnt $(p).val()

    inEqualTo: (v, p)->
        v is $(p).val()

    email: (v, p)->
        !/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/i.test(v)

    pattern: (v, p)->
        !p.test(v)

    url: (v, p)->
        v and !/[a-zA-z]+:\/\/[^\s]*$/i.test(v)

    range: (v, p)->

    laterThan: (v, p)->
        util.parseLocalDate(v) < util.parseLocalDate($(p).children('input').val())

    earlyThan: (v, p)->
        util.parseLocalDate(v) > util.parseLocalDate($(p).children('input').text())
