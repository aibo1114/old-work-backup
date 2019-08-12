require './style/mob.css'
require '../../../lib/mob'
cf.loadTmpl = (name) ->
    require "./#{name}.jade"
cf.loadLibTmpl = (name) ->
    require "../../../lib/tmpl/#{name}.jade"
############################################################

router = require("../../../lib/userRouter")
wechatUser = require('../../../lib/model/wechatUser')
require '../../../lib/func/entityAction'
require '../../../lib/widget/slide/app'

W.ctn = $('#content')
window.user = new wechatUser {},
    check: ->
        true

topline = $('.topline .navbar-collapse')
topline.addClass 'in'
topline.addClass 'subnav'
$('#bs-navbar').append topline

new router
#    mods: ['home','userInfo', 'data', 'enroll', 'act', 'thread', 'post', 'ds', 'club', 'volunteer', 'report', 'extra']

    _exr: [
        require '../../../lib/func/mobLogin'
    ]
    dfPath: 'userInfo'

    checkAuth: true
    wtAutoLogin: true
