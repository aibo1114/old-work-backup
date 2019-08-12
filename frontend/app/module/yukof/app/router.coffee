router = require("../../../lib/userRouter")
webUser = require('../../../lib/model/webUser')

require '../../../lib/widget/slide/app'

window.user = new webUser {},
    check: ->
        true

#require('../../../lib/meta/extend/captcha')('captcha', 'http://t.yukof.com:3000/a/captcha')
new router
    _exr:[
        require '../../../lib/func/webLogin'
    ]
    checkAuth: true