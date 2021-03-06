// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = {
    loadPic: function() {},
    closeBox: function() {
      $('#dialog-mask').hide();
      return $('#dialog').hide();
    },
    confirmBox: function(type, option) {
      var $box, $dialog_footer, $dialog_main, bonus_no_val, bonuseNumber, link, roles, uname;
      uname = 'Lucy';
      this.closeBox();
      $box = [];
      $dialog_main = $('#dialog-main');
      switch (type) {
        case 'charge_info':
          $box.push('<dl class="dialog-main-sheet clearfix">');
          $box.push('<dt>充值帐号:</dt>');
          $box.push('<dd>' + ($('#form_passport_mainname').val()) + '</dd>');
          $box.push('<dt>充值方式:</dt>');
          $box.push('<dd>' + ($('#form_platform_name').val()) + '</dd>');
          $box.push('<dt>充值游戏:</dt>');
          $box.push('<dd>' + $('#form_webgame_name').val() + ' ' + $('#form_webgame_servername').val() + '</dd>');
          roles = option.roles;
          if (roles !== '') {
            $box.push('<dt>角色名称:</dt>');
            $box.push('<dd>' + roles + '</dd>');
          }
          $box.push('<dt>充值金额:</dt>');
          $box.push('<dd>' + $('#form_pay_amount').val() + '元</dd>');
          $box.push('<dt>兑换游戏币:</dt>');
          $box.push('<dd>' + $('#pay_tip_amount').html() + '</dd>');
          if ($('#pay_tip_coin').length > 0) {
            $box.push('<dt>获得积分:</dt>');
            $box.push('<dd>' + $('#pay_tip_coin').html() + '</dd>');
          }
          bonus_no_val = $('#form_bonus_no').val();
          if (bonus_no_val !== '' && bonus_no_val !== void 0) {
            $box.push('<dt>返利券：</dt>');
            bonuseNumber = void 0;
            if ($('#fanli-bonuse').is(':visible')) {
              bonuseNumber = $('#fanli-bonuse').find('option:checked').html();
            } else {
              bonuseNumber = bonus_no_val;
            }
            $box.push('<dd>' + bonuseNumber + '</dd>');
          }
          $box.push('</dl>');
          break;
        case 'charge_ing':
          $box.push('<h5 class="dialog-main-tit">请在新打开的页面中完成充值支付！</h5>');
          $box.push('<p class="dialog-main-p1">付款前请不要关闭或刷新此页面。</p>');
          $box.push('<p class="dialog-main-p1">如果付款遇到问题，请联系<a href="http://wan.liebao.cn/action/redirect_kf.php" class="orangelink" target="_blank">在线客服</a></p>');
          break;
        case 'empty_role':
          $box.push('<div class="dialog-main-err"></div>');
          $box.push('<p class="dialog-main-p2 red pt20">对不起!</p>');
          $box.push('<p class="dialog-main-p2">您尚未在该游戏服务器内创建角色</p>');
          $box.push('<p class="dialog-main-p2">不能进行充值！</p>');
      }
      $dialog_main.html($box.join(''));
      $box = [];
      $dialog_footer = $('#dialog-footer');
      switch (type) {
        case 'charge_info':
          $box.push('<a href="javascript:;" class="dialog-btn dialog-btn-light ml45 submitbtn">确认提交</a>');
          $box.push('<a href="javascript:;" class="dialog-btn dialog-btn-dark ml20 closebtn">返回修改</a>');
          break;
        case 'charge_ing':
          link = 'http://wan.liebao.cn/pay/?kstag=record';
          $box.push('<a href="' + link + '" target="_blank" class="dialog-btn dialog-btn-light ml45">查看充值结果</a>');
          $box.push('<a href="javascript:;" class="dialog-btn dialog-btn-dark ml20 closebtn">返&nbsp;&nbsp;回</a>');
          break;
        case 'empty_role':
          $box.push('<a href="javascript:;" class="dialog-btn dialog-btn-light ml115 closebtn">返回修改</a>');
      }
      $dialog_footer.html($box.join(''));
      $('#dialog-mask').show();
      $('#dialog').show();
      $('#dialog').on('click', '.submitbtn', function() {
        util.confirmBox('charge_ing');
        console.log("1111");
        $('#payform').submit();
      });
      $('#dialog').on('click', '.closebtn', function() {
        return util.closeBox();
      });
    },
    initSelectEvent: function() {
      var $g_select_btn, $gbox_allgames_subbox, $gbox_history_subbox, $gbox_m, $gbox_tit, $gcbox, $s_select_btn, $sbox_allsvrs_subbox, $sbox_history_subbox, $sbox_m, $sbox_tit, $scbox;
      $g_select_btn = $('#g-select-btn');
      $s_select_btn = $('#s-select-btn');
      $gcbox = $('#g-cbox');
      $scbox = $('#s-cbox');
      $gbox_m = $('#gbox-main');
      $sbox_m = $('#sbox-main');
      $gbox_tit = $('#gbox-tit');
      $sbox_tit = $('#sbox-tit');
      $gbox_allgames_subbox = $('#gbox-allgames-subbox');
      $sbox_allsvrs_subbox = $('#sbox-allsvrs-subbox');
      $gbox_history_subbox = $('#gbox-history-subbox');
      $sbox_history_subbox = $('#sbox-history-subbox');
      $g_select_btn.on('click', function(e) {
        var t;
        if (!$gcbox.hasClass('box-coverbox-show')) {
          $scbox.removeClass('box-coverbox-show');
          $gcbox.addClass('box-coverbox-show');
        } else {
          $gcbox.removeClass('box-coverbox-show');
        }
        if ($gbox_m.hasClass('box-covermain-slided')) {
          $gbox_m.css('height', $gbox_allgames_subbox.height());
        } else {
          $gbox_m.css('height', $gbox_history_subbox.height());
        }
        $gbox_tit.find('.box-coverbox-tit-a').each(function() {
          var $this, s_id;
          $this = $(this);
          s_id = $this.attr('data-scroll');
          if (s_id !== void 0 && s_id !== '') {
            $('#' + s_id).tinyscrollbar();
            $this.attr('data-scroll', '');
          }
        });
        t = 0;
        $gcbox.on('mouseleave', function() {
          var $this;
          clearTimeout(t);
          $this = $(this);
          t = setTimeout((function() {
            $this.removeClass('box-coverbox-show');
            $this.off('mouseleave');
          }), 200);
        }).on('mouseenter', function() {
          clearTimeout(t);
        });
        e.preventDefault();
      });
      $gbox_tit.on('click', '.box-coverbox-tit-a', function() {
        var $this;
        $this = $(this);
        if ($this.hasClass('box-coverbox-tit-a-select')) {
          return;
        } else {
          $gbox_tit.find('.box-coverbox-tit-a-select').removeClass('box-coverbox-tit-a-select');
          $this.addClass('box-coverbox-tit-a-select');
          if (!$gbox_m.hasClass('box-covermain-animate')) {
            $gbox_m.addClass('box-covermain-animate');
          }
          if ($gbox_m.hasClass('box-covermain-slided')) {
            $gbox_m.removeClass('box-covermain-slided');
            $gbox_m.css('height', $gbox_history_subbox.height());
          } else {
            $gbox_m.addClass('box-covermain-slided');
            $gbox_m.css('height', $gbox_allgames_subbox.height());
          }
        }
      });
      $s_select_btn.on('click', function(e) {
        var t, webgame_id;
        webgame_id = $g_select_btn.attr('data-gid');
        if (webgame_id === void 0 || webgame_id === '') {
          util.scroll2top();
          $g_select_btn.ktip('<span class="red">请先选择需要充值的游戏</span>', {
            direction: 'left',
            offset: 18,
            atX: -5,
            atY: 19,
            closeBtn: false,
            stick: 2000
          });
          return;
        }
        if (!$scbox.hasClass('box-coverbox-show')) {
          $gcbox.removeClass('box-coverbox-show');
          $scbox.addClass('box-coverbox-show');
        } else {
          $scbox.removeClass('box-coverbox-show');
        }
        if ($sbox_m.hasClass('box-covermain-slided')) {
          $sbox_m.css('height', $sbox_allsvrs_subbox.height());
        } else {
          $sbox_m.css('height', $sbox_history_subbox.height());
        }
        $sbox_tit.find('.box-coverbox-tit-a').each(function() {
          var $this, s_id;
          $this = $(this);
          s_id = $this.attr('data-scroll');
          if (s_id !== void 0 && s_id !== '') {
            $('#' + s_id).tinyscrollbar();
            $this.attr('data-scroll', '');
          }
        });
        t = 0;
        $scbox.on('mouseleave', function() {
          var $this;
          clearTimeout(t);
          $this = $(this);
          t = setTimeout((function() {
            $this.removeClass('box-coverbox-show');
            $this.off('mouseleave');
          }), 200);
        }).on('mouseenter', function() {
          clearTimeout(t);
        });
      });
      $sbox_tit.on('click', '.box-coverbox-tit-a', function() {
        var $this;
        $this = $(this);
        if ($this.hasClass('box-coverbox-tit-a-select')) {
          return;
        } else {
          $sbox_tit.find('.box-coverbox-tit-a-select').removeClass('box-coverbox-tit-a-select');
          $this.addClass('box-coverbox-tit-a-select');
          if (!$sbox_m.hasClass('box-covermain-animate')) {
            $sbox_m.addClass('box-covermain-animate');
          }
          if ($sbox_m.hasClass('box-covermain-slided')) {
            $sbox_m.removeClass('box-covermain-slided');
            $sbox_m.css('height', $sbox_history_subbox.height());
          } else {
            $sbox_m.addClass('box-covermain-slided');
            $sbox_m.css('height', $sbox_allsvrs_subbox.height());
          }
        }
      });
      $gbox_m.on('click', '.box-coverbox-list-a', function(e) {
        var webgame_id;
        e.preventDefault();
        webgame_id = $(this).attr('data-id');
        $('#g-select-btn').text($(this).text());
        $('#g-select-btn').attr('data-gid', webgame_id);
        $.ajax({
          url: 'http://pay1.wan.liebao.cn/index.php/interface/gameapi/getPlayHistory/?uid=4208095416&pp=kswl702533405&type=w&_=1467088951950',
          data: {
            webgame_id: webgame_id
          },
          dataType: 'jsonp',
          cache: false,
          success: function(res) {
            if (res.code === 1) {
              return $('#sbox-history-subbox').html(cf.rtp('historyArea', {
                items: res.data
              }));
            } else {
              return alert(res.info);
            }
          }
        });
        $.ajax({
          url: 'http://pay1.wan.liebao.cn/index.php/webgame/getServerInfo/',
          data: {
            webgame_id: webgame_id
          },
          dataType: 'jsonp',
          cache: false,
          success: function(res) {
            if (res.code === 1) {
              return $('#sbox-allsvrs-subbox .overview').html(cf.rtp('allArea', {
                items: res.data
              }));
            }
          }
        });
        return $gcbox.removeClass('box-coverbox-show');
      });
      $sbox_m.on('click', '.box-coverbox-list-a', function() {
        var $this, sid;
        $this = $(this);
        sid = $this.attr('data-sid');
        $s_select_btn.attr('data-sid', sid).html($this.html());
        $scbox.removeClass('box-coverbox-show');
      });
    }
  };

}).call(this);

//# sourceMappingURL=util.js.map
