// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = function() {
    $.ajax({
      url: 'http://pay1.wan.liebao.cn/index.php/interface/gameapi/getPlayHistory/',
      data: {
        pp: '',
        uid: '',
        webgame_id: 0,
        type: 'w'
      },
      dataType: 'jsonp',
      cache: false,
      success: function(res) {
        if (res.code === 1) {
          return $('#gbox-history-subbox').html(cf.rtp('historyGame', {
            items: res.data
          }));
        } else {
          return alert(res.info);
        }
      }
    });
    return $.ajax({
      url: 'http://pay1.wan.liebao.cn/index.php/interface/gameapi/apiAllGame?webgame_id=0&op_supplier_id=0&type=w&_=1467088951951',
      dataType: 'jsonp',
      cache: false,
      success: function(res) {
        if (res.code === 1) {
          return $('.overview').html(cf.rtp('overview', {
            items: res.data
          }));
        } else {
          return alert(res.info);
        }
      }
    });
  };

}).call(this);

//# sourceMappingURL=setPlayHistory.js.map
