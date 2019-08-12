
router = require('./userRouter').extend
    _exr: [
        require './func/mobLogin'
    ]
    wtAutoLogin: true
    checkAuth: true

uu = require './model/wechatUser'

require './terminal/wt'
require './mobV2'

W.ctn = $('#content')

module.exports = ->
    cf._init?()
    W.user = new uu(cf._uData, cf._uOpt)
    new router cf._rOpt


