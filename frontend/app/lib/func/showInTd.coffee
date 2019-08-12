module.exports = cf.view.showInTd = (e)->
    t = util.ct(e)
    pt = if t.parent().is 'td'
        'tr'
    else
        '.list-group-item'

    ptr = t.closest(pt)


    if t.children().hasClass 'glyphicon-plus'
        t.children().toggleClass 'glyphicon-minus'


    if t.hasClass 'active'
        ptr.removeClass('hasSubTable').next().remove()
    else
        if ptr.hasClass 'hasSubTable'
            tr = ptr.next()
            tr.children('td').empty()
            t.siblings().removeClass 'active'
        else
            tr = if t.parent().is 'td'
                $("""<tr class='subTable'><td colspan="#{ptr.children('td').length}"></td></tr>""")
            else
                $('<div><div></div></div>')
            ptr.addClass('hasSubTable').after(tr)
        @afterShow?(e, tr.children())

#        if t.hasClass 'noHeadTitle'
#            tc = tr.children()
#            tc.find('thead>tr>th:last-child').append tc.find('.toolbar')
#            tr.find('.panel-heading').remove()

    t.toggleClass 'active'
    e.stopPropagation()

metaOpt = m._

$.extend metaOpt.btn,
    showInTd: (it)->
        util.iBtn "plus", 'showInTd'


$.extend metaOpt.event,
    showInTd:
        type: 'click'
        fun: cf.view.showInTd
