window._shareWt = (path)->
    path = ''
    pic = $("<div class='shareCv'><img src='#{path}'></div>")
    pic.css
        position: 'fixed'
        'z-index': 10000
        top: 0
        left: 0
        width: '100%'
        height: '100%'
        background: 'rgba(0, 0, 0, 0.4)'
        'text-align': 'center'
    pic.children('img').css
        width: '85%'
        margin: '10px auto'
    pic.click ->
        pic.remove()
    $('body').append pic