module.exports =
    randomInt: util.randomInt
    randomChar: util.randomChar

    copyRight: (c, name, id)->
        path = "http://#{c.url}/#{name}/#{id}"
        """
        <div class="copyright"><strong>C</strong><div>
            <p>除非特别声明，本站文章均为原创文章，转载请注明原文链接</p>
        </div></div>
        """
        
    navPage: (page, it)->
        "/#{page}/#{it._id}"

    crumbItem: (items)->
        [
            label: '首页'
            href: '/'
        ].concat items

    img: (path, cls = 'avatar', pop = false, p, isbb = true)->
        p ?=''
        p += if pop then " onclick='cf.showPic(this)'" else ''
        src = if isbb
            'bb-src'
        else
            'src'
        "<img id='#{String.randomChar(4)}' class='#{cls} _imgBox' #{src}='#{path}' #{p}/>"

    imgItem: (it, c, name = 'head', cls, index = 0, pop, isbb)->
        path = if it and name in ['id', 'portrait']
            "portrait/#{it._id}.jpg"
        else if it and it.refFile and it.refFile[name]
            it.refFile[name][index]
        else
            null
        if path
            @img @resPath(c, path), cls, pop, null, isbb
        else
            ''

    userPic: (c = cf.community, u, cls = 'img-circle img-fluid', isbb)->
        return '' unless u
        id = if _.isString u
            u
        else
            u.id || u._id
        @img(@resPath(c, 'portrait/' + id + '.jpg'), cls,null,null, isbb)
    
    avatars: (data, ctn, cls = 'img-circle img-fluid col-xs-2 pr0 mb m-b-h', c = cf.community)->
        for it in data
            ctn.append tu.userPic(c,(if it.user then it.user else it), cls)
        util.loadPic(ctn)
        
    resPath: (c = cf.community, path)->
        c.resPath + '/upload/' + c.code + '/' + path

    catLink: (cat, list = [])->
        res = []
        for it in cat.split(',')
            item = list.findBy('code', it)
            if item
                res.push @link item
        res.join(' / ')

    avatar: (user, c = cf.community, name = 'portrait')->
        if user.refFile and user.refFile[name]
            p = @img(@resPath(c, user.refFile[name][0]), c)
        else
            pp = @resPath(c, 'portrait.jpg')
            p = "<img src='#{pp}'/>"
        "<a href='/user/#{user._id}' title='#{user.username}'>#{p}<div>#{user.username}</div></a>"

    adt: util.adjustText

    navUrl: (p)->
        return '#' unless p
        if arguments[0].charAt(0) is '#'
            k = arguments[0]
        else
            k = "#!"
            for it in arguments
                if _.isString(it) or _.isNumber(it)
                    k += '/' + it
        k

    actDate: (start, end)->
        "#{start.substr(0, 16)}-#{end.substr(11, 5)}"

    label: (text, type = 'success', cls)->
        "<span class='label label-#{type} #{cls || ''}'>#{text}</span>"

    btn: (text, act, style = 'default', size, block)->
        cls = _st.btn(style, size, block)
        "<a class='#{cls} #{act}'>#{text || ''}</a>"

    a: (text, href, cls)->
        str = if href then "href='#{href}' " else ''
        str += if cls then "class='#{cls}' " else ''
        str += "target='_blank' " if href and !href.startsWith('#')
        "<a #{str} title='#{text}'>#{text}</a>"

    link: (it, prop = 'title', cls)->
        text = if prop is '_str'
            it
        else if it
            it[prop]
        return '' unless text
        href = it.href
        unless href
            href = if it._e is 'cat'
                "/#{it.type.split('_')[0]}List?cat=#{it.code}"
            else
                "/#{it._e}/#{it._id}"
        @a(text, href, cls)


    iBtn: (cls, key, href)->
        key = cls unless key
        cls: _st.btn null, 'sm', false, util.iClass(cls) + ' ' + key
        id: true
        title: iic key
        href: href
        onclick: 'cf.showPic(this)'

    tBtn: (label, href, icon, cls, title, id)->
        unless util.isChinese label
            label = ii label
        label: label
        href: href
        icon: icon and util.icon icon
        cls: cls #+' '+label
        title: title and iic title
        id: id

    genBtn: (cfg, it)->
        return unless cfg
        if cfg.btn
            tag = $('<button type="button"/>')
        else
            tag = $("<a/>")
            
        tag.addClass cfg.key
        
        if cfg.href
            tag.attr 'href', cfg.href
            if cfg.href.startsWith 'http'
                tag.attr 'target', '_blank'
                
        cfg.id and tag.attr 'id', util.randomChar(4) + '-' + it?.id
        
        cfg.label and tag.html "<span>#{cfg.label}</span>"
        cfg.title and tag.attr 'title', cfg.title
        if cfg.attr
            for k,v of cfg.attr
                tag.attr k, v
        cfg.cls and tag.addClass cfg.cls
        if cfg.icon
            if cfg.icon.startsWith '<'
                icon = cfg.icon
            else
                icon = util.icon(cfg.icon)
            tag[cfg.iconPlace || 'prepend'] icon
        cfg.callback?(tag)
        if cfg.action # event for larger tag
            tag.on(cfg.action.type || 'click', cfg.action.fun)
        cfg.hide and tag.hide()
        tag

    qrImg: (link, cls)->
        "<img src='/a/qrImg?link=#{link}' class='#{cls}'/>"

    iClass: (val, cls)->
        "#{_st.iconStr} #{_st.iconStr}-#{val} #{cls || ''}"

    iconx: (icon, str)->
        "<i class='icon-#{icon} iconx'>#{str || ''}</i>"

    iconxx: (icon)->
        @iconx(icon) + @iconx(icon + 'Hover hover')

    icon: (icon, tag = 'i', str = '', cls = '', href)->
        "<#{tag} class='#{@iClass(icon, cls)}' #{href || ''}>#{str}</#{tag}>"

    menuItem: (it)->
        p = {}
        it.cls and p.class = it.cls
        it.func and p.onclick = it.func
        it.href and p.href = it.href
        it.key and p.href = @navUrl(it.key)
        li = $.mk('li')
        a = li.mk('a', p, it.label || ii(it.key))
        if it.icon
            a.prepend @icon(it.icon)
        else if it.img
            a.prepend it.img
        li.toStr()

