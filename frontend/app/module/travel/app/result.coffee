app.enhance
    routes:
        '!/result/:ent/:q': 'result'

    result: (ent, q)->
        unless q
            app.navigate '', {trigger: true}
            return
        $('#indexSlide').hide()

        @dm.collection @ctn, ent,
            title: ii(ent)
            style: 'panel-info'
            tagClass: 'panel-body row'
            noData: ->
                "<h3>No search results</h3>"
            modelOpt:
                tmpl: 'searchItem'
                className: 'col-md-2'
            criteriaOpt: ->
                q:
                    title:
                        $regex: ".*#{q}.*"
                        $options: 'i'
            callback: ->
                @$('.toolbar').append "<a class='btn btn-default' onclick='history.go(-1)'>Back</a>"


