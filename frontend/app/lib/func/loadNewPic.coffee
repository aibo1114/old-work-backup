$.extend util,
    loadPic: (ctn)->
        if ctn
            for it in $('img[bb-src]', ctn)
                t = $(it)
                href = t.attr('bb-src')
                t.removeAttr('bb-src')
                cf._dImg["#{href}::#{t.attr('id')}"] = t

        for k,v of cf._dImg
#            return if cf.index is 'console'
            if util.isInView(v)
                [href,id] = k.split('::')
                util.loadImg(v, href, v.attr('def'))

    loadImg: (t, href, isDef = true, callback)->
        img = new Image()
        cls = t.attr('class').replace('_imgBox', '_img')
        key = "#{href}::#{t.attr('id')}"
        $(img).load(->
#            $(this).hide()
#            $(this).fadeIn()
#            if opt.slide is 'true' and $(this).height() > box.height() * 1.3 or $(this).width() > box.width() * 1.3
#                opt.onmouseover = 'app.showWhole(this)'
#                $(this).css
#                    left: '0'
#                    top: '0'
#                    position: 'absolute'
#            $(this).attr 'pop', opt.pop if opt.pop
#            t.removeAttr('bb-src').addClass('img-responsive').attr "src", href
#            t.parent().append $(@)
            $(@).addClass cls
            sq = t.hasClass 'square'
            if t.attr('onclick')
                $(@).attr 'onclick', t.attr('onclick')
            if t.attr 'style'
                $(@).attr 'style', t.attr('style')

            util.del key, cf._dImg
            t.replaceWith $(@)
            if sq
                $(@).css
                    height: $(@).width()
            callback() if callback
        ).on('error', ->
#            $(@).attr('src',util.resPath(cf.community, 'images/df.jpg')).addClass(t.attr('class').replace('_imgBox','_img'))
#            t.replaceWith $(@)
            if isDef
#                $(@).attr('src',).addClass(cls)
                t.replaceWith "<img class='#{cls}' src='#{util.resPath(cf.community, 'images/df.jpg')}'>"
            ##                util.loadImg(t, util.resPath(cf.community, 'images/df.jpg'),false)
            util.del key, cf._dImg
#            suff = href.split('?')[1]
#            if suff
#                dImg = new Image()
#                $(dImg).load(->
#                    box.css("background", "").append $(this).addClass(box.attr("cls"))
#                ).attr "src", "http://placehold.it/" + suff
#            if img.attr('empty')
#                img.remove()
        ).attr "src", href
#
#    loadCurImg: (id)->
#        pic = cf._cImg.find(id)
#        util.loadImg($('#' + id), pic.href, pic.isDef, pic.opt)
#        cf._cImg.del(id)

cf._dImg = {}

cf.bbEvt.on 'scroll', ->
    util.loadPic()

loadPic = ->
    util.loadPic()

$('body').on 'slid.bs.carousel', loadPic
$('body').on 'shown.bs.collapse', loadPic

util.loadPic('body')