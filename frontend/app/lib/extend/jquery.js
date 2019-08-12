// Generated by CoffeeScript 1.12.7
(function() {
  $.fn.serializeObject = function() {
    var o;
    o = {};
    $.each(this.serializeArray(), function() {
      if (o[this.name] != null) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || "");
      } else {
        o[this.name] = this.value || "";
      }
    });
    return o;
  };

  $.fn.cVal = function(v) {
    return $(this).val(v).trigger("change");
  };

  $.mk = function(tag, opt, ct) {
    var t;
    t = $('<' + tag + '/>');
    opt && t.attr(opt);
    ct && t.append(ct);
    return t;
  };

  $.fn.toStr = function() {
    return $(this).prop('outerHTML');
  };

  $.fn.mk = function(tag, opt, ct, md, act, evt) {
    var t;
    if (md == null) {
      md = 'append';
    }
    if (act == null) {
      act = 'click';
    }
    t = $.mk(tag, opt);
    if (ct) {
      t.append(ct);
    }
    $(this)[md](t);
    evt && t.on(act, evt);
    return t;
  };

  $.ajaxJSON = function(type, url, data, success, error) {
    return $.ajax({
      type: type,
      url: url,
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "JSON",
      success: success,
      error: error
    });
  };

  $.postJSON = function(url, data, success, error) {
    return $.ajaxJSON("POST", url, data, success, error);
  };

  $.delJSON = function(url, data, success, error) {
    return $.ajaxJSON("DELETE", url, data, success, error);
  };

}).call(this);

//# sourceMappingURL=jquery.js.map