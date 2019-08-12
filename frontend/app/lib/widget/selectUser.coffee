require '../meta/membership'

module.exports = cf.view.collection.extend
    entity: 'membership'
    toFetch: true
    init: ->
        @res = []
        $(@parent).addClass('pickAvator')

    events:
        'click img': 'pickImg'

    pickImg: (e)->
        t = util.ct(e)
        d = @collection.get(util.getTargetId(e)).attributes
        if t.hasClass('active')
            t.removeClass 'active'
            @targetInput.find(".c-#{d.id}").remove()
            @res.remove "#{d.user.id}-#{d.user.username}"
        else
            t.addClass 'active'
            @targetInput.append "<span class='c-#{d.id}'>#{d.user.username}</span>"
            @res.push "#{d.user.id}-#{d.user.username}"
        @form.model.set 'tutor', @res.join(',')

    criteriaOpt: ->
#        rid: 'eq_l_' + _masterId
        _attrs: 'user:username__email__introduction__refFile'

    addAll: ->
        for d in @data
            u = d.user
#            util.pStr u, 'refFile'
#            if u.refFile and u.refFile.portrait
#                @ctn.append "<img id='p-#{d.id}' src='#{util.resPath d.user.refFile.portrait[0]}'/>"

    callback: ->
        @targetInput = $('<div class="picked"></div>')
        $(@parent).append @targetInput