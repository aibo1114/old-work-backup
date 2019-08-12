// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = cf.view.ipBtn = function(mod, et, ctn, opt) {
    var base, ob, url;
    if (opt == null) {
      opt = {};
    }
    if (!opt.func) {
      alert('No ipBtn.func');
      throw New(Error());
    }
    url = '!';
    if (mod) {
      url += '/' + mod;
    }
    url += '/' + et;
    $.extend(((base = meta[et]).btn != null ? base.btn : base.btn = {}), {
      ipEdit: function(it, e) {
        return util.iBtn('edit', null, "#" + url + "/edit/" + it[cf.id]);
      },
      ipAdd: function(it, e) {
        var ob;
        ob = util.tBtn('add', null, 'plus', 'btn btn-primary btn-sm');
        ob.href = "#" + url + "/add";
        return ob;
      }
    });
    ob = {
      routes: {},
      add: function() {
        if (typeof opt.check === "function") {
          opt.check('add');
        }
        if (typeof opt.layout === "function") {
          opt.layout();
        }
        this.dm.add(ctn, et, opt.addFormOpt);
        return typeof opt.after === "function" ? opt.after() : void 0;
      },
      view: function(id) {
        if (typeof opt.check === "function") {
          opt.check('view');
        }
        if (typeof opt.layout === "function") {
          opt.layout();
        }
        this.dm.view(ctn, et, id, opt.viewOpt);
        return typeof opt.after === "function" ? opt.after() : void 0;
      },
      edit: function(id) {
        if (typeof opt.check === "function") {
          opt.check('edit');
        }
        if (typeof opt.layout === "function") {
          opt.layout();
        }
        this.dm.edit(ctn, et, id, opt.editFormOpt);
        return typeof opt.after === "function" ? opt.after() : void 0;
      },
      list: function(eid) {
        var ref;
        if (typeof opt.check === "function") {
          opt.check('list');
        }
        if (typeof opt.layout === "function") {
          opt.layout();
        }
        if (opt.listOpt == null) {
          opt.listOpt = {};
        }
        opt.listOpt._pagePath = true;
        if (eid) {
          ref = eid.split('_'), opt.listOpt.max = ref[0], opt.listOpt.offset = ref[1];
        }
        this.dm.collection(ctn, et, $.extend({
          btns: ['ipAdd'],
          topBtn: true,
          itemBtns: ['ipEdit', 'del']
        }, opt.listOpt));
        return typeof opt.after === "function" ? opt.after() : void 0;
      },
      tb: function() {
        if (typeof opt.check === "function") {
          opt.check('tb');
        }
        if (typeof opt.layout === "function") {
          opt.layout();
        }
        this.dm.tb(ctn, et, $.extend({
          btns: ['ipAdd'],
          itemBtns: ['ipEdit', 'del']
        }, opt.listOpt));
        return typeof opt.after === "function" ? opt.after() : void 0;
      }
    };
    ob.routes[url + "/edit/:id"] = "edit";
    ob.routes[url + "/view/:id"] = "view";
    ob.routes[url + "/add"] = 'add';
    ob.routes[url + "/list(/:id)"] = 'list';
    ob.routes[url + "/tb"] = 'tb';
    if (_.isString(opt.func)) {
      ob.routes[url] = opt.func;
    } else {
      ob.def = opt.func;
      ob.routes[url] = 'def';
    }
    if (opt.layout && mod) {
      ob.layout = opt.layout;
      ob.routes["!/" + mod] = 'layout';
    }
    return app.enhance(ob);
  };

}).call(this);

//# sourceMappingURL=ipBtn.js.map