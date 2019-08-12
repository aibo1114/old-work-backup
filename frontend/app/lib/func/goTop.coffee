op =
    id: "go-top"
    title: "返回顶部"
cf.bbEvt.on 'scroll', ->
    if window.scrollY > 200
        if !cf.noGoTop and !$('#go-top').length
            $('body').mk 'span', op, null, null, null, ->
                util.sTop(null, 55, 500)
                $(@).remove()
    else
        $('#go-top').remove()