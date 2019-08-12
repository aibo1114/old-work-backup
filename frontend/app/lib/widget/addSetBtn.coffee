module.exports = _exv 'addSetBtn', '_tag',
    added: false
    init: ->
        cls = @className()
        @$el.attr 'class', cls

    className: ->
        "btn circle btn-#{@color}"

    events: ->
        'click': ->
            if @_clickBtn
                @_clickBtn()
            else
                if user.isLogin() or user.fake
                    act = if @added
                        cf._rsMsg = "取消#{ii(@prop)}成功"
                        'pull'
                    else
                        cf._rsMsg = "添加#{ii(@prop)}成功"
                        'addToSet'
                    $.post util.actUrl("#{act}/#{@ent._e}/_id/#{@ent._id}/#{@prop}"),
                        _str: @item
                    , (res)=>
                        @setState(res.entity)
                    @clickBtn?()
                else
                    if util.isWechat()
                        location.href = wt.genWtUrl(location.pathname.substr(1)+location.search)

    setContent: ->
        @ctn.append tu.icon(@icon)
        @show = @ctn.mk 'div'
        @setState()

    setState: (d)->
        if @ent
            if d
                @ent[@prop] = d[@prop]
            @items = @ent[@prop] || []
            @added = @items.has(@item)
        @render()

    render: ->
        act = if @added
            'addClass'
        else
            'removeClass'
        @$el[act]('active')
        @show.html @text?()
