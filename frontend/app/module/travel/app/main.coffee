require './style/main.css'

cf.loadTmpl = (name) ->
    require "./tmpl/#{name}.jade"
cf.loadLibTmpl = (name) ->
    require "../../../lib/tmpl/#{name}.jade"
############################################################

require '../../../res/js/jquery.tinyscrollbar'
util.initScroll()

$('#info').on 'click', 'a[data-toggle]', (e)->
    t = util.ct(e)
    t.parent().addClass('redb').siblings().removeClass('redb')

for it in $('#info,#extra,#tourListCtn')
    util.initPC(it)


if $('.headMenu').length and cat = util.parseUrl().cat
    $('.headMenu').find("a[href*='#{cat}']").parent().addClass 'active'

title = $('title').text()
url = location.href
so = [
    code: 'fb'
    url: "http://www.facebook.com/sharer.php?u=#{url}&t=#{title}"
,
    code: 'gp'
    url: "http://www.google.com/bookmarks/mark?op=add&bkmk=#{url}&title=#{title}"
,
    code: 'tw'
    url: "http://twitter.com/home?status=#{url} #{title}"
,
    code: 'email'
    title: 'Send it'
    url: "mailto:?subject=#{title}&body=#{url}"

]
if (sns = $('.sns')).length
    for it in so
        t = it.title || ''
        sns.append "<a title='#{t}' class='#{it.code}' href='#{it.url}' target='_blank'></a>"

util.addHover = (t, opt)->
    o = $.extend
        placement: 'right'
        html: true
        trigger: 'focus'
        template: t.next('.popover')[0].outerHTML
    , opt || {}
    t.popover o

sbar = $('.sbar')
q = sbar.find('#q')
fcf = sbar.find('.form-control-feedback')
sp = sbar.find('ul')
sbar.find('.input-group-btn').hover ->
    sp.show()
, ->
    sp.hide()

sbar.on 'click', 'li', (e)->
    t = util.ct(e)
    sbar.find('.et').text t.text()
    q.data 'entity', t.text().toLowerCase()
    sp.hide()
    q[0].blur()
    q[0].focus()

q.keyup (e)->
    t = util.ct(e)
    et = t.data('entity') || 'sight'
    if e.keyCode is 13
        cf.r "result/#{et}/#{t.val()}"

fcf.click (e)->
    t = util.ct(e).prev()
    cf.r "result/#{t.data('entity') || 'sight'}/#{t.val()}"
