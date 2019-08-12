require './pagination.less'

$.extend true, cf.view.collection::,
    exEvents:
        'click .pagination>li': (e)->
            b = util.ct(e)
            t = b.text()
            @max = @collection.criteria.max
            switch t
                when '>'
                    @collection.resetFetch('next')
                    @offset = @offset + @max
                when '<'
                    @collection.resetFetch('prev')
                    @offset = @offset - @max
                else
                    t = +t - 1
                    @collection.resetFetch('one', t)

                    @offset = t * @max

            @_pagePath and @setPagePath()

        'change .totalNum>select': (e)->
            v = util.ct(e).val()
            @max = @collection.criteria.max = +v
            @offset = @collection.criteria.offset = 0
            @collection.resetFetch()
            @_pagePath and @setPagePath()

    setPagePath: ->
        hash = location.hash.split('/')
        lp = "#{@max}_#{@offset}"
        if /^\d+_\d+$/.test hash.last()
            hash[hash.length - 1] = lp
        else
            hash.push lp
        if @offset is 0
            hash.pop()
        cf.r util.navUrl(hash.join('/')), false


    genPagination: (offset, max, count, range)->
        return [] if count is 0
        cur = offset / max + 1
        end = Math.ceil(count / max)
        half = Math.floor range / 2

        if cur - half <= 1
            b = 1
        else
            b = cur - half
            bb = true
        if b + range - 1 < end
            e = b + range - 1
            ee = true
        else
            e = end
            b = e - range + 1 if b > e - range + 1 and e - range + 1 > 0

        if bb
            res = [
                num: '1'
            ]
            res.push num: '<' if bb
        else
            res = []
        for n in [b..e]
            res.push
                num: n
        if ee
            res.push num: '>'
            res.push
                num: end
        res


    pagination: ->
        return unless @foot
        max = @collection.criteria.max
        count = @collection.count
        offset = @collection.criteria.offset
        @foot.html cf.rtp require('./pagination.jade'),
            res: @genPagination offset, max, count, @pRange
            max: max
            cls: 'pagination-sm'
            count: count
            ctx: @
        @foot.find("li:contains('#{offset / max + 1}')").first().addClass 'active'
        @foot.find('select').val max