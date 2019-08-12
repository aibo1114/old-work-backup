require './style/main.css'

router = require('../../console/app/lib/consoleRouter')
u = require('../../console/app/lib/consoleUser')

Backbone.Model.setPost()
cf.id = 'id' #表的id要和后台配合
Backbone.Model::idAttribute = cf.id

$.extend cf,
    loadTmpl: (name) ->
        try
            require "./tmpl/#{name}.jade"
        catch
            require "../../console/tmpl/#{name}.jade"
    loadLibTmpl: (name) ->
        require "../../../lib/tmpl/#{name}.jade"

cf.actPre = cf.rsPre = 'http://api.wan.liebao.cn/coupons/1/bms/'#调用的URL地址

cf.community =
    name: '优惠券'
    resPath: '/'

require '../../../lib/meta/_status'
require '../../../lib/terminal/h5_mgm'
require "./meta/meta"

cf.view.form::btns=['back','save']#table下面的按钮
cf.view.table::noLastTime = true#是否有最后更新时间

window.user = new u {},
    logoutUrl: util.restUrl('logout')
    permission: ['console']
    roles: [
        title: 'admin'
    ]
    check: ->
        true

    func: ->
        res = @funcItem()
        res.shift()
        res
    menu: [
        icon: 'hdd'
        key: 'data'
    ]

    entities:[
        key: 'coupon_activity'
        row: 10
    ,
        key: 'passportcoupon'
        row: 20
    ]
    isLogin:->
        true


new router
#    checkSvrAuth: util.restUrl('me')
    checkAuth: false

    dfPath: 'data'
    logoutPath: 'login'
    
    loadMod:->
        require '../../console/app/mods/data'
        cf.exLabel()
        
    checkFail: ->
        cf.r 'login'


user.renderLoginMenu()

unless location.hash
    cf.r 'data'

util.lcss(cf.modPath + 'main.css')
