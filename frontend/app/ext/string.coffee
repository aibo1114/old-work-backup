_.extend String::,
    trim: ->
        @replace /^\s+|\s+$/g, ""
    capitalize: ->
        @trim().substring(0, 1).toUpperCase() + @trim().substring(1)
    capAll: ->
        res = for it in [1..@length]
            c = @charAt(it)
            if 'A' <= c <= 'Z'
                ' ' + c
            else
                c
        @charAt(0).toUpperCase() + res.join('')

    startsWith: (pattern) ->
        @lastIndexOf(pattern, 0) is 0
    endsWith: (pattern) ->
        d = @length - pattern.length
        d >= 0 and @indexOf(pattern, d) is d
    isEmpty: ->
        this.length is 0 || this is " " || (/^\s*$/).test(this)
    replaceAll: (s1, s2)->
        this.replace(new RegExp(s1, "gm"), s2);
    truncate: (length, truncation) ->
        length = length or 30
        truncation = (if Object.isUndefined(truncation) then "..." else truncation)
        (if @length > length then @slice(0, length - truncation.length) + truncation else String(this))
    fileName: ->
        @substr(@lastIndexOf('/') + 1)
    dStr: (len = 19)->
        this.replace(/-/g, "-").replace(/[TZ]/g, " ").substr(0, len)

String.randomChar = (len, x = '0123456789qwertyuioplkjhgfdsazxcvbnm') ->
    ret = x.charAt(Math.ceil(Math.random() * 10000000) % x.length)
    for n in [1..len]
        ret += x.charAt(Math.ceil(Math.random() * 10000000) % x.length)
    ret
Date.hour = 1000 * 60 * 60
Date.day = 24*Date.hour
Date.week = 7*Date.day

_.extend Date::,
    minusTime: (d,type='day')->
        Math.round (@getTime()-d.getTime())/Date[type]

    isSameDay: (d) ->
        @getFullYear() is d.getFullYear() and @getMonth is d.getMonth and @getDate() is d.getDate()
    addDays: (d) ->
        if d
            t = @getTime()
            t = t + (d * 86400000)
            @setTime t
        @
    nextWeekDay: (day) ->
        @addDays (day + 7 - @getDay()) % 7
    firstDayOfMonth: ->
        new Date(@getFullYear(), @getMonth(), 1)
    lastDayOfMonth: ->
        new Date(@getFullYear(), @getMonth() + 1, 1).addDays -1
    monday: ->
        @setHours(0,0,0,0)
        if @getDay() > 0
            @addDays(1 - @getDay())
        else
            @addDays(1 - 7)

    sunday: ->
        if @getDay() > 0
            @addDays(7 - @getDay())
        else
            @

    nextMonth: ->
        new Date(@getFullYear(), @getMonth() + 1, 1);
    lastMonth: ->
        new Date(@getFullYear(), @getMonth() - 1, 1);
    pattern: (fmt = 'yyyy-MM-dd HH:mm:ss') ->
        o =
            'Y+': @getFullYear()
            'M+': @getMonth() + 1
            'd+': @getDate()
            'h+': if @getHours() % 12 == 0 then 12 else @getHours() % 12
            'H+': @getHours()
            'm+': @getMinutes()
            's+': @getSeconds()
            'q+': Math.floor((@getMonth() + 3) / 3)
            'S': @getMilliseconds()
        week =
            '0': '日'
            '1': '一'
            '2': '二'
            '3': '三'
            '4': '四'
            '5': '五'
            '6': '六'
        if /(y+)/.test(fmt)
            fmt = fmt.replace(RegExp.$1, (@getFullYear() + '').substr(4 - (RegExp.$1.length)))
        if /(E+)/.test(fmt)
            fmt = fmt.replace(RegExp.$1, (if RegExp.$1.length > 1 then (if RegExp.$1.length > 2 then '星期' else '周') else '') + week[@getDay() + ''])
        for k of o
            if new RegExp('(' + k + ')').test(fmt)
                fmt = fmt.replace(RegExp.$1, if RegExp.$1.length == 1 then o[k] else ('00' + o[k]).substr(('' + o[k]).length))
        fmt

Date.parseLocal = (time) ->
    time = time.substring(0, 19) if time.length > 19
    new Date((time or "").replace(/-/g, "/").replace(/[TZ]/g, " "))


_.extend Number::,
    toOrdinal: ->
        n = this % 100
        suffix = ["th", "st", "nd", "rd", "th"]
        ord = (if n < 21 then (if n < 4 then suffix[n] else suffix[0]) else (if n % 10 > 4 then suffix[0] else suffix[n % 10]))
        this + ord
#
#    toPaddedString: (length, radix) ->
#        string = @toString(radix or 10)
#        "0".times(length - string.length) + string

    formatMoney: (cc, c = 2, d = '.', t = ',') ->
        cc = cf._curCode || '$'
        n = this
        s = (if n < 0 then " -" else "")
        i = parseInt(n = Math.abs(+n or 0).toFixed(c)) + ""
        j = (if (j = i.length) > 3 then j % 3 else 0)
        cc + s + ((if j then i.substr(0, j) + t else "")) + i.substr(j).replace(/(\d{3})(?=\d)/g,
            "$1" + t) + ((if c then d + Math.abs(n - i).toFixed(c).slice(2) else ""))


_.extend Array::,
    clear: ->
        @length = 0
        @

    last: (num = 1) ->
        @[@length - num]

    has: (val) ->
        i = @length
        while i--
            if val == @[i]
                return true
        false

    includeBy: (prop, val) ->
        i = @length
        while i--
            if val == @[i][prop]
                return true
        false
        
    detect: (val, nv) ->
        i = 0
        while i < @length
            if @[i] == val
                if nv
                    @[i] = nv
                return @[i]
            i++
        null
        
    remove: (val, fz) ->
        i = 0
        while i < @length
            if @[i] == val or (fz && @[i].indexOf(val) > -1)
                @splice i, 1
                return val
            i++
        null

    delBy: (val, prop = 'id', one) ->
        i = 0
        v = []
        while i < @length
            if (if prop.indexOf('.') > 0 then util.seqProp(@[i], prop) else @[i][prop]) == val
                v.push @[i]
                @splice i, 1
                if one
                    return v[0]
            i++
        if len = v.length
            if len ==1
                v[0]
            else
                v
        else
            null

    find: (id) ->
        i = 0
        while i < @length
            if @[i].id and @[i].id.toString() == id
                return @[i]
            i++
        null
        
    findBy: (prop, val) ->
        i = 0
        while i < @length
            if (if prop.indexOf('.') > 0 then util.seqProp(@[i], prop) else @[i][prop]) == val
                return @[i]
            i++
        null
        
    findAllBy: (prop, val) ->
        res = []
        i = 0
        while i < @length
            if (if prop.indexOf('.') > 0 then util.seqProp(@[i], prop) else @[i][prop]) == val
                res.push @[i]
            i++
        res
    replaceById: (item) ->
        i = 0
        while i < @length
            if @[i].id == item.id
                @[i] = item
            i++
        return

    addUniq: (val) ->
        if !@has(val)
            @push val
        return

    sortBy: (attr, isAsc) ->
        @sort (a, b) ->
            if isAsc
                if a[attr] < b[attr] then -1 else 1
            else
                if a[attr] > b[attr] then -1 else 1
        @

    pk: (prop...)->
        _.pk.apply @, [it].concat(prop) for it in @

    pushById: (obj, k = 'id')->
        if @findBy(k, obj[k])
            return
        else
            @push(obj)

    addOrUpdate: (item, key = 'id')->
        find = false
        for it in @
            if it[key] is item[key]
                @[_i] = item
                find = true
                break
        @push item unless find

    concatBy: (next, key, func = _.extend)->
        for it in next
            if key
                d = @findBy(key, it[key])
                if d
                    func(d, it)
                else
                    @push it
            else
                @push it
        @
    recSet: (sub = 'children', fun)->
        for it in @
            fun(it)
            it[sub].recSet(sub, fun) if _.isArray it[sub]

    recFind: (sub, val, prop = 'id')->
        for it in @
            if it[prop] is val
                return it
            if _.isArray it[sub]
                r = it[sub].recFind(sub, val, prop)
                return r if r
        return null
_.extend _,
    pk: (ob, prop...)->
        if prop.length is 1
            util.seqProp ob, prop[0]
        else if prop.length > 1
            res = {}
            for it in prop
                res[it.replaceAll('\\.','_')] = util.seqProp ob, it
            res
        else
            {}
