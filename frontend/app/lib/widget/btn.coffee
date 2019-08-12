module.exports  = cf.view.tag.extend
    className: 'sbtn'
    btnClass: 'btn btn-primary btn-block'
    login: true
    code: cf.code
    auto: true
    events:
        "click a,button": "fire"
    init: ->
        @ctn = @$el

    noLogin:->
        popMsg(ii('m.login_first'), 'warning')
        $('#login>a').trigger('click')
        $('#loginForm input:first').focus().select()

    checkFire: ->
        if user.isLogin()
            true
        else
            @noLogin()
            cf.r 'login'
            false

    fire: ->
        return if @confirm and not confirm(@confirm)
        return unless @checkFire()
        @waiting()
        $.ajax
            type: (if @type then @type else "post")
            url: _.result @, 'url'
            data: if @params then @params() else {}
            async: (if @callback then true else false)
            dataType: "json"
            success: (result) =>
                @afterSuccess?.call(@, result)
                @enable.call @
            error: =>
                @errorCallback?.call(@, arguments)
                @enable.call @

    waiting: ->
        @disable()
        @btn.text "Waiting..."

    disable: ->
        @btn.attr("disabled", true)

    enable: ->
        @btn.removeClass("disabled").removeAttr("disabled").text ii(@text)

    preRender: ->
        @doBiz?()
        if @text
            @btn = $("<a/>").addClass(@btnClass)
            @text and @btn.text _.result @, 'text'
            @icon and @btn.prepend @icon
            @disabled and @disable()
            @help and @btn.attr 'title', @help
            @href and @btn.attr 'href', @href
        else
            @btn = @text

        @ctn.append @btn