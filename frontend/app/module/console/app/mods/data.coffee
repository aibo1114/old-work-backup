#util.lcss(cf.modPath + 'data.css')

app.enhance
    routes:
        '!/data(/:act)(/:entity)(/:p)': '_data'

    _data: (act, entity, eid)->
        unless user.isLogin()
            cf.r 'login'
            return
        @_data_check?()

        if @initLayout and user.entities
            for it in user.entities
                it.href ?= util.navUrl('data', 'list', it.key)
            @initLayout 'data', '2-10', =>
                title: iim('m_mgm', 'data')
                tmpl: 'dataNavItem'
                data: user.entities

        switch act
            when 'list'
                opt =
                    _pagePath: true
                if eid
                    [opt.max,opt.offset] = eid.split('_')
                @dm.tb @_mod_ctn, entity, opt
            when 'edit'
                @dm.edit @_mod_ctn, entity, eid

            when 'view'
                @dm.view @_mod_ctn, entity, eid

            when 'add'
                @dm.add @_mod_ctn, entity
