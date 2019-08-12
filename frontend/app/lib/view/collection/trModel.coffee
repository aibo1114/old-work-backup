itemView = require './tdView'
module.exports = cf.view.model.extend
    cleanAll: false
    tagName: 'tr'
    itemTag: 'td'
    setContent: ->
        @data = @model.attributes
        @$el.attr('data-id', @model.id)
        if @itemTmpl
            td = $('<td/>').append cf.rtp @itemTmpl,
                @data
            @$el.append td

#        else if @mobType
#            td = $('<td/>')
#            for v of @collection.cols
#                continue if v.type is 'hide'
#                td.append $('<div/>').append(itemView(@data, v, @entity, @meta, @))
#            @$el.append td
#            @$el.append $('<td class="btnCtn"/>')
#
#        else

        for v in @collection.cols
            continue if v.type is 'hide'
            td = $('<' + @itemTag + '/>')
            if v.type is 'ckb'
                td.addClass 'text-center'
            td.append itemView(@data, v, @entity, @meta, @)

            v.cls && td.addClass(v.cls)
            if v.type is 'btns' or v.code is '_btn'
                td.addClass 'btnCtn'

            v.handle(@data, td) if v.handle
            @$el.append td

        @decorate?()