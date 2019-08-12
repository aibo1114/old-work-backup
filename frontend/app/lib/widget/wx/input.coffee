propObj = require '../../func/propObj'

ip = cf.view.tag.extend
    tmpl: require './btn.jade'
    style: _st.btn('primary', null, null)
    auto: true
    context: ->
        attrs:
            class: @style
        icon: @icon
        title: @title
        res: @res || 'img'

$.extend ip::, propObj

module.exports = ip