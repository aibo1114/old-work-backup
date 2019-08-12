module.exports = portal = cf.view.portal = cf.view.tag.extend
    parent: '#content'
    plugins: []
    preRender: ->
        for it in _.result @, 'plugins'
            if it.type
                new cf.view[it.type] it.attrs

            else if it.tmpl
                act = if it.cleanAll
                    'html'
                else
                    'append'
                $(it.parent)[act] cf.rtp(it.tmpl, it.opt)

$.extend cf.dm,
    portal: (p, opt)->
        init =
            parent: p
            auto: true
        new portal cf._packOpt(init, null, null, opt)
