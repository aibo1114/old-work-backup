// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = {
    randomInt: util.randomInt,
    randomChar: util.randomChar,
    copyRight: function(c, name, id) {
      var path;
      path = "http://" + c.url + "/" + name + "/" + id;
      return "<div class=\"copyright\"><strong>C</strong><div>\n    <p>除非特别声明，本站文章均为原创文章，转载请注明原文链接</p>\n</div></div>";
    },
    navPage: function(page, it) {
      return "/" + page + "/" + it._id;
    },
    crumbItem: function(items) {
      return [
        {
          label: '首页',
          href: '/'
        }
      ].concat(items);
    },
    img: function(path, cls, pop, p, isbb) {
      var src;
      if (cls == null) {
        cls = 'avatar';
      }
      if (pop == null) {
        pop = false;
      }
      if (isbb == null) {
        isbb = true;
      }
      if (p == null) {
        p = '';
      }
      p += pop ? " onclick='cf.showPic(this)'" : '';
      src = isbb ? 'bb-src' : 'src';
      return "<img id='" + (String.randomChar(4)) + "' class='" + cls + " _imgBox' " + src + "='" + path + "' " + p + "/>";
    },
    imgItem: function(it, c, name, cls, index, pop, isbb) {
      var path;
      if (name == null) {
        name = 'head';
      }
      if (index == null) {
        index = 0;
      }
      path = it && (name === 'id' || name === 'portrait') ? "portrait/" + it._id + ".jpg" : it && it.refFile && it.refFile[name] ? it.refFile[name][index] : null;
      if (path) {
        return this.img(this.resPath(c, path), cls, pop, null, isbb);
      } else {
        return '';
      }
    },
    userPic: function(c, u, cls, isbb) {
      var id;
      if (c == null) {
        c = cf.community;
      }
      if (cls == null) {
        cls = 'img-circle img-fluid';
      }
      if (!u) {
        return '';
      }
      id = _.isString(u) ? u : u.id || u._id;
      return this.img(this.resPath(c, 'portrait/' + id + '.jpg'), cls, null, null, isbb);
    },
    avatars: function(data, ctn, cls, c) {
      var i, it, len;
      if (cls == null) {
        cls = 'img-circle img-fluid col-xs-2 pr0 mb m-b-h';
      }
      if (c == null) {
        c = cf.community;
      }
      for (i = 0, len = data.length; i < len; i++) {
        it = data[i];
        ctn.append(tu.userPic(c, (it.user ? it.user : it), cls));
      }
      return util.loadPic(ctn);
    },
    resPath: function(c, path) {
      if (c == null) {
        c = cf.community;
      }
      return c.resPath + '/upload/' + c.code + '/' + path;
    },
    catLink: function(cat, list) {
      var i, it, item, len, ref, res;
      if (list == null) {
        list = [];
      }
      res = [];
      ref = cat.split(',');
      for (i = 0, len = ref.length; i < len; i++) {
        it = ref[i];
        item = list.findBy('code', it);
        if (item) {
          res.push(this.link(item));
        }
      }
      return res.join(' / ');
    },
    avatar: function(user, c, name) {
      var p, pp;
      if (c == null) {
        c = cf.community;
      }
      if (name == null) {
        name = 'portrait';
      }
      if (user.refFile && user.refFile[name]) {
        p = this.img(this.resPath(c, user.refFile[name][0]), c);
      } else {
        pp = this.resPath(c, 'portrait.jpg');
        p = "<img src='" + pp + "'/>";
      }
      return "<a href='/user/" + user._id + "' title='" + user.username + "'>" + p + "<div>" + user.username + "</div></a>";
    },
    adt: util.adjustText,
    navUrl: function(p) {
      var i, it, k, len;
      if (!p) {
        return '#';
      }
      if (arguments[0].charAt(0) === '#') {
        k = arguments[0];
      } else {
        k = "#!";
        for (i = 0, len = arguments.length; i < len; i++) {
          it = arguments[i];
          if (_.isString(it) || _.isNumber(it)) {
            k += '/' + it;
          }
        }
      }
      return k;
    },
    actDate: function(start, end) {
      return (start.substr(0, 16)) + "-" + (end.substr(11, 5));
    },
    label: function(text, type, cls) {
      if (type == null) {
        type = 'success';
      }
      return "<span class='label label-" + type + " " + (cls || '') + "'>" + text + "</span>";
    },
    btn: function(text, act, style, size, block) {
      var cls;
      if (style == null) {
        style = 'default';
      }
      cls = _st.btn(style, size, block);
      return "<a class='" + cls + " " + act + "'>" + (text || '') + "</a>";
    },
    a: function(text, href, cls) {
      var str;
      str = href ? "href='" + href + "' " : '';
      str += cls ? "class='" + cls + "' " : '';
      if (href && !href.startsWith('#')) {
        str += "target='_blank' ";
      }
      return "<a " + str + " title='" + text + "'>" + text + "</a>";
    },
    link: function(it, prop, cls) {
      var href, text;
      if (prop == null) {
        prop = 'title';
      }
      text = prop === '_str' ? it : it ? it[prop] : void 0;
      if (!text) {
        return '';
      }
      href = it.href;
      if (!href) {
        href = it._e === 'cat' ? "/" + (it.type.split('_')[0]) + "List?cat=" + it.code : "/" + it._e + "/" + it._id;
      }
      return this.a(text, href, cls);
    },
    iBtn: function(cls, key, href) {
      if (!key) {
        key = cls;
      }
      return {
        cls: _st.btn(null, 'sm', false, util.iClass(cls) + ' ' + key),
        id: true,
        title: iic(key),
        href: href,
        onclick: 'cf.showPic(this)'
      };
    },
    tBtn: function(label, href, icon, cls, title, id) {
      if (!util.isChinese(label)) {
        label = ii(label);
      }
      return {
        label: label,
        href: href,
        icon: icon && util.icon(icon),
        cls: cls,
        title: title && iic(title),
        id: id
      };
    },
    genBtn: function(cfg, it) {
      var icon, k, ref, tag, v;
      if (!cfg) {
        return;
      }
      if (cfg.btn) {
        tag = $('<button type="button"/>');
      } else {
        tag = $("<a/>");
      }
      tag.addClass(cfg.key);
      if (cfg.href) {
        tag.attr('href', cfg.href);
        if (cfg.href.startsWith('http')) {
          tag.attr('target', '_blank');
        }
      }
      cfg.id && tag.attr('id', util.randomChar(4) + '-' + (it != null ? it.id : void 0));
      cfg.label && tag.html("<span>" + cfg.label + "</span>");
      cfg.title && tag.attr('title', cfg.title);
      if (cfg.attr) {
        ref = cfg.attr;
        for (k in ref) {
          v = ref[k];
          tag.attr(k, v);
        }
      }
      cfg.cls && tag.addClass(cfg.cls);
      if (cfg.icon) {
        if (cfg.icon.startsWith('<')) {
          icon = cfg.icon;
        } else {
          icon = util.icon(cfg.icon);
        }
        tag[cfg.iconPlace || 'prepend'](icon);
      }
      if (typeof cfg.callback === "function") {
        cfg.callback(tag);
      }
      if (cfg.action) {
        tag.on(cfg.action.type || 'click', cfg.action.fun);
      }
      cfg.hide && tag.hide();
      return tag;
    },
    qrImg: function(link, cls) {
      return "<img src='/a/qrImg?link=" + link + "' class='" + cls + "'/>";
    },
    iClass: function(val, cls) {
      return _st.iconStr + " " + _st.iconStr + "-" + val + " " + (cls || '');
    },
    iconx: function(icon, str) {
      return "<i class='icon-" + icon + " iconx'>" + (str || '') + "</i>";
    },
    iconxx: function(icon) {
      return this.iconx(icon) + this.iconx(icon + 'Hover hover');
    },
    icon: function(icon, tag, str, cls, href) {
      if (tag == null) {
        tag = 'i';
      }
      if (str == null) {
        str = '';
      }
      if (cls == null) {
        cls = '';
      }
      return "<" + tag + " class='" + (this.iClass(icon, cls)) + "' " + (href || '') + ">" + str + "</" + tag + ">";
    },
    menuItem: function(it) {
      var a, li, p;
      p = {};
      it.cls && (p["class"] = it.cls);
      it.func && (p.onclick = it.func);
      it.href && (p.href = it.href);
      it.key && (p.href = this.navUrl(it.key));
      li = $.mk('li');
      a = li.mk('a', p, it.label || ii(it.key));
      if (it.icon) {
        a.prepend(this.icon(it.icon));
      } else if (it.img) {
        a.prepend(it.img);
      }
      return li.toStr();
    }
  };

}).call(this);

//# sourceMappingURL=tmpl.js.map