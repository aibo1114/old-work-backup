// Generated by CoffeeScript 1.12.7
(function() {
  cf.regFlow = function(_gd) {
    var _tpy, toUrl;
    toUrl = "/wt#!/group/" + _gd._id;
    _tpy = function(md) {
      var data, fee, success;
      if (md == null) {
        md = $('form').data('_item').model.toJSON();
      }
      fee = _gd.price;
      success = toUrl;
      data = {
        fee: fee,
        status: 2,
        paid: true
      };
      return wt.pPay({
        fee: fee,
        success: success,
        data: data
      }, md);
    };
    W._exForm = _gd.applyForm;
    _exForm.data = function() {
      return {
        group: _.pick(_gd, '_id', 'title'),
        user: user.pick(),
        status: 1
      };
    };
    _exForm.focus = true;
    return $.get(util.restUrl('groupMember'), {
      q: {
        'group._id': _gd._id
      },
      max: _gd.totalNumber || 20
    }, function(res) {
      var apply, bb, members, setBtns;
      members = res.entities;
      if (members.length) {
        $('.member').show();
        tu.avatars(members, $('.member').find('.clearfix').empty());
      }
      if ($('.applyEnd').length) {
        return;
      }
      bb = $('.regBtn');
      if (res.length >= _gd.totalNumber) {
        bb.append(tu.btn('非常抱歉, 报名人数已超上限', 'disabled', 'secondary', 'lg', 1));
        return;
      }
      apply = $(tu.btn('我要报名', 'applyGroup', 'primary', 'lg', 1)).click(function() {
        var exUrl;
        exUrl = "exForm/" + _exForm.code;
        if (!user.isLogin()) {
          if (util.isWechat()) {
            location.href = wt.genWtUrl("group/" + _gd._id);
          } else {
            cf.r('login');
            user.afterLogin = setBtns;
          }
        } else if (_exForm.mergeUser && !user.get('phone')) {
          return user.mergeUser(null, _gd.pWt, function() {
            setBtns();
            return bb.children('.btn').trigger('click');
          });
        } else {
          return cf.r(exUrl);
        }
      });
      setBtns = function() {
        var mu;
        cf.r();
        if (mu = members.findBy('user._id', user.id)) {
          bb.empty();
          if ((_gd.price === 0 || mu.paid) && mu.status === 2) {
            return bb.append($(tu.btn('进入小组', null, 'success', 'lg', 1)).attr('href', toUrl));
          } else if (_gd.price > 0 && !mu.paid) {
            return bb.append($(tu.btn('完成支付', null, 'success', 'lg', 1)).click(function() {
              return _tpy(mu);
            }));
          } else if (mu.status === 1) {
            return bb.append(tu.btn('审核中,请等待...', 'disabled', 'secondary', 'lg', 1));
          } else if (mu.status > 2) {
            return bb.append(tu.btn('抱歉,您已被暂停使用了:(', 'disabled', 'secondary', 'lg', 1));
          }
        } else {
          if (!bb.find('.applyGroup').length) {
            return bb.append(apply);
          }
        }
      };
      if (user.isLogin()) {
        return setBtns();
      } else {
        return bb.append(apply);
      }
    });
  };

}).call(this);

//# sourceMappingURL=regFlow.js.map
