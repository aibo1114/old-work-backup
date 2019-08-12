isZZ = (v)->
    v and v.substr(0,2) in ['11', '12', '31', '50']
area =
    fun: (opt)->
        cf.loadJS cf.rPath + 'js/area_postcode.js', ->
            p = $(opt.parent).addClass 'areaWt'
            cf._areaList = {} unless cf._areaList
            al = cf._areaList
            al.data = _areaData.split(',') unless al.data
            ss = '<select class="form-control"><option>##</option></select>'


            pc = opt.form.model.get(opt.prop) || '000000'

            unless al.sList
                al.sList = []
                for it in al.data
                    if it.substring(2, 6) is '0000'
                        op = it.split('|')
                        al.sList.push
                            label: op[1]
                            val: op[0]

            if opt.c
                c = opt.c
            else
                c = $(ss.replace('##', '省份'))
                c.addClass 'c'
                p.append(c)

            c.append util.genOptionItem al.sList

            if opt.sc
                sc = opt.sc
            else
                sc = $(ss.replace('##', '城市'))
                sc.addClass 'sc'
                p.append(sc)

            if opt.sv
                sv = opt.v
            else if !opt.noSv
                sv = $(ss.replace('##', '地区'))

                sv.addClass 'sv'
                p.append sv

            if opt.auto
                c.css 'width', opt.auto
                sc.css 'width', opt.auto
                if !opt.noSv
                    sv.css 'width', opt.auto

            c.change ->
                v = $(@).val()
                if v is ''
                    $(@).addClass('ph')
                else
                    $(@).removeClass('ph')
                unless al[v]
                    al[v] = []
                if isZZ(v)
                    for it in al.data
                        if v and it.substr(0, 2) is v.substr(0, 2) and it.substring(4, 6) isnt '00'
                            al[v].push
                                label: it.substr(7)
                                val: it.substr(0, 6)
                    sv && sv.hide()
                else
                    sv && sv.show()
                    for it in al.data
                        if v and it.substring(0, 2) is v.substring(0, 2) and it.substring(2,
                            6) isnt '0000' and it.substring(4, 6) is '00'
                            al[v].push
                                label: it.substr(7)
                                val: it.substr(0, 6)

                al.addr = $('option:selected', c).text()

                p.attr 'area', al.addr
                p.attr 'postcode', v

                if opt.prop
                    opt.form.model.set opt.prop, v

                if opt.text
                    opt.form.model.set opt.text, al.addr

                if opt.ref
                    $(opt.ref).val al.addr

                sc.html util.genOptionItem al[v]
                sc.trigger 'change'

            sc.change ->
                v = $(@).val() || ''
                if v is ''
                    $(@).addClass('ph')
                else
                    $(@).removeClass('ph')
                unless al[v]
                    al[v] = []
                    for it in al.data
                        if it.substring(0, 4) is v.substring(0, 4) and it.substring(4, 6) isnt '00'
                            op = it.split('|')
                            al[v].push
                                label: op[1]
                                val: op[0]

                al.addr = $('option:selected', c).text() + $('option:selected', sc).text()

                if opt.prop
                    opt.form.model.set opt.prop, v

                if opt.text
                    opt.form.model.set opt.text, al.addr

                if opt.ref
                    $(opt.ref).val al.addr

                p.attr 'area', al.addr
                p.attr 'postcode', v

                if !opt.noSv and !isZZ(v)
                    sv.html util.genOptionItem al[v]
                    sv.trigger 'change'
                else
                    opt.scChange?.call opt.form


            sv && sv.change ->
                v = $(@).val()
                al.addr = $('option:selected', c).text() + $('option:selected', sc).text() + $('option:selected', sv).text()

                if opt.prop
                    opt.form.model.set opt.prop, v

                if opt.text
                    opt.form.model.set opt.text, al.addr

                if opt.ref
                    $(opt.ref).val al.addr

                p.attr 'area', al.addr
                p.attr 'postcode', v
                opt.svChange?.call opt.form


            #set value
            c.val "#{pc.substring(0, 2)}0000"
            c.trigger('change')
            if opt.noSv
                sc.val pc
                sc.trigger('change')
            else
                if isZZ(pc)
                    sc.val(pc)
                    sv.hide() if sv
                else
                    sc.val "#{pc.substring(0, 4)}00"
                    sc.trigger('change')
                    sv && sv.val pc

            opt.callback?()

$.extend meta.common,
    area:
        type: 'holder'
        xtype: area
        auto: true
        attrs:
            auto: true
            ref: '#postcode'
            prop:'postcode'

    address:
        type: 'textarea'
        valid:
            required: true
            minlength: 5
            maxlength: 120

module.exports = area



#        label: '街道地址'
#        ph: '您不必重复填写省市区，必须大于5个字符，小于120个字符'
#    postcode:
#        id: 'postcode'
#        type: 'text'
#        valid:
##            required: true
#            minlength: 5
#            maxlength: 7