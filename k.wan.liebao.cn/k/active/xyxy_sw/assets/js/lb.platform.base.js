/*
依赖如下
CSS:
1.http://image.wan.liebao.cn/www/css/base.css
2.http://k.wan.liebao.cn/k/active/xyxy_sw/assets/css/toast_login.css

JS:
3.http://wan.liebao.cn/action/user_info.php?rt=5

有md5加密
http://img.wan.ijinshan.com/sdk/login/js/md5.js?t=20161027


暴露方法
登录Login_
注册Registered_
*/
function aclick_stat_v(a, b, c, d, e) {
    if (!document.getElementById("aclickiframe_down")) {
        var f = document.createElement("iframe");
        f.style.display = "none",
        f.id = "aclickiframe_down",
        f.name = "aclickiframe_down",
        document.body.appendChild(f),
        f = document.createElement("iframe"),
        f.style.display = "none",
        f.id = "aclickiframe_click",
        f.name = "aclickiframe_click",
        document.body.appendChild(f);
        var g = document.createElement("a");
        g.style.display = "none",
        g.id = "aclickia",
        g.target = "blank",
        g.name = "aclickia",
        document.body.appendChild(g)
    }
    var h = "http://wan.liebao.cn/action/api/statistics.php?platform=" + a;
    if (h += "&type=" + b,
    h += "&game=" + c,
    document.getElementById("aclickiframe_click").src = h,
    d)
        if ("download" == e)
            document.getElementById("aclickiframe_down").src = d;
        else if ("blank" == e) {
            var i = document.getElementById("aclickia");
            i.href = d;
            try {
                i.click()
            } catch (j) {
                try {
                    var k = document.createEvent("Event");
                    k.initEvent("click", !0, !0),
                    i.dispatchEvent(k),
                    i.click()
                } catch (j) {}
            }
        }
}
//登录、注册nav切换
function  toastshow(num){
  if (num==1) {
    $('.toastregistered').removeClass('toastboxselect');
      $('.toastlogin').addClass('toastboxselect');
      $('.sq-dialog-client').show();
      $('.registeredtable').hide();
  }else {
    $('.toastlogin').removeClass('toastboxselect');
      $('.toastregistered').addClass('toastboxselect');
      $('.sq-dialog-client').hide();
      $('.registeredtable').show();
  }
  ie89fixplaceholder();
}
!function(a, b) {
    function c(a) {
        var b = oa[a] = {};
        return $.each(a.split(ba), function(a, c) {
            b[c] = !0
        }),
        b
    }
    function d(a, c, d) {
        if (d === b && 1 === a.nodeType) {
            var e = "data-" + c.replace(qa, "-$1").toLowerCase();
            if (d = a.getAttribute(e),
            "string" == typeof d) {
                try {
                    d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : pa.test(d) ? $.parseJSON(d) : d
                } catch (f) {}
                $.data(a, c, d)
            } else
                d = b
        }
        return d
    }
    function e(a) {
        var b;
        for (b in a)
            if (("data" !== b || !$.isEmptyObject(a[b])) && "toJSON" !== b)
                return !1;
        return !0
    }
    function f() {
        return !1
    }
    function g() {
        return !0
    }
    function h(a) {
        return !a || !a.parentNode || 11 === a.parentNode.nodeType
    }
    function i(a, b) {
        do
            a = a[b];
        while (a && 1 !== a.nodeType);return a
    }
    function j(a, b, c) {
        if (b = b || 0,
        $.isFunction(b))
            return $.grep(a, function(a, d) {
                var e = !!b.call(a, d, a);
                return e === c
            });
        if (b.nodeType)
            return $.grep(a, function(a, d) {
                return a === b === c
            });
        if ("string" == typeof b) {
            var d = $.grep(a, function(a) {
                return 1 === a.nodeType
            });
            if (Ka.test(b))
                return $.filter(b, d, !c);
            b = $.filter(b, d)
        }
        return $.grep(a, function(a, d) {
            return $.inArray(a, b) >= 0 === c
        })
    }
    function k(a) {
        var b = Na.split("|")
          , c = a.createDocumentFragment();
        if (c.createElement)
            for (; b.length; )
                c.createElement(b.pop());
        return c
    }
    function l(a, b) {
        return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
    }
    function m(a, b) {
        if (1 === b.nodeType && $.hasData(a)) {
            var c, d, e, f = $._data(a), g = $._data(b, f), h = f.events;
            if (h) {
                delete g.handle,
                g.events = {};
                for (c in h)
                    for (d = 0,
                    e = h[c].length; e > d; d++)
                        $.event.add(b, c, h[c][d])
            }
            g.data && (g.data = $.extend({}, g.data))
        }
    }
    function n(a, b) {
        var c;
        1 === b.nodeType && (b.clearAttributes && b.clearAttributes(),
        b.mergeAttributes && b.mergeAttributes(a),
        c = b.nodeName.toLowerCase(),
        "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML),
        $.support.html5Clone && a.innerHTML && !$.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Xa.test(a.type) ? (b.defaultChecked = b.checked = a.checked,
        b.value !== a.value && (b.value = a.value)) : "option" === c ? b.selected = a.defaultSelected : "input" === c || "textarea" === c ? b.defaultValue = a.defaultValue : "script" === c && b.text !== a.text && (b.text = a.text),
        b.removeAttribute($.expando))
    }
    function o(a) {
        return "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName("*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll("*") : []
    }
    function p(a) {
        Xa.test(a.type) && (a.defaultChecked = a.checked)
    }
    function q(a, b) {
        if (b in a)
            return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = rb.length; e--; )
            if (b = rb[e] + c,
            b in a)
                return b;
        return d
    }
    function r(a, b) {
        return a = b || a,
        "none" === $.css(a, "display") || !$.contains(a.ownerDocument, a)
    }
    function s(a, b) {
        for (var c, d, e = [], f = 0, g = a.length; g > f; f++)
            c = a[f],
            c.style && (e[f] = $._data(c, "olddisplay"),
            b ? (e[f] || "none" !== c.style.display || (c.style.display = ""),
            "" === c.style.display && r(c) && (e[f] = $._data(c, "olddisplay", w(c.nodeName)))) : (d = cb(c, "display"),
            e[f] || "none" === d || $._data(c, "olddisplay", d)));
        for (f = 0; g > f; f++)
            c = a[f],
            c.style && (b && "none" !== c.style.display && "" !== c.style.display || (c.style.display = b ? e[f] || "" : "none"));
        return a
    }
    function t(a, b, c) {
        var d = kb.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }
    function u(a, b, c, d) {
        for (var e = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, f = 0; 4 > e; e += 2)
            "margin" === c && (f += $.css(a, c + qb[e], !0)),
            d ? ("content" === c && (f -= parseFloat(cb(a, "padding" + qb[e])) || 0),
            "margin" !== c && (f -= parseFloat(cb(a, "border" + qb[e] + "Width")) || 0)) : (f += parseFloat(cb(a, "padding" + qb[e])) || 0,
            "padding" !== c && (f += parseFloat(cb(a, "border" + qb[e] + "Width")) || 0));
        return f
    }
    function v(a, b, c) {
        var d = "width" === b ? a.offsetWidth : a.offsetHeight
          , e = !0
          , f = $.support.boxSizing && "border-box" === $.css(a, "boxSizing");
        if (0 >= d || null == d) {
            if (d = cb(a, b),
            (0 > d || null == d) && (d = a.style[b]),
            lb.test(d))
                return d;
            e = f && ($.support.boxSizingReliable || d === a.style[b]),
            d = parseFloat(d) || 0
        }
        return d + u(a, b, c || (f ? "border" : "content"), e) + "px"
    }
    function w(a) {
        if (nb[a])
            return nb[a];
        var b = $("<" + a + ">").appendTo(P.body)
          , c = b.css("display");
        return b.remove(),
        ("none" === c || "" === c) && (db = P.body.appendChild(db || $.extend(P.createElement("iframe"), {
            frameBorder: 0,
            width: 0,
            height: 0
        })),
        eb && db.createElement || (eb = (db.contentWindow || db.contentDocument).document,
        eb.write("<!doctype html><html><body>"),
        eb.close()),
        b = eb.body.appendChild(eb.createElement(a)),
        c = cb(b, "display"),
        P.body.removeChild(db)),
        nb[a] = c,
        c
    }
    function x(a, b, c, d) {
        var e;
        if ($.isArray(b))
            $.each(b, function(b, e) {
                c || ub.test(a) ? d(a, e) : x(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
            });
        else if (c || "object" !== $.type(b))
            d(a, b);
        else
            for (e in b)
                x(a + "[" + e + "]", b[e], c, d)
    }
    function y(a) {
        return function(b, c) {
            "string" != typeof b && (c = b,
            b = "*");
            var d, e, f, g = b.toLowerCase().split(ba), h = 0, i = g.length;
            if ($.isFunction(c))
                for (; i > h; h++)
                    d = g[h],
                    f = /^\+/.test(d),
                    f && (d = d.substr(1) || "*"),
                    e = a[d] = a[d] || [],
                    e[f ? "unshift" : "push"](c)
        }
    }
    function z(a, c, d, e, f, g) {
        f = f || c.dataTypes[0],
        g = g || {},
        g[f] = !0;
        for (var h, i = a[f], j = 0, k = i ? i.length : 0, l = a === Kb; k > j && (l || !h); j++)
            h = i[j](c, d, e),
            "string" == typeof h && (!l || g[h] ? h = b : (c.dataTypes.unshift(h),
            h = z(a, c, d, e, h, g)));
        return !l && h || g["*"] || (h = z(a, c, d, e, "*", g)),
        h
    }
    function A(a, c) {
        var d, e, f = $.ajaxSettings.flatOptions || {};
        for (d in c)
            c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
        e && $.extend(!0, a, e)
    }
    function B(a, c, d) {
        var e, f, g, h, i = a.contents, j = a.dataTypes, k = a.responseFields;
        for (f in k)
            f in d && (c[k[f]] = d[f]);
        for (; "*" === j[0]; )
            j.shift(),
            e === b && (e = a.mimeType || c.getResponseHeader("content-type"));
        if (e)
            for (f in i)
                if (i[f] && i[f].test(e)) {
                    j.unshift(f);
                    break
                }
        if (j[0]in d)
            g = j[0];
        else {
            for (f in d) {
                if (!j[0] || a.converters[f + " " + j[0]]) {
                    g = f;
                    break
                }
                h || (h = f)
            }
            g = g || h
        }
        return g ? (g !== j[0] && j.unshift(g),
        d[g]) : void 0
    }
    function C(a, b) {
        var c, d, e, f, g = a.dataTypes.slice(), h = g[0], i = {}, j = 0;
        if (a.dataFilter && (b = a.dataFilter(b, a.dataType)),
        g[1])
            for (c in a.converters)
                i[c.toLowerCase()] = a.converters[c];
        for (; e = g[++j]; )
            if ("*" !== e) {
                if ("*" !== h && h !== e) {
                    if (c = i[h + " " + e] || i["* " + e],
                    !c)
                        for (d in i)
                            if (f = d.split(" "),
                            f[1] === e && (c = i[h + " " + f[0]] || i["* " + f[0]])) {
                                c === !0 ? c = i[d] : i[d] !== !0 && (e = f[0],
                                g.splice(j--, 0, e));
                                break
                            }
                    if (c !== !0)
                        if (c && a["throws"])
                            b = c(b);
                        else
                            try {
                                b = c(b)
                            } catch (k) {
                                return {
                                    state: "parsererror",
                                    error: c ? k : "No conversion from " + h + " to " + e
                                }
                            }
                }
                h = e
            }
        return {
            state: "success",
            data: b
        }
    }
    function D() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }
    function E() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }
    function F() {
        return setTimeout(function() {
            Vb = b
        }, 0),
        Vb = $.now()
    }
    function G(a, b) {
        $.each(b, function(b, c) {
            for (var d = (_b[b] || []).concat(_b["*"]), e = 0, f = d.length; f > e; e++)
                if (d[e].call(a, b, c))
                    return
        })
    }
    function H(a, b, c) {
        var d, e = 0, f = $b.length, g = $.Deferred().always(function() {
            delete h.elem
        }), h = function() {
            for (var b = Vb || F(), c = Math.max(0, i.startTime + i.duration - b), d = c / i.duration || 0, e = 1 - d, f = 0, h = i.tweens.length; h > f; f++)
                i.tweens[f].run(e);
            return g.notifyWith(a, [i, e, c]),
            1 > e && h ? c : (g.resolveWith(a, [i]),
            !1)
        }, i = g.promise({
            elem: a,
            props: $.extend({}, b),
            opts: $.extend(!0, {
                specialEasing: {}
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: Vb || F(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c, d) {
                var e = $.Tween(a, i.opts, b, c, i.opts.specialEasing[b] || i.opts.easing);
                return i.tweens.push(e),
                e
            },
            stop: function(b) {
                for (var c = 0, d = b ? i.tweens.length : 0; d > c; c++)
                    i.tweens[c].run(1);
                return b ? g.resolveWith(a, [i, b]) : g.rejectWith(a, [i, b]),
                this
            }
        }), j = i.props;
        for (I(j, i.opts.specialEasing); f > e; e++)
            if (d = $b[e].call(i, a, j, i.opts))
                return d;
        return G(i, j),
        $.isFunction(i.opts.start) && i.opts.start.call(a, i),
        $.fx.timer($.extend(h, {
            anim: i,
            queue: i.opts.queue,
            elem: a
        })),
        i.progress(i.opts.progress).done(i.opts.done, i.opts.complete).fail(i.opts.fail).always(i.opts.always)
    }
    function I(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = $.camelCase(c),
            e = b[d],
            f = a[c],
            $.isArray(f) && (e = f[1],
            f = a[c] = f[0]),
            c !== d && (a[d] = f,
            delete a[c]),
            g = $.cssHooks[d],
            g && "expand"in g) {
                f = g.expand(f),
                delete a[d];
                for (c in f)
                    c in a || (a[c] = f[c],
                    b[c] = e)
            } else
                b[d] = e
    }
    function J(a, b, c) {
        var d, e, f, g, h, i, j, k, l, m = this, n = a.style, o = {}, p = [], q = a.nodeType && r(a);
        c.queue || (k = $._queueHooks(a, "fx"),
        null == k.unqueued && (k.unqueued = 0,
        l = k.empty.fire,
        k.empty.fire = function() {
            k.unqueued || l()
        }
        ),
        k.unqueued++,
        m.always(function() {
            m.always(function() {
                k.unqueued--,
                $.queue(a, "fx").length || k.empty.fire()
            })
        })),
        1 === a.nodeType && ("height"in b || "width"in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY],
        "inline" === $.css(a, "display") && "none" === $.css(a, "float") && ($.support.inlineBlockNeedsLayout && "inline" !== w(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")),
        c.overflow && (n.overflow = "hidden",
        $.support.shrinkWrapBlocks || m.done(function() {
            n.overflow = c.overflow[0],
            n.overflowX = c.overflow[1],
            n.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (f = b[d],
            Xb.exec(f)) {
                if (delete b[d],
                i = i || "toggle" === f,
                f === (q ? "hide" : "show"))
                    continue;
                p.push(d)
            }
        if (g = p.length) {
            h = $._data(a, "fxshow") || $._data(a, "fxshow", {}),
            "hidden"in h && (q = h.hidden),
            i && (h.hidden = !q),
            q ? $(a).show() : m.done(function() {
                $(a).hide()
            }),
            m.done(function() {
                var b;
                $.removeData(a, "fxshow", !0);
                for (b in o)
                    $.style(a, b, o[b])
            });
            for (d = 0; g > d; d++)
                e = p[d],
                j = m.createTween(e, q ? h[e] : 0),
                o[e] = h[e] || $.style(a, e),
                e in h || (h[e] = j.start,
                q && (j.end = j.start,
                j.start = "width" === e || "height" === e ? 1 : 0))
        }
    }
    function K(a, b, c, d, e) {
        return new K.prototype.init(a,b,c,d,e)
    }
    function L(a, b) {
        var c, d = {
            height: a
        }, e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b)
            c = qb[e],
            d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a),
        d
    }
    function M(a) {
        return $.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    var N, O, P = a.document, Q = a.location, R = a.navigator, S = a.jQuery, T = a.$, U = Array.prototype.push, V = Array.prototype.slice, W = Array.prototype.indexOf, X = Object.prototype.toString, Y = Object.prototype.hasOwnProperty, Z = String.prototype.trim, $ = function(a, b) {
        return new $.fn.init(a,b,N)
    }, _ = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, aa = /\S/, ba = /\s+/, ca = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, da = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, ea = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, fa = /^[\],:{}\s]*$/, ga = /(?:^|:|,)(?:\s*\[)+/g, ha = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, ia = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, ja = /^-ms-/, ka = /-([\da-z])/gi, la = function(a, b) {
        return (b + "").toUpperCase()
    }, ma = function() {
        P.addEventListener ? (P.removeEventListener("DOMContentLoaded", ma, !1),
        $.ready()) : "complete" === P.readyState && (P.detachEvent("onreadystatechange", ma),
        $.ready())
    }, na = {};
    $.fn = $.prototype = {
        constructor: $,
        init: function(a, c, d) {
            var e, f, g;
            if (!a)
                return this;
            if (a.nodeType)
                return this.context = this[0] = a,
                this.length = 1,
                this;
            if ("string" == typeof a) {
                if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : da.exec(a),
                !e || !e[1] && c)
                    return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a);
                if (e[1])
                    return c = c instanceof $ ? c[0] : c,
                    g = c && c.nodeType ? c.ownerDocument || c : P,
                    a = $.parseHTML(e[1], g, !0),
                    ea.test(e[1]) && $.isPlainObject(c) && this.attr.call(a, c, !0),
                    $.merge(this, a);
                if (f = P.getElementById(e[2]),
                f && f.parentNode) {
                    if (f.id !== e[2])
                        return d.find(a);
                    this.length = 1,
                    this[0] = f
                }
                return this.context = P,
                this.selector = a,
                this
            }
            return $.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector,
            this.context = a.context),
            $.makeArray(a, this))
        },
        selector: "",
        jquery: "1.8.3",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return V.call(this)
        },
        get: function(a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
        },
        pushStack: function(a, b, c) {
            var d = $.merge(this.constructor(), a);
            return d.prevObject = this,
            d.context = this.context,
            "find" === b ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"),
            d
        },
        each: function(a, b) {
            return $.each(this, a, b)
        },
        ready: function(a) {
            return $.ready.promise().done(a),
            this
        },
        eq: function(a) {
            return a = +a,
            -1 === a ? this.slice(a) : this.slice(a, a + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(V.apply(this, arguments), "slice", V.call(arguments).join(","))
        },
        map: function(a) {
            return this.pushStack($.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: U,
        sort: [].sort,
        splice: [].splice
    },
    $.fn.init.prototype = $.fn,
    $.extend = $.fn.extend = function() {
        var a, c, d, e, f, g, h = arguments[0] || {}, i = 1, j = arguments.length, k = !1;
        for ("boolean" == typeof h && (k = h,
        h = arguments[1] || {},
        i = 2),
        "object" == typeof h || $.isFunction(h) || (h = {}),
        j === i && (h = this,
        --i); j > i; i++)
            if (null != (a = arguments[i]))
                for (c in a)
                    d = h[c],
                    e = a[c],
                    h !== e && (k && e && ($.isPlainObject(e) || (f = $.isArray(e))) ? (f ? (f = !1,
                    g = d && $.isArray(d) ? d : []) : g = d && $.isPlainObject(d) ? d : {},
                    h[c] = $.extend(k, g, e)) : e !== b && (h[c] = e));
        return h
    }
    ,
    $.extend({
        noConflict: function(b) {
            return a.$ === $ && (a.$ = T),
            b && a.jQuery === $ && (a.jQuery = S),
            $
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? $.readyWait++ : $.ready(!0)
        },
        ready: function(a) {
            if (a === !0 ? !--$.readyWait : !$.isReady) {
                if (!P.body)
                    return setTimeout($.ready, 1);
                $.isReady = !0,
                a !== !0 && --$.readyWait > 0 || (O.resolveWith(P, [$]),
                $.fn.trigger && $(P).trigger("ready").off("ready"))
            }
        },
        isFunction: function(a) {
            return "function" === $.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === $.type(a)
        }
        ,
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function(a) {
            return null == a ? String(a) : na[X.call(a)] || "object"
        },
        isPlainObject: function(a) {
            if (!a || "object" !== $.type(a) || a.nodeType || $.isWindow(a))
                return !1;
            try {
                if (a.constructor && !Y.call(a, "constructor") && !Y.call(a.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (c) {
                return !1
            }
            var d;
            for (d in a)
                ;
            return d === b || Y.call(a, d)
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a)
                return !1;
            return !0
        },
        error: function(a) {
            throw new Error(a)
        },
        parseHTML: function(a, b, c) {
            var d;
            return a && "string" == typeof a ? ("boolean" == typeof b && (c = b,
            b = 0),
            b = b || P,
            (d = ea.exec(a)) ? [b.createElement(d[1])] : (d = $.buildFragment([a], b, c ? null : []),
            $.merge([], (d.cacheable ? $.clone(d.fragment) : d.fragment).childNodes))) : null
        },
        parseJSON: function(b) {
            return b && "string" == typeof b ? (b = $.trim(b),
            a.JSON && a.JSON.parse ? a.JSON.parse(b) : fa.test(b.replace(ha, "@").replace(ia, "]").replace(ga, "")) ? new Function("return " + b)() : void $.error("Invalid JSON: " + b)) : null
        },
        parseXML: function(c) {
            var d, e;
            if (!c || "string" != typeof c)
                return null;
            try {
                a.DOMParser ? (e = new DOMParser,
                d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"),
                d.async = "false",
                d.loadXML(c))
            } catch (f) {
                d = b
            }
            return d && d.documentElement && !d.getElementsByTagName("parsererror").length || $.error("Invalid XML: " + c),
            d
        },
        noop: function() {},
        globalEval: function(b) {
            b && aa.test(b) && (a.execScript || function(b) {
                a.eval.call(a, b)
            }
            )(b)
        },
        camelCase: function(a) {
            return a.replace(ja, "ms-").replace(ka, la)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, c, d) {
            var e, f = 0, g = a.length, h = g === b || $.isFunction(a);
            if (d)
                if (h) {
                    for (e in a)
                        if (c.apply(a[e], d) === !1)
                            break
                } else
                    for (; g > f && c.apply(a[f++], d) !== !1; )
                        ;
            else if (h) {
                for (e in a)
                    if (c.call(a[e], e, a[e]) === !1)
                        break
            } else
                for (; g > f && c.call(a[f], f, a[f++]) !== !1; )
                    ;
            return a
        },
        trim: Z && !Z.call("\ufeff ") ? function(a) {
            return null == a ? "" : Z.call(a)
        }
        : function(a) {
            return null == a ? "" : (a + "").replace(ca, "")
        }
        ,
        makeArray: function(a, b) {
            var c, d = b || [];
            return null != a && (c = $.type(a),
            null == a.length || "string" === c || "function" === c || "regexp" === c || $.isWindow(a) ? U.call(d, a) : $.merge(d, a)),
            d
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if (W)
                    return W.call(b, a, c);
                for (d = b.length,
                c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                    if (c in b && b[c] === a)
                        return c
            }
            return -1
        },
        merge: function(a, c) {
            var d = c.length
              , e = a.length
              , f = 0;
            if ("number" == typeof d)
                for (; d > f; f++)
                    a[e++] = c[f];
            else
                for (; c[f] !== b; )
                    a[e++] = c[f++];
            return a.length = e,
            a
        },
        grep: function(a, b, c) {
            var d, e = [], f = 0, g = a.length;
            for (c = !!c; g > f; f++)
                d = !!b(a[f], f),
                c !== d && e.push(a[f]);
            return e
        },
        map: function(a, c, d) {
            var e, f, g = [], h = 0, i = a.length, j = a instanceof $ || i !== b && "number" == typeof i && (i > 0 && a[0] && a[i - 1] || 0 === i || $.isArray(a));
            if (j)
                for (; i > h; h++)
                    e = c(a[h], h, d),
                    null != e && (g[g.length] = e);
            else
                for (f in a)
                    e = c(a[f], f, d),
                    null != e && (g[g.length] = e);
            return g.concat.apply([], g)
        },
        guid: 1,
        proxy: function(a, c) {
            var d, e, f;
            return "string" == typeof c && (d = a[c],
            c = a,
            a = d),
            $.isFunction(a) ? (e = V.call(arguments, 2),
            f = function() {
                return a.apply(c, e.concat(V.call(arguments)))
            }
            ,
            f.guid = a.guid = a.guid || $.guid++,
            f) : b
        },
        access: function(a, c, d, e, f, g, h) {
            var i, j = null == d, k = 0, l = a.length;
            if (d && "object" == typeof d) {
                for (k in d)
                    $.access(a, c, k, d[k], 1, g, e);
                f = 1
            } else if (e !== b) {
                if (i = h === b && $.isFunction(e),
                j && (i ? (i = c,
                c = function(a, b, c) {
                    return i.call($(a), c)
                }
                ) : (c.call(a, e),
                c = null)),
                c)
                    for (; l > k; k++)
                        c(a[k], d, i ? e.call(a[k], k, c(a[k], d)) : e, h);
                f = 1
            }
            return f ? a : j ? c.call(a) : l ? c(a[0], d) : g
        },
        now: function() {
            return (new Date).getTime()
        }
    }),
    $.ready.promise = function(b) {
        if (!O)
            if (O = $.Deferred(),
            "complete" === P.readyState)
                setTimeout($.ready, 1);
            else if (P.addEventListener)
                P.addEventListener("DOMContentLoaded", ma, !1),
                a.addEventListener("load", $.ready, !1);
            else {
                P.attachEvent("onreadystatechange", ma),
                a.attachEvent("onload", $.ready);
                var c = !1;
                try {
                    c = null == a.frameElement && P.documentElement
                } catch (d) {}
                c && c.doScroll && !function e() {
                    if (!$.isReady) {
                        try {
                            c.doScroll("left")
                        } catch (a) {
                            return setTimeout(e, 50)
                        }
                        $.ready()
                    }
                }()
            }
        return O.promise(b)
    }
    ,
    $.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
        na["[object " + b + "]"] = b.toLowerCase()
    }),
    N = $(P);
    var oa = {};
    $.Callbacks = function(a) {
        a = "string" == typeof a ? oa[a] || c(a) : $.extend({}, a);
        var d, e, f, g, h, i, j = [], k = !a.once && [], l = function(b) {
            for (d = a.memory && b,
            e = !0,
            i = g || 0,
            g = 0,
            h = j.length,
            f = !0; j && h > i; i++)
                if (j[i].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                    d = !1;
                    break
                }
            f = !1,
            j && (k ? k.length && l(k.shift()) : d ? j = [] : m.disable())
        }, m = {
            add: function() {
                if (j) {
                    var b = j.length;
                    !function c(b) {
                        $.each(b, function(b, d) {
                            var e = $.type(d);
                            "function" === e ? a.unique && m.has(d) || j.push(d) : d && d.length && "string" !== e && c(d)
                        })
                    }(arguments),
                    f ? h = j.length : d && (g = b,
                    l(d))
                }
                return this
            },
            remove: function() {
                return j && $.each(arguments, function(a, b) {
                    for (var c; (c = $.inArray(b, j, c)) > -1; )
                        j.splice(c, 1),
                        f && (h >= c && h--,
                        i >= c && i--)
                }),
                this
            },
            has: function(a) {
                return $.inArray(a, j) > -1
            },
            empty: function() {
                return j = [],
                this
            },
            disable: function() {
                return j = k = d = b,
                this
            },
            disabled: function() {
                return !j
            },
            lock: function() {
                return k = b,
                d || m.disable(),
                this
            },
            locked: function() {
                return !k
            },
            fireWith: function(a, b) {
                return b = b || [],
                b = [a, b.slice ? b.slice() : b],
                !j || e && !k || (f ? k.push(b) : l(b)),
                this
            },
            fire: function() {
                return m.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!e
            }
        };
        return m
    }
    ,
    $.extend({
        Deferred: function(a) {
            var b = [["resolve", "done", $.Callbacks("once memory"), "resolved"], ["reject", "fail", $.Callbacks("once memory"), "rejected"], ["notify", "progress", $.Callbacks("memory")]]
              , c = "pending"
              , d = {
                state: function() {
                    return c
                },
                always: function() {
                    return e.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var a = arguments;
                    return $.Deferred(function(c) {
                        $.each(b, function(b, d) {
                            var f = d[0]
                              , g = a[b];
                            e[d[1]]($.isFunction(g) ? function() {
                                var a = g.apply(this, arguments);
                                a && $.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f + "With"](this === e ? c : this, [a])
                            }
                            : c[f])
                        }),
                        a = null
                    }).promise()
                },
                promise: function(a) {
                    return null != a ? $.extend(a, d) : d
                }
            }
              , e = {};
            return d.pipe = d.then,
            $.each(b, function(a, f) {
                var g = f[2]
                  , h = f[3];
                d[f[1]] = g.add,
                h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock),
                e[f[0]] = g.fire,
                e[f[0] + "With"] = g.fireWith
            }),
            d.promise(e),
            a && a.call(e, e),
            e
        },
        when: function(a) {
            var b, c, d, e = 0, f = V.call(arguments), g = f.length, h = 1 !== g || a && $.isFunction(a.promise) ? g : 0, i = 1 === h ? a : $.Deferred(), j = function(a, c, d) {
                return function(e) {
                    c[a] = this,
                    d[a] = arguments.length > 1 ? V.call(arguments) : e,
                    d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                }
            };
            if (g > 1)
                for (b = new Array(g),
                c = new Array(g),
                d = new Array(g); g > e; e++)
                    f[e] && $.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f),
            i.promise()
        }
    }),
    $.support = function() {
        var b, c, d, e, f, g, h, i, j, k, l, m = P.createElement("div");
        if (m.setAttribute("className", "t"),
        m.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        c = m.getElementsByTagName("*"),
        d = m.getElementsByTagName("a")[0],
        !c || !d || !c.length)
            return {};
        e = P.createElement("select"),
        f = e.appendChild(P.createElement("option")),
        g = m.getElementsByTagName("input")[0],
        d.style.cssText = "top:1px;float:left;opacity:.5",
        b = {
            leadingWhitespace: 3 === m.firstChild.nodeType,
            tbody: !m.getElementsByTagName("tbody").length,
            htmlSerialize: !!m.getElementsByTagName("link").length,
            style: /top/.test(d.getAttribute("style")),
            hrefNormalized: "/a" === d.getAttribute("href"),
            opacity: /^0.5/.test(d.style.opacity),
            cssFloat: !!d.style.cssFloat,
            checkOn: "on" === g.value,
            optSelected: f.selected,
            getSetAttribute: "t" !== m.className,
            enctype: !!P.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== P.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === P.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        },
        g.checked = !0,
        b.noCloneChecked = g.cloneNode(!0).checked,
        e.disabled = !0,
        b.optDisabled = !f.disabled;
        try {
            delete m.test
        } catch (n) {
            b.deleteExpando = !1
        }
        if (!m.addEventListener && m.attachEvent && m.fireEvent && (m.attachEvent("onclick", l = function() {
            b.noCloneEvent = !1
        }
        ),
        m.cloneNode(!0).fireEvent("onclick"),
        m.detachEvent("onclick", l)),
        g = P.createElement("input"),
        g.value = "t",
        g.setAttribute("type", "radio"),
        b.radioValue = "t" === g.value,
        g.setAttribute("checked", "checked"),
        g.setAttribute("name", "t"),
        m.appendChild(g),
        h = P.createDocumentFragment(),
        h.appendChild(m.lastChild),
        b.checkClone = h.cloneNode(!0).cloneNode(!0).lastChild.checked,
        b.appendChecked = g.checked,
        h.removeChild(g),
        h.appendChild(m),
        m.attachEvent)
            for (j in {
                submit: !0,
                change: !0,
                focusin: !0
            })
                i = "on" + j,
                k = i in m,
                k || (m.setAttribute(i, "return;"),
                k = "function" == typeof m[i]),
                b[j + "Bubbles"] = k;
        return $(function() {
            var c, d, e, f, g = "padding:0;margin:0;border:0;display:block;overflow:hidden;", h = P.getElementsByTagName("body")[0];
            h && (c = P.createElement("div"),
            c.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",
            h.insertBefore(c, h.firstChild),
            d = P.createElement("div"),
            c.appendChild(d),
            d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            e = d.getElementsByTagName("td"),
            e[0].style.cssText = "padding:0;margin:0;border:0;display:none",
            k = 0 === e[0].offsetHeight,
            e[0].style.display = "",
            e[1].style.display = "none",
            b.reliableHiddenOffsets = k && 0 === e[0].offsetHeight,
            d.innerHTML = "",
            d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
            b.boxSizing = 4 === d.offsetWidth,
            b.doesNotIncludeMarginInBodyOffset = 1 !== h.offsetTop,
            a.getComputedStyle && (b.pixelPosition = "1%" !== (a.getComputedStyle(d, null) || {}).top,
            b.boxSizingReliable = "4px" === (a.getComputedStyle(d, null) || {
                width: "4px"
            }).width,
            f = P.createElement("div"),
            f.style.cssText = d.style.cssText = g,
            f.style.marginRight = f.style.width = "0",
            d.style.width = "1px",
            d.appendChild(f),
            b.reliableMarginRight = !parseFloat((a.getComputedStyle(f, null) || {}).marginRight)),
            "undefined" != typeof d.style.zoom && (d.innerHTML = "",
            d.style.cssText = g + "width:1px;padding:1px;display:inline;zoom:1",
            b.inlineBlockNeedsLayout = 3 === d.offsetWidth,
            d.style.display = "block",
            d.style.overflow = "visible",
            d.innerHTML = "<div></div>",
            d.firstChild.style.width = "5px",
            b.shrinkWrapBlocks = 3 !== d.offsetWidth,
            c.style.zoom = 1),
            h.removeChild(c),
            c = d = e = f = null)
        }),
        h.removeChild(m),
        c = d = e = f = g = h = m = null,
        b
    }();
    var pa = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/
      , qa = /([A-Z])/g;
    $.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + ($.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            return a = a.nodeType ? $.cache[a[$.expando]] : a[$.expando],
            !!a && !e(a)
        },
        data: function(a, c, d, e) {
            if ($.acceptData(a)) {
                var f, g, h = $.expando, i = "string" == typeof c, j = a.nodeType, k = j ? $.cache : a, l = j ? a[h] : a[h] && h;
                if (l && k[l] && (e || k[l].data) || !i || d !== b)
                    return l || (j ? a[h] = l = $.deletedIds.pop() || $.guid++ : l = h),
                    k[l] || (k[l] = {},
                    j || (k[l].toJSON = $.noop)),
                    ("object" == typeof c || "function" == typeof c) && (e ? k[l] = $.extend(k[l], c) : k[l].data = $.extend(k[l].data, c)),
                    f = k[l],
                    e || (f.data || (f.data = {}),
                    f = f.data),
                    d !== b && (f[$.camelCase(c)] = d),
                    i ? (g = f[c],
                    null == g && (g = f[$.camelCase(c)])) : g = f,
                    g
            }
        },
        removeData: function(a, b, c) {
            if ($.acceptData(a)) {
                var d, f, g, h = a.nodeType, i = h ? $.cache : a, j = h ? a[$.expando] : $.expando;
                if (i[j]) {
                    if (b && (d = c ? i[j] : i[j].data)) {
                        $.isArray(b) || (b in d ? b = [b] : (b = $.camelCase(b),
                        b = b in d ? [b] : b.split(" ")));
                        for (f = 0,
                        g = b.length; g > f; f++)
                            delete d[b[f]];
                        if (!(c ? e : $.isEmptyObject)(d))
                            return
                    }
                    (c || (delete i[j].data,
                    e(i[j]))) && (h ? $.cleanData([a], !0) : $.support.deleteExpando || i != i.window ? delete i[j] : i[j] = null)
                }
            }
        },
        _data: function(a, b, c) {
            return $.data(a, b, c, !0)
        },
        acceptData: function(a) {
            var b = a.nodeName && $.noData[a.nodeName.toLowerCase()];
            return !b || b !== !0 && a.getAttribute("classid") === b
        }
    }),
    $.fn.extend({
        data: function(a, c) {
            var e, f, g, h, i, j = this[0], k = 0, l = null;
            if (a === b) {
                if (this.length && (l = $.data(j),
                1 === j.nodeType && !$._data(j, "parsedAttrs"))) {
                    for (g = j.attributes,
                    i = g.length; i > k; k++)
                        h = g[k].name,
                        h.indexOf("data-") || (h = $.camelCase(h.substring(5)),
                        d(j, h, l[h]));
                    $._data(j, "parsedAttrs", !0)
                }
                return l
            }
            return "object" == typeof a ? this.each(function() {
                $.data(this, a)
            }) : (e = a.split(".", 2),
            e[1] = e[1] ? "." + e[1] : "",
            f = e[1] + "!",
            $.access(this, function(c) {
                return c === b ? (l = this.triggerHandler("getData" + f, [e[0]]),
                l === b && j && (l = $.data(j, a),
                l = d(j, a, l)),
                l === b && e[1] ? this.data(e[0]) : l) : (e[1] = c,
                void this.each(function() {
                    var b = $(this);
                    b.triggerHandler("setData" + f, e),
                    $.data(this, a, c),
                    b.triggerHandler("changeData" + f, e)
                }))
            }, null, c, arguments.length > 1, null, !1))
        },
        removeData: function(a) {
            return this.each(function() {
                $.removeData(this, a)
            })
        }
    }),
    $.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue",
            d = $._data(a, b),
            c && (!d || $.isArray(c) ? d = $._data(a, b, $.makeArray(c)) : d.push(c)),
            d || []) : void 0
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = $.queue(a, b)
              , d = c.length
              , e = c.shift()
              , f = $._queueHooks(a, b)
              , g = function() {
                $.dequeue(a, b)
            };
            "inprogress" === e && (e = c.shift(),
            d--),
            e && ("fx" === b && c.unshift("inprogress"),
            delete f.stop,
            e.call(a, g, f)),
            !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return $._data(a, c) || $._data(a, c, {
                empty: $.Callbacks("once memory").add(function() {
                    $.removeData(a, b + "queue", !0),
                    $.removeData(a, c, !0)
                })
            })
        }
    }),
    $.fn.extend({
        queue: function(a, c) {
            var d = 2;
            return "string" != typeof a && (c = a,
            a = "fx",
            d--),
            arguments.length < d ? $.queue(this[0], a) : c === b ? this : this.each(function() {
                var b = $.queue(this, a, c);
                $._queueHooks(this, a),
                "fx" === a && "inprogress" !== b[0] && $.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                $.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            return a = $.fx ? $.fx.speeds[a] || a : a,
            b = b || "fx",
            this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, c) {
            var d, e = 1, f = $.Deferred(), g = this, h = this.length, i = function() {
                --e || f.resolveWith(g, [g])
            };
            for ("string" != typeof a && (c = a,
            a = b),
            a = a || "fx"; h--; )
                d = $._data(g[h], a + "queueHooks"),
                d && d.empty && (e++,
                d.empty.add(i));
            return i(),
            f.promise(c)
        }
    });
    var ra, sa, ta, ua = /[\t\r\n]/g, va = /\r/g, wa = /^(?:button|input)$/i, xa = /^(?:button|input|object|select|textarea)$/i, ya = /^a(?:rea|)$/i, za = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, Aa = $.support.getSetAttribute;
    $.fn.extend({
        attr: function(a, b) {
            return $.access(this, $.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                $.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return $.access(this, $.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return a = $.propFix[a] || a,
            this.each(function() {
                try {
                    this[a] = b,
                    delete this[a]
                } catch (c) {}
            })
        },
        addClass: function(a) {
            var b, c, d, e, f, g, h;
            if ($.isFunction(a))
                return this.each(function(b) {
                    $(this).addClass(a.call(this, b, this.className))
                });
            if (a && "string" == typeof a)
                for (b = a.split(ba),
                c = 0,
                d = this.length; d > c; c++)
                    if (e = this[c],
                    1 === e.nodeType)
                        if (e.className || 1 !== b.length) {
                            for (f = " " + e.className + " ",
                            g = 0,
                            h = b.length; h > g; g++)
                                f.indexOf(" " + b[g] + " ") < 0 && (f += b[g] + " ");
                            e.className = $.trim(f)
                        } else
                            e.className = a;
            return this
        },
        removeClass: function(a) {
            var c, d, e, f, g, h, i;
            if ($.isFunction(a))
                return this.each(function(b) {
                    $(this).removeClass(a.call(this, b, this.className))
                });
            if (a && "string" == typeof a || a === b)
                for (c = (a || "").split(ba),
                h = 0,
                i = this.length; i > h; h++)
                    if (e = this[h],
                    1 === e.nodeType && e.className) {
                        for (d = (" " + e.className + " ").replace(ua, " "),
                        f = 0,
                        g = c.length; g > f; f++)
                            for (; d.indexOf(" " + c[f] + " ") >= 0; )
                                d = d.replace(" " + c[f] + " ", " ");
                        e.className = a ? $.trim(d) : ""
                    }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a
              , d = "boolean" == typeof b;
            return $.isFunction(a) ? this.each(function(c) {
                $(this).toggleClass(a.call(this, c, this.className, b), b)
            }) : this.each(function() {
                if ("string" === c)
                    for (var e, f = 0, g = $(this), h = b, i = a.split(ba); e = i[f++]; )
                        h = d ? h : !g.hasClass(e),
                        g[h ? "addClass" : "removeClass"](e);
                else
                    ("undefined" === c || "boolean" === c) && (this.className && $._data(this, "__className__", this.className),
                    this.className = this.className || a === !1 ? "" : $._data(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ua, " ").indexOf(b) >= 0)
                    return !0;
            return !1
        },
        val: function(a) {
            var c, d, e, f = this[0];
            {
                if (arguments.length)
                    return e = $.isFunction(a),
                    this.each(function(d) {
                        var f, g = $(this);
                        1 === this.nodeType && (f = e ? a.call(this, d, g.val()) : a,
                        null == f ? f = "" : "number" == typeof f ? f += "" : $.isArray(f) && (f = $.map(f, function(a) {
                            return null == a ? "" : a + ""
                        })),
                        c = $.valHooks[this.type] || $.valHooks[this.nodeName.toLowerCase()],
                        c && "set"in c && c.set(this, f, "value") !== b || (this.value = f))
                    });
                if (f)
                    return c = $.valHooks[f.type] || $.valHooks[f.nodeName.toLowerCase()],
                    c && "get"in c && (d = c.get(f, "value")) !== b ? d : (d = f.value,
                    "string" == typeof d ? d.replace(va, "") : null == d ? "" : d)
            }
        }
    }),
    $.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i],
                        (c.selected || i === e) && ($.support.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !$.nodeName(c.parentNode, "optgroup"))) {
                            if (b = $(c).val(),
                            f)
                                return b;
                            g.push(b)
                        }
                    return g
                },
                set: function(a, b) {
                    var c = $.makeArray(b);
                    return $(a).find("option").each(function() {
                        this.selected = $.inArray($(this).val(), c) >= 0
                    }),
                    c.length || (a.selectedIndex = -1),
                    c
                }
            }
        },
        attrFn: {},
        attr: function(a, c, d, e) {
            var f, g, h, i = a.nodeType;
            if (a && 3 !== i && 8 !== i && 2 !== i)
                return e && $.isFunction($.fn[c]) ? $(a)[c](d) : "undefined" == typeof a.getAttribute ? $.prop(a, c, d) : (h = 1 !== i || !$.isXMLDoc(a),
                h && (c = c.toLowerCase(),
                g = $.attrHooks[c] || (za.test(c) ? sa : ra)),
                d !== b ? null === d ? void $.removeAttr(a, c) : g && "set"in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, d + ""),
                d) : g && "get"in g && h && null !== (f = g.get(a, c)) ? f : (f = a.getAttribute(c),
                null === f ? b : f))
        },
        removeAttr: function(a, b) {
            var c, d, e, f, g = 0;
            if (b && 1 === a.nodeType)
                for (d = b.split(ba); g < d.length; g++)
                    e = d[g],
                    e && (c = $.propFix[e] || e,
                    f = za.test(e),
                    f || $.attr(a, e, ""),
                    a.removeAttribute(Aa ? e : c),
                    f && c in a && (a[c] = !1))
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (wa.test(a.nodeName) && a.parentNode)
                        $.error("type property can't be changed");
                    else if (!$.support.radioValue && "radio" === b && $.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b),
                        c && (a.value = c),
                        b
                    }
                }
            },
            value: {
                get: function(a, b) {
                    return ra && $.nodeName(a, "button") ? ra.get(a, b) : b in a ? a.value : null
                },
                set: function(a, b, c) {
                    return ra && $.nodeName(a, "button") ? ra.set(a, b, c) : void (a.value = b)
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, c, d) {
            var e, f, g, h = a.nodeType;
            if (a && 3 !== h && 8 !== h && 2 !== h)
                return g = 1 !== h || !$.isXMLDoc(a),
                g && (c = $.propFix[c] || c,
                f = $.propHooks[c]),
                d !== b ? f && "set"in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get"in f && null !== (e = f.get(a, c)) ? e : a[c]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : xa.test(a.nodeName) || ya.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }),
    sa = {
        get: function(a, c) {
            var d, e = $.prop(a, c);
            return e === !0 || "boolean" != typeof e && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        },
        set: function(a, b, c) {
            var d;
            return b === !1 ? $.removeAttr(a, c) : (d = $.propFix[c] || c,
            d in a && (a[d] = !0),
            a.setAttribute(c, c.toLowerCase())),
            c
        }
    },
    Aa || (ta = {
        name: !0,
        id: !0,
        coords: !0
    },
    ra = $.valHooks.button = {
        get: function(a, c) {
            var d;
            return d = a.getAttributeNode(c),
            d && (ta[c] ? "" !== d.value : d.specified) ? d.value : b
        },
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || (d = P.createAttribute(c),
            a.setAttributeNode(d)),
            d.value = b + ""
        }
    },
    $.each(["width", "height"], function(a, b) {
        $.attrHooks[b] = $.extend($.attrHooks[b], {
            set: function(a, c) {
                return "" === c ? (a.setAttribute(b, "auto"),
                c) : void 0
            }
        })
    }),
    $.attrHooks.contenteditable = {
        get: ra.get,
        set: function(a, b, c) {
            "" === b && (b = "false"),
            ra.set(a, b, c)
        }
    }),
    $.support.hrefNormalized || $.each(["href", "src", "width", "height"], function(a, c) {
        $.attrHooks[c] = $.extend($.attrHooks[c], {
            get: function(a) {
                var d = a.getAttribute(c, 2);
                return null === d ? b : d
            }
        })
    }),
    $.support.style || ($.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || b
        },
        set: function(a, b) {
            return a.style.cssText = b + ""
        }
    }),
    $.support.optSelected || ($.propHooks.selected = $.extend($.propHooks.selected, {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex,
            b.parentNode && b.parentNode.selectedIndex),
            null
        }
    })),
    $.support.enctype || ($.propFix.enctype = "encoding"),
    $.support.checkOn || $.each(["radio", "checkbox"], function() {
        $.valHooks[this] = {
            get: function(a) {
                return null === a.getAttribute("value") ? "on" : a.value
            }
        }
    }),
    $.each(["radio", "checkbox"], function() {
        $.valHooks[this] = $.extend($.valHooks[this], {
            set: function(a, b) {
                return $.isArray(b) ? a.checked = $.inArray($(a).val(), b) >= 0 : void 0
            }
        })
    });
    var Ba = /^(?:textarea|input|select)$/i
      , Ca = /^([^\.]*|)(?:\.(.+)|)$/
      , Da = /(?:^|\s)hover(\.\S+|)\b/
      , Ea = /^key/
      , Fa = /^(?:mouse|contextmenu)|click/
      , Ga = /^(?:focusinfocus|focusoutblur)$/
      , Ha = function(a) {
        return $.event.special.hover ? a : a.replace(Da, "mouseenter$1 mouseleave$1")
    };
    $.event = {
        add: function(a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o, p, q;
            if (3 !== a.nodeType && 8 !== a.nodeType && c && d && (g = $._data(a))) {
                for (d.handler && (o = d,
                d = o.handler,
                f = o.selector),
                d.guid || (d.guid = $.guid++),
                i = g.events,
                i || (g.events = i = {}),
                h = g.handle,
                h || (g.handle = h = function(a) {
                    return "undefined" == typeof $ || a && $.event.triggered === a.type ? b : $.event.dispatch.apply(h.elem, arguments)
                }
                ,
                h.elem = a),
                c = $.trim(Ha(c)).split(" "),
                j = 0; j < c.length; j++)
                    k = Ca.exec(c[j]) || [],
                    l = k[1],
                    m = (k[2] || "").split(".").sort(),
                    q = $.event.special[l] || {},
                    l = (f ? q.delegateType : q.bindType) || l,
                    q = $.event.special[l] || {},
                    n = $.extend({
                        type: l,
                        origType: k[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: f,
                        needsContext: f && $.expr.match.needsContext.test(f),
                        namespace: m.join(".")
                    }, o),
                    p = i[l],
                    p || (p = i[l] = [],
                    p.delegateCount = 0,
                    q.setup && q.setup.call(a, e, m, h) !== !1 || (a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h))),
                    q.add && (q.add.call(a, n),
                    n.handler.guid || (n.handler.guid = d.guid)),
                    f ? p.splice(p.delegateCount++, 0, n) : p.push(n),
                    $.event.global[l] = !0;
                a = null
            }
        },
        global: {},
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = $.hasData(a) && $._data(a);
            if (q && (m = q.events)) {
                for (b = $.trim(Ha(b || "")).split(" "),
                f = 0; f < b.length; f++)
                    if (g = Ca.exec(b[f]) || [],
                    h = i = g[1],
                    j = g[2],
                    h) {
                        for (n = $.event.special[h] || {},
                        h = (d ? n.delegateType : n.bindType) || h,
                        o = m[h] || [],
                        k = o.length,
                        j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                        l = 0; l < o.length; l++)
                            p = o[l],
                            !e && i !== p.origType || c && c.guid !== p.guid || j && !j.test(p.namespace) || d && d !== p.selector && ("**" !== d || !p.selector) || (o.splice(l--, 1),
                            p.selector && o.delegateCount--,
                            n.remove && n.remove.call(a, p));
                        0 === o.length && k !== o.length && (n.teardown && n.teardown.call(a, j, q.handle) !== !1 || $.removeEvent(a, h, q.handle),
                        delete m[h])
                    } else
                        for (h in m)
                            $.event.remove(a, h + b[f], c, d, !0);
                $.isEmptyObject(m) && (delete q.handle,
                $.removeData(a, "events", !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(c, d, e, f) {
            if (!e || 3 !== e.nodeType && 8 !== e.nodeType) {
                var g, h, i, j, k, l, m, n, o, p, q = c.type || c, r = [];
                if (!Ga.test(q + $.event.triggered) && (q.indexOf("!") >= 0 && (q = q.slice(0, -1),
                h = !0),
                q.indexOf(".") >= 0 && (r = q.split("."),
                q = r.shift(),
                r.sort()),
                e && !$.event.customEvent[q] || $.event.global[q]))
                    if (c = "object" == typeof c ? c[$.expando] ? c : new $.Event(q,c) : new $.Event(q),
                    c.type = q,
                    c.isTrigger = !0,
                    c.exclusive = h,
                    c.namespace = r.join("."),
                    c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                    l = q.indexOf(":") < 0 ? "on" + q : "",
                    e) {
                        if (c.result = b,
                        c.target || (c.target = e),
                        d = null != d ? $.makeArray(d) : [],
                        d.unshift(c),
                        m = $.event.special[q] || {},
                        !m.trigger || m.trigger.apply(e, d) !== !1) {
                            if (o = [[e, m.bindType || q]],
                            !f && !m.noBubble && !$.isWindow(e)) {
                                for (p = m.delegateType || q,
                                j = Ga.test(p + q) ? e : e.parentNode,
                                k = e; j; j = j.parentNode)
                                    o.push([j, p]),
                                    k = j;
                                k === (e.ownerDocument || P) && o.push([k.defaultView || k.parentWindow || a, p])
                            }
                            for (i = 0; i < o.length && !c.isPropagationStopped(); i++)
                                j = o[i][0],
                                c.type = o[i][1],
                                n = ($._data(j, "events") || {})[c.type] && $._data(j, "handle"),
                                n && n.apply(j, d),
                                n = l && j[l],
                                n && $.acceptData(j) && n.apply && n.apply(j, d) === !1 && c.preventDefault();
                            return c.type = q,
                            f || c.isDefaultPrevented() || m._default && m._default.apply(e.ownerDocument, d) !== !1 || "click" === q && $.nodeName(e, "a") || !$.acceptData(e) || l && e[q] && ("focus" !== q && "blur" !== q || 0 !== c.target.offsetWidth) && !$.isWindow(e) && (k = e[l],
                            k && (e[l] = null),
                            $.event.triggered = q,
                            e[q](),
                            $.event.triggered = b,
                            k && (e[l] = k)),
                            c.result
                        }
                    } else {
                        g = $.cache;
                        for (i in g)
                            g[i].events && g[i].events[q] && $.event.trigger(c, d, g[i].handle.elem, !0)
                    }
            }
        },
        dispatch: function(c) {
            c = $.event.fix(c || a.event);
            var d, e, f, g, h, i, j, k, l, m = ($._data(this, "events") || {})[c.type] || [], n = m.delegateCount, o = V.call(arguments), p = !c.exclusive && !c.namespace, q = $.event.special[c.type] || {}, r = [];
            if (o[0] = c,
            c.delegateTarget = this,
            !q.preDispatch || q.preDispatch.call(this, c) !== !1) {
                if (n && (!c.button || "click" !== c.type))
                    for (f = c.target; f != this; f = f.parentNode || this)
                        if (f.disabled !== !0 || "click" !== c.type) {
                            for (h = {},
                            j = [],
                            d = 0; n > d; d++)
                                k = m[d],
                                l = k.selector,
                                h[l] === b && (h[l] = k.needsContext ? $(l, this).index(f) >= 0 : $.find(l, this, null, [f]).length),
                                h[l] && j.push(k);
                            j.length && r.push({
                                elem: f,
                                matches: j
                            })
                        }
                for (m.length > n && r.push({
                    elem: this,
                    matches: m.slice(n)
                }),
                d = 0; d < r.length && !c.isPropagationStopped(); d++)
                    for (i = r[d],
                    c.currentTarget = i.elem,
                    e = 0; e < i.matches.length && !c.isImmediatePropagationStopped(); e++)
                        k = i.matches[e],
                        (p || !c.namespace && !k.namespace || c.namespace_re && c.namespace_re.test(k.namespace)) && (c.data = k.data,
                        c.handleObj = k,
                        g = (($.event.special[k.origType] || {}).handle || k.handler).apply(i.elem, o),
                        g !== b && (c.result = g,
                        g === !1 && (c.preventDefault(),
                        c.stopPropagation())));
                return q.postDispatch && q.postDispatch.call(this, c),
                c.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode),
                a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, c) {
                var d, e, f, g = c.button, h = c.fromElement;
                return null == a.pageX && null != c.clientX && (d = a.target.ownerDocument || P,
                e = d.documentElement,
                f = d.body,
                a.pageX = c.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0),
                a.pageY = c.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)),
                !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h),
                a.which || g === b || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0),
                a
            }
        },
        fix: function(a) {
            if (a[$.expando])
                return a;
            var b, c, d = a, e = $.event.fixHooks[a.type] || {}, f = e.props ? this.props.concat(e.props) : this.props;
            for (a = $.Event(d),
            b = f.length; b; )
                c = f[--b],
                a[c] = d[c];
            return a.target || (a.target = d.srcElement || P),
            3 === a.target.nodeType && (a.target = a.target.parentNode),
            a.metaKey = !!a.metaKey,
            e.filter ? e.filter(a, d) : a
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, b, c) {
                    $.isWindow(this) && (this.onbeforeunload = c)
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = $.extend(new $.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? $.event.trigger(e, null, b) : $.event.dispatch.call(b, e),
            e.isDefaultPrevented() && c.preventDefault()
        }
    },
    $.event.handle = $.event.dispatch,
    $.removeEvent = P.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    }
    : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && ("undefined" == typeof a[d] && (a[d] = null),
        a.detachEvent(d, c))
    }
    ,
    $.Event = function(a, b) {
        return this instanceof $.Event ? (a && a.type ? (this.originalEvent = a,
        this.type = a.type,
        this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? g : f) : this.type = a,
        b && $.extend(this, b),
        this.timeStamp = a && a.timeStamp || $.now(),
        void (this[$.expando] = !0)) : new $.Event(a,b)
    }
    ,
    $.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = g;
            var a = this.originalEvent;
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = g;
            var a = this.originalEvent;
            a && (a.stopPropagation && a.stopPropagation(),
            a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = g,
            this.stopPropagation()
        },
        isDefaultPrevented: f,
        isPropagationStopped: f,
        isImmediatePropagationStopped: f
    },
    $.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        $.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                f.selector;
                return (!e || e !== d && !$.contains(d, e)) && (a.type = f.origType,
                c = f.handler.apply(this, arguments),
                a.type = b),
                c
            }
        }
    }),
    $.support.submitBubbles || ($.event.special.submit = {
        setup: function() {
            return $.nodeName(this, "form") ? !1 : void $.event.add(this, "click._submit keypress._submit", function(a) {
                var c = a.target
                  , d = $.nodeName(c, "input") || $.nodeName(c, "button") ? c.form : b;
                d && !$._data(d, "_submit_attached") && ($.event.add(d, "submit._submit", function(a) {
                    a._submit_bubble = !0
                }),
                $._data(d, "_submit_attached", !0))
            })
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble,
            this.parentNode && !a.isTrigger && $.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            return $.nodeName(this, "form") ? !1 : void $.event.remove(this, "._submit")
        }
    }),
    $.support.changeBubbles || ($.event.special.change = {
        setup: function() {
            return Ba.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && ($.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }),
            $.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1),
                $.event.simulate("change", this, a, !0)
            })),
            !1) : void $.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                Ba.test(b.nodeName) && !$._data(b, "_change_attached") && ($.event.add(b, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || $.event.simulate("change", this.parentNode, a, !0)
                }),
                $._data(b, "_change_attached", !0))
            })
        },
        handle: function(a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return $.event.remove(this, "._change"),
            !Ba.test(this.nodeName)
        }
    }),
    $.support.focusinBubbles || $.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = 0
          , d = function(a) {
            $.event.simulate(b, a.target, $.event.fix(a), !0)
        };
        $.event.special[b] = {
            setup: function() {
                0 === c++ && P.addEventListener(a, d, !0)
            },
            teardown: function() {
                0 === --c && P.removeEventListener(a, d, !0)
            }
        }
    }),
    $.fn.extend({
        on: function(a, c, d, e, g) {
            var h, i;
            if ("object" == typeof a) {
                "string" != typeof c && (d = d || c,
                c = b);
                for (i in a)
                    this.on(i, c, d, a[i], g);
                return this
            }
            if (null == d && null == e ? (e = c,
            d = c = b) : null == e && ("string" == typeof c ? (e = d,
            d = b) : (e = d,
            d = c,
            c = b)),
            e === !1)
                e = f;
            else if (!e)
                return this;
            return 1 === g && (h = e,
            e = function(a) {
                return $().off(a),
                h.apply(this, arguments)
            }
            ,
            e.guid = h.guid || (h.guid = $.guid++)),
            this.each(function() {
                $.event.add(this, a, e, d, c)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, c, d) {
            var e, g;
            if (a && a.preventDefault && a.handleObj)
                return e = a.handleObj,
                $(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler),
                this;
            if ("object" == typeof a) {
                for (g in a)
                    this.off(g, c, a[g]);
                return this
            }
            return (c === !1 || "function" == typeof c) && (d = c,
            c = b),
            d === !1 && (d = f),
            this.each(function() {
                $.event.remove(this, a, d, c)
            })
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        live: function(a, b, c) {
            return $(this.context).on(a, this.selector, b, c),
            this
        },
        die: function(a, b) {
            return $(this.context).off(a, this.selector || "**", b),
            this
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        },
        trigger: function(a, b) {
            return this.each(function() {
                $.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            return this[0] ? $.event.trigger(a, b, this[0], !0) : void 0
        },
        toggle: function(a) {
            var b = arguments
              , c = a.guid || $.guid++
              , d = 0
              , e = function(c) {
                var e = ($._data(this, "lastToggle" + a.guid) || 0) % d;
                return $._data(this, "lastToggle" + a.guid, e + 1),
                c.preventDefault(),
                b[e].apply(this, arguments) || !1
            };
            for (e.guid = c; d < b.length; )
                b[d++].guid = c;
            return this.click(e)
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }),
    $.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        $.fn[b] = function(a, c) {
            return null == c && (c = a,
            a = null),
            arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
        ,
        Ea.test(b) && ($.event.fixHooks[b] = $.event.keyHooks),
        Fa.test(b) && ($.event.fixHooks[b] = $.event.mouseHooks)
    }),
    function(a, b) {
        function c(a, b, c, d) {
            c = c || [],
            b = b || F;
            var e, f, g, h, i = b.nodeType;
            if (!a || "string" != typeof a)
                return c;
            if (1 !== i && 9 !== i)
                return [];
            if (g = v(b),
            !g && !d && (e = ca.exec(a)))
                if (h = e[1]) {
                    if (9 === i) {
                        if (f = b.getElementById(h),
                        !f || !f.parentNode)
                            return c;
                        if (f.id === h)
                            return c.push(f),
                            c
                    } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(h)) && w(b, f) && f.id === h)
                        return c.push(f),
                        c
                } else {
                    if (e[2])
                        return K.apply(c, L.call(b.getElementsByTagName(a), 0)),
                        c;
                    if ((h = e[3]) && ma && b.getElementsByClassName)
                        return K.apply(c, L.call(b.getElementsByClassName(h), 0)),
                        c
                }
            return p(a.replace(Z, "$1"), b, c, d, g)
        }
        function d(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }
        function e(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }
        function f(a) {
            return N(function(b) {
                return b = +b,
                N(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--; )
                        c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }
        function g(a, b, c) {
            if (a === b)
                return c;
            for (var d = a.nextSibling; d; ) {
                if (d === b)
                    return -1;
                d = d.nextSibling
            }
            return 1
        }
        function h(a, b) {
            var d, e, f, g, h, i, j, k = Q[D][a + " "];
            if (k)
                return b ? 0 : k.slice(0);
            for (h = a,
            i = [],
            j = t.preFilter; h; ) {
                (!d || (e = _.exec(h))) && (e && (h = h.slice(e[0].length) || h),
                i.push(f = [])),
                d = !1,
                (e = aa.exec(h)) && (f.push(d = new E(e.shift())),
                h = h.slice(d.length),
                d.type = e[0].replace(Z, " "));
                for (g in t.filter)
                    !(e = ha[g].exec(h)) || j[g] && !(e = j[g](e)) || (f.push(d = new E(e.shift())),
                    h = h.slice(d.length),
                    d.type = g,
                    d.matches = e);
                if (!d)
                    break
            }
            return b ? h.length : h ? c.error(a) : Q(a, i).slice(0)
        }
        function i(a, b, c) {
            var d = b.dir
              , e = c && "parentNode" === b.dir
              , f = I++;
            return b.first ? function(b, c, f) {
                for (; b = b[d]; )
                    if (e || 1 === b.nodeType)
                        return a(b, c, f)
            }
            : function(b, c, g) {
                if (g) {
                    for (; b = b[d]; )
                        if ((e || 1 === b.nodeType) && a(b, c, g))
                            return b
                } else
                    for (var h, i = H + " " + f + " ", j = i + r; b = b[d]; )
                        if (e || 1 === b.nodeType) {
                            if ((h = b[D]) === j)
                                return b.sizset;
                            if ("string" == typeof h && 0 === h.indexOf(i)) {
                                if (b.sizset)
                                    return b
                            } else {
                                if (b[D] = j,
                                a(b, c, g))
                                    return b.sizset = !0,
                                    b;
                                b.sizset = !1
                            }
                        }
            }
        }
        function j(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--; )
                    if (!a[e](b, c, d))
                        return !1;
                return !0
            }
            : a[0]
        }
        function k(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
                (f = a[h]) && (!c || c(f, d, e)) && (g.push(f),
                j && b.push(h));
            return g
        }
        function l(a, b, c, d, e, f) {
            return d && !d[D] && (d = l(d)),
            e && !e[D] && (e = l(e, f)),
            N(function(f, g, h, i) {
                var j, l, m, n = [], p = [], q = g.length, r = f || o(b || "*", h.nodeType ? [h] : h, []), s = !a || !f && b ? r : k(r, n, a, h, i), t = c ? e || (f ? a : q || d) ? [] : g : s;
                if (c && c(s, t, h, i),
                d)
                    for (j = k(t, p),
                    d(j, [], h, i),
                    l = j.length; l--; )
                        (m = j[l]) && (t[p[l]] = !(s[p[l]] = m));
                if (f) {
                    if (e || a) {
                        if (e) {
                            for (j = [],
                            l = t.length; l--; )
                                (m = t[l]) && j.push(s[l] = m);
                            e(null, t = [], j, i)
                        }
                        for (l = t.length; l--; )
                            (m = t[l]) && (j = e ? M.call(f, m) : n[l]) > -1 && (f[j] = !(g[j] = m))
                    }
                } else
                    t = k(t === g ? t.splice(q, t.length) : t),
                    e ? e(null, g, t, i) : K.apply(g, t)
            })
        }
        function m(a) {
            for (var b, c, d, e = a.length, f = t.relative[a[0].type], g = f || t.relative[" "], h = f ? 1 : 0, k = i(function(a) {
                return a === b
            }, g, !0), n = i(function(a) {
                return M.call(b, a) > -1
            }, g, !0), o = [function(a, c, d) {
                return !f && (d || c !== A) || ((b = c).nodeType ? k(a, c, d) : n(a, c, d))
            }
            ]; e > h; h++)
                if (c = t.relative[a[h].type])
                    o = [i(j(o), c)];
                else {
                    if (c = t.filter[a[h].type].apply(null, a[h].matches),
                    c[D]) {
                        for (d = ++h; e > d && !t.relative[a[d].type]; d++)
                            ;
                        return l(h > 1 && j(o), h > 1 && a.slice(0, h - 1).join("").replace(Z, "$1"), c, d > h && m(a.slice(h, d)), e > d && m(a = a.slice(d)), e > d && a.join(""))
                    }
                    o.push(c)
                }
            return j(o)
        }
        function n(a, b) {
            var d = b.length > 0
              , e = a.length > 0
              , f = function(g, h, i, j, l) {
                var m, n, o, p = [], q = 0, s = "0", u = g && [], v = null != l, w = A, x = g || e && t.find.TAG("*", l && h.parentNode || h), y = H += null == w ? 1 : Math.E;
                for (v && (A = h !== F && h,
                r = f.el); null != (m = x[s]); s++) {
                    if (e && m) {
                        for (n = 0; o = a[n]; n++)
                            if (o(m, h, i)) {
                                j.push(m);
                                break
                            }
                        v && (H = y,
                        r = ++f.el)
                    }
                    d && ((m = !o && m) && q--,
                    g && u.push(m))
                }
                if (q += s,
                d && s !== q) {
                    for (n = 0; o = b[n]; n++)
                        o(u, p, h, i);
                    if (g) {
                        if (q > 0)
                            for (; s--; )
                                u[s] || p[s] || (p[s] = J.call(j));
                        p = k(p)
                    }
                    K.apply(j, p),
                    v && !g && p.length > 0 && q + b.length > 1 && c.uniqueSort(j)
                }
                return v && (H = y,
                A = w),
                u
            };
            return f.el = 0,
            d ? N(f) : f
        }
        function o(a, b, d) {
            for (var e = 0, f = b.length; f > e; e++)
                c(a, b[e], d);
            return d
        }
        function p(a, b, c, d, e) {
            var f, g, i, j, k, l = h(a);
            l.length;
            if (!d && 1 === l.length) {
                if (g = l[0] = l[0].slice(0),
                g.length > 2 && "ID" === (i = g[0]).type && 9 === b.nodeType && !e && t.relative[g[1].type]) {
                    if (b = t.find.ID(i.matches[0].replace(ga, ""), b, e)[0],
                    !b)
                        return c;
                    a = a.slice(g.shift().length)
                }
                for (f = ha.POS.test(a) ? -1 : g.length - 1; f >= 0 && (i = g[f],
                !t.relative[j = i.type]); f--)
                    if ((k = t.find[j]) && (d = k(i.matches[0].replace(ga, ""), da.test(g[0].type) && b.parentNode || b, e))) {
                        if (g.splice(f, 1),
                        a = d.length && g.join(""),
                        !a)
                            return K.apply(c, L.call(d, 0)),
                            c;
                        break
                    }
            }
            return x(a, l)(d, b, e, c, da.test(a)),
            c
        }
        function q() {}
        var r, s, t, u, v, w, x, y, z, A, B = !0, C = "undefined", D = ("sizcache" + Math.random()).replace(".", ""), E = String, F = a.document, G = F.documentElement, H = 0, I = 0, J = [].pop, K = [].push, L = [].slice, M = [].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (this[b] === a)
                    return b;
            return -1
        }
        , N = function(a, b) {
            return a[D] = null == b || b,
            a
        }, O = function() {
            var a = {}
              , b = [];
            return N(function(c, d) {
                return b.push(c) > t.cacheLength && delete a[b.shift()],
                a[c + " "] = d
            }, a)
        }, P = O(), Q = O(), R = O(), S = "[\\x20\\t\\r\\n\\f]", T = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", U = T.replace("w", "w#"), V = "([*^$|!~]?=)", W = "\\[" + S + "*(" + T + ")" + S + "*(?:" + V + S + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + U + ")|)|)" + S + "*\\]", X = ":(" + T + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + W + ")|[^:]|\\\\.)*|.*))\\)|)", Y = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + S + "*((?:-\\d)?\\d*)" + S + "*\\)|)(?=[^-]|$)", Z = new RegExp("^" + S + "+|((?:^|[^\\\\])(?:\\\\.)*)" + S + "+$","g"), _ = new RegExp("^" + S + "*," + S + "*"), aa = new RegExp("^" + S + "*([\\x20\\t\\r\\n\\f>+~])" + S + "*"), ba = new RegExp(X), ca = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, da = /[\x20\t\r\n\f]*[+~]/, ea = /h\d/i, fa = /input|select|textarea|button/i, ga = /\\(?!\\)/g, ha = {
            ID: new RegExp("^#(" + T + ")"),
            CLASS: new RegExp("^\\.(" + T + ")"),
            NAME: new RegExp("^\\[name=['\"]?(" + T + ")['\"]?\\]"),
            TAG: new RegExp("^(" + T.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + W),
            PSEUDO: new RegExp("^" + X),
            POS: new RegExp(Y,"i"),
            CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + S + "*(even|odd|(([+-]|)(\\d*)n|)" + S + "*(?:([+-]|)" + S + "*(\\d+)|))" + S + "*\\)|)","i"),
            needsContext: new RegExp("^" + S + "*[>+~]|" + Y,"i")
        }, ia = function(a) {
            var b = F.createElement("div");
            try {
                return a(b)
            } catch (c) {
                return !1
            } finally {
                b = null
            }
        }, ja = ia(function(a) {
            return a.appendChild(F.createComment("")),
            !a.getElementsByTagName("*").length
        }), ka = ia(function(a) {
            return a.innerHTML = "<a href='#'></a>",
            a.firstChild && typeof a.firstChild.getAttribute !== C && "#" === a.firstChild.getAttribute("href")
        }), la = ia(function(a) {
            a.innerHTML = "<select></select>";
            var b = typeof a.lastChild.getAttribute("multiple");
            return "boolean" !== b && "string" !== b
        }), ma = ia(function(a) {
            return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
            a.getElementsByClassName && a.getElementsByClassName("e").length ? (a.lastChild.className = "e",
            2 === a.getElementsByClassName("e").length) : !1
        }), na = ia(function(a) {
            a.id = D + 0,
            a.innerHTML = "<a name='" + D + "'></a><div name='" + D + "'></div>",
            G.insertBefore(a, G.firstChild);
            var b = F.getElementsByName && F.getElementsByName(D).length === 2 + F.getElementsByName(D + 0).length;
            return s = !F.getElementById(D),
            G.removeChild(a),
            b
        });
        try {
            L.call(G.childNodes, 0)[0].nodeType
        } catch (oa) {
            L = function(a) {
                for (var b, c = []; b = this[a]; a++)
                    c.push(b);
                return c
            }
        }
        c.matches = function(a, b) {
            return c(a, null, null, b)
        }
        ,
        c.matchesSelector = function(a, b) {
            return c(b, null, null, [a]).length > 0
        }
        ,
        u = c.getText = function(a) {
            var b, c = "", d = 0, e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent)
                        return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling)
                        c += u(a)
                } else if (3 === e || 4 === e)
                    return a.nodeValue
            } else
                for (; b = a[d]; d++)
                    c += u(b);
            return c
        }
        ,
        v = c.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }
        ,
        w = c.contains = G.contains ? function(a, b) {
            var c = 9 === a.nodeType ? a.documentElement : a
              , d = b && b.parentNode;
            return a === d || !!(d && 1 === d.nodeType && c.contains && c.contains(d))
        }
        : G.compareDocumentPosition ? function(a, b) {
            return b && !!(16 & a.compareDocumentPosition(b))
        }
        : function(a, b) {
            for (; b = b.parentNode; )
                if (b === a)
                    return !0;
            return !1
        }
        ,
        c.attr = function(a, b) {
            var c, d = v(a);
            return d || (b = b.toLowerCase()),
            (c = t.attrHandle[b]) ? c(a) : d || la ? a.getAttribute(b) : (c = a.getAttributeNode(b),
            c ? "boolean" == typeof a[b] ? a[b] ? b : null : c.specified ? c.value : null : null)
        }
        ,
        t = c.selectors = {
            cacheLength: 50,
            createPseudo: N,
            match: ha,
            attrHandle: ka ? {} : {
                href: function(a) {
                    return a.getAttribute("href", 2)
                },
                type: function(a) {
                    return a.getAttribute("type")
                }
            },
            find: {
                ID: s ? function(a, b, c) {
                    if (typeof b.getElementById !== C && !c) {
                        var d = b.getElementById(a);
                        return d && d.parentNode ? [d] : []
                    }
                }
                : function(a, c, d) {
                    if (typeof c.getElementById !== C && !d) {
                        var e = c.getElementById(a);
                        return e ? e.id === a || typeof e.getAttributeNode !== C && e.getAttributeNode("id").value === a ? [e] : b : []
                    }
                }
                ,
                TAG: ja ? function(a, b) {
                    return typeof b.getElementsByTagName !== C ? b.getElementsByTagName(a) : void 0
                }
                : function(a, b) {
                    var c = b.getElementsByTagName(a);
                    if ("*" === a) {
                        for (var d, e = [], f = 0; d = c[f]; f++)
                            1 === d.nodeType && e.push(d);
                        return e
                    }
                    return c
                }
                ,
                NAME: na && function(a, b) {
                    return typeof b.getElementsByName !== C ? b.getElementsByName(name) : void 0
                }
                ,
                CLASS: ma && function(a, b, c) {
                    return typeof b.getElementsByClassName === C || c ? void 0 : b.getElementsByClassName(a)
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(ga, ""),
                    a[3] = (a[4] || a[5] || "").replace(ga, ""),
                    "~=" === a[2] && (a[3] = " " + a[3] + " "),
                    a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(),
                    "nth" === a[1] ? (a[2] || c.error(a[0]),
                    a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * ("even" === a[2] || "odd" === a[2])),
                    a[4] = +(a[6] + a[7] || "odd" === a[2])) : a[2] && c.error(a[0]),
                    a
                },
                PSEUDO: function(a) {
                    var b, c;
                    return ha.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[3] : (b = a[4]) && (ba.test(b) && (c = h(b, !0)) && (c = b.indexOf(")", b.length - c) - b.length) && (b = b.slice(0, c),
                    a[0] = a[0].slice(0, c)),
                    a[2] = b),
                    a.slice(0, 3))
                }
            },
            filter: {
                ID: s ? function(a) {
                    return a = a.replace(ga, ""),
                    function(b) {
                        return b.getAttribute("id") === a
                    }
                }
                : function(a) {
                    return a = a.replace(ga, ""),
                    function(b) {
                        var c = typeof b.getAttributeNode !== C && b.getAttributeNode("id");
                        return c && c.value === a
                    }
                }
                ,
                TAG: function(a) {
                    return "*" === a ? function() {
                        return !0
                    }
                    : (a = a.replace(ga, "").toLowerCase(),
                    function(b) {
                        return b.nodeName && b.nodeName.toLowerCase() === a
                    }
                    )
                },
                CLASS: function(a) {
                    var b = P[D][a + " "];
                    return b || (b = new RegExp("(^|" + S + ")" + a + "(" + S + "|$)")) && P(a, function(a) {
                        return b.test(a.className || typeof a.getAttribute !== C && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, b, d) {
                    return function(e, f) {
                        var g = c.attr(e, a);
                        return null == g ? "!=" === b : b ? (g += "",
                        "=" === b ? g === d : "!=" === b ? g !== d : "^=" === b ? d && 0 === g.indexOf(d) : "*=" === b ? d && g.indexOf(d) > -1 : "$=" === b ? d && g.substr(g.length - d.length) === d : "~=" === b ? (" " + g + " ").indexOf(d) > -1 : "|=" === b ? g === d || g.substr(0, d.length + 1) === d + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d) {
                    return "nth" === a ? function(a) {
                        var b, e, f = a.parentNode;
                        if (1 === c && 0 === d)
                            return !0;
                        if (f)
                            for (e = 0,
                            b = f.firstChild; b && (1 !== b.nodeType || (e++,
                            a !== b)); b = b.nextSibling)
                                ;
                        return e -= d,
                        e === c || e % c === 0 && e / c >= 0
                    }
                    : function(b) {
                        var c = b;
                        switch (a) {
                        case "only":
                        case "first":
                            for (; c = c.previousSibling; )
                                if (1 === c.nodeType)
                                    return !1;
                            if ("first" === a)
                                return !0;
                            c = b;
                        case "last":
                            for (; c = c.nextSibling; )
                                if (1 === c.nodeType)
                                    return !1;
                            return !0
                        }
                    }
                },
                PSEUDO: function(a, b) {
                    var d, e = t.pseudos[a] || t.setFilters[a.toLowerCase()] || c.error("unsupported pseudo: " + a);
                    return e[D] ? e(b) : e.length > 1 ? (d = [a, a, "", b],
                    t.setFilters.hasOwnProperty(a.toLowerCase()) ? N(function(a, c) {
                        for (var d, f = e(a, b), g = f.length; g--; )
                            d = M.call(a, f[g]),
                            a[d] = !(c[d] = f[g])
                    }) : function(a) {
                        return e(a, 0, d)
                    }
                    ) : e
                }
            },
            pseudos: {
                not: N(function(a) {
                    var b = []
                      , c = []
                      , d = x(a.replace(Z, "$1"));
                    return d[D] ? N(function(a, b, c, e) {
                        for (var f, g = d(a, null, e, []), h = a.length; h--; )
                            (f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, e, f) {
                        return b[0] = a,
                        d(b, null, f, c),
                        !c.pop()
                    }
                }),
                has: N(function(a) {
                    return function(b) {
                        return c(a, b).length > 0
                    }
                }),
                contains: N(function(a) {
                    return function(b) {
                        return (b.textContent || b.innerText || u(b)).indexOf(a) > -1
                    }
                }),
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex,
                    a.selected === !0
                },
                parent: function(a) {
                    return !t.pseudos.empty(a)
                },
                empty: function(a) {
                    var b;
                    for (a = a.firstChild; a; ) {
                        if (a.nodeName > "@" || 3 === (b = a.nodeType) || 4 === b)
                            return !1;
                        a = a.nextSibling
                    }
                    return !0
                },
                header: function(a) {
                    return ea.test(a.nodeName)
                },
                text: function(a) {
                    var b, c;
                    return "input" === a.nodeName.toLowerCase() && "text" === (b = a.type) && (null == (c = a.getAttribute("type")) || c.toLowerCase() === b)
                },
                radio: d("radio"),
                checkbox: d("checkbox"),
                file: d("file"),
                password: d("password"),
                image: d("image"),
                submit: e("submit"),
                reset: e("reset"),
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                input: function(a) {
                    return fa.test(a.nodeName)
                },
                focus: function(a) {
                    var b = a.ownerDocument;
                    return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                active: function(a) {
                    return a === a.ownerDocument.activeElement
                },
                first: f(function() {
                    return [0]
                }),
                last: f(function(a, b) {
                    return [b - 1]
                }),
                eq: f(function(a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: f(function(a, b) {
                    for (var c = 0; b > c; c += 2)
                        a.push(c);
                    return a
                }),
                odd: f(function(a, b) {
                    for (var c = 1; b > c; c += 2)
                        a.push(c);
                    return a
                }),
                lt: f(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0; )
                        a.push(d);
                    return a
                }),
                gt: f(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b; )
                        a.push(d);
                    return a
                })
            }
        },
        y = G.compareDocumentPosition ? function(a, b) {
            return a === b ? (z = !0,
            0) : (a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) : a.compareDocumentPosition) ? -1 : 1
        }
        : function(a, b) {
            if (a === b)
                return z = !0,
                0;
            if (a.sourceIndex && b.sourceIndex)
                return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], h = a.parentNode, i = b.parentNode, j = h;
            if (h === i)
                return g(a, b);
            if (!h)
                return -1;
            if (!i)
                return 1;
            for (; j; )
                e.unshift(j),
                j = j.parentNode;
            for (j = i; j; )
                f.unshift(j),
                j = j.parentNode;
            c = e.length,
            d = f.length;
            for (var k = 0; c > k && d > k; k++)
                if (e[k] !== f[k])
                    return g(e[k], f[k]);
            return k === c ? g(a, f[k], -1) : g(e[k], b, 1)
        }
        ,
        [0, 0].sort(y),
        B = !z,
        c.uniqueSort = function(a) {
            var b, c = [], d = 1, e = 0;
            if (z = B,
            a.sort(y),
            z) {
                for (; b = a[d]; d++)
                    b === a[d - 1] && (e = c.push(d));
                for (; e--; )
                    a.splice(c[e], 1)
            }
            return a
        }
        ,
        c.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }
        ,
        x = c.compile = function(a, b) {
            var c, d = [], e = [], f = R[D][a + " "];
            if (!f) {
                for (b || (b = h(a)),
                c = b.length; c--; )
                    f = m(b[c]),
                    f[D] ? d.push(f) : e.push(f);
                f = R(a, n(e, d))
            }
            return f
        }
        ,
        F.querySelectorAll && !function() {
            var a, b = p, d = /'|\\/g, e = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, f = [":focus"], g = [":active"], i = G.matchesSelector || G.mozMatchesSelector || G.webkitMatchesSelector || G.oMatchesSelector || G.msMatchesSelector;
            ia(function(a) {
                a.innerHTML = "<select><option selected=''></option></select>",
                a.querySelectorAll("[selected]").length || f.push("\\[" + S + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),
                a.querySelectorAll(":checked").length || f.push(":checked")
            }),
            ia(function(a) {
                a.innerHTML = "<p test=''></p>",
                a.querySelectorAll("[test^='']").length && f.push("[*^$]=" + S + "*(?:\"\"|'')"),
                a.innerHTML = "<input type='hidden'/>",
                a.querySelectorAll(":enabled").length || f.push(":enabled", ":disabled")
            }),
            f = new RegExp(f.join("|")),
            p = function(a, c, e, g, i) {
                if (!g && !i && !f.test(a)) {
                    var j, k, l = !0, m = D, n = c, o = 9 === c.nodeType && a;
                    if (1 === c.nodeType && "object" !== c.nodeName.toLowerCase()) {
                        for (j = h(a),
                        (l = c.getAttribute("id")) ? m = l.replace(d, "\\$&") : c.setAttribute("id", m),
                        m = "[id='" + m + "'] ",
                        k = j.length; k--; )
                            j[k] = m + j[k].join("");
                        n = da.test(a) && c.parentNode || c,
                        o = j.join(",")
                    }
                    if (o)
                        try {
                            return K.apply(e, L.call(n.querySelectorAll(o), 0)),
                            e
                        } catch (p) {} finally {
                            l || c.removeAttribute("id")
                        }
                }
                return b(a, c, e, g, i)
            }
            ,
            i && (ia(function(b) {
                a = i.call(b, "div");
                try {
                    i.call(b, "[test!='']:sizzle"),
                    g.push("!=", X)
                } catch (c) {}
            }),
            g = new RegExp(g.join("|")),
            c.matchesSelector = function(b, d) {
                if (d = d.replace(e, "='$1']"),
                !v(b) && !g.test(d) && !f.test(d))
                    try {
                        var h = i.call(b, d);
                        if (h || a || b.document && 11 !== b.document.nodeType)
                            return h
                    } catch (j) {}
                return c(d, null, null, [b]).length > 0
            }
            )
        }(),
        t.pseudos.nth = t.pseudos.eq,
        t.filters = q.prototype = t.pseudos,
        t.setFilters = new q,
        c.attr = $.attr,
        $.find = c,
        $.expr = c.selectors,
        $.expr[":"] = $.expr.pseudos,
        $.unique = c.uniqueSort,
        $.text = c.getText,
        $.isXMLDoc = c.isXML,
        $.contains = c.contains
    }(a);
    var Ia = /Until$/
      , Ja = /^(?:parents|prev(?:Until|All))/
      , Ka = /^.[^:#\[\.,]*$/
      , La = $.expr.match.needsContext
      , Ma = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    $.fn.extend({
        find: function(a) {
            var b, c, d, e, f, g, h = this;
            if ("string" != typeof a)
                return $(a).filter(function() {
                    for (b = 0,
                    c = h.length; c > b; b++)
                        if ($.contains(h[b], this))
                            return !0
                });
            for (g = this.pushStack("", "find", a),
            b = 0,
            c = this.length; c > b; b++)
                if (d = g.length,
                $.find(a, this[b], g),
                b > 0)
                    for (e = d; e < g.length; e++)
                        for (f = 0; d > f; f++)
                            if (g[f] === g[e]) {
                                g.splice(e--, 1);
                                break
                            }
            return g
        },
        has: function(a) {
            var b, c = $(a, this), d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++)
                    if ($.contains(this, c[b]))
                        return !0
            })
        },
        not: function(a) {
            return this.pushStack(j(this, a, !1), "not", a)
        },
        filter: function(a) {
            return this.pushStack(j(this, a, !0), "filter", a)
        },
        is: function(a) {
            return !!a && ("string" == typeof a ? La.test(a) ? $(a, this.context).index(this[0]) >= 0 : $.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = La.test(a) || "string" != typeof a ? $(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c.ownerDocument && c !== b && 11 !== c.nodeType; ) {
                    if (g ? g.index(c) > -1 : $.find.matchesSelector(c, a)) {
                        f.push(c);
                        break
                    }
                    c = c.parentNode
                }
            return f = f.length > 1 ? $.unique(f) : f,
            this.pushStack(f, "closest", a)
        },
        index: function(a) {
            return a ? "string" == typeof a ? $.inArray(this[0], $(a)) : $.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(a, b) {
            var c = "string" == typeof a ? $(a, b) : $.makeArray(a && a.nodeType ? [a] : a)
              , d = $.merge(this.get(), c);
            return this.pushStack(h(c[0]) || h(d[0]) ? d : $.unique(d))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    }),
    $.fn.andSelf = $.fn.addBack,
    $.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return $.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return $.dir(a, "parentNode", c)
        },
        next: function(a) {
            return i(a, "nextSibling")
        },
        prev: function(a) {
            return i(a, "previousSibling")
        },
        nextAll: function(a) {
            return $.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return $.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return $.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return $.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return $.sibling((a.parentNode || {}).firstChild, a);
        },
        children: function(a) {
            return $.sibling(a.firstChild)
        },
        contents: function(a) {
            return $.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : $.merge([], a.childNodes)
        }
    }, function(a, b) {
        $.fn[a] = function(c, d) {
            var e = $.map(this, b, c);
            return Ia.test(a) || (d = c),
            d && "string" == typeof d && (e = $.filter(d, e)),
            e = this.length > 1 && !Ma[a] ? $.unique(e) : e,
            this.length > 1 && Ja.test(a) && (e = e.reverse()),
            this.pushStack(e, a, V.call(arguments).join(","))
        }
    }),
    $.extend({
        filter: function(a, b, c) {
            return c && (a = ":not(" + a + ")"),
            1 === b.length ? $.find.matchesSelector(b[0], a) ? [b[0]] : [] : $.find.matches(a, b)
        },
        dir: function(a, c, d) {
            for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType || !$(f).is(d)); )
                1 === f.nodeType && e.push(f),
                f = f[c];
            return e
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling)
                1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    });
    var Na = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
      , Oa = / jQuery\d+="(?:null|\d+)"/g
      , Pa = /^\s+/
      , Qa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
      , Ra = /<([\w:]+)/
      , Sa = /<tbody/i
      , Ta = /<|&#?\w+;/
      , Ua = /<(?:script|style|link)/i
      , Va = /<(?:script|object|embed|option|style)/i
      , Wa = new RegExp("<(?:" + Na + ")[\\s/>]","i")
      , Xa = /^(?:checkbox|radio)$/
      , Ya = /checked\s*(?:[^=]|=\s*.checked.)/i
      , Za = /\/(java|ecma)script/i
      , $a = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g
      , _a = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    }
      , ab = k(P)
      , bb = ab.appendChild(P.createElement("div"));
    _a.optgroup = _a.option,
    _a.tbody = _a.tfoot = _a.colgroup = _a.caption = _a.thead,
    _a.th = _a.td,
    $.support.htmlSerialize || (_a._default = [1, "X<div>", "</div>"]),
    $.fn.extend({
        text: function(a) {
            return $.access(this, function(a) {
                return a === b ? $.text(this) : this.empty().append((this[0] && this[0].ownerDocument || P).createTextNode(a))
            }, null, a, arguments.length)
        },
        wrapAll: function(a) {
            if ($.isFunction(a))
                return this.each(function(b) {
                    $(this).wrapAll(a.call(this, b))
                });
            if (this[0]) {
                var b = $(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]),
                b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType; )
                        a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return $.isFunction(a) ? this.each(function(b) {
                $(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = $(this)
                  , c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = $.isFunction(a);
            return this.each(function(c) {
                $(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                $.nodeName(this, "body") || $(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (!h(this[0]))
                return this.domManip(arguments, !1, function(a) {
                    this.parentNode.insertBefore(a, this)
                });
            if (arguments.length) {
                var a = $.clean(arguments);
                return this.pushStack($.merge(a, this), "before", this.selector)
            }
        },
        after: function() {
            if (!h(this[0]))
                return this.domManip(arguments, !1, function(a) {
                    this.parentNode.insertBefore(a, this.nextSibling)
                });
            if (arguments.length) {
                var a = $.clean(arguments);
                return this.pushStack($.merge(this, a), "after", this.selector)
            }
        },
        remove: function(a, b) {
            for (var c, d = 0; null != (c = this[d]); d++)
                (!a || $.filter(a, [c]).length) && (b || 1 !== c.nodeType || ($.cleanData(c.getElementsByTagName("*")),
                $.cleanData([c])),
                c.parentNode && c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++)
                for (1 === a.nodeType && $.cleanData(a.getElementsByTagName("*")); a.firstChild; )
                    a.removeChild(a.firstChild);
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a,
            b = null == b ? a : b,
            this.map(function() {
                return $.clone(this, a, b)
            })
        },
        html: function(a) {
            return $.access(this, function(a) {
                var c = this[0] || {}
                  , d = 0
                  , e = this.length;
                if (a === b)
                    return 1 === c.nodeType ? c.innerHTML.replace(Oa, "") : b;
                if ("string" == typeof a && !Ua.test(a) && ($.support.htmlSerialize || !Wa.test(a)) && ($.support.leadingWhitespace || !Pa.test(a)) && !_a[(Ra.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(Qa, "<$1></$2>");
                    try {
                        for (; e > d; d++)
                            c = this[d] || {},
                            1 === c.nodeType && ($.cleanData(c.getElementsByTagName("*")),
                            c.innerHTML = a);
                        c = 0
                    } catch (f) {}
                }
                c && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function(a) {
            return h(this[0]) ? this.length ? this.pushStack($($.isFunction(a) ? a() : a), "replaceWith", a) : this : $.isFunction(a) ? this.each(function(b) {
                var c = $(this)
                  , d = c.html();
                c.replaceWith(a.call(this, b, d))
            }) : ("string" != typeof a && (a = $(a).detach()),
            this.each(function() {
                var b = this.nextSibling
                  , c = this.parentNode;
                $(this).remove(),
                b ? $(b).before(a) : $(c).append(a)
            }))
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, c, d) {
            a = [].concat.apply([], a);
            var e, f, g, h, i = 0, j = a[0], k = [], m = this.length;
            if (!$.support.checkClone && m > 1 && "string" == typeof j && Ya.test(j))
                return this.each(function() {
                    $(this).domManip(a, c, d)
                });
            if ($.isFunction(j))
                return this.each(function(e) {
                    var f = $(this);
                    a[0] = j.call(this, e, c ? f.html() : b),
                    f.domManip(a, c, d)
                });
            if (this[0]) {
                if (e = $.buildFragment(a, this, k),
                g = e.fragment,
                f = g.firstChild,
                1 === g.childNodes.length && (g = f),
                f)
                    for (c = c && $.nodeName(f, "tr"),
                    h = e.cacheable || m - 1; m > i; i++)
                        d.call(c && $.nodeName(this[i], "table") ? l(this[i], "tbody") : this[i], i === h ? g : $.clone(g, !0, !0));
                g = f = null,
                k.length && $.each(k, function(a, b) {
                    b.src ? $.ajax ? $.ajax({
                        url: b.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : $.error("no ajax") : $.globalEval((b.text || b.textContent || b.innerHTML || "").replace($a, "")),
                    b.parentNode && b.parentNode.removeChild(b)
                })
            }
            return this
        }
    }),
    $.buildFragment = function(a, c, d) {
        var e, f, g, h = a[0];
        return c = c || P,
        c = !c.nodeType && c[0] || c,
        c = c.ownerDocument || c,
        !(1 === a.length && "string" == typeof h && h.length < 512 && c === P && "<" === h.charAt(0)) || Va.test(h) || !$.support.checkClone && Ya.test(h) || !$.support.html5Clone && Wa.test(h) || (f = !0,
        e = $.fragments[h],
        g = e !== b),
        e || (e = c.createDocumentFragment(),
        $.clean(a, c, e, d),
        f && ($.fragments[h] = g && e)),
        {
            fragment: e,
            cacheable: f
        }
    }
    ,
    $.fragments = {},
    $.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        $.fn[a] = function(c) {
            var d, e = 0, f = [], g = $(c), h = g.length, i = 1 === this.length && this[0].parentNode;
            if ((null == i || i && 11 === i.nodeType && 1 === i.childNodes.length) && 1 === h)
                return g[b](this[0]),
                this;
            for (; h > e; e++)
                d = (e > 0 ? this.clone(!0) : this).get(),
                $(g[e])[b](d),
                f = f.concat(d);
            return this.pushStack(f, a, g.selector)
        }
    }),
    $.extend({
        clone: function(a, b, c) {
            var d, e, f, g;
            if ($.support.html5Clone || $.isXMLDoc(a) || !Wa.test("<" + a.nodeName + ">") ? g = a.cloneNode(!0) : (bb.innerHTML = a.outerHTML,
            bb.removeChild(g = bb.firstChild)),
            !($.support.noCloneEvent && $.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || $.isXMLDoc(a)))
                for (n(a, g),
                d = o(a),
                e = o(g),
                f = 0; d[f]; ++f)
                    e[f] && n(d[f], e[f]);
            if (b && (m(a, g),
            c))
                for (d = o(a),
                e = o(g),
                f = 0; d[f]; ++f)
                    m(d[f], e[f]);
            return d = e = null,
            g
        },
        clean: function(a, b, c, d) {
            var e, f, g, h, i, j, l, m, n, o, q, r = b === P && ab, s = [];
            for (b && "undefined" != typeof b.createDocumentFragment || (b = P),
            e = 0; null != (g = a[e]); e++)
                if ("number" == typeof g && (g += ""),
                g) {
                    if ("string" == typeof g)
                        if (Ta.test(g)) {
                            for (r = r || k(b),
                            l = b.createElement("div"),
                            r.appendChild(l),
                            g = g.replace(Qa, "<$1></$2>"),
                            h = (Ra.exec(g) || ["", ""])[1].toLowerCase(),
                            i = _a[h] || _a._default,
                            j = i[0],
                            l.innerHTML = i[1] + g + i[2]; j--; )
                                l = l.lastChild;
                            if (!$.support.tbody)
                                for (m = Sa.test(g),
                                n = "table" !== h || m ? "<table>" !== i[1] || m ? [] : l.childNodes : l.firstChild && l.firstChild.childNodes,
                                f = n.length - 1; f >= 0; --f)
                                    $.nodeName(n[f], "tbody") && !n[f].childNodes.length && n[f].parentNode.removeChild(n[f]);
                            !$.support.leadingWhitespace && Pa.test(g) && l.insertBefore(b.createTextNode(Pa.exec(g)[0]), l.firstChild),
                            g = l.childNodes,
                            l.parentNode.removeChild(l)
                        } else
                            g = b.createTextNode(g);
                    g.nodeType ? s.push(g) : $.merge(s, g)
                }
            if (l && (g = l = r = null),
            !$.support.appendChecked)
                for (e = 0; null != (g = s[e]); e++)
                    $.nodeName(g, "input") ? p(g) : "undefined" != typeof g.getElementsByTagName && $.grep(g.getElementsByTagName("input"), p);
            if (c)
                for (o = function(a) {
                    return !a.type || Za.test(a.type) ? d ? d.push(a.parentNode ? a.parentNode.removeChild(a) : a) : c.appendChild(a) : void 0
                }
                ,
                e = 0; null != (g = s[e]); e++)
                    $.nodeName(g, "script") && o(g) || (c.appendChild(g),
                    "undefined" != typeof g.getElementsByTagName && (q = $.grep($.merge([], g.getElementsByTagName("script")), o),
                    s.splice.apply(s, [e + 1, 0].concat(q)),
                    e += q.length));
            return s
        },
        cleanData: function(a, b) {
            for (var c, d, e, f, g = 0, h = $.expando, i = $.cache, j = $.support.deleteExpando, k = $.event.special; null != (e = a[g]); g++)
                if ((b || $.acceptData(e)) && (d = e[h],
                c = d && i[d])) {
                    if (c.events)
                        for (f in c.events)
                            k[f] ? $.event.remove(e, f) : $.removeEvent(e, f, c.handle);
                    i[d] && (delete i[d],
                    j ? delete e[h] : e.removeAttribute ? e.removeAttribute(h) : e[h] = null,
                    $.deletedIds.push(d))
                }
        }
    }),
    function() {
        var a, b;
        $.uaMatch = function(a) {
            a = a.toLowerCase();
            var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return {
                browser: b[1] || "",
                version: b[2] || "0"
            }
        }
        ,
        a = $.uaMatch(R.userAgent),
        b = {},
        a.browser && (b[a.browser] = !0,
        b.version = a.version),
        b.chrome ? b.webkit = !0 : b.webkit && (b.safari = !0),
        $.browser = b,
        $.sub = function() {
            function a(b, c) {
                return new a.fn.init(b,c)
            }
            $.extend(!0, a, this),
            a.superclass = this,
            a.fn = a.prototype = this(),
            a.fn.constructor = a,
            a.sub = this.sub,
            a.fn.init = function(c, d) {
                return d && d instanceof $ && !(d instanceof a) && (d = a(d)),
                $.fn.init.call(this, c, d, b)
            }
            ,
            a.fn.init.prototype = a.fn;
            var b = a(P);
            return a
        }
    }();
    var cb, db, eb, fb = /alpha\([^)]*\)/i, gb = /opacity=([^)]*)/, hb = /^(top|right|bottom|left)$/, ib = /^(none|table(?!-c[ea]).+)/, jb = /^margin/, kb = new RegExp("^(" + _ + ")(.*)$","i"), lb = new RegExp("^(" + _ + ")(?!px)[a-z%]+$","i"), mb = new RegExp("^([-+])=(" + _ + ")","i"), nb = {
        BODY: "block"
    }, ob = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, pb = {
        letterSpacing: 0,
        fontWeight: 400
    }, qb = ["Top", "Right", "Bottom", "Left"], rb = ["Webkit", "O", "Moz", "ms"], sb = $.fn.toggle;
    $.fn.extend({
        css: function(a, c) {
            return $.access(this, function(a, c, d) {
                return d !== b ? $.style(a, c, d) : $.css(a, c)
            }, a, c, arguments.length > 1)
        },
        show: function() {
            return s(this, !0)
        },
        hide: function() {
            return s(this)
        },
        toggle: function(a, b) {
            var c = "boolean" == typeof a;
            return $.isFunction(a) && $.isFunction(b) ? sb.apply(this, arguments) : this.each(function() {
                (c ? a : r(this)) ? $(this).show() : $(this).hide()
            })
        }
    }),
    $.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = cb(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": $.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, c, d, e) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var f, g, h, i = $.camelCase(c), j = a.style;
                if (c = $.cssProps[i] || ($.cssProps[i] = q(j, i)),
                h = $.cssHooks[c] || $.cssHooks[i],
                d === b)
                    return h && "get"in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
                if (g = typeof d,
                "string" === g && (f = mb.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat($.css(a, c)),
                g = "number"),
                !(null == d || "number" === g && isNaN(d) || ("number" !== g || $.cssNumber[i] || (d += "px"),
                h && "set"in h && (d = h.set(a, d, e)) === b)))
                    try {
                        j[c] = d
                    } catch (k) {}
            }
        },
        css: function(a, c, d, e) {
            var f, g, h, i = $.camelCase(c);
            return c = $.cssProps[i] || ($.cssProps[i] = q(a.style, i)),
            h = $.cssHooks[c] || $.cssHooks[i],
            h && "get"in h && (f = h.get(a, !0, e)),
            f === b && (f = cb(a, c)),
            "normal" === f && c in pb && (f = pb[c]),
            d || e !== b ? (g = parseFloat(f),
            d || $.isNumeric(g) ? g || 0 : f) : f
        },
        swap: function(a, b, c) {
            var d, e, f = {};
            for (e in b)
                f[e] = a.style[e],
                a.style[e] = b[e];
            d = c.call(a);
            for (e in b)
                a.style[e] = f[e];
            return d
        }
    }),
    a.getComputedStyle ? cb = function(b, c) {
        var d, e, f, g, h = a.getComputedStyle(b, null), i = b.style;
        return h && (d = h.getPropertyValue(c) || h[c],
        "" !== d || $.contains(b.ownerDocument, b) || (d = $.style(b, c)),
        lb.test(d) && jb.test(c) && (e = i.width,
        f = i.minWidth,
        g = i.maxWidth,
        i.minWidth = i.maxWidth = i.width = d,
        d = h.width,
        i.width = e,
        i.minWidth = f,
        i.maxWidth = g)),
        d
    }
    : P.documentElement.currentStyle && (cb = function(a, b) {
        var c, d, e = a.currentStyle && a.currentStyle[b], f = a.style;
        return null == e && f && f[b] && (e = f[b]),
        lb.test(e) && !hb.test(b) && (c = f.left,
        d = a.runtimeStyle && a.runtimeStyle.left,
        d && (a.runtimeStyle.left = a.currentStyle.left),
        f.left = "fontSize" === b ? "1em" : e,
        e = f.pixelLeft + "px",
        f.left = c,
        d && (a.runtimeStyle.left = d)),
        "" === e ? "auto" : e
    }
    ),
    $.each(["height", "width"], function(a, b) {
        $.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? 0 === a.offsetWidth && ib.test(cb(a, "display")) ? $.swap(a, ob, function() {
                    return v(a, b, d)
                }) : v(a, b, d) : void 0
            },
            set: function(a, c, d) {
                return t(a, c, d ? u(a, b, d, $.support.boxSizing && "border-box" === $.css(a, "boxSizing")) : 0)
            }
        }
    }),
    $.support.opacity || ($.cssHooks.opacity = {
        get: function(a, b) {
            return gb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style
              , d = a.currentStyle
              , e = $.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : ""
              , f = d && d.filter || c.filter || "";
            c.zoom = 1,
            b >= 1 && "" === $.trim(f.replace(fb, "")) && c.removeAttribute && (c.removeAttribute("filter"),
            d && !d.filter) || (c.filter = fb.test(f) ? f.replace(fb, e) : f + " " + e)
        }
    }),
    $(function() {
        $.support.reliableMarginRight || ($.cssHooks.marginRight = {
            get: function(a, b) {
                return $.swap(a, {
                    display: "inline-block"
                }, function() {
                    return b ? cb(a, "marginRight") : void 0
                })
            }
        }),
        !$.support.pixelPosition && $.fn.position && $.each(["top", "left"], function(a, b) {
            $.cssHooks[b] = {
                get: function(a, c) {
                    if (c) {
                        var d = cb(a, b);
                        return lb.test(d) ? $(a).position()[b] + "px" : d
                    }
                }
            }
        })
    }),
    $.expr && $.expr.filters && ($.expr.filters.hidden = function(a) {
        return 0 === a.offsetWidth && 0 === a.offsetHeight || !$.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || cb(a, "display"))
    }
    ,
    $.expr.filters.visible = function(a) {
        return !$.expr.filters.hidden(a)
    }
    ),
    $.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        $.cssHooks[a + b] = {
            expand: function(c) {
                var d, e = "string" == typeof c ? c.split(" ") : [c], f = {};
                for (d = 0; 4 > d; d++)
                    f[a + qb[d] + b] = e[d] || e[d - 2] || e[0];
                return f
            }
        },
        jb.test(a) || ($.cssHooks[a + b].set = t)
    });
    var tb = /%20/g
      , ub = /\[\]$/
      , vb = /\r?\n/g
      , wb = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i
      , xb = /^(?:select|textarea)/i;
    $.fn.extend({
        serialize: function() {
            return $.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? $.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || xb.test(this.nodeName) || wb.test(this.type))
            }).map(function(a, b) {
                var c = $(this).val();
                return null == c ? null : $.isArray(c) ? $.map(c, function(a, c) {
                    return {
                        name: b.name,
                        value: a.replace(vb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(vb, "\r\n")
                }
            }).get()
        }
    }),
    $.param = function(a, c) {
        var d, e = [], f = function(a, b) {
            b = $.isFunction(b) ? b() : null == b ? "" : b,
            e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (c === b && (c = $.ajaxSettings && $.ajaxSettings.traditional),
        $.isArray(a) || a.jquery && !$.isPlainObject(a))
            $.each(a, function() {
                f(this.name, this.value)
            });
        else
            for (d in a)
                x(d, a[d], c, f);
        return e.join("&").replace(tb, "+")
    }
    ;
    var yb, zb, Ab = /#.*$/, Bb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Cb = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, Db = /^(?:GET|HEAD)$/, Eb = /^\/\//, Fb = /\?/, Gb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, Hb = /([?&])_=[^&]*/, Ib = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Jb = $.fn.load, Kb = {}, Lb = {}, Mb = ["*/"] + ["*"];
    try {
        zb = Q.href
    } catch (Nb) {
        zb = P.createElement("a"),
        zb.href = "",
        zb = zb.href
    }
    yb = Ib.exec(zb.toLowerCase()) || [],
    $.fn.load = function(a, c, d) {
        if ("string" != typeof a && Jb)
            return Jb.apply(this, arguments);
        if (!this.length)
            return this;
        var e, f, g, h = this, i = a.indexOf(" ");
        return i >= 0 && (e = a.slice(i, a.length),
        a = a.slice(0, i)),
        $.isFunction(c) ? (d = c,
        c = b) : c && "object" == typeof c && (f = "POST"),
        $.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: c,
            complete: function(a, b) {
                d && h.each(d, g || [a.responseText, b, a])
            }
        }).done(function(a) {
            g = arguments,
            h.html(e ? $("<div>").append(a.replace(Gb, "")).find(e) : a)
        }),
        this
    }
    ,
    $.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        $.fn[b] = function(a) {
            return this.on(b, a)
        }
    }),
    $.each(["get", "post"], function(a, c) {
        $[c] = function(a, d, e, f) {
            return $.isFunction(d) && (f = f || e,
            e = d,
            d = b),
            $.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: f
            })
        }
    }),
    $.extend({
        getScript: function(a, c) {
            return $.get(a, b, c, "script")
        },
        getJSON: function(a, b, c) {
            return $.get(a, b, c, "json")
        },
        ajaxSetup: function(a, b) {
            return b ? A(a, $.ajaxSettings) : (b = a,
            a = $.ajaxSettings),
            A(a, b),
            a
        },
        ajaxSettings: {
            url: zb,
            isLocal: Cb.test(yb[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Mb
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": $.parseJSON,
                "text xml": $.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: y(Kb),
        ajaxTransport: y(Lb),
        ajax: function(a, c) {
            function d(a, c, d, g) {
                var j, l, s, t, v, x = c;
                2 !== u && (u = 2,
                i && clearTimeout(i),
                h = b,
                f = g || "",
                w.readyState = a > 0 ? 4 : 0,
                d && (t = B(m, w, d)),
                a >= 200 && 300 > a || 304 === a ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"),
                v && ($.lastModified[e] = v),
                v = w.getResponseHeader("Etag"),
                v && ($.etag[e] = v)),
                304 === a ? (x = "notmodified",
                j = !0) : (j = C(m, t),
                x = j.state,
                l = j.data,
                s = j.error,
                j = !s)) : (s = x,
                (!x || a) && (x = "error",
                0 > a && (a = 0))),
                w.status = a,
                w.statusText = (c || x) + "",
                j ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]),
                w.statusCode(r),
                r = b,
                k && o.trigger("ajax" + (j ? "Success" : "Error"), [w, m, j ? l : s]),
                q.fireWith(n, [w, x]),
                k && (o.trigger("ajaxComplete", [w, m]),
                --$.active || $.event.trigger("ajaxStop")))
            }
            "object" == typeof a && (c = a,
            a = b),
            c = c || {};
            var e, f, g, h, i, j, k, l, m = $.ajaxSetup({}, c), n = m.context || m, o = n !== m && (n.nodeType || n instanceof $) ? $(n) : $.event, p = $.Deferred(), q = $.Callbacks("once memory"), r = m.statusCode || {}, s = {}, t = {}, u = 0, v = "canceled", w = {
                readyState: 0,
                setRequestHeader: function(a, b) {
                    if (!u) {
                        var c = a.toLowerCase();
                        a = t[c] = t[c] || a,
                        s[a] = b
                    }
                    return this
                },
                getAllResponseHeaders: function() {
                    return 2 === u ? f : null
                },
                getResponseHeader: function(a) {
                    var c;
                    if (2 === u) {
                        if (!g)
                            for (g = {}; c = Bb.exec(f); )
                                g[c[1].toLowerCase()] = c[2];
                        c = g[a.toLowerCase()]
                    }
                    return c === b ? null : c
                },
                overrideMimeType: function(a) {
                    return u || (m.mimeType = a),
                    this
                },
                abort: function(a) {
                    return a = a || v,
                    h && h.abort(a),
                    d(0, a),
                    this
                }
            };
            if (p.promise(w),
            w.success = w.done,
            w.error = w.fail,
            w.complete = q.add,
            w.statusCode = function(a) {
                if (a) {
                    var b;
                    if (2 > u)
                        for (b in a)
                            r[b] = [r[b], a[b]];
                    else
                        b = a[w.status],
                        w.always(b)
                }
                return this
            }
            ,
            m.url = ((a || m.url) + "").replace(Ab, "").replace(Eb, yb[1] + "//"),
            m.dataTypes = $.trim(m.dataType || "*").toLowerCase().split(ba),
            null == m.crossDomain && (j = Ib.exec(m.url.toLowerCase()),
            m.crossDomain = !(!j || j[1] === yb[1] && j[2] === yb[2] && (j[3] || ("http:" === j[1] ? 80 : 443)) == (yb[3] || ("http:" === yb[1] ? 80 : 443)))),
            m.data && m.processData && "string" != typeof m.data && (m.data = $.param(m.data, m.traditional)),
            z(Kb, m, c, w),
            2 === u)
                return w;
            if (k = m.global,
            m.type = m.type.toUpperCase(),
            m.hasContent = !Db.test(m.type),
            k && 0 === $.active++ && $.event.trigger("ajaxStart"),
            !m.hasContent && (m.data && (m.url += (Fb.test(m.url) ? "&" : "?") + m.data,
            delete m.data),
            e = m.url,
            m.cache === !1)) {
                var x = $.now()
                  , y = m.url.replace(Hb, "$1_=" + x);
                m.url = y + (y === m.url ? (Fb.test(m.url) ? "&" : "?") + "_=" + x : "")
            }
            (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType),
            m.ifModified && (e = e || m.url,
            $.lastModified[e] && w.setRequestHeader("If-Modified-Since", $.lastModified[e]),
            $.etag[e] && w.setRequestHeader("If-None-Match", $.etag[e])),
            w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Mb + "; q=0.01" : "") : m.accepts["*"]);
            for (l in m.headers)
                w.setRequestHeader(l, m.headers[l]);
            if (m.beforeSend && (m.beforeSend.call(n, w, m) === !1 || 2 === u))
                return w.abort();
            v = "abort";
            for (l in {
                success: 1,
                error: 1,
                complete: 1
            })
                w[l](m[l]);
            if (h = z(Lb, m, c, w)) {
                w.readyState = 1,
                k && o.trigger("ajaxSend", [w, m]),
                m.async && m.timeout > 0 && (i = setTimeout(function() {
                    w.abort("timeout")
                }, m.timeout));
                try {
                    u = 1,
                    h.send(s, d)
                } catch (A) {
                    if (!(2 > u))
                        throw A;
                    d(-1, A)
                }
            } else
                d(-1, "No Transport");
            return w
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var Ob = []
      , Pb = /\?/
      , Qb = /(=)\?(?=&|$)|\?\?/
      , Rb = $.now();
    $.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Ob.pop() || $.expando + "_" + Rb++;
            return this[a] = !0,
            a
        }
    }),
    $.ajaxPrefilter("json jsonp", function(c, d, e) {
        var f, g, h, i = c.data, j = c.url, k = c.jsonp !== !1, l = k && Qb.test(j), m = k && !l && "string" == typeof i && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && Qb.test(i);
        return "jsonp" === c.dataTypes[0] || l || m ? (f = c.jsonpCallback = $.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback,
        g = a[f],
        l ? c.url = j.replace(Qb, "$1" + f) : m ? c.data = i.replace(Qb, "$1" + f) : k && (c.url += (Pb.test(j) ? "&" : "?") + c.jsonp + "=" + f),
        c.converters["script json"] = function() {
            return h || $.error(f + " was not called"),
            h[0]
        }
        ,
        c.dataTypes[0] = "json",
        a[f] = function() {
            h = arguments
        }
        ,
        e.always(function() {
            a[f] = g,
            c[f] && (c.jsonpCallback = d.jsonpCallback,
            Ob.push(f)),
            h && $.isFunction(g) && g(h[0]),
            h = g = b
        }),
        "script") : void 0
    }),
    $.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                return $.globalEval(a),
                a
            }
        }
    }),
    $.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1),
        a.crossDomain && (a.type = "GET",
        a.global = !1)
    }),
    $.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var c, d = P.head || P.getElementsByTagName("head")[0] || P.documentElement;
            return {
                send: function(e, f) {
                    c = P.createElement("script"),
                    c.async = "async",
                    a.scriptCharset && (c.charset = a.scriptCharset),
                    c.src = a.url,
                    c.onload = c.onreadystatechange = function(a, e) {
                        (e || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null,
                        d && c.parentNode && d.removeChild(c),
                        c = b,
                        e || f(200, "success"))
                    }
                    ,
                    d.insertBefore(c, d.firstChild)
                },
                abort: function() {
                    c && c.onload(0, 1)
                }
            }
        }
    });
    var Sb, Tb = a.ActiveXObject ? function() {
        for (var a in Sb)
            Sb[a](0, 1)
    }
    : !1, Ub = 0;
    $.ajaxSettings.xhr = a.ActiveXObject ? function() {
        return !this.isLocal && D() || E()
    }
    : D,
    function(a) {
        $.extend($.support, {
            ajax: !!a,
            cors: !!a && "withCredentials"in a
        })
    }($.ajaxSettings.xhr()),
    $.support.ajax && $.ajaxTransport(function(c) {
        if (!c.crossDomain || $.support.cors) {
            var d;
            return {
                send: function(e, f) {
                    var g, h, i = c.xhr();
                    if (c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async),
                    c.xhrFields)
                        for (h in c.xhrFields)
                            i[h] = c.xhrFields[h];
                    c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType),
                    c.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (h in e)
                            i.setRequestHeader(h, e[h])
                    } catch (j) {}
                    i.send(c.hasContent && c.data || null),
                    d = function(a, e) {
                        var h, j, k, l, m;
                        try {
                            if (d && (e || 4 === i.readyState))
                                if (d = b,
                                g && (i.onreadystatechange = $.noop,
                                Tb && delete Sb[g]),
                                e)
                                    4 !== i.readyState && i.abort();
                                else {
                                    h = i.status,
                                    k = i.getAllResponseHeaders(),
                                    l = {},
                                    m = i.responseXML,
                                    m && m.documentElement && (l.xml = m);
                                    try {
                                        l.text = i.responseText
                                    } catch (n) {}
                                    try {
                                        j = i.statusText
                                    } catch (n) {
                                        j = ""
                                    }
                                    h || !c.isLocal || c.crossDomain ? 1223 === h && (h = 204) : h = l.text ? 200 : 404
                                }
                        } catch (o) {
                            e || f(-1, o)
                        }
                        l && f(h, j, l, k)
                    }
                    ,
                    c.async ? 4 === i.readyState ? setTimeout(d, 0) : (g = ++Ub,
                    Tb && (Sb || (Sb = {},
                    $(a).unload(Tb)),
                    Sb[g] = d),
                    i.onreadystatechange = d) : d()
                },
                abort: function() {
                    d && d(0, 1)
                }
            }
        }
    });
    var Vb, Wb, Xb = /^(?:toggle|show|hide)$/, Yb = new RegExp("^(?:([-+])=|)(" + _ + ")([a-z%]*)$","i"), Zb = /queueHooks$/, $b = [J], _b = {
        "*": [function(a, b) {
            var c, d, e = this.createTween(a, b), f = Yb.exec(b), g = e.cur(), h = +g || 0, i = 1, j = 20;
            if (f) {
                if (c = +f[2],
                d = f[3] || ($.cssNumber[a] ? "" : "px"),
                "px" !== d && h) {
                    h = $.css(e.elem, a, !0) || c || 1;
                    do
                        i = i || ".5",
                        h /= i,
                        $.style(e.elem, a, h + d);
                    while (i !== (i = e.cur() / g) && 1 !== i && --j)
                }
                e.unit = d,
                e.start = h,
                e.end = f[1] ? h + (f[1] + 1) * c : c
            }
            return e
        }
        ]
    };
    $.Animation = $.extend(H, {
        tweener: function(a, b) {
            $.isFunction(a) ? (b = a,
            a = ["*"]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++)
                c = a[d],
                _b[c] = _b[c] || [],
                _b[c].unshift(b)
        },
        prefilter: function(a, b) {
            b ? $b.unshift(a) : $b.push(a)
        }
    }),
    $.Tween = K,
    K.prototype = {
        constructor: K,
        init: function(a, b, c, d, e, f) {
            this.elem = a,
            this.prop = c,
            this.easing = e || "swing",
            this.options = b,
            this.start = this.now = this.cur(),
            this.end = d,
            this.unit = f || ($.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = K.propHooks[this.prop];
            return a && a.get ? a.get(this) : K.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = K.propHooks[this.prop];
            return this.options.duration ? this.pos = b = $.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a,
            this.now = (this.end - this.start) * b + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            c && c.set ? c.set(this) : K.propHooks._default.set(this),
            this
        }
    },
    K.prototype.init.prototype = K.prototype,
    K.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = $.css(a.elem, a.prop, !1, ""),
                b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                $.fx.step[a.prop] ? $.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[$.cssProps[a.prop]] || $.cssHooks[a.prop]) ? $.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    },
    K.propHooks.scrollTop = K.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    },
    $.each(["toggle", "show", "hide"], function(a, b) {
        var c = $.fn[b];
        $.fn[b] = function(d, e, f) {
            return null == d || "boolean" == typeof d || !a && $.isFunction(d) && $.isFunction(e) ? c.apply(this, arguments) : this.animate(L(b, !0), d, e, f)
        }
    }),
    $.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(r).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function(a, b, c, d) {
            var e = $.isEmptyObject(a)
              , f = $.speed(b, c, d)
              , g = function() {
                var b = H(this, $.extend({}, a), f);
                e && b.stop(!0)
            };
            return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        },
        stop: function(a, c, d) {
            var e = function(a) {
                var b = a.stop;
                delete a.stop,
                b(d)
            };
            return "string" != typeof a && (d = c,
            c = a,
            a = b),
            c && a !== !1 && this.queue(a || "fx", []),
            this.each(function() {
                var b = !0
                  , c = null != a && a + "queueHooks"
                  , f = $.timers
                  , g = $._data(this);
                if (c)
                    g[c] && g[c].stop && e(g[c]);
                else
                    for (c in g)
                        g[c] && g[c].stop && Zb.test(c) && e(g[c]);
                for (c = f.length; c--; )
                    f[c].elem !== this || null != a && f[c].queue !== a || (f[c].anim.stop(d),
                    b = !1,
                    f.splice(c, 1));
                (b || !d) && $.dequeue(this, a)
            })
        }
    }),
    $.each({
        slideDown: L("show"),
        slideUp: L("hide"),
        slideToggle: L("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        $.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }),
    $.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? $.extend({}, a) : {
            complete: c || !c && b || $.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !$.isFunction(b) && b
        };
        return d.duration = $.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in $.fx.speeds ? $.fx.speeds[d.duration] : $.fx.speeds._default,
        (null == d.queue || d.queue === !0) && (d.queue = "fx"),
        d.old = d.complete,
        d.complete = function() {
            $.isFunction(d.old) && d.old.call(this),
            d.queue && $.dequeue(this, d.queue)
        }
        ,
        d
    }
    ,
    $.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    },
    $.timers = [],
    $.fx = K.prototype.init,
    $.fx.tick = function() {
        var a, c = $.timers, d = 0;
        for (Vb = $.now(); d < c.length; d++)
            a = c[d],
            a() || c[d] !== a || c.splice(d--, 1);
        c.length || $.fx.stop(),
        Vb = b
    }
    ,
    $.fx.timer = function(a) {
        a() && $.timers.push(a) && !Wb && (Wb = setInterval($.fx.tick, $.fx.interval))
    }
    ,
    $.fx.interval = 13,
    $.fx.stop = function() {
        clearInterval(Wb),
        Wb = null
    }
    ,
    $.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    $.fx.step = {},
    $.expr && $.expr.filters && ($.expr.filters.animated = function(a) {
        return $.grep($.timers, function(b) {
            return a === b.elem
        }).length
    }
    );
    var ac = /^(?:body|html)$/i;
    $.fn.offset = function(a) {
        if (arguments.length)
            return a === b ? this : this.each(function(b) {
                $.offset.setOffset(this, a, b)
            });
        var c, d, e, f, g, h, i, j = {
            top: 0,
            left: 0
        }, k = this[0], l = k && k.ownerDocument;
        if (l)
            return (d = l.body) === k ? $.offset.bodyOffset(k) : (c = l.documentElement,
            $.contains(c, k) ? ("undefined" != typeof k.getBoundingClientRect && (j = k.getBoundingClientRect()),
            e = M(l),
            f = c.clientTop || d.clientTop || 0,
            g = c.clientLeft || d.clientLeft || 0,
            h = e.pageYOffset || c.scrollTop,
            i = e.pageXOffset || c.scrollLeft,
            {
                top: j.top + h - f,
                left: j.left + i - g
            }) : j)
    }
    ,
    $.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop
              , c = a.offsetLeft;
            return $.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat($.css(a, "marginTop")) || 0,
            c += parseFloat($.css(a, "marginLeft")) || 0),
            {
                top: b,
                left: c
            }
        },
        setOffset: function(a, b, c) {
            var d = $.css(a, "position");
            "static" === d && (a.style.position = "relative");
            var e, f, g = $(a), h = g.offset(), i = $.css(a, "top"), j = $.css(a, "left"), k = ("absolute" === d || "fixed" === d) && $.inArray("auto", [i, j]) > -1, l = {}, m = {};
            k ? (m = g.position(),
            e = m.top,
            f = m.left) : (e = parseFloat(i) || 0,
            f = parseFloat(j) || 0),
            $.isFunction(b) && (b = b.call(a, c, h)),
            null != b.top && (l.top = b.top - h.top + e),
            null != b.left && (l.left = b.left - h.left + f),
            "using"in b ? b.using.call(a, l) : g.css(l)
        }
    },
    $.fn.extend({
        position: function() {
            if (this[0]) {
                var a = this[0]
                  , b = this.offsetParent()
                  , c = this.offset()
                  , d = ac.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
                return c.top -= parseFloat($.css(a, "marginTop")) || 0,
                c.left -= parseFloat($.css(a, "marginLeft")) || 0,
                d.top += parseFloat($.css(b[0], "borderTopWidth")) || 0,
                d.left += parseFloat($.css(b[0], "borderLeftWidth")) || 0,
                {
                    top: c.top - d.top,
                    left: c.left - d.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || P.body; a && !ac.test(a.nodeName) && "static" === $.css(a, "position"); )
                    a = a.offsetParent;
                return a || P.body
            })
        }
    }),
    $.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, c) {
        var d = /Y/.test(c);
        $.fn[a] = function(e) {
            return $.access(this, function(a, e, f) {
                var g = M(a);
                return f === b ? g ? c in g ? g[c] : g.document.documentElement[e] : a[e] : void (g ? g.scrollTo(d ? $(g).scrollLeft() : f, d ? f : $(g).scrollTop()) : a[e] = f)
            }, a, e, arguments.length, null)
        }
    }),
    $.each({
        Height: "height",
        Width: "width"
    }, function(a, c) {
        $.each({
            padding: "inner" + a,
            content: c,
            "": "outer" + a
        }, function(d, e) {
            $.fn[e] = function(e, f) {
                var g = arguments.length && (d || "boolean" != typeof e)
                  , h = d || (e === !0 || f === !0 ? "margin" : "border");
                return $.access(this, function(c, d, e) {
                    var f;
                    return $.isWindow(c) ? c.document.documentElement["client" + a] : 9 === c.nodeType ? (f = c.documentElement,
                    Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? $.css(c, d, e, h) : $.style(c, d, e, h)
                }, c, g ? e : b, g, null)
            }
        })
    }),
    a.jQuery = a.$ = $,
    "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return $
    })
}(window),
function($, exports) {
    var KUI, version = "@VERSION@", _KEYWORDS = ["extended", "included"], _htmlDecodeDict = {
        quot: '"',
        lt: "<",
        gt: ">",
        amp: "&",
        nbsp: " "
    }, _htmlEncodeDict = {
        '"': "quot",
        "<": "lt",
        ">": "gt",
        "&": "amp",
        " ": "nbsp"
    }, _templateSettings = {
        evaluate: /{%([\s\S]+?)%}/g,
        interpolate: /{%=([\s\S]+?)%}/g,
        saveRegex: /\{\$(\w+)\}/g
    }, _eventSplitter = /^(\w+)\s*(.*)$/, _extend = function(a, b, c) {
        var d = $.isArray(c);
        for (var e in b)
            d ? -1 === $.inArray(e, c) && (a[e] = b[e]) : a[e] = b[e]
    }, Class = function(a) {
        var b = function() {
            this.initializer.apply(this, arguments),
            this.init.apply(this, arguments)
        };
        if (b.prototype.initializer = function() {}
        ,
        b.prototype.init = function() {}
        ,
        a) {
            var c = function() {};
            $.extend(!0, b, a),
            c.prototype = $.extend(!0, {}, a.prototype),
            b.prototype = new c
        }
        return b.fn = b.prototype,
        b.fn.parent = b,
        b.extend = function(a) {
            if (a) {
                var c = $.extend(!0, {}, a);
                _extend(b, c, _KEYWORDS);
                var d = c.extended;
                "function" == typeof d && d(b)
            }
            return b
        }
        ,
        b.include = function(a) {
            if (a) {
                var c = $.extend(!0, {}, a);
                _extend(b.fn, c, _KEYWORDS);
                var d = c.included;
                "function" == typeof d && d(b)
            }
            return b
        }
        ,
        b.proxy = function(a) {
            var b = this
              , c = Array.prototype.slice.call(arguments, 1);
            return function() {
                var d = $.makeArray(arguments)
                  , e = d.concat(c);
                return a.apply(b, e)
            }
        }
        ,
        b.proxyAll = function() {
            for (var a = $.makeArray(arguments), b = 0; b < a.length; b++)
                this[a[b]] = this.proxy(this[a[b]])
        }
        ,
        b.fn.proxy = b.proxy,
        b.fn.proxyAll = b.proxyAll,
        b
    };
    Class.create = function(a, b) {
        var c = new Class;
        return a && c.include(a),
        b && c.extend(b),
        c
    }
    ,
    KUI = new Class,
    KUI.Class = Class,
    KUI.Events = {
        bind: function(a, b) {
            for (var c = a.split(" "), d = (this._callbacks || (this._callbacks = {}),
            0); d < c.length; d++)
                (this._callbacks[c[d]] || (this._callbacks[c[d]] = [])).push(b);
            return this
        },
        trigger: function() {
            var a, b, c, d, e = $.makeArray(arguments), f = e.shift();
            if (!(b = this._callbacks))
                return !1;
            if (!(a = this._callbacks[f]))
                return !1;
            for (c = 0,
            d = a.length; d > c && a[c].apply(this, e) !== !1; c++)
                ;
            return !0
        },
        unbind: function(a, b) {
            if (!a)
                return this._callbacks = {},
                this;
            var c, d, e, f;
            if (!(d = this._callbacks))
                return this;
            if (!(c = this._callbacks[a]))
                return this;
            if (!b)
                return delete this._callbacks[a],
                this;
            for (e = 0,
            f = c.length; f > e; e++)
                if (b === c[e]) {
                    c.splice(e, 1);
                    break
                }
            return this
        }
    },
    KUI.extend({
        version: version,
        zIndex: 0,
        isObject: function(a) {
            return $.isPlainObject(a)
        },
        guid: function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                var b = 16 * Math.random() | 0
                  , c = "x" == a ? b : 3 & b | 8;
                return c.toString(16)
            }).toUpperCase()
        },
        namespace: function(a) {
            for (var b = window, c = a.split("."), d = 0, e = c.length; e > d; d++) {
                if (b[c[d]]) {
                    if (d == e - 1 && b[c[d]])
                        throw new Error("namespace [ " + a + " ] is exist!")
                } else
                    b[c[d]] = {};
                b = b[c[d]]
            }
        },
        decodeHTML: function(a) {
            return String(a).replace(/&(quot|lt|gt|amp|nbsp);/gi, function(a, b) {
                return _htmlDecodeDict[b]
            }).replace(/&#u([a-f\d]{4});/gi, function(a, b) {
                return String.fromCharCode(parseInt("0x" + b))
            }).replace(/&#(\d+);/gi, function(a, b) {
                return String.fromCharCode(+b)
            })
        },
        encodeHTML: function(a) {
            return String(a).replace(/["<>& ]/g, function(a) {
                return "&" + _htmlEncodeDict[a] + ";"
            })
        },
        clearHTML: function(a) {
            return a = a.replace(/<\/?[^>]*>/g, ""),
            a = a.replace(/[ | ]*\n/g, "\n"),
            a = a.replace(/\n[\s| | ]*\r/g, "\n"),
            a = a.replace(/&nbsp;/gi, "")
        },
        replaceWith: function(a, b) {
            var c = this
              , d = a.replace(/%7B/gi, "{").replace(/%7D/gi, "}");
            return d.replace(_templateSettings.saveRegex, function(a, d) {
                return d in b ? c.encodeHTML(b[d]) : a
            })
        },
        queryToJson: function(a, b) {
            a = a || exports.location.search;
            for (var c, d, e, f, g = a.substr(a.indexOf("?") + 1), h = g.split("&"), i = h.length, j = {}, k = 0; i > k; k++)
                f = h[k].split("="),
                c = f[0],
                c && (d = f[1] ? b ? decodeURIComponent(f[1]) : f[1] : ""),
                e = j[c],
                "undefined" == typeof e ? j[c] = d : $.isArray(e) ? e.push(d) : j[c] = [e, d];
            return j
        },
        getParam: function(a, b, c) {
            var d = this.queryToJson(b, c);
            return a ? d[a] || "" : d
        },
        getForm: function(a) {
            var b = $("input,select,textarea", $(a || exports.document)).serialize().replace(/\+/gi, "%20");
            return this.queryToJson(b, !0)
        },
        setForm: function(a, b) {
            for (var c in a) {
                var d = $("[name=" + c + "]", $(b || exports.document));
                if (d.size() > 0) {
                    var e = d.attr("type") || ("SELECT" == d.get(0).nodeName ? "select" : "textarea");
                    switch (e.toLocaleLowerCase()) {
                    case "text":
                    case "hidden":
                    case "select":
                    case "textarea":
                        d.val(a[c] || "");
                        break;
                    case "radio":
                        d.each(function() {
                            $(this).val() == a[c] && $(this).attr("checked", "checked")
                        });
                        break;
                    case "checkbox":
                        var f = a[c];
                        "object" != typeof f && (f = f.toString().split(",")),
                        d.each(function() {
                            for (var a = $(this), b = a.val(), c = 0, d = f.length; d > c; c++)
                                if (b == f[c]) {
                                    a.attr("checked", "checked");
                                    break
                                }
                        })
                    }
                }
            }
        },
        getCharCount: function(a) {
            return a.replace(/[^\x00-\xff]/g, "xx").length
        },
        substr: function(a, b) {
            var c = 0
              , d = 0
              , e = new String;
            d = a.length;
            for (var f = 0; d > f; f++) {
                var g = a.charAt(f);
                if (c++,
                escape(g).length > 4 && c++,
                e = e.concat(g),
                c >= b)
                    return e
            }
            return b > c ? a : void 0
        },
        refresh: function() {
            var a = exports.location
              , b = this.queryToJson(a.search);
            $.isEmptyObject() && (b = {}),
            $.extend(b, {
                n: Math.random()
            }),
            a.href = a.pathname + "?" + $.param(b) + a.hash
        },
        isDigits: function(a) {
            return /^\d+$/.test(a)
        },
        isNumber: function(a) {
            return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
        },
        isDate: function(a) {
            return !/Invalid|NaN/.test(new Date(a))
        },
        byId: function(a) {
            return document.getElementById(a)
        },
        log: function(a) {
            window.console && console.log && console.log(a)
        }
    }),
    KUI.Controller = Class.create({
        tag: "div",
        initializer: function(a) {
            if (this.options = a || {},
            "object" != typeof this.options)
                throw new Error("控制器初始化参数必须是对象");
            for (var b in this.options)
                this[b] = this.options[b];
            this.el || (this.el = exports.document.createElement(this.tag)),
            this.el = $(this.el),
            this.events || (this.events = this.parent.events),
            this.elements || (this.elements = this.parent.elements),
            this.events && this.delegateEvents(),
            this.elements && this.refreshElements(),
            this.proxied && this.proxyAll.apply(this, this.proxied)
        },
        $: function(a) {
            return $(a, this.el)
        },
        delegateEvents: function() {
            for (var a in this.events) {
                var b = this.events[a]
                  , c = this.proxy(this[b])
                  , d = a.match(_eventSplitter)
                  , e = d[1]
                  , f = d[2];
                "" === f ? this.el.bind(e, c) : this.el.delegate(f, e, c)
            }
        },
        refreshElements: function() {
            for (var a in this.elements)
                this[this.elements[a]] = this.$(a)
        },
        delay: function(a, b) {
            setTimeout(this.proxy(a), b || 0)
        }
    }),
    KUI.Controller.create = function(a) {
        var b = new Class(KUI.Controller);
        return a && b.include(a),
        b
    }
    ,
    KUI._widgets = {},
    KUI.Widget = Class.create({
        initializer: function() {
            this.id = KUI.guid(),
            this.parent._register(this),
            this.parent.trigger("init", this),
            this.bind("destroy", this._destroying)
        },
        destroy: function() {
            this.trigger("destroy", this),
            this.parent._unregister(this.id),
            this.parent.trigger("destroyed", this)
        },
        _destroying: function() {}
    }),
    KUI.Widget.extend({
        get: function(a) {
            return KUI._widgets[a]
        },
        _unregister: function(a) {
            delete KUI._widgets[a]
        },
        _register: function(a) {
            KUI._widgets[a.id] = a
        }
    }),
    KUI.Widget.extend(KUI.Events),
    KUI.Widget.include(KUI.Events),
    KUI.template = KUI.T = function() {
        var a = arguments
          , b = this;
        if (2 == a.length) {
            if ($.isArray(a[1])) {
                for (var c = [], d = 0, e = a[1].length; e > d; d++)
                    a[1][d]._currentIndex = d,
                    c.push(KUI.template(a[0], a[1][d]));
                return c.join("")
            }
            return function(a, c) {
                if ("string" != typeof a)
                    throw new Error("template is not a string");
                if (!$.isPlainObject(c))
                    throw new Error("data from template is not a object");
                var d = _templateSettings;
                a = b.replaceWith(a, c);
                var e = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(d.interpolate, function(a, b) {
                    return "'," + b.replace(/\\'/g, "'") + ",'"
                }).replace(d.evaluate || null, function(a, b) {
                    return "');" + b.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('"
                }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');"
                  , f = new Function("obj",e);
                return c ? f(c) : f
            }(a[0], a[1])
        }
        if (a.length > 2) {
            for (var c = arguments.callee(a[0], a[1]), d = 2, e = a.length; e > d; d++)
                c = arguments.callee(c, a[d]);
            return c
        }
        return arguments[0]
    }
    ,
    KUI.date = function(dateStr, format, options) {
        if (!dateStr)
            return new Date;
        var obj = null;
        if (/Date/.test(dateStr)) {
            var d = dateStr.replace(/\//g, "");
            obj = eval("(new " + d + ")")
        } else
            obj = "string" == typeof dateStr ? new Date(dateStr.replace(/-/g, "/")) : dateStr;
        var setting = {
            y: 0,
            M: 0,
            d: 0,
            h: 0,
            m: 0,
            s: 0
        };
        $.extend(setting, options || {}),
        obj = new Date(setting.y + obj.getFullYear(),setting.M + obj.getMonth(),setting.d + obj.getDate(),setting.h + obj.getHours(),setting.m + obj.getMinutes(),setting.s + obj.getSeconds());
        var o = {
            "M+": obj.getMonth() + 1,
            "d+": obj.getDate(),
            "h+": obj.getHours(),
            "m+": obj.getMinutes(),
            "s+": obj.getSeconds(),
            "q+": Math.floor((obj.getMonth() + 3) / 3),
            S: obj.getMilliseconds()
        };
        if (format) {
            /(y+)/.test(format) && (format = format.replace(RegExp.$1, 4 == RegExp.$1.length ? obj.getFullYear() : (obj.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var k in o)
                new RegExp("(" + k + ")").test(format) && (format = format.replace(RegExp.$1, 1 == RegExp.$1.length ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)));
            return format
        }
        return obj
    }
    ,
    KUI.cookie = function(a, b, c) {
        if (arguments.length > 1 && (null === b || "object" != typeof b)) {
            if (c = $.extend({
                encodeKey: !0
            }, c),
            null === b && (c.expires = -1),
            "number" == typeof c.expires) {
                var d = c.expires
                  , e = c.expires = new Date;
                e.setDate(e.getDate() + d)
            }
            return document.cookie = [c.encodeKey ? encodeURIComponent(a) : a, "=", c.raw ? String(b) : encodeURIComponent(String(b)), c.expires ? "; expires=" + c.expires.toUTCString() : "", c.path ? "; path=" + c.path : "", c.domain ? "; domain=" + c.domain : "", c.secure ? "; secure" : ""].join("")
        }
        c = b || {};
        var f, g = c.raw ? function(a) {
            return a
        }
        : decodeURIComponent;
        return (f = new RegExp("(?:^|; )" + (c.encodeKey ? encodeURIComponent(a) : a) + "=([^;]*)").exec(document.cookie)) ? g(f[1]) : null
    }
    ,
    KUI.clip = function(a) {
        if (a) {
            ZeroClipboard.setDefaults({
                trustedOrigins: [window.location.protocol + "//" + window.location.host],
                allowScriptAccess: "always"
            });
            var b = new ZeroClipboard(a,{
                moviePath: "http://ptres.37.com/js/sq/plugin/ZeroClipboard.swf"
            });
            return b.on("complete", function() {
                window.alert("已经复制到剪贴板")
            }),
            b
        }
    }
    ,
    exports.KUI = exports.SQ = KUI
}(jQuery, window),
function(a, b, c) {
    var d = c.ks_user;
    b.common = b.common || {},
    a.extend(b.common, {
        chkSignin: function(a) {
            c.document.location.href;
            return d && "" != d.length ? !0 : (a && new b.LoginDialog({
                autoShow: !0
            }),
            !1)
        },
        bm: function(a, d) {
            var e = a || c.location.href
              , f = d || document.title
              , g = "请您尝试同时按下Ctrl和D键收藏本页";
            try {
                c.external.AddFavorite(e, f)
            } catch (h) {
                try {
                    c.sidebar.addPanel(f, e, "")
                } catch (h) {
                    return b.alert(g)
                }
            }
        },
        freeze: function(b, c, d) {
            var e = this.FreezingFlagName = "freeze-countdown"
              , f = this
              , g = a(b)
              , h = "freezing";
            return void 0 === c ? !!g.data(h) : (g.data(h, c),
            c === !0 ? g.addClass(h) : c === !1 && g.removeClass(h),
            void (c !== !0 || g.data(e) || 0 === d || new f.unfreezeSchedule(g,d,e,f)))
        },
        isfreeze: function(a) {
            return this.freeze(a)
        },
        unfreeze: function(b, c) {
            var d = this.FreezingFlagName || "freeze-countdown";
            c && c !== b.data(d) || (this.freeze(b, !1),
            a(b).data(d, !1))
        },
        unfreezeSchedule: function(a, b, c, d) {
            var e, f = this;
            c = c || this.FreezingFlagName || "freeze-countdown",
            b = b || 1e3,
            e = setTimeout(function() {
                d.unfreeze(a, e),
                f = null
            }, b),
            a.data(c, e)
        },
        mutiTpl: function(b, c) {
            var d, e, c = a.extend({
                innerVar: "{$inner}"
            }, c);
            return e = b.replace(reg_lineGap, "").replace(reg_innerTpl, function(a, b) {
                return d = b,
                c.innerVar
            }),
            {
                inner: d,
                wrap: e
            }
        },
        getHtml: function(a, b) {
            var c;
            if (b) {
                for (c in b) {
                    var d = new RegExp("\\{\\$" + c + "\\}","mg");
                    a = a.replace(d, b[c])
                }
                return a
            }
        },
        positionNum: function(a, b) {
            var c = new Image;
            c.src = this.getHtml(a, b) + "&t=" + Math.random()
        },
        copy: function(a) {
            return a = a || "modal_card_num",
            SC.clip(SC.byId(a))
        },
        killCopy: function() {
            try {
                c.ZeroClipboard.destroy()
            } catch (a) {
                SC.log("clipBridge not found..")
            }
        },
        getParam: function(a, b, c) {
            b = b || document.location.href;
            var d = c ? "#" : "?"
              , e = new RegExp("[\\" + d + "|\\&]" + a + "=([^\\&|\\#|\\?]+)","i")
              , f = e.exec(b);
            return f && f.length > 1 ? f[1] : null
        },
        setParam: function(a, b, c, d) {
            c = c || document.location.href;
            var e = d ? "#" : "?"
              , f = (this.getParam(a, c),
            a + "=" + b)
              , g = new RegExp("(\\" + e + "|\\&)" + a + "=?[^\\&|\\#|\\?]*","i");
            return c.match(g) ? c = c.replace(g, "$1" + f) : c.match("\\" + e) ? c = c.replace(e, e + f + "&") : c += "?" + f,
            c
        },
        getHash: function(a, b) {
            return this.getParam(a, b, !0)
        },
        setHash: function(a, b, c) {
            return this.setParam(a, b, c, !0)
        },
        loadResouse: function(a, b, c) {
            var d;
            if ("js" === a)
                d = document.createElement("script"),
                d.src = b,
                d.async = !0;
            else {
                if ("css" !== a)
                    return;
                d = document.createElement("link"),
                d.type = "text/css",
                d.rel = "stylesheet",
                d.href = b
            }
            return c && (d.onreadystatechange = d.onload = function() {
                var a = d.readyState;
                c.done || a && !/loaded|complete/.test(a) || (c.done = !0,
                c())
            }
            ),
            document.getElementsByTagName("head")[0].appendChild(d),
            this
        },
        throttle: function(a, b) {
            var c = this
              , d = null;
            return function() {
                var e = c
                  , f = arguments;
                clearTimeout(d),
                d = setTimeout(function() {
                    a.apply(e, f)
                }, b)
            }
        }
    })
}(jQuery, SQ, window);
try {
    document.domain = "wan.liebao.cn"
} catch (e) {}
var ks_game_2_lb = [3, 4, 8, 10]
  , cur_url = document.URL
  , is_logined = "" == ks_user ? 0 : 1
  , is_played = is_logined && "" != ks_user.played ? 1 : 0
  , tip = is_played ? "最近登录的服务器：" : "推荐您进入："
  , wan_url = "http://wan.liebao.cn/"
  , shortcut_name = "金山猎豹游戏中心"
  , shortcut_url = "http://wan.liebao.cn/?frm=shortcut"
  , shortcut_favicon = "http://image.wan.liebao.cn/game/index/ico/favicon.ico";
Array.prototype.contains = function(a) {
    for (var b = 0; b < this.length; b++)
        if (this[b] == a)
            return !0;
    return !1
}
,
String.format = function(a) {
    if (0 == arguments.length)
        return null;
    var b = Array.prototype.slice.call(arguments, 1);
    return a.replace(/\{(\d+)\}/g, function(a, c) {
        return b[c]
    })
}
;
var is_ks_game = function(a) {
    return 1e3 >= a && !ks_game_2_lb.contains(a)
}
  , ks_login_url_format = function(a, b, c, d, e) {
    return a = encodeURIComponent(encodeURIComponent(encodeURIComponent(a))),
    lp = encodeURIComponent("https://login.ijinshan.com/webgame/w/" + e + ".html?style=" + c + "&btn=" + d),
    "https://login.ijinshan.com/?lp=" + lp + "&if=1&service=http%3A%2F%2Fi.wan.liebao.cn%2Flogin%3Fgo%3D" + a + "%26supplier_id%3D" + b
}
  , ks_logout_url_format = function(a) {
    return "http://wan.liebao.cn/action/logout.php?bu=" + encodeURIComponent(a)
}
  , logout_url = ks_logout_url_format(cur_url)
  , chk_Num = function(a) {
    return a.value.replace(/\D/g, "")
}
  , addfavorite = function() {
    var a = location.href
      , b = document.title;
    try {
        window.external.addFavorite(a, b)
    } catch (c) {
        try {
            window.sidebar.addPanel(b, a, "")
        } catch (c) {
            alert("请使用Ctrl+D进行添加")
        }
    }
}
  , setHome = function() {
    try {
        var a = this;
        a.style.behavior = "url(#default#homepage)";
        var b = window.location.href;
        a.setHomePage(b)
    } catch (c) {
        alert("您好，您的浏览器不支持直接设为首页，请使用浏览器菜单手动设置本站为首页，祝您使用愉快！")
    }
}
  , wanCommonPart = function() {
    $("#wan_addfavorite").click(addfavorite),
    $("#wan_sethome").click(setHome)
}
  , Create = function() {
    _kwsNotify('{"name":"' + shortcut_name + '","url":"' + shortcut_url + '","icon":"' + shortcut_favicon + '"}', "CreateOnlineShortcut")
}
  , Check_status = function() {
    try {
        var a = _kwsNotify("version");
        return a >= "1.0.0.0" ? !0 : !1
    } catch (b) {
        return !1
    }
}
  , _Create = function() {
    external._kwsNotify('{"name":"' + shortcut_name + '","url":"' + shortcut_url + '","icon":"' + shortcut_favicon + '","location":1}', "CreateOnlineShortcut")
}
  , _Check_status = function() {
    try {
        var a = external._kwsNotify("version");
        return a >= "1.0.0.0" ? !0 : !1
    } catch (b) {
        return !1
    }
}
  , getParam = function(a) {
    try {
        var b = window.location.search
          , c = RegExp("" + a + "=([^&?]*)", "ig");
        return b.match(c) ? decodeURIComponent(b.match(c)[0].substr(a.length + 1)) : ""
    } catch (d) {
        return ""
    }
};
if (void 0 === Util)
    var Util = {};
Util.URLParser = function(a) {
    this._fields = {
        Username: 4,
        Password: 5,
        Port: 7,
        Protocol: 2,
        Host: 6,
        Pathname: 8,
        URL: 0,
        Querystring: 9,
        Fragment: 10
    },
    this._values = {},
    this._regex = null,
    this.version = .1,
    this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
    for (var b in this._fields)
        this["get" + b] = this._makeGetter(b);
    void 0 !== a && this._parse(a)
}
,
Util.URLParser.prototype.setURL = function(a) {
    this._parse(a)
}
,
Util.URLParser.prototype._initValues = function() {
    for (var a in this._fields)
        this._values[a] = ""
}
,
Util.URLParser.prototype._parse = function(a) {
    this._initValues();
    var b = this._regex.exec(a);
    if (!b)
        throw "DPURLParser::_parse -> Invalid URL";
    for (var c in this._fields)
        void 0 !== b[this._fields[c]] && (this._values[c] = b[this._fields[c]])
}
,
Util.URLParser.prototype._makeGetter = function(a) {
    return function() {
        return this._values[a]
    }
}
;
var Cookies = {
    aliases: {},
    alias: function(a, b, c) {
        Cookies.aliases[a] = b,
        Cookies[a] = function(a, d) {
            return null == a ? Cookies.get(b, c) : void Cookies.set(b, a, d)
        }
    },
    set: function(a, b, c) {
        a = Cookies.aliases[a] || a;
        var d = "";
        if (!isNaN(c)) {
            var e = new Date;
            e.setTime(e.getTime() + 24 * c * 60 * 60 * 1e3),
            d = "; expires=" + e.toGMTString()
        }
        document.cookie = a + "=" + escape(b) + d + "; path=/;domain=wan.liebao.cn"
    },
    get: function(a, b) {
        a = Cookies.aliases[a] || a;
        var c = new RegExp(a + "\\s*=\\s*(.*?)(;|$)")
          , d = document.cookie.toString()
          , e = d.match(c);
        return e ? unescape(e[1]) : b
    },
    erase: function(a) {
        Cookies.set(a, "", -1)
    }
}
  , http_referer = document.referrer
  , frm = getParam("frm")
  , referer = getParam("referer");
frm && Cookies.set("frm", frm, NaN);
var wan_url_reg = /wan\.liebao\.cn/
  , game_reg = /\/(.*?)\//
  , cur_url = document.URL
  , p = new Util.URLParser(cur_url)
  , host = p.getHost()
  , pathname = p.getPathname()
  , _games = game_reg.test(pathname) ? game_reg.exec(pathname) : ""
  , game_alias = _games.length > 1 ? "/" + _games[1] : ""
  , cur_refer = host + game_alias
  , fdata = Cookies.get("fdata", "")
  , _fdata = fdata.split("||;")
  , cookie_referer = _fdata[0] ? decodeURIComponent(_fdata[0]) : ""
  , uid = frm ? frm : _fdata[1] ? decodeURIComponent(_fdata[1]) : ""
  , ad_type = _fdata[2] ? _fdata[2] : ""
  , adparam = _fdata[3] ? decodeURIComponent(_fdata[3]) : ""
  , gameid = _fdata[4] ? _fdata[4] : ""
  , gameserverid = _fdata[5] ? _fdata[5] : ""
  , ext = _fdata[6] ? _fdata[6] : "";
http_referer ? (p = new Util.URLParser(http_referer),
host = p.getHost(),
pathname = p.getPathname(),
_games = game_reg.test(pathname) ? game_reg.exec(pathname) : "",
game_alias = _games.length > 1 ? "/" + _games[1] : "",
refer = host + game_alias,
cookie_referer ? wan_url_reg.test(cookie_referer) ? cookie_referer = wan_url_reg.test(http_referer) ? refer : host : wan_url_reg.test(http_referer) || (cookie_referer = host) : cookie_referer = wan_url_reg.test(http_referer) ? refer : host) : cookie_referer = cur_refer,
/i\.wan\.liebao\.cn/.test(cookie_referer) && (cookie_referer = cur_refer),
referer && (cookie_referer = referer),
fdata = encodeURIComponent(cookie_referer) + "||;" + encodeURIComponent(uid) + "||;" + ad_type + "||;" + encodeURIComponent(adparam) + "||;" + gameid + "||;" + gameserverid + "||;" + ext,
frm || Cookies.set("frm", encodeURIComponent(uid), NaN),
Cookies.set("fdata", fdata, NaN);
var liebao_pdata = ""
  , s = getParam("src")
  , v = getParam("version");
liebao_pdata = http_referer ? encodeURIComponent(refer) + "||;" + encodeURIComponent(s) + "||;" + encodeURIComponent(v) : encodeURIComponent(cur_refer) + "||;" + encodeURIComponent(s) + "||;" + encodeURIComponent(v),
Cookies.set("liebao_pdata", liebao_pdata, NaN),
function(a, b, c) {
    var d = new c.Class(c.Widget);
    d.include({
        init: function(c) {
            this.options = {
                el: null,
                tabs: "[data-type='tab']",
                panels: "[data-type='panel']",
                eventType: "mouseenter",
                index: 0,
                auto: !1,
                interval: 6e3,
                animate: {
                    show: "show",
                    hide: "hide"
                },
                currentClass: "active",
                prevClass: "prev",
                lazyLoadAttr: null,
                lazyLoadTo: "bg",
                lazyPreload: !1,
                controlerLeft: null,
                controlerRig: null,
                noAnimateForIE6: !0,
                animateForIE9Less: !1,
                animateDuring: 400
            },
            a.extend(this.options, c || {}),
            this.el = a(this.options.el),
            this.tabs = a(this.options.tabs, this.el),
            this.panels = a(this.options.panels, this.el),
            this.el.attr("data-kid", this.id),
            this.currentIndex = this.options.index,
            this.tabsLen = this.panels.size(),
            this.isIE6 = b.navigator.userAgent.toLowerCase().match("ie 6"),
            this.isIE789 = b.navigator.userAgent.toLowerCase().match(/ie (7|8|9)/),
            this.options.noAnimateForIE6 && this.isIE6 && a.extend(this.options, {
                animate: {
                    show: "show"
                }
            }),
            this.options.animateForIE9Less && this.isIE789 && a.extend(this.options, {
                animate: {
                    show: "fadeIn"
                },
                animateDuring: 400
            }),
            "show" === this.options.animate.show && a.extend(this.options, {
                animateDuring: 0
            }),
            this.change(this.options.index),
            this._events(),
            this.options.auto && this.tabsLen > 1 && this.auto()
        },
        change: function(a) {
            var b = this.options.currentClass
              , c = this.options.prevClass;
            this.initImg(this.panels.eq(a)),
            this.tabs.filter("." + c).removeClass(c),
            this.tabs.filter("." + b).removeClass(b).addClass(c),
            this.tabs.eq(a).addClass(b),
            this.panels.filter("." + c).removeClass(c),
            this.panels.filter("." + b).removeClass(b).addClass(c),
            this.panels.hide().eq(a).addClass(b)[this.options.animate.show](this.options.animateDuring),
            this.currentIndex = a,
            this.trigger("change", a, this)
        },
        _events: function() {
            if (this.el.on(this.options.eventType, this.options.tabs, this.proxy(this._eventHandler)),
            this.options.auto && this.tabsLen > 1 && (this.el.on("mouseenter", this.proxy(this.stop)),
            this.el.on("mouseleave", this.proxy(this.auto))),
            this.options.controlerLeft && (this.el.on("click", this.options.controlerLeft, this.proxy(this.prePane)),
            this.el.on("click", this.options.controlerRig, this.proxy(this.nextPane))),
            this.options.lazyPreload && this.options.lazyLoadAttr) {
                var c = this;
                a(b).load(function() {
                    c.initImg(c.panels)
                })
            }
        },
        _eventHandler: function(a) {
            var b = a.currentTarget;
            if (!(b.className.indexOf(this.options.currentClass) > -1)) {
                var c = 0;
                this.tabs.each(function(a) {
                    return b === this ? (c = a,
                    !1) : void 0
                }),
                this.change(c)
            }
        },
        auto: function() {
            this.timerId || (this.timerId = b.setInterval(this.proxy(this._autoHandler), this.options.interval),
            this.trigger("auto", this))
        },
        _autoHandler: function() {
            var a = this.currentIndex + 1;
            a >= this.tabsLen && (a = 0),
            this.change(a)
        },
        stop: function() {
            this.timerId && (b.clearInterval(this.timerId),
            this.trigger("stop", this),
            this.timerId = null)
        },
        _destroying: function() {
            this.stop(),
            this.el.removeAttr("data-kid"),
            this.tabs.unbind(this.options.eventType),
            this.panels.unbind()
        },
        initImg: function(b) {
            var c = this.options.lazyLoadAttr
              , d = this.options.lazyLoadTo;
            c && b.find("[" + c + "]").each(function(b, e) {
                var f = a(e)
                  , g = f.attr(c);
                g && ("bg" === d && f.attr("style", "background-image:url('" + g + "')"),
                "src" === d && f.attr("src", g),
                f.removeAttr(c))
            })
        },
        prePane: function() {
            0 === this.currentIndex ? this.change(this.tabsLen - 1) : this.change(this.currentIndex - 1),
            this.trigger("prev", this)
        },
        nextPane: function() {
            this.currentIndex === this.tabsLen - 1 ? this.change(0) : this.change(this.currentIndex + 1),
            this.trigger("next", this)
        },
        jumpPane: function(a) {
            return a -= 1,
            0 > a || a > this.tabsLen - 1 ? !1 : (this.change(a),
            void this.trigger("jump", this))
        }
    }),
    c.Tab = d
}(jQuery, window, SQ),
jQuery(function(a) {
    var b = [];
    a('[data-role="tabpanel"]').each(function(a, c) {
        b[a] = new SQ.Tab({
            el: c
        })
    })
}),
function(a, b, c, d) {
    var e = new b.Class(b.Widget);
    e.include({
        init: function(c) {
            var d = {
                obj: null,
                frame: '[data-prop="rollist-frame"]',
                wrapper: '[data-prop="rollist-wrapper"]',
                indicators: '[data-prop="rollist-indicators"]',
                controlPrev: '[data-prop="handler-prev"]',
                controlNext: '[data-prop="handler-next"]',
                indicatorNum: "[data-slide-to]",
                indicatorNumProp: "data-slide-to",
                itemMarkerProp: null,
                isVert: null,
                active: "active",
                delay: 600,
                disabled: "disabled"
            };
            return this.opt = d = a.extend(d, c || {}),
            this.$obj = a(d.obj),
            this.$obj.length < 1 ? b.log("rollList configed wrong..") : (this.$frame = this.$obj.find(d.frame),
            this.$wrapper = this.$obj.find(d.wrapper),
            this.$indicators = this.$obj.find(d.indicators),
            this.$controlPrev = a(d.controlPrev),
            this.$controlNext = a(d.controlNext),
            this.itemMarker = d.itemMarkerProp || this.$wrapper.attr("data-subs") || "li",
            this.isVert = null !== d.isVert ? d.isVert : "true" === this.$obj.attr("data-vert") ? !0 : !1,
            this.frameSize = this.isVert ? this.$frame.height() : this.$frame.width(),
            this.offset = 0,
            this.wrapperSize = this.getWrapperSize(),
            void this.bindEvent())
        },
        getWrapperSize: function() {
            if (this.isVert)
                return this.$wrapper.height();
            var a = this.$wrapper.find(this.itemMarker)
              , b = a.length;
            return a.eq(0).outerWidth() * b
        },
        scrollNext: function() {
            var a = this.opt.active
              , b = this.offset - this.frameSize;
            -b >= this.wrapperSize || (this.offset = b,
            this.$indicators.length > 0 && this.$indicators.find("." + a).removeClass(a).next().addClass(a),
            this.runScroll(),
            -(b - this.frameSize) >= this.wrapperSize && this.trigger("last"))
        },
        scrollPrev: function() {
            var a = this.opt.active
              , b = this.offset + this.frameSize;
            0 > -b || (this.offset = b,
            this.$indicators.length > 0 && this.$indicators.find("." + a).removeClass(a).prev().addClass(a),
            this.runScroll(),
            -(b + this.frameSize) < 0 && this.trigger("first"))
        },
        scrollTo: function(b) {
            var c = this.opt.active
              , d = a(b.currentTarget)
              , e = d.attr(this.opt.indicatorNumProp);
            if (e) {
                var f = this.frameSize * -e;
                this.offset = f,
                d.siblings("." + c).removeClass(c).end().addClass(c),
                this.runScroll()
            }
        },
        runScroll: function() {
            this.isVert ? this.$wrapper.animate({
                top: this.offset
            }, this.opt.delay) : this.$wrapper.animate({
                left: this.offset
            }, this.opt.delay),
            this.trigger("change", this.$indicators.find("." + this.opt.active).attr(this.opt.indicatorNumProp))
        },
        bindEvent: function() {
            var b = this.opt.disabled;
            this.bind("change", function() {
                this.$controlNext.removeClass(b),
                this.$controlPrev.removeClass(b)
            }),
            this.bind("first", function() {
                this.$controlPrev.addClass(b)
            }),
            this.bind("last", function() {
                this.$controlNext.addClass(b)
            }),
            this.$obj.on("click", this.opt.controlPrev, a.proxy(this.scrollPrev, this)),
            this.$obj.on("click", this.opt.controlNext, a.proxy(this.scrollNext, this)),
            this.$indicators.on("click", this.opt.indicatorNum, a.proxy(this.scrollTo, this))
        }
    }),
    b.Rollist = e
}(jQuery, SQ, window, void 0),
jQuery(function(a) {
    var b = [];
    a('[data-role="rollist"]').each(function(a, c) {
        b[a] = new SQ.Rollist({
            obj: c
        })
    })
}),
function(a, b, c) {
    var d = new c.Class(c.Widget);
    d.include({
        init: function(b) {
            this.options = {
                el: "body",
                imgs: "img",
                srcName: "data-src",
                threshold: 100,
                loaded: "J_lazyloaded",
                error: function(a) {}
            },
            a.extend(this.options, b),
            this._t = null,
            this.el = a(this.options.el),
            this.imgs = a(this.options.imgs, this.el),
            this.el.attr("data-kid", this.id),
            this.load(),
            this._events()
        },
        _events: function() {
            var c = this;
            a(b).scroll(function() {
                clearTimeout(c.t),
                setTimeout(function() {
                    c.load()
                }, 20)
            }),
            a(b).resize(this.proxy(this.load)),
            this.imgs.error(this.proxy(this._errorHandler))
        },
        _destroying: function() {
            this.el.removeAttr("data-kid"),
            this.imgs.unbind("error"),
            this.imgs.removeClass(this.options.loaded)
        },
        _inView: function(c) {
            var d = c.offset()
              , e = a(b).height()
              , f = a(b).scrollTop()
              , g = e + f + this.options.threshold;
            return g > d.top
        },
        load: function() {
            var b = this.imgs.filter(":visible").not("." + this.options.loaded)
              , c = this;
            b.each(function() {
                var b = a(this);
                c._inView(b) && c.loadImg(b)
            })
        },
        loadImg: function(a) {
            a.attr("src", a.attr(this.options.srcName)),
            a.addClass(this.options.loaded),
            this.trigger("load", a)
        },
        _errorHandler: function(b) {
            var c = a(b.target);
            this.trigger("error", c),
            this.options.error && this.options.error(c)
        }
    }),
    c.Lazyload = d
}(jQuery, window, SQ),
!function(a, b, c) {
    var d = new c.Class(c.Widget);
    d.include({
        init: function(b) {
            this.setting = {
                title: null,
                buttons: null,
                mask: !0,
                type: "html",
                content: "",
                width: 600,
                height: 300,
                appendTo: document.body,
                autoShow: !0,
                classStyle: ""
            },
            a.extend(this.setting, b),
            this.render(),
            this.events(),
            this.setting.autoShow && this.show()
        },
        events: function() {
            var b;
            a(window).on("scroll.sq.dialog resize.sq.dialog", this.proxy(function() {
                clearTimeout(b),
                b = setTimeout(this.proxy(this.position), 300)
            })),
            this.el.on("click.sq.dialog", ".sq-dialog-btn[href^=javascript]", this.proxy(this._buttonsHandler)).on("click.sq.dialog", ".sq-dialog-close", this.proxy(this.hide))
        },
        _buttonsHandler: function(b) {
            b.preventDefault();
            var c = a(b.target)
              , d = c.attr("data-name")
              , e = this.setting.buttons[d];
            e && ("function" == typeof e && e(b, this, d),
            e.fn && "function" == typeof e.fn && e.fn(b, this, d))
        },
        render: function() {
            if (!this.el) {
                var b = '<div style="display:none;"></div>';
                this.el = a(b),
                this.el.appendTo(a(this.setting.appendTo)),
                this.el.attr("data-kid", this.id)
            }
            var d = '<div class="sq-dialog-masking" style="height:{$docHeight}px;"></div>'
              , e = '<div class="sq-dialog {classStyle}" style="width:{$width}px;left:{$left}px;top:{$top}px;"><div class="sq-dialog-avatar"></div><div style="position:relative;"><div class="sq-dialog-body"><div class="sq-dialog-titlebar {$notitle}"><h4 class="sq-dialog-titlebar-text">{$title}</h4><div role="button" title="关闭" class="sq-dialog-close" aria-label="Close"><i class="ico ico-close"></i></div><div class="toastbox"><span onclick="toastshow(1)" class="toastlogin">登录</span><span class="toastboxselect toastregistered" onclick="toastshow(2)">注册</span></div></div><div class="sq-dialog-client"><div class="sq-dialog-content" style="height:{$contentHeight}px;">{%=content%}</div></div><div class="registeredtable"><p class="formline clearfix"><label for="passport">帐号</label><input onkeyup="checkpassport()" type="text" class="txt" name="pp" id="passport" tabindex="1" placeholder="请输入帐号"><span class="not" id="passport_msg">由5-18位字母、数字或下划线组成</span></p><p class="formline clearfix"><label for="password">密码</label><input type="password" class="txt" name="pwd" id="password-regist" tabindex="2" placeholder="请输入密码" onkeyup="checkPwd()"><span class="not" id="password-regist_msg">由数字、字母、特殊字符组成且8-16位</span></p><p class="formline clearfix"><label for="repassword">确认密码</label><input onkeyup="checkRePwd()" type="password" class="txt" name="pwd" id="repassword" tabindex="3" placeholder="再次输入密码"><span class="not" id="repassword_msg">再次输入登录密码</span></p><p class="rmline-reg"><input type="checkbox" name="agree" id="agree" class="checked" checked="checked" readonly="readonly" disabled="disabled" style="display: inline-block; *zoom:1; *display:inline;" /><label style="display: inline-block; *zoom:1; *display:inline;" for="agree" class="agree">已阅读且同意</label><a href="http://www.duba.net/protocol/serverUse.shtml" target="_blank">《<span>金山网络服务协议</span>》</a></p><p class="bts clearfix"><a href="javascript:void(0);" class="regbtn zhuce onlyshow">注册</a><a  onclick="registeredsub()" href="javascript:void(0);" class="regbtn zhuce yl-register" hidefocus="true" id="yl-register" tabindex="5">注册</a></p></div><div class="sq-dialog-buttons {$nobutton}">{%=buttons%}</div></div></div></div>';
            e = e.replace("{classStyle}", this.setting.classStyle);
            var f = c.template((this.setting.mask ? d : "") + e, this._renderObj());
            this.el.html(f),
            this.position()
        },
        position: function() {
            var b = a(".sq-dialog-masking", this.el)
              , c = a(".sq-dialog", this.el)
              , d = a(".sq-dialog-titlebar", this.el)
              , e = a(".sq-dialog-buttons", this.el)
              , f = a(window)
              , g = c.width()
              , h = this.setting.height + e.outerHeight(!0) + d.outerHeight(!0) + 100
              , i = f.width()
              , j = f.height()
              , k = document.documentElement.scrollTop || document.body.scrollTop;
            b.height(a(document).height()),
            c.css({
                left: Math.abs(i - g) / 2,
                top: Math.abs(j - h) / 2 + k
            })
        },
        _buttons: function() {
            var a = [];
            if (this.setting.buttons && c.isObject(this.setting.buttons)) {
                var b = '<a href="{$href}" {$target} class="sq-dialog-btn btn1 btn1-lg2 drop-shadow {$cls}" data-name="{$name}">{$name}</a>';
                for (var d in this.setting.buttons) {
                    var e = this.setting.buttons[d]
                      , f = "javascript:;"
                      , g = "";
                    "string" == typeof e && (f = e,
                    g = "target='_blank'"),
                    a.push(c.template(b, {
                        cls: e.cls || "btn1-default",
                        name: d,
                        href: e.href || f,
                        target: e.href ? "target='_blank'" : g
                    }))
                }
            }
            return a.join("")
        },
        _renderObj: function() {
            var b = a(window)
              , d = this.setting.width
              , e = this.setting.height || 400
              , f = b.width()
              , g = b.height();
            return {
                docHeight: a(document).height(),
                width: this.setting.width,
                contentHeight: e,
                left: (f - d) / 2,
                top: (g - e) / 2,
                title: this.setting.title || "",
                notitle: this.setting.title ? "" : "sq-dialog-notitle",
                nobutton: c.isObject(this.setting.buttons) ? "" : "sq-dialog-nobutton",
                content: this._getContent(),
                buttons: this._buttons()
            }
        },
        _getContent: function() {
            var b = this.setting.content
              , c = "";
            switch (this.setting.type) {
            case "html":
                "object" == typeof b ? (c = a(b).html(),
                a(b).empty()) : c = b;
                break;
            case "iframe":
                c = '<iframe allowtransparency="true" frameborder="0" src="' + b + '" width="100%" height="' + (this.setting.height - 10) + '"></iframe>';
                break;
            case "ajax":
                c = '<div class="sq-dialog-loading"><p>正在努力加载...</p></div>',
                a.get(b, this.proxy(this.setContent))
            }
            return c
        },
        setContent: function(b) {
            var c = a(".sq-dialog-content", this.el);
            c.html(b)
        },
        show: function(a) {
            a && this.el.find(".sq-dialog-titlebar-text").text(a),
            this.el.show(),
            this.position(),
            this.trigger("show", this)
        },
        hide: function() {
            this.el.hide(),
            this.trigger("hide", this)
        },
        _destroying: function() {
            a(".sq-dialog-btn", this.el).unbind(),
            this.el.remove()
        }
    }),
    c.Dialog = d,
    c.alert = function(a, b, d) {
        return new c.Dialog({
            title: d || "提示信息",
            buttons: {
                "确定": function(a, c) {
                    b && b(),
                    c.destroy()
                }
            },
            content: "<div class='sq-dialog-alert'>" + a + "</div>",
            type: "html",
            width: 300,
            height: 70
        })
    }
    ,
    c.confirm = function(a, b, d) {
        return new c.Dialog({
            title: "提示信息",
            buttons: {
                "确定": function(a, c) {
                    b && b(),
                    c.destroy()
                },
                "取消": function(a, b) {
                    d && d(),
                    b.destroy()
                }
            },
            content: a,
            type: "html",
            width: 360,
            height: 70
        })
    }
    ,
    c.tip = function(a) {
        var b = new c.Dialog({
            title: null,
            buttons: null,
            content: a,
            type: "html",
            width: 400,
            height: 40,
            mask: !1
        });
        return setTimeout(function() {
            b.destroy()
        }, 3e3),
        b
    }
    ,
    c.loading = function(b, d) {
        d = d || a.noop,
        b = b || "正在加载数据，请稍后...",
        "function" == typeof b && (d = b,
        b = "正在加载数据，请稍后...");
        var e = new c.Dialog({
            title: "提示信息",
            buttons: {
                "取消加载": function(a, b) {
                    b.hide()
                }
            },
            content: '<div class="sq-dialog-loading"><span>' + b + "</span></div>",
            type: "html",
            width: 400,
            height: 60
        });
        return e.bind("hide", function() {
            d.call(e),
            e.destroy()
        }),
        e
    }
}(jQuery, window, SQ),
function(a, b, c) {
    var d = b.Dialog && new b.Class(b.Dialog)
      , e = "https://login.ijinshan.com/?lp=https%3A%2F%2Flogin.ijinshan.com%2Fwebgame%2Fw%2Fv1.html%3Fstyle%3Dvdefault%26btn%3Dstyle%2Fimages%2Fvdefault.png&if=1&service=http%3A%2F%2Fi.wan.liebao.cn%2Flogin%3Fgo%3D"
      , f = "http://" + c.document.domain + "/"
      , g = c.document.URL
      , h = f + "user/register.html?bu="
      , i = "%26supplier_id%3D3";
    d.fn.init = function(b) {
        this.setting = {
            title: "登录",
            mask: !1,
            autoShow: !1,
            type: "iframe",
            content: null,
            width: 444,
            height: 240,
            appendTo: document.body,
            classStyle: "sq-dialog-login",
            buttons: null,
            jumpLink: g,
            regButton: !0,
            regHref: null,
            regClass: "btn2-reg",
            regName: "快速注册",
            logedCall: null,
            logedNoAutoShow: !0,
            unlogCall: null,
            initCall: null
        },
        a.extend(this.setting, b),
        this.regHref = this.setting.regHref || this.getRegLink(this.setting.jumpLink),
        this.loginFrameHref = this.setting.content || this.getLoginFrameDiaUrl(this.setting.jumpLink),
        this.bindEvent(),
        this.ksUser = this.setting.ksUser || c.ks_user,
        this.isLogined = this._checkLogin(),
        this.setting.regButton && this._insetBtn({
            _reg: {
                href: this.regHref,
                cls: this.setting.regClass,
                name: this.setting.regName
            }
        }),
        this.render(),
        this.events(),
        this.setting.logedNoAutoShow ? this.setting.autoShow && !this.isLogined && this.show() : this.setting.autoShow && this.show(),
        this.trigger("init", this)
    }
    ,
    d.fn._buttons = function() {
        var a = [];
        if (this.setting.buttons && b.isObject(this.setting.buttons)) {
            var c, d = '<a href="{$href}" {$target} class="sq-dialog-btn btn1 btn1-lg2 drop-shadow {$cls}" data-name="{$handler}">{$name}</a>';
            for (c in this.setting.buttons) {
                var e = this.setting.buttons[c]
                  , f = "javascript:;"
                  , g = "target='_blank'";
                "string" == typeof e ? f = e : e.href || (g = ""),
                a.push(b.template(d, {
                    cls: e.cls || "btn1-default",
                    name: e.name,
                    href: e.href || f,
                    target: g,
                    handler: c
                }))
            }
        }
        return a.join("")
    }
    ,
    d.include({
        getLoginFrameDiaUrl: function(a) {
            return a = c.encodeURIComponent(c.encodeURIComponent(c.encodeURIComponent(a))),
            a = e + a + i
        },
        getRegLink: function(a) {
            return a = c.encodeURIComponent(a),
            h + a
        },
        _checkLogin: function() {
            return "" != this.ksUser && this.ksUser ? (this.trigger("loged", this.ksUser, this),
            !0) : (this.trigger("unlog", this),
            !1)
        },
        _insetBtn: function(b) {
            this.setting.buttons = this.setting.buttons || {},
            a.extend(this.setting.buttons, b)
        },
        bindEvent: function() {
            this.bind("unlog", function() {
                "iframe" === this.setting.type && (this.setting.content = this.loginFrameHref)
            }),
            this.bind("loged", function(b) {
                a.extend(this.setting, {
                    type: "html",
                    content: "您好！" + b.passport + "。您已经登录。",
                    regButton: !1,
                    classStyle: "sq-dialog-login sq-dialog-login-loged"
                }),
                this._insetBtn({
                    close: {
                        cls: "btn1-orange2",
                        name: "关闭",
                        fn: function(a, b) {
                            b.destroy()
                        }
                    }
                })
            }),
            this.bind("init", this.setting.initCall || function() {}
            ),
            this.bind("unlog", this.setting.unlogCall || function() {}
            ),
            this.bind("loged", this.setting.logedCall || function() {}
            )
        }
    }),
    b.LoginDialog = d
}(jQuery, SQ, window),
function(a, b, c) {
    "use strict";
    var d = new c.Class(c.Widget)
      , e = "http://" + b.document.domain + "/"
      , f = "http://image.wan.liebao.cn/"
      , g = b.document.URL
      , h = {
        reg: e + "user/register.html?bu=",
        logout: e + "action/logout.php?bu=",
        jsLogin: "https://login.ijinshan.com"
    };
    d.include({
        opt: {
            commonFixed: !0,
            container: null,
            dialog: !1,
            showRecGame: !0,
            showPoints: !0,
            showCoins: !0,
            showVip: !0,
            logedCall: null,
            unlogCall: null,
            initCall: null,
            recGameStat: !0
        },
        $dom: null,
        init: function(c) {
            a.extend(this.opt, c || {}),
            this.opt.commonFixed && (this.$container = a(this.opt.container),
            this.$dom = {
                unlogC: a('[data-type="unlog_c"]', this.$container),
                logedC: a('[data-type="loged_c"]', this.$container),
                loginFrame: a('[data-type="login_frame"]', this.$container),
                btnReg: a('[data-type="reg"]', this.$container),
                btnLogout: a('[data-type="logout"]', this.$container),
                serverListTitle: a('[data-type="loged_tip"]', this.$container),
                recGame: a('[data-type="history_game"]', this.$container),
                signArrive: a('[data-type="sign_arrive"]', this.$container),
                points: a('[data-type="points"]', this.$container),
                vip: a('[data-type="vip"]', this.$container),
                coin: a('[data-type="platform_coin"]', this.$container),
                userName: a('[data-type="user_name"]', this.$container)
            }),
            this.checkOpt(this.opt),
            this._event(),
            this.ksUser = this.opt.ksUser || b.ks_user,
            this.isLogined = this._checkLogin(),
            this.isPlayed = this.isLogined && "" != this.ksUser.played ? 1 : 0,
            this.isLogined && this.showRecGame(),
            this.trigger("init", this)
        },
        _checkLogin: function() {
            return "" != this.ksUser && this.ksUser ? (this.trigger("loged", this.ksUser, this),
            this.toggleLoginModule("loged"),
            this.opt.commonFixed && (this._updUserInfo(),
            this._updLogedLinks(),
            this.opt.showPoints && this._updPoints(),
            this.opt.showCoins && this._updCoins(),
            this.opt.showVip && this._updVip()),
            !0) : (this.trigger("unlog", this),
            this.toggleLoginModule("unlog"),
            this.opt.commonFixed && this._updUnlogLinks(),
            !1)
        },
        showRecGame: function() {
            this.opt.showRecGame && this._updRecGame() || this._updServerListTitle()
        },
        toggleLoginModule: function(a) {
            "loged" === a ? (this.$dom.unlogC.hide(),
            this.$dom.logedC.show()) : (this.$dom.unlogC.show(),
            this.$dom.logedC.hide())
        },
        _updRecGame: function() {
            for (var a, b, c, d = this.isPlayed ? this.ksUser.play_history : this.ksUser.new_server, g = [], h = "", i = 0, j = d.length; j > i && 3 > i; i++) {
                var k = ""
                  , l = d[i]
                  , m = null;
                this.opt.recGameStat && (k = 'data-position=\'{"e2":"sydl","e3":"sydl-f' + (i + 1) + "\"}'"),
                m = this.isPlayed ? l.servers[0] : l,
                a = m.sid,
                m.ext && m.ext.CATE_NAME ? (c = m.ext.EXT_SID,
                b = m.ext.CATE_NAME) : (c = m.sid > 1e4 ? "抢鲜" + (m.sid - 1e4) : m.sid,
                b = m.server_name),
                h = this.getHtml(this.tplRecGame, {
                    serverUrl: e + "game_frame/play_" + l.gid + ".php?sid=" + a,
                    imgUrl: f + "www/images/game/" + l.game_alias + "/20x20_logo.jpg",
                    name: l.game_name,
                    serverID: a,
                    showID: c,
                    serverName: b,
                    stat: k
                }),
                g.push(h)
            }
            this.$dom.recGame.html(g.join(""))
        },
        _updServerListTitle: function() {
            var a = this.isPlayed ? "最近登录的服务器：" : "推荐您进入：";
            this.$dom.serverListTitle.html(a)
        },
        _updUnlogLinks: function() {
            this.$dom.loginFrame.attr("src", this.getKsLoginFrameUrl(g, 3, "loginpanel_v2", "style/images/loginpanel_v2.png", "loginpanel_v2")),
            this.$dom.btnReg.attr("href", h.reg + b.encodeURIComponent(g))
        },
        _updLogedLinks: function() {
            this.$dom.btnLogout.attr("href", this.getKsLogoutUrl(g))
        },
        _updUserInfo: function() {
            this.$dom.userName.html(this.ksUser.showname)
        },
        _updCoins: function() {
            var b = this;
            a.getJSON("http://pay1.wan.liebao.cn/index.php/platform/balance/?callback=?", function(a) {
                1 === a.ret && b.$dom.coin.html(a.data.balance)
            })
        },
        _updPoints: function() {
            var b = this;
            a.getJSON("http://credit.wan.liebao.cn/index.php/api/myCredit/?callback=?", function(a) {
                1 === a.code && b.$dom.points.html(a.data.myCredit)
            })
        },
        _updVip: function() {
            var b = this;
            a.getJSON("http://vip.wan.liebao.cn//vip/user/api/info?callback=?", function(a) {
                1 === +a.ret && (a.data.role_name && b.$dom.vip.prop("title", a.data.role_name + a.data.level_display),
                b.$dom.vip.find("img").prop("src", a.data.icon_address))
            })
        },
        getKsLogoutUrl: function(a) {
            return h.logout + encodeURIComponent(a)
        },
        getKsLoginFrameUrl: function(a, c, d, e, f) {
            var a = b.encodeURIComponent(b.encodeURIComponent(b.encodeURIComponent(a)))
              , g = b.encodeURIComponent(h.jsLogin + "/webgame/w/" + f + ".html?style=" + d + "&btn=" + e);
            return h.jsLogin + "/?lp=" + g + "&if=1&service=http%3A%2F%2Fi.wan.liebao.cn%2Flogin%3Fgo%3D" + a + "%26supplier_id%3D" + c
        },
        getHtml: function(a, b) {
            var c;
            if (b) {
                for (c in b)
                    a = a.replace("{$" + c + "}", b[c]);
                return a
            }
        },
        tplRecGame: '<li><a class="l-history-game-item f-cf" href="{$serverUrl}" target="_blank" {$stat}>                        <div class="f-fl row-item1"><img src="{$imgUrl}" /></div>                        <div class="f-fl row-item2">{$name}</div>                        <div class="f-fl row-item3">{$showID}服</div>                        <div class="f-fl row-item4">{$serverName}</div>                    </a></li>',
        tplSignArrive: '<div id="{$id}" class="sign-calendar">	        <iframe id="sign_iframe" src="{$src}" allowtransparency="true" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" width="410" height="454"></iframe></div>',
        checkOpt: function(a) {
            a.fixed && !a.$dom.container && c.console("MUST has dialog or loginFrame contrainer!!")
        },
        _showSignArriveFrame: function() {
            b.signPoint = a.proxy(this._updPoints, this);
            var d = ""
              , e = "sign-calendar"
              , f = c.byId(e);
            return f ? void a(f).show() : (d = this.getHtml(this.tplSignArrive, {
                id: e,
                src: "http://my.wan.liebao.cn/calendar_inter.html"
            }),
            a("body").append(d),
            void a(c.byId(e)).show())
        },
        showDialog: function() {},
        _event: function() {
            var a = this;
            this.bind("init", this.opt.initCall || function() {}
            ),
            this.bind("unlog", this.opt.unlogCall || function() {}
            ),
            this.bind("loged", this.opt.logedCall || function() {}
            ),
            this.opt.commonFixed && this.$dom.signArrive.on("click", function(b) {
                b.preventDefault(),
                a.ksUser && a._showSignArriveFrame()
            })
        }
    }),
    c.Login = d
}(jQuery, window, SQ),
jQuery(function(a) {
    var b = a('[data-role="login_fixed"]');
    if (b.length > 0) {
        new SQ.Login({
            container: b
        })
    }
}),
function(a, b, c) {
    var d = new b.Class(b.Widget)
      , e = c.document.domain;
    d.extend({
        urlBase: "http://" + e + "/",
        urlNewServer: "http://" + e + "/action/api/newest_server.php?rt=5&limit=",
        getHtml: function(a, b) {
            var c;
            if (b) {
                for (c in b) {
                    var d = new RegExp("\\{\\$" + c + "\\}","g");
                    a = a.replace(d, b[c])
                }
                return a
            }
        },
        tplLabelHot: '<i class="ico ico-hot"></i>',
        tplLabelNew: '<i class="ico ico-new-g"></i>',
        tplSidDesc: "服",
        tplSidDesc2: "抢鲜",
        tplServerMaint: "维护中...",
        tplStrongClass: "",
        tplNewServer: '<li class="list-style1-item f-cf">                    <div class="f-fl row-item1"><span>{$date}</span>-<span>{$time}</span>{$labelLogo}</div>                    <a href="{$gameSiteUrl}" target="_blank" class="f-fl row-item2 {$strongClass}" title="进入{$gameName}官网" {$statSite}>{$gameName}</a>                    <a href="{$gameServerUrl}" target="_blank" class="f-fl row-item3 {$strongClass}" title="立即开始玩" {$statServ}>{$sidDesc}</a>                </li>',
        tplStatMark: 'data-position=\'{"e2":"sykfb","e3":"sykfb-fs{$statNum}"}\'',
        tplStatMark2: 'data-position=\'{"e2":"sykfb","e3":"sykfb-yxm{$statNum}"}\''
    }),
    d.include({
        father: d,
        init: function(b) {
            this.opt = {
                obj: null,
                endCall: null,
                amount: 16,
                reqLink: this.father.urlNewServer,
                isLogin: c.ks_user && "" != c.ks_user,
                isStatMark: !0
            },
            this.opt = a.extend(this.opt, b || {}),
            this.$obj = a(this.opt.obj),
            this.getNewServerInfo(this.opt.reqLink + this.opt.amount, a.proxy(function(a) {
                this.updNeweServer(this.compositeNewServerInfo(a)),
                this.opt.endCall && this.opt.endCall()
            }, this))
        },
        getNewServerInfo: function(b, c) {
            a.ajax({
                url: b,
                dataType: "json"
            }).done(function(a) {
                a && +a.data.servers.length > 0 && c && c(a.data.servers)
            })
        },
        compositeNewServerInfo: function(a) {
            if (a instanceof Array) {
                var b, c = [], d = a.length, e = /^\d\d\d\d\-/, f = /\:\d\d$/;
                for (b = 0; d > b; b++) {
                    var g = a[b]
                      , h = {}
                      , i = g.START_TIME.split(" ");
                    h.date = i[0].replace(e, ""),
                    h.time = i[1].replace(f, ""),
                    h.gameSiteUrl = this.father.urlBase + g.GAME_ALIAS + "/",
                    h.gameName = g.GAME_NAME,
                    h.sidDesc = g.SID + this.father.tplSidDesc,
                    h.labelLogo = "",
                    h.gameServerUrl = "",
                    h.strongClass = "",
                    g.ext && g.ext.CATE_NAME && (h.sidDesc = g.ext.CATE_NAME + g.ext.EXT_SID + this.father.tplSidDesc),
                    "1" === g.ISHOT ? h.labelLogo = this.father.tplLabelHot : "2" === g.ISHOT && (h.labelLogo = this.father.tplLabelNew),
                    this.opt.isLogin ? h.gameServerUrl = this.father.urlBase + "game_frame/play_" + g.GAME_ID + ".php?sid=" + g.SID : h.gameServerUrl = h.gameSiteUrl + "server_list.html",
                    "1" === g.STATUS ? h.strongClass = this.father.tplStrongClass : "3" === g.STATUS && (h.gameServerUrl = "javascript:;",
                    h.sidDesc = this.father.tplServerMaint),
                    "2" === g.SERVER_TYPE && (h.sidDesc = g.LINE_NAME),
                    c.push(h)
                }
                return c
            }
        },
        updNeweServer: function(a) {
            var b, c = a.length, d = [];
            for (b = 0; c > b; b++) {
                var e = a[b]
                  , f = "";
                e = this.composStatMark(e, b),
                f = this.father.getHtml(this.father.tplNewServer, e),
                d.push(f)
            }
            this.$obj.html(d.join(""))
        },
        composStatMark: function(b, c) {
            var d = ""
              , e = "";
            return this.opt.isStatMark && (d = this.father.getHtml(this.father.tplStatMark, {
                statNum: c + 1
            }),
            e = this.father.getHtml(this.father.tplStatMark2, {
                statNum: c + 1
            })),
            a.extend(b, {
                statServ: d,
                statSite: e
            })
        },
        bindEvent: function() {}
    }),
    b.NewServerList = d
}(jQuery, SQ, window),
function(a, b, c) {
    "use strict";
    var d = function() {
        this.data = [],
        this.put = function(a, b) {
            this.data[a] = b
        }
        ,
        this.get = function(a) {
            return this.data[a]
        }
        ,
        this.remove = function(a) {
            this.data[a] = null
        }
        ,
        this.isEmpty = function() {
            return 0 == this.data.length
        }
        ,
        this.size = function() {
            return this.data.length
        }
    }
      , e = new d
      , f = {
        init: function() {
            this.events()
        },
        callApi: function(b, c, d) {
            a.getJSON(b, c, function(a) {
                d && d(a)
            })
        },
        url: {
            serverUrl: "http://wan.liebao.cn/action/api/game_servers.php",
            cardUrl: "http://wan.liebao.cn/get_card.php"
        },
        serverInfo: function(a, b) {
            var c, d, f, g = this, h = [], i = "gid-" + a, j = null, k = null, l = function() {
                for (j = e.get(i),
                k = j.data.servers,
                c = 0,
                d = k.length; d > c; c++) {
                    var a, g;
                    1 !== +k[c].STATUS && (k[c].SERVER_TYPE > 10 ? (a = k[c].LINE_NAME,
                    g = "") : (a = k[c].SERVER_NAME,
                    g = "(" + k[c].SID + "服)"),
                    f = '<li class="gift-select-item" data-servername="' + a + g + '" data-sid="' + k[c].SID + '" role="button">' + a + g + "</li>",
                    h.push(f))
                }
                b.nextAll(".gift-select-menu").html(h.join("")).show()
            };
            e.get(i) ? l() : g.callApi(g.url.serverUrl, {
                gid: a,
                ts: "-1"
            }, function(a) {
                e.put(i, a),
                l()
            })
        },
        getCard: function(b) {
            var c, d = this, e = "http://wan.liebao.cn/game_frame/play_" + b.gid + ".php?sid=" + b.sid, f = (a("#mark"),
            {
                gid: b.gid,
                sid: b.sid,
                type: b.type
            });
            d.callApi(d.url.cardUrl, f, function(f) {
                1 === +f.code ? (c = a("#gift-alert-success-tpl").html().replace("{$gamename}", b.gamename).replace("{$servername}", b.servername).replace(/\{\$cardnum\}/g, f.data.card_number),
                d.showScuessDialog(c, f.data.card_number, e)) : (c = a("#gift-alert-fail-tpl").html(),
                d.showFailDialog(c))
            })
        },
        showScuessDialog: function(a, c, d) {
            var e = null
              , f = "btn1-orange2"
              , g = new b.Dialog({
                autoShow: !1,
                title: "礼包领取成功",
                content: a,
                width: 510,
                height: 80,
                buttons: {
                    "一键复制": {
                        cls: f
                    },
                    "进入游戏": {
                        cls: "btn1-blue2",
                        href: d
                    }
                }
            });
            g.bind("show", function(a) {
                var d = a.el.find("." + f);
                d.attr("data-clipboard-text", c),
                e = b.clip(d[0])
            }),
            g.bind("hide", function(a) {
                e && e.resetBridge()
            }),
            g.show()
        },
        showFailDialog: function(a) {
            var c = "http://wan.liebao.cn/action/redirect_kf.php";
            new b.Dialog({
                autoShow: !0,
                title: "礼包领取失败",
                content: a,
                width: 510,
                height: 80,
                buttons: {
                    "返回页面": {
                        cls: "btn1-orange2",
                        fn: function(a, b) {
                            b.destroy()
                        }
                    },
                    "在线客服": {
                        cls: "btn1-blue2",
                        href: c
                    }
                }
            })
        },
        events: function() {
            var d, e, f, g = this, h = a(document), i = a(".gift-select-menu"), j = (a("#mark"),
            a(".gift-alert"),
            navigator.userAgent.toLowerCase());
            h.on("click", ".gift-select-sid", function(b) {
                var c = a(this)
                  , e = c.siblings(".gift-select-menu");
                return "block" === e.css("display") ? e.hide() : (i.hide(),
                b.stopPropagation(),
                d = c.data("gameid"),
                void g.serverInfo(d, c))
            }).on("click", ".gift-select-menu li", function(b) {
                b.preventDefault(),
                e = a(this).data("sid"),
                f = a(this).data("servername"),
                a(this).parents(".gift-select").find(".gift-select-get").data("sid", e).data("servername", f),
                a(this).parents(".gift-select").find(".gift-select-sid").prop("title", f).html(f)
            }).on("click", ".gift-select-get", function(d) {
                d.preventDefault();
                var e = a(this).data("option")
                  , f = {
                    gid: e.gameid,
                    sid: a(this).data("sid"),
                    type: e.type,
                    gamename: e.gamename,
                    servername: a(this).data("servername")
                };
                if (c.ks_user && "" != c.ks_user) {
                    if (!f.sid)
                        return b.alert("请选择您游戏角色所在的对应服务器！");
                    g.getCard(f)
                } else
                    new b.LoginDialog({
                        autoShow: !0
                    })
            }).on("click", "html, body", function(a) {
                i.hide()
            }),
            j.match("msie 6") && h.on("mouseenter", ".gift-box", function() {
                var b = a(this);
                b.find(".gift-tips").show()
            }).on("mouseleave", ".gift-box", function() {
                var b = a(this);
                b.find(".gift-tips").hide()
            })
        }
    };
    b.gift = f
}(jQuery, SQ, window),
function($, SQ, window) {
    "use strict";
    var domain = window.document.domain
      , cdnBase = "http://image.wan.liebao.cn/"
      , isLogin = window.ks_user && "" != window.ks_user
      , $dom = null
      , url = {
        domain: "http://" + domain + "/",
        newServerOpen: "http://" + domain + "/action/api/newest_server.php?rt=1&ver=2.0&act=open&limit=",
        newServerExpect: "http://" + domain + "/action/api/newest_server.php?rt=1&ver=2.0&act=expect&limit=",
        stat: "http://ac.wan.liebao.cn/ps.gif?id=2&at=1&e1={$e1}&e2={$e2}&e3={$e3}",
        logDia2Js: cdnBase + "static/js/widget/lb.login.dialog2.js",
        logDia2Css: cdnBase + "static/css/dialog/login-dialog-style.css",
        qdDialogUrl: cdnBase + "/static/js/widget/lb.qddialog.js"
    }
      , common = SQ.common
      , main = {
        init: function() {
            this.initLazyImage(),
            this.kv($dom.kv),
            this.initNewServer($dom.newServerOpen, $.proxy(this.initRollListOpen, this), url.newServerOpen),
            this.initGetGift($dom.giftModule),
            this.initCouplet($dom.couplet),
            window.wanCommonPart(),
            this.serverTab($("#new_server_Container")),
            "index" === $dom.body.data("page") && this.initQD(),
            this.idCheckDialog.init()
        },
        initQD: function() {
            var a = SQ.getParam("referer");
            a && SQ.common.loadResouse("js", url.qdDialogUrl, function() {
                SQ.qdDialog.show()
            })
        },
        initNewServer: function(a, b, c) {
            return a && a.length ? SQ.NewServerList && new SQ.NewServerList({
                obj: a,
                endCall: b,
                amount: 16,
                reqLink: c
            }) : void 0
        },
        initRollListOpen: function() {
            return SQ.Rollist && new SQ.Rollist({
                obj: $dom.serverContentOpen
            })
        },
        initRollListExpect: function() {
            return SQ.Rollist && new SQ.Rollist({
                obj: $dom.serverContentExpect,
                frame: '[data-prop="rollist-frame-expect"]',
                wrapper: '[data-prop="rollist-wrapper-expect"]',
                controlPrev: '[data-prop="handler-prev-expect"]',
                controlNext: '[data-prop="handler-next-expect"]'
            })
        },
        serverTab: function(a) {
            var b = this
              , c = !1;
            if (SQ.Tab && a && a.length) {
                var d = new SQ.Tab({
                    el: a,
                    tabs: "#serverTab li",
                    panels: "#serverContent .server-content-list",
                    eventType: "click",
                    auto: !1,
                    currentClass: "focus",
                    animate: {
                        show: "fadeIn"
                    }
                });
                d.bind("change", function(a) {
                    var e = d.tabs.eq(a).attr("data-server");
                    "expect" !== e || c || (b.initNewServer($dom.newServerExpect, $.proxy(b.initRollListExpect, b), url.newServerExpect),
                    c = !0)
                })
            }
        },
        initLazyImage: function() {
            if (SQ.Lazyload) {
                var a = {
                    threshold: 100,
                    imgs: ".lazy"
                };
                new SQ.Lazyload(a)
            }
        },
        kv: function(a) {
            if (SQ.Tab && a && a.length) {
                var b = {
                    el: a,
                    tabs: ".kv-num2>li",
                    panels: ".kv-img-wrap>li",
                    eventType: "mouseenter",
                    auto: !0,
                    interval: 5e3,
                    currentClass: "active",
                    lazyLoadAttr: "data-img",
                    lazyLoadTo: "bg",
                    lazyPreload: !1,
                    controlerLeft: "#kv_control_left",
                    controlerRig: "#kv_control_right",
                    animate: {
                        show: "show"
                    },
                    animateForIE9Less: !0,
                    animateDuring: 0
                };
                new SQ.Tab(b)
            }
        },
        initGetGift: function(a) {
            a && a.length && SQ.gift && SQ.gift.init()
        },
        identifyADReferer: function() {
            var a = common.getParam("referer", window.location.href);
            /wybb|kj|gjz|xyx_dh|dbdh|lbgg|llqzy|wtmt/.test(a) && SQ.common.loadResouse("js", url.logDia2Js, function() {
                SQ.common.loadResouse("css", url.logDia2Css, function() {
                    return new SQ.LoginDialogWithRegFrame({
                        autoShow: !0,
                        mask: !1,
                        tabDefIndex: 1,
                        classStyle: "sq-dialog-login3",
                        width: 444,
                        height: 240
                    })
                })
            })
        },
        initCouplet: function(el) {
            if (el && el.length) {
                var tpl = el.find("script").html();
                return tpl ? void $.getScript("/cache/couplet.js", function() {
                    var couplet = eval(window.couplet), html = "", timeout, navOriginTop = +(el.css("top") || "0").replace("px", ""), navNewTop;
                    if (couplet && 0 !== couplet.length) {
                        for (var i = 0; i < couplet.length; i++) {
                            var item = couplet[i];
                            item.side = i + 1;
                            var e2 = item.position.split("-")[0]
                              , e3 = item.position;
                            item.position = '{"e2":"' + e2 + '","e3":"' + e3 + '"}',
                            html += SQ.T(tpl, couplet[i])
                        }
                        el.html(html)
                    }
                }) : SQ.log("error:please add script tpl to html")
            }
        },
        idCheckDialog: {
            timer: {
                timerTenMinutes: null,
                timerThirtyMinutes: null,
                initHeight: null
            },
            api: {
                userInfo: "http://wan.liebao.cn/action/user_info.php?rt=5",
                checkFcm: "http://api.wan.liebao.cn/whbyq/2017/api/checkfcm?callback=?"
            },
            url: {
                idCheck: "http://k.wan.liebao.cn/k/active/verified/?panel="
            },
            tpl: {
                iframe: '<div class="id-check-iframe"><div class="loading"></div><div class="btn-close">x</div><iframe id="idCheckIframe" src="{idCheckUrl}" allowtransparency="true" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" width="100%" height="100%" style="background: transparent;"></iframe></div>',
                script: '<script>document.domain="wan.liebao.cn";</script>',
                iframeHack: '<iframe class="idCheck-dialog-iframe"></iframe>'
            },
            init: function() {
                var a = this;
                "index" === $("body").data("page") && 0 !== ks_user.length && (a.updateEl.call(a, a.events),
                window.passChecking = a.passChecking)
            },
            renderTpl: function(a, b) {
                return a.iframe = a.iframe.replace("{idCheckUrl}", b.idCheck),
                a
            },
            updateEl: function(a) {
                var b = this;
                $(".container").append(b.tpl.script);
                var c = ks_user.adult;
                return 1 === c ? void $(".id-check-iframe, .id-check,#idCheckIframe").hide() : void $.getJSON(b.api.checkFcm, function(c) {
                    var d = c.data.show
                      , e = c.data.ismobile
                      , f = parseInt(c.data.showtype);
                    if (1 !== d || e)
                        return void $(".id-check-iframe, .id-check,#idCheckIframe").hide();
                    switch (f) {
                    case 1:
                        b.url.idCheck += "phone";
                        break;
                    default:
                        b.url.idCheck += "realName"
                    }
                    b.renderTpl(b.tpl, b.url),
                    $(".container").append(b.tpl.iframe),
                    b.showIframe(),
                    "function" == typeof a && a.apply(b)
                })
            },
            timerStart: function() {
                var a = this;
                a.timer.timerTenMinutes && (clearTimeout(a.timer.timerTenMinutes),
                a.timer.timerTenMinutes = null),
                a.timer.timerThirtyMinutes && (clearTimeout(a.timer.timerThirtyMinutes),
                a.timer.timerThirtyMinutes = null),
                a.timer.timerTenMinutes = setTimeout(function() {
                    a.showIframe(),
                    clearTimeout(a.timer.timerTenMinutes)
                }, 6e5),
                a.timer.timerThirtyMinutes = setTimeout(function() {
                    a.showIframe(),
                    clearTimeout(a.timer.timerThirtyMinutes)
                }, 18e5)
            },
            showIframe: function() {
                var a = this;
                $(".loading").show(),
                a.position(),
                $(".id-check-iframe").show().children("iframe").show().attr("src", $(".id-check-iframe iframe").attr("src"));
                var b = $(".id-check-iframe").children("iframe")[0];
                b.attachEvent ? b.onreadystatechange = function() {
                    "complete" === b.readyState && $(".loading").hide()
                }
                : b.onload = function() {
                    $(".loading").hide()
                }
                ,
                window.onscroll = window.onresize = a.throttle(function() {
                    a.position()
                }, 300, 800)
            },
            closeIframe: function() {
                $(".id-check-iframe,#idCheckIframe").hide(),
                window.onscroll = window.onresize = null
            },
            position: function() {
                var a = $(".id-check-iframe")
                  , b = $(window).width()
                  , c = $(window).height()
                  , d = a.width()
                  , e = a.height()
                  , f = document.documentElement.scrollTop || document.body.scrollTop;
                a.css({
                    left: (b - d) / 2,
                    top: (c - e) / 2 + f
                })
            },
            throttle: function(a, b, c) {
                var d = null
                  , e = null;
                return function() {
                    var f = +new Date
                      , g = arguments;
                    e || (e = f),
                    f - e > c ? (d && clearTimeout(d),
                    e = f,
                    a.apply(this, g)) : (d && clearTimeout(d),
                    d = setTimeout(function() {
                        a.apply(this, g)
                    }, b))
                }
            },
            events: function() {
                var a = this
                  , b = !1;
                $(".id-check>a").on("click", function(c) {
                    b ? (a.closeIframe(),
                    b = !1) : (c.preventDefault(),
                    a.showIframe(),
                    a.timerStart(),
                    b = !0)
                }),
                $(".btn-close").on("click", function(a) {
                    a.preventDefault(),
                    $(".id-check-iframe,#idCheckIframe").hide(),
                    b = !1
                })
            },
            passChecking: function() {
                $(".id-check-iframe,.id-check").hide()
            }
        }
    }
      , event = function(a) {
        var b = $dom.body.data("stat");
        b && $dom.doc.on("click", "[data-position]", function() {
            var c = a(this).data("position")
              , d = {
                e1: b,
                e2: c.e2,
                e3: c.e3
            };
            common.positionNum(url.stat, d)
        }),
        $dom.doc.on("click", "a[data-role='alert']", function() {
            var b = a(this).data("val");
            SQ.alert ? SQ.alert(b) : window.alert(b)
        })
    };
    $(function(a) {
        $dom = {
            doc: a(document),
            body: a("body"),
            kv: a("#kv"),
            newServerOpen: a("#new_server_open"),
            newServerExpect: a("#new_server_expect"),
            newServerContainer: a("#new_server_Container"),
            serverContentExpect: a("#serverContentExpect"),
            serverContentOpen: a("#serverContentOpen"),
            giftModule: a('[data-module="gift"]'),
            couplet: a("#couplet")
        },
        main.init(),
        event(a)
    })
}(jQuery, SQ, window),
!function() {
    "use strict";
    var a, b = function() {
        var a = /\-([a-z])/g
          , b = function(a, b) {
            return b.toUpperCase()
        };
        return function(c) {
            return c.replace(a, b)
        }
    }(), c = function(a, c) {
        var d, e, f, g, h, i;
        if (window.getComputedStyle ? d = window.getComputedStyle(a, null).getPropertyValue(c) : (e = b(c),
        d = a.currentStyle ? a.currentStyle[e] : a.style[e]),
        "cursor" === c && (!d || "auto" === d))
            for (f = a.tagName.toLowerCase(),
            g = ["a"],
            h = 0,
            i = g.length; i > h; h++)
                if (f === g[h])
                    return "pointer";
        return d
    }, d = function(a) {
        if (p.prototype._singleton) {
            a || (a = window.event);
            var b;
            this !== window ? b = this : a.target ? b = a.target : a.srcElement && (b = a.srcElement),
            p.prototype._singleton.setCurrent(b)
        }
    }, e = function(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
    }, f = function(a, b, c) {
        a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
    }, g = function(a, b) {
        if (a.addClass)
            return a.addClass(b),
            a;
        if (b && "string" == typeof b) {
            var c = (b || "").split(/\s+/);
            if (1 === a.nodeType)
                if (a.className) {
                    for (var d = " " + a.className + " ", e = a.className, f = 0, g = c.length; g > f; f++)
                        d.indexOf(" " + c[f] + " ") < 0 && (e += " " + c[f]);
                    a.className = e.replace(/^\s+|\s+$/g, "")
                } else
                    a.className = b
        }
        return a
    }, h = function(a, b) {
        if (a.removeClass)
            return a.removeClass(b),
            a;
        if (b && "string" == typeof b || void 0 === b) {
            var c = (b || "").split(/\s+/);
            if (1 === a.nodeType && a.className)
                if (b) {
                    for (var d = (" " + a.className + " ").replace(/[\n\t]/g, " "), e = 0, f = c.length; f > e; e++)
                        d = d.replace(" " + c[e] + " ", " ");
                    a.className = d.replace(/^\s+|\s+$/g, "")
                } else
                    a.className = ""
        }
        return a
    }, i = function() {
        var a, b, c, d = 1;
        return "function" == typeof document.body.getBoundingClientRect && (a = document.body.getBoundingClientRect(),
        b = a.right - a.left,
        c = document.body.offsetWidth,
        d = Math.round(100 * (b / c)) / 100),
        d
    }, j = function(a) {
        var b = {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            zIndex: 999999999
        }
          , d = c(a, "z-index");
        if (d && "auto" !== d && (b.zIndex = parseInt(d, 10)),
        a.getBoundingClientRect) {
            var e, f, g, h = a.getBoundingClientRect();
            "pageXOffset"in window && "pageYOffset"in window ? (e = window.pageXOffset,
            f = window.pageYOffset) : (g = i(),
            e = Math.round(document.documentElement.scrollLeft / g),
            f = Math.round(document.documentElement.scrollTop / g));
            var j = document.documentElement.clientLeft || 0
              , k = document.documentElement.clientTop || 0;
            b.left = h.left + e - j,
            b.top = h.top + f - k,
            b.width = "width"in h ? h.width : h.right - h.left,
            b.height = "height"in h ? h.height : h.bottom - h.top
        }
        return b
    }, k = function(a, b) {
        var c = !(b && b.useNoCache === !1);
        return c ? (-1 === a.indexOf("?") ? "?" : "&") + "nocache=" + (new Date).getTime() : ""
    }, l = function(a) {
        var b = []
          , c = [];
        return a.trustedOrigins && ("string" == typeof a.trustedOrigins ? c.push(a.trustedOrigins) : "object" == typeof a.trustedOrigins && "length"in a.trustedOrigins && (c = c.concat(a.trustedOrigins))),
        a.trustedDomains && ("string" == typeof a.trustedDomains ? c.push(a.trustedDomains) : "object" == typeof a.trustedDomains && "length"in a.trustedDomains && (c = c.concat(a.trustedDomains))),
        c.length && b.push("trustedOrigins=" + encodeURIComponent(c.join(","))),
        "string" == typeof a.amdModuleId && a.amdModuleId && b.push("amdModuleId=" + encodeURIComponent(a.amdModuleId)),
        "string" == typeof a.cjsModuleId && a.cjsModuleId && b.push("cjsModuleId=" + encodeURIComponent(a.cjsModuleId)),
        b.join("&")
    }, m = function(a, b) {
        if (b.indexOf)
            return b.indexOf(a);
        for (var c = 0, d = b.length; d > c; c++)
            if (b[c] === a)
                return c;
        return -1
    }, n = function(a) {
        if ("string" == typeof a)
            throw new TypeError("ZeroClipboard doesn't accept query strings.");
        return a.length ? a : [a]
    }, o = function(a, b, c, d, e) {
        e ? window.setTimeout(function() {
            a.call(b, c, d)
        }, 0) : a.call(b, c, d)
    }, p = function(a, b) {
        if (a && (p.prototype._singleton || this).glue(a),
        p.prototype._singleton)
            return p.prototype._singleton;
        p.prototype._singleton = this,
        this.options = {};
        for (var c in s)
            this.options[c] = s[c];
        for (var d in b)
            this.options[d] = b[d];
        this.handlers = {},
        p.detectFlashSupport() && v()
    }, q = [];
    p.prototype.setCurrent = function(b) {
        a = b,
        this.reposition();
        var d = b.getAttribute("title");
        d && this.setTitle(d);
        var e = this.options.forceHandCursor === !0 || "pointer" === c(b, "cursor");
        return r.call(this, e),
        this
    }
    ,
    p.prototype.setText = function(a) {
        return a && "" !== a && (this.options.text = a,
        this.ready() && this.flashBridge.setText(a)),
        this
    }
    ,
    p.prototype.setTitle = function(a) {
        return a && "" !== a && this.htmlBridge.setAttribute("title", a),
        this
    }
    ,
    p.prototype.setSize = function(a, b) {
        return this.ready() && this.flashBridge.setSize(a, b),
        this
    }
    ,
    p.prototype.setHandCursor = function(a) {
        return a = "boolean" == typeof a ? a : !!a,
        r.call(this, a),
        this.options.forceHandCursor = a,
        this
    }
    ;
    var r = function(a) {
        this.ready() && this.flashBridge.setHandCursor(a)
    };
    p.version = "1.2.1";
    var s = {
        moviePath: "ZeroClipboard.swf",
        trustedOrigins: null,
        text: null,
        hoverClass: "zeroclipboard-is-hover",
        activeClass: "zeroclipboard-is-active",
        allowScriptAccess: "sameDomain",
        useNoCache: !0,
        forceHandCursor: !1
    };
    p.setDefaults = function(a) {
        for (var b in a)
            s[b] = a[b]
    }
    ,
    p.destroy = function() {
        p.prototype._singleton.unglue(q);
        var a = p.prototype._singleton.htmlBridge;
        a.parentNode.removeChild(a),
        delete p.prototype._singleton
    }
    ,
    p.detectFlashSupport = function() {
        var a = !1;
        if ("function" == typeof ActiveXObject)
            try {
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash") && (a = !0)
            } catch (b) {}
        return !a && navigator.mimeTypes["application/x-shockwave-flash"] && (a = !0),
        a
    }
    ;
    var t = null
      , u = null
      , v = function() {
        var a = p.prototype._singleton
          , b = document.getElementById("global-zeroclipboard-html-bridge");
        if (!b) {
            var c = {};
            for (var d in a.options)
                c[d] = a.options[d];
            c.amdModuleId = t,
            c.cjsModuleId = u;
            var e = l(c)
              , f = '      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="' + a.options.moviePath + k(a.options.moviePath, a.options) + '"/>         <param name="allowScriptAccess" value="' + a.options.allowScriptAccess + '"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="' + e + '"/>         <embed src="' + a.options.moviePath + k(a.options.moviePath, a.options) + '"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="always"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="' + e + '"           scale="exactfit">         </embed>       </object>';
            b = document.createElement("div"),
            b.id = "global-zeroclipboard-html-bridge",
            b.setAttribute("class", "global-zeroclipboard-container"),
            b.setAttribute("data-clipboard-ready", !1),
            b.style.position = "absolute",
            b.style.left = "-9999px",
            b.style.top = "-9999px",
            b.style.width = "15px",
            b.style.height = "15px",
            b.style.zIndex = "9999",
            b.innerHTML = f,
            document.body.appendChild(b)
        }
        a.htmlBridge = b,
        a.flashBridge = document["global-zeroclipboard-flash-bridge"] || b.children[0].lastElementChild
    };
    p.prototype.resetBridge = function() {
        return null === a ? this : (this.htmlBridge.style.left = "-9999px",
        this.htmlBridge.style.top = "-9999px",
        this.htmlBridge.removeAttribute("title"),
        this.htmlBridge.removeAttribute("data-clipboard-text"),
        h(a, this.options.activeClass),
        a = null,
        this.options.text = null,
        this)
    }
    ,
    p.prototype.ready = function() {
        var a = this.htmlBridge.getAttribute("data-clipboard-ready");
        return "true" === a || a === !0
    }
    ,
    p.prototype.reposition = function() {
        if (!a)
            return !1;
        var b = j(a);
        return this.htmlBridge.style.top = b.top + "px",
        this.htmlBridge.style.left = b.left + "px",
        this.htmlBridge.style.width = b.width + "px",
        this.htmlBridge.style.height = b.height + "px",
        this.htmlBridge.style.zIndex = b.zIndex + 1,
        this.setSize(b.width, b.height),
        this
    }
    ,
    p.dispatch = function(a, b) {
        p.prototype._singleton.receiveEvent(a, b)
    }
    ,
    p.prototype.on = function(a, b) {
        for (var c = a.toString().split(/\s/g), d = 0; d < c.length; d++)
            a = c[d].toLowerCase().replace(/^on/, ""),
            this.handlers[a] || (this.handlers[a] = b);
        return this.handlers.noflash && !p.detectFlashSupport() && this.receiveEvent("onNoFlash", null),
        this
    }
    ,
    p.prototype.addEventListener = p.prototype.on,
    p.prototype.off = function(a, b) {
        for (var c = a.toString().split(/\s/g), d = 0; d < c.length; d++) {
            a = c[d].toLowerCase().replace(/^on/, "");
            for (var e in this.handlers)
                e === a && this.handlers[e] === b && delete this.handlers[e]
        }
        return this
    }
    ,
    p.prototype.removeEventListener = p.prototype.off,
    p.prototype.receiveEvent = function(b, c) {
        b = b.toString().toLowerCase().replace(/^on/, "");
        var d = a
          , e = !0;
        switch (b) {
        case "load":
            if (c && parseFloat(c.flashVersion.replace(",", ".").replace(/[^0-9\.]/gi, "")) < 10)
                return void this.receiveEvent("onWrongFlash", {
                    flashVersion: c.flashVersion
                });
            this.htmlBridge.setAttribute("data-clipboard-ready", !0);
            break;
        case "mouseover":
            g(d, this.options.hoverClass);
            break;
        case "mouseout":
            h(d, this.options.hoverClass),
            this.resetBridge();
            break;
        case "mousedown":
            g(d, this.options.activeClass);
            break;
        case "mouseup":
            h(d, this.options.activeClass);
            break;
        case "datarequested":
            var f = d.getAttribute("data-clipboard-target")
              , i = f ? document.getElementById(f) : null;
            if (i) {
                var j = i.value || i.textContent || i.innerText;
                j && this.setText(j)
            } else {
                var k = d.getAttribute("data-clipboard-text");
                k && this.setText(k)
            }
            e = !1;
            break;
        case "complete":
            this.options.text = null
        }
        if (this.handlers[b]) {
            var l = this.handlers[b];
            "string" == typeof l && "function" == typeof window[l] && (l = window[l]),
            "function" == typeof l && o(l, d, this, c, e)
        }
    }
    ,
    p.prototype.glue = function(a) {
        a = n(a);
        for (var b = 0; b < a.length; b++)
            -1 == m(a[b], q) && (q.push(a[b]),
            e(a[b], "mouseover", d));
        return this
    }
    ,
    p.prototype.unglue = function(a) {
        a = n(a);
        for (var b = 0; b < a.length; b++) {
            f(a[b], "mouseover", d);
            var c = m(a[b], q);
            -1 != c && q.splice(c, 1)
        }
        return this
    }
    ,
    "function" == typeof define && define.amd ? define(["require", "exports", "module"], function(a, b, c) {
        return t = c && c.id || null,
        p
    }) : "object" == typeof module && module && "object" == typeof module.exports && module.exports ? (u = module.id || null,
    module.exports = p) : window.ZeroClipboard = p
}();

// 用户名校验
var baseUrl='http://api.wan.liebao.cn/';
//只有祖册去37校验
var registeredUrl='http://i.wan.liebao.cn/';
var checkUsertype=checkPwdtype=checkRePwdtype=false;
//显示注册按钮
function showbtn(){
  if(checkUsertype&&checkPwdtype&&checkRePwdtype){
    $('.onlyshow').hide();
    $('.yl-register').css('display', 'inline-block');
  }else {
    $('.onlyshow').show();
    $('.yl-register').hide();
  }
}
//账号校验
function checkpassport(){
  checkUser();
  checkUserAjax();
}
function checkUser() {
    var username=$('#passport').val();
    if(!username.match(/^[a-zA-Z0-9_]{5,18}$/)){
            errortitle('passport','账号格式错误，请重新输入');
            checkUsertype=false;
            showbtn();
        return false;
    }
    // underline begin dely
    if (username.substr(0, 1) === "_") {
        errortitle('passport','账号不能以下划线开头，请重新输入');
        return false;
    }
    // unable words
    var diswords = ['bjsupport', 'kingsoft', 'cb', 'ks', 'gm', 'test', 'fs', 'jx', 'db', 'cq', 'blog', 'passport', 'vip', 'wps', 'system', 'duba', 'ciba', 'xoyo', 'kol', 'shqz', 'hujintao', 'wenjiabao', 'jiangzemin', 'zhurongji', 'qiubojun', 'leijun', 'flg', 'falun', 'minghui', 'lihongzhi', 'tmd', 'nmd', 'fuck', 'sex', 'xxx', 'penis', 'viagra', 'tits', 'pussy', 'shit', 'damn', 'bastard', 'asshole', 'bitch', 'vagina', 'breast', 'root', 'admin', 'gm', 'gamemaster'];
    for (var i = 0; i < diswords.length; i++) {
        if (username.toLowerCase().indexOf(diswords[i]) !== -1) {
            errortitle('passport','账号包含非法字符，请重新输入');
            checkUsertype=false;
            showbtn();
            return false;
        }
    }
    return true;
}
function checkUserAjax(){
    if(checkUser()) {
        $.ajax({
            url:baseUrl+'account/1/exist',
            data:{
                "username":$('#passport').val()
            },
            type:'post',
            dataType:"jsonp",
            success:function(data){
                if(data.ret=='1'){
                        if (!data.exist) {
                            passtitle('passport','恭喜，账号可用√');
                            checkUsertype=true;
                            showbtn();
                        } else {
                            errortitle('passport','账号已被注册');
                            checkUsertype=false;
                            showbtn();
                        }
                }else{
                    // alert('checkUser'+data.msg);
                    checkUsertype=false;
                    showbtn();
                }
            }
        });
    }
}
//第一次密码校验
function checkPwd(){
  var password=$('#password-regist').val();
  //暂时写成8位随便输(meicha)
  if(7<password.length&&password.length<17) {
        passtitle('password-regist','密码格式正确√');
        checkPwdtype=true;
        showbtn();
        checkRePwd();
      return true;
  }else{
      errortitle('password-regist','密码格式错误，请重新输入');
      checkPwdtype=false;
      showbtn();
      return false;
  }
}
// checkPwdtype=checkPwd();
//第二次密码校验
function checkRePwd(){
  var password=$('#password-regist').val();
  var repassword=$('#repassword').val();
  if (password!=repassword) {
      errortitle('repassword','2次输入密码不一致');
      checkRePwdtype=false;
      showbtn();
      return false;
  }
  if(7<repassword.length&&repassword.length<17) {
      passtitle('repassword','密码格式正确√');
      checkRePwdtype=true;
      showbtn();
      return true;
  }else{
      errortitle('repassword','密码格式错误，请重新输入');
      checkRePwdtype=false;
      showbtn();
      return false;
  }
}
//通过提示
function passtitle(node,title){
    $('#'+node).removeClass('ableColor').closest('span').removeClass('notColor');
	  $('#'+node+'_msg').text(title).removeClass("error_msg").addClass("green");
}
//不通过提示
function errortitle(node,title){
  $('#'+node).addClass('ableColor').closest('span').addClass('notColor');
  $('#'+node+'_msg').text(title).removeClass("not green").addClass("error_msg");
}

//提交注册
function registeredsub(){
    if (checkUsertype&&checkPwdtype&&checkRePwdtype) {
      $.ajax({
        url:registeredUrl+'register',
        data:{
          "passport":$('#passport').val(),
          "password":hex_md5($('#password-regist').val()),
          "service":'http://i.wan.liebao.cn/login?go=http%253a%252f%252fk.wan.liebao.cn%252fk%252factive%252fxyxy_sw%252f&supplier_id=3',
          // "service":'http://i.wan.liebao.cn/login?go=k1.wan.liebao.cn%252fxyxy_sw%252findex.html&supplier_id=3',
          "truename":'',
          "idcard":'',
        },
        type:'post',
        dataType:"jsonp",
        success:function(res){
          if(res.code==1){
              // return parent.window.location.href=res.data.url;
              // return window.location.href=res.data.url;
               window.location.href=res.data.url;
          }else{
            alert('checkUser '+res.msg);
          }
        }
      })
  }else {
    alert('账号或密码不正确')
  }
}

function ie89fixplaceholder(){
  if(isIE(7)||isIE(8)||isIE(9)){fixplaceholder()};
  // if(!(isIE(7)||isIE(8)||isIE(9))){fixplaceholder()};
}
//ie判断
var isIE = function(ver){
  var b = document.createElement('b')
  b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
  return b.getElementsByTagName('i').length === 1
};
// ie89 fixplaceholder
function fixplaceholder() {
  // $('[placeholder]').each(function(i,e){
  //   e.value == e.placeholder;
  //   console.log(1111111);
  // })
  try {
    //跨域如何解决？？？？？
    $("iframe").contents().find('[placeholder]').each(function(i,e){
      e.value == e.placeholder;
      // console.log(1111111);
    })
  } catch (e) {}
  $('[placeholder]').focus(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
      input.val('');
      input.removeClass('placeholder');
    }
  }).blur(function() {
    var input = $(this);
    if (input.val() == '' || input.val() == input.attr('placeholder')) {
      input.addClass('placeholder');
      input.val(input.attr('placeholder'));
    }
  }).blur().parents('form').submit(function() {
    $(this).find('[placeholder]').each(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
      }
    })
  });
}

//摧毁login
function destroylogin(){
  var a=$('.sq-dialog-masking')
  if (a) {
    a.each(function(i,e){
      $(e).parent().remove();
    })
  }
}

//登录
function Login_(){
  destroylogin();
    return (new SQ.LoginDialog({
        autoShow: !0,
        mask: !0
    }),toastshow(1),ie89fixplaceholder())

}
//注册
function Registered_(){
  destroylogin();
    return (new SQ.LoginDialog({
        autoShow: !0,
        mask: !0
    }),ie89fixplaceholder())
}
