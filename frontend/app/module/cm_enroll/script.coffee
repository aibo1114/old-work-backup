cWidth = document.body.clientWidth

setCenter = (tag) ->
    w = tag.width()
    h = tag.height()
    left = (cWidth - w) / 2
    tag.css(left: left + 'px').show()

sw = 0.50 * cWidth
$('.tbs').css 'top', cWidth * 0.028
if sw > 600
    $('.table-reward').width sw
    $('.intro-table').width sw
    $('.tbs').width sw
    $('.box-nb').width sw
else
    $('.table-reward').show()
    $('.intro-table').show()
    $('.tbs').show()
    $('.box-nb').show()

$('.table-reward').show()
setCenter $('.table-reward')
setCenter $('.intro-table')
setCenter $('.tbs')
setCenter $('.box-nb')

btn = $('.btn-active')
imgwd = cWidth
imghd = cWidth * 400 / 1406
btnleft = imgwd * 575 / 1854
btntop = imghd * 275 / 528
btn.css
    left: btnleft + 'px'
    top: btntop + 'px'
    height: imgwd / 30 + 'px'
    width: imgwd / 8 + 'px'
    'line-height': imgwd / 30 + 'px'
.show()

$.getJSON('http://i.wan.liebao.cn/user/i?callback=?', {}).done (res) ->
    if res.code == 1
        $.ajax
            type: 'get'
            url: 'http://pay1.wan.liebao.cn/index.php/pay/activity_btn'
            dataType: 'jsonp'
            jsonp: 'callback'
            success: (res)->
                btn.text res.btn_name
                if res.method is 'jump'
                    btn.attr 'href', res.btn_href
                else if res.method is 'jsonp'
                    btn.click ->
                        $.ajax
                            type: 'get'
                            url: res.btn_href
                            dataType: 'jsonp'
                            jsonp: 'callback'
                            success: (res)->
                                console.log res

    else if res.code == 2
        btn.click = ->
            Login.show()
        setTimeout ->
                Login.show()
            , 500

$.ajax
    type: 'get'
    url: 'http://pay1.wan.liebao.cn/index.php/pay/activity_list'
    dataType: 'jsonp'
    jsonp: 'callback'
    success: (res)->
        tb = $('.tbs tbody')
        for it,i in res
            tb.append "<tr><td>#{(i+1)}</td><td>#{it.un}</td><td>#{it.mo}</td></tr>"
            index = i
        index++
        if index < 10
            for it in [1..(10 - index)]
               tb.append "<tr><td></td><td></td><td></td></tr>"

