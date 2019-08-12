Backbone.getSyncMethod = (model, op) ->
    if op.forceSync
        return Backbone[op.forceSync]
    mo = model
    co = model.collection
    if mo.stSync or (co and co.stSync)
        Backbone.stSync
    else if mo.localSync or co.localSync
        Backbone.localStorage
    else
        Backbone.sync

Backbone.sync = (method, model, options) ->
    Backbone.getSyncMethod(model, options).apply this, [
        method
        model
        options
    ]