require '../../../console/app/meta/common'
require '../../../console/app/meta/head'

require '../../../../lib/meta/content'
require '../../../../lib/meta/post'
require '../../../../lib/meta/cat'
require '../../../../lib/meta/link'


require './common'
require './entity'
require './sight'
require './show'
require './car'
require './enquire'
require './tour'

require './deal'

cf.opt =
    entity:
        categories: ['post', 'brand', 'commodity']
        headRefEntity: ['sight', 'show', 'food', 'handicraft', 'culture', 'post', 'content']
        headRefChannel: ['top', 'index']
    image:
        index:
            maxWidth: 500
            text: '宽高比1:2或者1:1，宽度最小210px'
        top:
            thumb: '_thumb:180'
            text: '宽高比5:2，宽度最小1200px'
        list:
            maxWidth: 250
            text: '宽高比1:2，宽度最小210px'
        slide:
            text: '宽高比8:3，宽度最小800px'
            maxWidth: 890

_ob = ['popView', 'processOrderStatus', 'del']

cf.view.view::btns = ['close']
cf.view.view::_showAll = true

cf._stat =
    suggestion:
        itemBtns: _ob
        colNum: 8

    enquire:
        itemBtns: _ob
        colNum: 8

    deal:
        itemBtns: _ob
        colNum: 8



#    app.dm.tb '#main .row', 'suggestion',
#        style: 'panel-info'
#        className: 'col-md-12'
#        cleanAll: false
#        formEditOpt:
#            toFetch: true
#            className: 'break'
#
#    app.dm.tb '#main .row', 'enquire',
#        style: 'panel-info'
#        className: 'col-md-12'
#        cleanAll: false
#        formEditOpt:
#            toFetch: true
#            className: 'break'
#
#    app.dm.tb '#main .row', 'deal',
#        style: 'panel-info'
#        className: 'col-md-12'
#        cleanAll: false
#        formEditOpt:
#            toFetch: true
#            className: 'break'
