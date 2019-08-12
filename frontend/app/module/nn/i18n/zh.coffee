b = require '../../../lib/i18n/zh'
c = require './server_zh'
$.extend window,
    _i: $.extend b, c,
        vote: '投票'
        count: '投票数'
        giftCode: '礼品码'
    _lang: 'zh'
