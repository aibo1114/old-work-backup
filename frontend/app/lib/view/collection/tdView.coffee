module.exports = (data, item, entity, meta, model)->
    
    text = if (v = util.seqProp(data, item.code)) != null
        v
    else if item.val
        if _.isFunction item.val
            item.val(data)
        else
            item.val
    else
        ''
    if text and text.length > 30
        text = util.adjustText text
    switch item.type
        when "ckb"
            """<input class='ckb' type="checkbox" id="ckb-#{data.id}">"""
#        when "radio"
#            """<input class='rad' type="radio" name="#{item.name}">"""
#        when "img"
#            if item.path
#                tu.img(item.path)
#            else
#                tu.imgItem(data, cf.community, item.prop || 'head')
        when "email"
            """<a href="mailto:#{data[item.type]}">#{text}</a>"""
        when "edit"
            item.code = 'data/' + item.type
            """<a href="#{util.navUrl(item.code,entity,data.id)}">#{text}</a>"""
#        when "view"
#            href = "/#{entity}/#{data._id}"
#            if cf.index is 'console'
#                href += '?_c=1'
#            "<a href='#{href}' target='_blank'>#{text}</a>"
        when "link"
            """<a href="#{item.href}" class="#{item.cls}">#{text}</a>"""
#        when "status"
#            m = cf.st["#{entity}_#{item.code}_hash"] || cf.st["content_#{item.code}_hash"]
#            if m
#                m[text]
#            else
#                text
#        when 'input'
#            item.opt.val = text
#            inputEditor(item.opt)
        when 'money'
            if text
                (+text || 0).formatMoney(2)
        when 'map'
            if meta[item.code] and meta[item.code].data
                _.result(meta[item.code], 'data')[text]
            else
                ''
        when "date"
            if text
                Date.parseLocal(text).pattern(item.ptn||'yyyy-MM-dd HH:mm')
            else
                ''
#            util.prettyDate(text, item.pt, item.tr)
        when "show", "modify"
            cf._link(null, text, null, 'show', @entity + '-' + data.id)
        when 'btn'
            tu.genBtn item.attrs
        when 'blank'
            ''
        else
            if item and item.showText
                item.showText(text, data, meta, model)
            else if item.converter
                item.converter(text, data)
            else
                if item.size
                    util.adjustText text, item.size
                else
                    text
