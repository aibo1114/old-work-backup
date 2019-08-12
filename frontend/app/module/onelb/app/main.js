// Generated by CoffeeScript 1.12.7
(function() {
  var getHuntList, getMore, getMoreover, getPrizeList, gethuntPrize, localUrl;

  require('./style/main.css');

  require('../../../lib/main');

  require('./js/tab');

  require('./js/jquery.slideBox');

  window.cf = {
    tp: {},
    rtp: function(tmpl, opt) {
      if (opt == null) {
        opt = {};
      }
      if (_.isString(tmpl)) {
        if (!cf.tp[tmpl]) {
          try {
            cf.tp[tmpl] = cf.loadTmpl(tmpl);
          } catch (error) {
            cf.tp[tmpl] = cf.loadLibTmpl(tmpl);
          }
        }
        tmpl = cf.tp[tmpl];
      }
      return tmpl($.extend(opt, cf.tp.opt));
    }
  };

  cf.loadTmpl = function(name) {
    return require("./tmpl/" + name + ".jade");
  };

  cf.loadLibTmpl = function(name) {
    return require("../../../lib/tmpl/" + name + ".jade");
  };

  localUrl = 'http://10.60.82.117:8096';

  getHuntList = function() {
    return $.ajax({
      url: localUrl + '/hunt/1/getMainPageData',
      type: 'GET',
      dataType: 'jsonp',
      crossDomain: true,
      success: function(res) {
        return $('.lb-listing').append(cf.rtp('liebaoRecord', {
          items: res.info
        }));
      }
    });
  };

  getHuntList();

  getPrizeList = function() {
    $.ajax({
      url: localUrl + '/hunt/1/get12OpenedUser',
      type: 'GET',
      dataType: 'jsonp',
      crossDomain: true,
      success: function(res) {
        if (res.data.length === 0) {
          return $('.lb-zhongjiang').hide();
        } else {
          return $('#zhongjianglist').append(cf.rtp('prizeList', {
            data: res.data
          }));
        }
      }
    });
    return setTimeout((function() {
      return $('#zhongjianglist').slideBox({
        direction: 'top',
        duration: 0.3,
        easing: 'linear',
        delay: 5,
        startIndex: 1,
        width: 710,
        height: 88
      });
    }), 1000);
  };

  getPrizeList();

  getMoreover = function() {
    return $.ajax({
      url: localUrl + '/hunt/1/getMoreOpenedInfo',
      type: 'GET',
      dataType: 'jsonp',
      crossDomain: true,
      success: function(res) {
        return $('.lbm-newList').append(cf.rtp('lotterying', {
          items: res.data
        }));
      }
    });
  };

  getMore = function() {
    return $.ajax({
      url: localUrl + '/hunt/1/getTodayOpeningInfo',
      type: 'GET',
      dataType: 'jsonp',
      crossDomain: true,
      success: function(res) {
        return $('.lbm-newList').append(cf.rtp('isTheLottery', {
          items: res.data
        }));
      }
    }, setTimeout(getMoreover(), 50));
  };

  getMore();

  gethuntPrize = function(uid, page) {
    $.ajax({
      url: localUrl + '/hunt/1/getUserWinInfo?uid=' + uid + '&page=' + page,
      type: 'GET',
      dataType: 'jsonp',
      crossDomain: true,
      success: function(res) {
        if (res.data !== '') {
          $('.lb-hunt').html(cf.rtp('statement', {
            items: res.datd
          }));
          $('.lb-zhongjiangList').html(html);
          $('.lb-zhongjiangList').attr('total', res.totalPage);
        } else {
          $('.lb-table').hide();
          $('.lb-table').next().hide();
          $('.lb-weizhongjiang').show();
        }
      }
    });
  };


  /**
   * Created by Administrator on 2016/5/11.
   */

}).call(this);

//# sourceMappingURL=main.js.map