
$.fn.ctrlCmd = (key) ->
    allowDefault = true
    if !$.isArray(key)
        key = [ key ]
    @keydown (e) ->
        i = 0
        l = key.length
        while i < l
            if e.keyCode == key[i].toUpperCase().charCodeAt(0) and e.metaKey
                allowDefault = false
            i++
        allowDefault

$.fn.disableSelection = ->
    @ctrlCmd [
        'a'
        'c'
    ]
    @attr('unselectable', 'on').css(
        '-moz-user-select': '-moz-none'
        '-moz-user-select': 'none'
        '-o-user-select': 'none'
        '-khtml-user-select': 'none'
        '-webkit-user-select': 'none'
        '-ms-user-select': 'none'
        'user-select': 'none').bind 'selectstart', false




isTagName = (e, whitelists) ->
    e = $.event.fix(e)
    target = e.target or e.srcElement
    if whitelists and $.inArray(target.tagName.toString().toUpperCase(), whitelists) == -1
        return false
    true

module.exports = ->
    $(':not(input,select,textarea)').disableSelection().on 'mousedown', (e) ->
        if !isTagName(e, [
            'INPUT'
            'TEXTAREA'
        ])
            e.preventDefault()
            return false
        true
    $(document).bind 'contextmenu', (e) ->
        if !isTagName(e, [
            'INPUT'
            'TEXTAREA'
        ])
            e.preventDefault()
            return false
        true