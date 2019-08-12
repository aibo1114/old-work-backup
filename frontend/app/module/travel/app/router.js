// Generated by CoffeeScript 1.12.7
(function() {
  var router;

  router = require("../../../lib/router");

  require('../../../lib/meta/extend/captcha')();

  require('../../../lib/model/entity');

  require('../../../lib/model/entities');

  require('../../../lib/view/_tag');

  require('../../../lib/view/tag');

  require('../../../lib/view/model');

  require('../../../lib/view/form/form');

  require('../../../lib/view/form/tabForm');

  require('../../../lib/view/collection/app');

  require('../../../lib/view/collection/table');

  require('../../../lib/view/collection/jsonTable');

  require('./meta/common');

  require('./meta/enquire');

  require('./meta/rating');

  require('./meta/deal');

  $.extend(window, {
    dInputEvent: function(e) {
      var date, ip, n, name, t;
      t = util.ct(e);
      ip = this.$("input[name='" + (t.parent().parent().data('name')) + "']");
      if (ip.val()) {
        date = util.parseLocalDate(ip.val());
      } else {
        date = new Date();
      }
      date.setSeconds(0);
      n = +t.val();
      name = t.data('name');
      if (name === 'month') {
        n--;
      }
      date["set" + (name.capitalize())](n);
      ip.val(date.pattern());
      return ip.trigger('change');
    },
    dateCvt: function(v) {
      return util.parseLocalDate(v).toString().substr(4, 17);
    }
  });

  cf.paypalNow = function(d) {
    return util.BForm({
      action: 'https://www.paypal.com/cgi-bin/webscr',
      target: '_blank',
      data: {
        cmd: "_xclick",
        business: "charliwang@wikibeijing.com",
        item_name: d.itemName || d.num,
        item_number: d.num,
        amount: d.total,
        currency_code: "USD",
        notify_url: "http://" + cf.community.url + "/a/paypal/notify",
        no_note: 1
      }
    }).submit().remove();
  };

  cf.orderNum = function() {
    return "w" + (new Date().pattern('yyyyMMddHHmm'));
  };

  $('.ySuggestion').click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    return app.dm.add('air', 'suggestion', {
      cols: 'col-md-3:col-md-9',
      title: "Thank you for the valuable advice, Wiki beijing really appreciates your help.",
      className: 'break'
    });
  });

  new router({
    dm: cf.dm,
    index: function() {
      return $('#indexSlide').show();
    }
  });

}).call(this);

//# sourceMappingURL=router.js.map
