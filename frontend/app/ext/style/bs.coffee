module.exports =
    mode: 'panel'
    inputBox: 'form-group'
    labelCls: 'control-label'
    inputCls: 'form-control'
    iconStr: 'glyphicon'
    active: 'active'

    tb: (cd = 0, sp = 1, bd = 1, hv, etc)->
        b = 'table'
        s = ''
        cd and s += " #{b}-condensed"
        sp and s += " #{b}-striped"
        bd and s += " #{b}-bordered"
        hv and s += " #{b}-hover"
        etc and s += " #{etc}"
        b + s

    panel: (type = 'default')->
        "panel panel-#{type}"

    btn: (style = 'default', size, block, etc)->
        b = 'btn'
        s = ''
        s += " #{b}-#{style}"
        s += " #{b}-#{size}" if size
        s += " #{b}-block" if block
        s += " #{etc}" if etc
        b + s

    btn_bp: (size = 'lg', block = true)->
        @btn 'primary', size, block

    icon: (key)->
        "#{@iconStr} #{@iconStr}-#{key}"

    sign:
        success: 'ok'
        warning: 'warning-sign'
        info: 'info-sign'
        danger: 'exclamation-sign'

