b = require '../../../lib/i18n/zh'
c = require '../../console/i18n/zh'
m = require './server_zh'
$.extend window,
    _i: $.extend b, c, m
    _lang: 'zh'
