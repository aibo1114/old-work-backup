fixList =
    focusCursor: ->
        inputObj = document.getElementsByTagName('input')
        len = inputObj.length
        while i < len
            item = inputObj[i]
            if item.type == 'text'
                item.focus()
                item.blur()
                break
            i++
        return

    flush: ->
        body = document.getElementsByTagName('body')[0]
        body.focus()
        body.blur()
        return

window.onload = ->
    v() for k,v of fixList
    return