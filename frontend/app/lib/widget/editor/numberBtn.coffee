cf.view.numberBtn =
    fun: (opt)->
        s = 'btn ' + (opt.style || 'btn-default btn-sm')
        if opt.disabled
            s += ' disabled'
        p = $(opt.parent)
        input = p.children('input')
        if input.length is 0
            input = $("<input type='text'>")
        input.css
            width: opt.iw
        input.val opt.dv || 0
        t = $ '<div class="btn-group numberBtn"/>'
        sideBtn = "<button style='width:#{opt.bw}' type='button' class='#{s}'></button>"

        t.append $(sideBtn).html '-'
        t.append input.attr 'class', s
        t.append $(sideBtn).html '+'

        t.on 'click', 'input', (e)->
            util.esp e
        t.on 'click', 'button', (e)->
            util.esp e

            t = util.ct e
            i = t.siblings('input')
            val = +i.val()
            if !_.isNaN val
                val = val + (if t.text().trim() is '+' then 1 else -1)
            else
                val = 1
            if val < opt.min
                val++
            if opt.max && val > opt.max
                val--
            i.val val
            i.trigger 'change'
            opt.afterClick?(val, opt)

        p.append t
        if opt.val
            input.val(opt.val)
            input.trigger('change') if opt.trigger

        opt.callback?(p)

$.extend meta.common,
    numberBtn:
        type: 'text'
        xtype: cf.view.numberBtn
        attrs:
            style: 'btn-info'

module.exports = cf.view.numberBtn