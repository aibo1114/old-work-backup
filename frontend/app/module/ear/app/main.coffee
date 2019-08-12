require './style/main.css'

$.extend cf,
    loadTmpl: (name) ->
        require "./tmpl/#{name}.jade"
    loadLibTmpl: (name) ->
        require "../../../lib/tmpl/#{name}.jade"
    _init: ->
        require './meta/common'
        require '../../../lib/meta/content'

        require '../../../lib/func/ipBtn'
        require '../../../lib/func/entityAction'
        require '../../../lib/view/collection/app'
        require '../../../lib/view/collection/table'
        require '../../../lib/view/collection/jsonTable'
        require '../../../lib/widget/refFileCollection'
        require '../../../lib/widget/editor/dTime'
        require '../../../lib/widget/editor/selectBox/multiSelect'

        cf.noCopy = require '../../../lib/func/noCopy'

        m.user.regProp = [
            _ep 'username'
            _ep 'phone'
            _ep 'vcode'
            _ep 'password'
            _ep 'rpsd'
            _ep 'roleCode',
                ph: '非验配师可以不填写'
        ]

    _uOpt:
        menu: [
            "label": "我的咨询"
            "icon": "th-list"
            "href": "#!/my/qa"
            "row": 1
        ,
            "label": "我的预约"
            "icon": "calendar"
            "href": "#!/my/order"
            "row": 1
        ]

        extraData: ->
            opt =
                q:
                    'owner._id': user.id
            $.get util.restUrl('shop'), opt, (res) =>
                sh = res.entities[0]
                @shopId = sh._id if sh

    _rOpt:
        dfPath: util.navUrl('home')

require("../../../lib/webRouter")()

require './search'
require '../../../lib/widget/slide/app'