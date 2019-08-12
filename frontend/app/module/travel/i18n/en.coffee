b = require '../../../lib/i18n/en'
m = require './server_en'
$.extend window,
    _i: $.extend b, m
    _lang: 'en'