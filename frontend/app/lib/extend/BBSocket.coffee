Backbone.stSync = (method, model, op) ->
#    socket = window.socket || window.st
# grab active socket from global namespace; io.connect() was used to create socket

    ###
    # Create signature object that will emitted to server with every request. 
    # This is used on the server to push an event back to the client listener.
    ###

#    signature = ->
#        sig = {}
#        sig.endPoint = model.url + (if model.id then '/' + model.id else '')
#        if model.ctx
#            sig.ctx = model.ctx
#        sig
#
#    ###
#    # Create an event listener for server push. The server notifies
#    # the client upon success of CRUD operation.
#    ###
#
#    event = (operation, sig) ->
#        e = operation + ':'
#        e += sig.endPoint
#        if sig.ctx
#            e += ':' + sig.ctx
#        e
#
#    # Save a new model to the server.
#
#    create = ->
#        st.send
#            
#            method: 'post'
#            entity: {}, ->
#                alert 'back'
#
##        sign = signature(model)
##        e = event('create', sign)
##        socket.emit 'create',
##            'signature': sign
##            item: model.attributes
##        socket.once e, (data) ->
##            model.id = data.id
##            console.log model
##            return
##        return
#
#    # Get a collection or model from the server.
#
#    read = ->
#        sign = signature(model)
#        e = event('read', sign)
#        socket.emit 'read', 'signature': sign
#        socket.once e, (data) ->
#            options.success data
#            # updates collection, model; fetch                      
#            return
#        return
#
#    # Save an existing model to the server.
#
#    update = ->
#        sign = signature(model)
#        e = event('update', sign)
#        socket.emit 'update',
#            'signature': sign
#            item: model.attributes
#        # model.attribues is the model data
#        socket.once e, (data) ->
#            console.log data
#            return
#        return
#
#    # Delete a model on the server.
#
#    destroy = ->
#        sign = signature(model)
#        e = event('delete', sign)
#        socket.emit 'delete',
#            'signature': sign
#            item: model.attributes
#        # model.attribues is the model data
#        socket.once e, (data) ->
#            console.log data
#            return
#        return

# entry point for method
    po = switch method
        when 'create'
            body: model.toJSON()
        when 'read'
            query: op.data
            id: model.id
        when 'patch'
            ob = op.attrs
            q:
                _id: model.id
            body: ob
        when 'update'
            q:
                _id: model.id
            body: model.toJSON()
        when 'delete'
            id: model.id

    $.extend po,
        _method: method
        ent: model.entity

    st.send po, (d)->
        if d.error
            op.error d
            popMsg d.msg, 'warning'
        else
            op.success d
    return

require './BBSync'