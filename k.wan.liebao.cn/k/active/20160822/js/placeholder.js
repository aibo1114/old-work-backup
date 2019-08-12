/*! http://mths.be/placeholder v2.0.6 by @mathias */;
(function (g, i, d) {
    var a = 'placeholder' in i.createElement('input'),
		e = 'placeholder' in i.createElement('textarea'),
		j = d.fn,
		c = d.valHooks,
		l, k;
    if (a && e) {
        k = j.placeholder = function () {
            return this
        };
        k.input = k.textarea = true
    } else {
        k = j.placeholder = function () {
            var m = this;
            m.filter((a ? 'textarea' : ':input') + '[placeholder]').not('.placeholder').bind({
                'focus.placeholder': b,
                'blur.placeholder': f
            }).data('placeholder-enabled', true).trigger('blur.placeholder');
            return m
        };
        k.input = a;
        k.textarea = e;
        l = {
            get: function (n) {
                var m = d(n);
                return m.data('placeholder-enabled') && m.hasClass('placeholder') ? '' : n.value
            },
            set: function (n, o) {
                var m = d(n);
                if (!m.data('placeholder-enabled')) {
                    return n.value = o
                }
                if (o == '') {
                    n.value = o;
                    if (n != i.activeElement) {
                        f.call(n)
                    }
                } else {
                    if (m.hasClass('placeholder')) {
                        b.call(n, true, o) || (n.value = o)
                    } else {
                        n.value = o
                    }
                }
                return m
            }
        };
        a || (c.input = l);
        e || (c.textarea = l);
        d(function () {
            d(i).delegate('form', 'submit.placeholder', function () {
                var m = d('.placeholder', this).each(b);
                setTimeout(function () {
                    m.each(f)
                }, 10)
            })
        });
        d(g).bind('beforeunload.placeholder', function () {
            d('.placeholder').each(function () {
                this.value = ''
            })
        })
    }

    function h(n) {
        var m = {}, o = /^jQuery\d+$/;
        d.each(n.attributes, function (q, p) {
            if (p.specified && !o.test(p.name)) {
                m[p.name] = p.value
            }
        });
        return m
    }

    function b(o, p) {
        var n = this,
			q = d(n),
			m;
        if (n.value == q.attr('placeholder') && q.hasClass('placeholder')) {
            m = n == i.activeElement;
            if (q.data('placeholder-password')) {
                q = q.hide().next().show().attr('id', q.removeAttr('id').data('placeholder-id'));
                if (o === true) {
                    return q[0].value = p
                }
                q.focus()
            } else {
                n.value = '';
                q.removeClass('placeholder')
            }
            m && n.select()
        }
    }

    function f() {
        var r, m = this,
			q = d(m),
			n = q,
			p = this.id;
        if (m.value == '') {
            if (m.type == 'password') {
                
                if (!q.data('placeholder-textinput')) {
                    try {
                        r = q.clone().attr({
                            type: 'text'
                        })
                    } catch (o) {
                        r = d('<input>').attr(d.extend(h(this), {
                            type: 'text'
                        }))
                    }
                    r.removeAttr('name').data({
                        'placeholder-password': true,
                        'placeholder-id': p
                    }).bind('focus.placeholder', b);
                    q.data({
                        'placeholder-textinput': r,
                        'placeholder-id': p
                    }).before(r)
                }
                q = q.removeAttr('id').hide().prev().attr('id', p).show()
            }
            q.addClass('placeholder');
            if (m.type == 'password') {
                q[0].value = $(q[0]).attr("id");
               
            } else {
                q[0].value = q.attr('placeholder');
            }

        } else {
            q.removeClass('placeholder')
        }
    }
}(this, document, jQuery));