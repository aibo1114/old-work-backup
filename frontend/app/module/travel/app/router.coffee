router = require("../../../lib/router")

require('../../../lib/meta/extend/captcha')()

require '../../../lib/model/entity'
require '../../../lib/model/entities'
require '../../../lib/view/_tag'
require '../../../lib/view/tag'
require '../../../lib/view/model'
require '../../../lib/view/form/form'
require '../../../lib/view/form/tabForm'

require '../../../lib/view/collection/app'
require '../../../lib/view/collection/table'
require '../../../lib/view/collection/jsonTable'

require './meta/common'
require './meta/enquire'
require './meta/rating'
require './meta/deal'

$.extend window,
    dInputEvent: (e)->
        t = util.ct(e)
        ip = @$("input[name='#{t.parent().parent().data('name')}']")
        if ip.val()
            date = util.parseLocalDate(ip.val())
        else
            date = new Date()
        date.setSeconds(0)
        n = +t.val()
        name = t.data('name')
        if name is 'month'
            n--
        date["set#{name.capitalize()}"](n)
        ip.val date.pattern()
        ip.trigger 'change'

    dateCvt: (v)->
        util.parseLocalDate(v).toString().substr(4, 17)

cf.paypalNow = (d) ->
    util.BForm(
        action: 'https://www.paypal.com/cgi-bin/webscr'
        target: '_blank'
        data:
            cmd: "_xclick",
            business: "charliwang@wikibeijing.com",
            item_name: d.itemName || d.num,
            item_number: d.num,
            amount: d.total,
            currency_code: "USD",
            notify_url: "http://#{cf.community.url}/a/paypal/notify",
            no_note: 1
    ).submit().remove()

cf.orderNum = ->
    "w#{new Date().pattern('yyyyMMddHHmm')}"

$('.ySuggestion').click (e)->
    e.stopPropagation()
    e.preventDefault()
    app.dm.add 'air', 'suggestion',
        cols: 'col-md-3:col-md-9'
        title: "Thank you for the valuable advice, Wiki beijing really appreciates your help."
        className: 'break'

new router
    dm: cf.dm
    index: ->
        $('#indexSlide').show()

    