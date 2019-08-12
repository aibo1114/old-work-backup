ps = require './pSlider'
_old = null
module.exports = ()->

    if !location.hash and app.sta.is(':visible')
        ctn = app.sta
    else
        ctn = app.ctn

    if _old isnt ctn.attr('id')
        cf.slider = new ps(ctn)
        _old = ctn.attr('id')

    p = ctn.children() # p.length is 1 and
    if !p.attr('slide')
        opt =
            id: util.randomChar(4)
            slide: 'slide'
            hash: location.hash
        if app.prev() and @slideUrl
            opt.hash = '#'+app.prev().frag
        ctn.mk 'div', opt, p

    @parent = $.mk 'div',
        hash: location.hash
        id: util.randomChar(4)
        slide:'slide'
        
    if @backBtn
        @backBtn = "onclick='cf.slider.slidePage()'"

    util.sTop ctn

    cf.view.tag::render.call @

    _.delay =>
        cf.slider.slidePage @parent
    , 200
