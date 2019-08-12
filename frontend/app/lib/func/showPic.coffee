imgReady = require '../../res/js/imgReady'

mw = 1200

modal = require '../tmpl/modal.jade'

_pm =$('<div class="modal fade"></div>').append modal
    _content: '<img/>'
    head: true

_pm.find('.modal-header').css
    position: 'absolute'
    'z-index': 100
    width: '100%'
    border: 0

_pm.find('.modal-body').css
    padding: 0

_mpm = _pm.clone()
dialog = _pm.find('.modal-dialog')
img = _pm.find('img')

dialog.append "<div data-index='0' class='pointer right carousel-control'><i class='glyphicon glyphicon-chevron-right'></i></div>"
dialog.append "<div data-index='0' class='pointer left carousel-control'><i class='glyphicon glyphicon-chevron-left'></i></div>"

changePic = (index)->
    url = util.resPath cf.community, cf._popPicList[index]
    dialog.data 'index', index
    imgReady url, ->
        @width = mw if @width > mw
        dialog.width @width
        img.fadeOut 'fast', ->
            img.attr('src', url).fadeIn()

_pm.on 'click', '.carousel-control .glyphicon', (e)->
    t = util.ct(e)
    index = dialog.data 'index'
    len = cf._popPicList.length
    if t.hasClass 'glyphicon-chevron-right'
        changePic ++index % len
    else
        index = len if index is 0
        changePic --index


$('body').on 'click','.showModal',(e)->
    t = util.ct(e)
    url = t.attr('href')
    _mpm.find('.modal-body').addClass('embed-responsive embed-responsive-16by9').height(400)
    _mpm.find('img').replaceWith "<embed src='#{url}' allowFullScreen='true' quality='high' width='100%' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>"
    _mpm.modal('show')
    e.stopPropagation()
    e.preventDefault()

module.exports = (e)->
    t = $(e)
    url = t.data('url') || t.attr('src')
    if window.wx and cf.__wsr
        list =  ($(it).attr('src') for it in t.closest('.xFile').find('img'))
        wx.previewImage
            current: url
            urls: list
    else
        log 'sho..'
        list = t.data('list')
        imgReady url, ->
            img.attr 'src', url
            img.css 'width', '100%'
            ww = util.screenWith()
            if @width >= ww
                @width = ww
            else if mw < @width < ww
                @width = mw
            dialog.width @width
            _pm.modal('show')

            if list and (list = list.split(',')) and list.length > 1
                cf._popPicList = list
                dialog.find('.carousel-control').show()
                dialog.data 'index', 0
            else
                dialog.find('.carousel-control').hide()
                cf._popPicList = null
