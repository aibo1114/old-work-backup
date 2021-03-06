// Generated by CoffeeScript 1.12.7
(function() {
  meta.pubAccount = {
    prop: [
      _ep('title'), _ep('code'), meta._text('sid', {
        ph: '在微信后台的基本配置中查看',
        label: '原始ID'
      }), meta._text('appId', {
        ph: '在微信后台的基本配置中查看',
        label: '开发ID'
      }), meta._text('secret', {
        label: '开发秘钥'
      }), {
        code: 'aes',
        label: '传输加盟串',
        code: 'mid',
        type: "text",
        label: '商户ID',
        ph: '用于微信支付',
        code: 'tradeSecret',
        type: "text",
        label: '商户支付秘钥',
        ph: '用于微信支付'
      }, m._pic('qrcode')
    ],
    listOpt: {
      itemBtns: ['menu', 'ipEdit', 'del']
    },
    btn: {
      menu: function(it, e) {
        return util.iBtn('list', null, util.navUrl("wechat/pubAccount/" + it._id + "/menu"));
      }
    },
    event: {
      menu: {
        type: 'click',
        fun: function(e) {
          return cf._wtCode = this.findData(e).get('code');
        }
      }
    }
  };

  meta.ticketTable = {
    ticket: {
      type: 'text'
    },
    _: {
      item: ['ticket', 'ref'],
      tbItem: {
        ticket: {
          w: 100
        },
        ref: {
          w: 100
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=pubAccount.js.map
