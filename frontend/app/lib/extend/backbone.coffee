#backbone enhance

Backbone.View::_super = (act) ->
    @constructor.__super__[act].apply @, _.rest(arguments)

Backbone.View::_over = (act) ->
    @constructor::[act].apply @, _.rest(arguments)

Backbone.View::_close = ->
    @dPlugin?()
    @unbind()
    @onClose?()
    @remove()

Backbone.Model.setPost = ->
    Backbone.emulateJSON = true
    ob = Backbone.Model::save
    Backbone.Model::save = (attrs = {}, opt = {})->
        @set(attrs)
        opt.data = @toJSON()
        ob.call(@, attrs, opt)

$.extend window.util,
    getView: (t)->
        t = util.ct(t) unless t instanceof $
        if t.attr '[data-cid]'
            t.data('_item')
        else
            t.closest('[data-cid]').data('_item')
    getModel: (t)->
        util.getView(t).model

proxiedSync = Backbone.sync
Backbone.sync = (method, model, options) ->
#    options or (options = {})
#    if !options.crossDomain
#        options.crossDomain = true
#    if !options.xhrFields
#        options.xhrFields = withCredentials: true
    proxiedSync method, model, options

#$.ajaxPrefilter (options, originalOptions, jqXHR) ->
#    options.crossDomain = crossDomain: true
#    options.xhrFields = withCredentials: true
#    return

#Backbone.View::reRender = ->
#    alert 'zzzzz'
#    @$el.empty()
#    @render()