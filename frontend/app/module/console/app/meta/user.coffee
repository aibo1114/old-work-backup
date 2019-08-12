require '../../../../lib/meta/user'
require "../../../../lib/func/showInTd"

$.extend true, m.user,
    filter:
        username: 'text:s:mt'
        industry: 'select:l:eq'
        status: 'select:l:eq'

    btn:
        msg: ->
            util.iBtn "envelope"
        roles: ->
            util.iBtn "education"

    event:
        roles:
            type: 'click'
            fun: cf.view.showInTd
        msg:
            type: 'click'
            fun: (e)->
                item = @findData(e).attributes
                app.dm.form 'air', 'userMsg',
                    toFetch: false
                    btns: ['save']
                    before: (attr)->
                        attr.mo.subject = util.del 'title', attr
                        attr.mo.html = util.del 'content', attr
                        attr
                    data:
                        to: item.email
                        mo:
                            to: "#{item.username}(#{item.email})"
                            sender: cf.community.name
                        user:
                            _id: user._id
                            username: user.username
