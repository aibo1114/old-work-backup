var creditstoastFlag = true;
var myDate = Date.parse(new Date());
var dtsp = myDate / 1000; //获取当前时间戳秒数
var gamesp = 'http://wan.liebao.cn/game_frame/play_1092.php?sid=34';
var actualclientHeight,actualscrollTop,actualclientWidth,actualscrollLeft;//视口、滚动条
if (dtsp > 1502503500) {
  gamesp = 'http://wan.liebao.cn/game_frame/play_1092.php?sid=34';
}

//根据http://wan.liebao.cn/action/user_info.php?rt=5获取ks_user判断登陆情况，显示登陆退出
if (ks_user != ' ' && ks_user.guest == 0) {
    $('.usercon').css({
      display: 'inline-block'
    }) //欢迎、退出按钮
    $('.user_register').css({
      display: 'none'
    })
    var passport = ks_user.passport;
    $('.username').text(passport);
    $(".start_game").attr("href", gamesp);
    if ($.cookie('sg_cookie') == 'ok') {
      $.cookie('sg_cookie', null);
      var windowOpen = window.open('http://lingyi.red/', 'lingyired', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=800,height=600, top=0, left=0');
      if (windowOpen == null || typeof(windowOpen)=='undefined'){
        window.confirm('已触发：窗口无法打开，请检查你的浏览器设置。');
      }
      // gotourl(gamesp);
    }
} else if (ks_user == '' || ks_user.guest != 0) {
    $('.usercon').css({
      display: 'none'
    });
    $('.user_register').css({
      display: 'inline-block'
    });
    $(".start_game").attr("target", "");
    if ($.cookie('sg_cookie') == 'ok') {
      $.cookie('sg_cookie', null);
    }
    $(".start_game").on('click', function() {
      $.cookie('sg_cookie', 'ok');
      $('.enroll').click();
    });
    $('.enroll').click();
}
function gotourl(url){
    var a = $('<a href="'+ url +'" target="_blank"></a>');  //生成一个临时链接对象
    var d = a.get(0);
    var e = document.createEvent('MouseEvents');
    e.initEvent( 'click', true, true );  //模拟点击操作
    d.dispatchEvent(e);
    a.remove();   // 点击后移除该对象
}
//收藏事件
$('.collects').on('click', function(e) {
      addFavorite(location.href,document.title);
    e.preventDefault();
})

//收藏
function addFavorite(url, title) {
    if(window.external && 'addFavorite' in window.external){ // IE
        window.external.addFavorite(url, title);
    } else if(window.sidebar && window.sidebar.addPanel) { // Firefox23后被弃用
        window.sidebar.addPanel(url, title);
    } else if(window.opera && window.print) { // rel=sidebar，读取a链接的href，title 注：opera也转战webkit内核了
        this.title = title;
        return true;
    } else { // webkit - safari/chrome
      alert("请使用Ctrl+D进行添加")
    }
}

//电梯样式切换
$('.anchor ul li').on('click', function() {
  $('.anchor ul li').css({
    background: '#583329'
  })
  $(this).css({
    background: '#3F251E'
  })
})

//灰色遮罩层计算()
function recount(){
  // $('.sq-dialog-masking').css({'height':$('html').outerHeight()+$('.footer_3').outerHeight()+10})
  $('.sq-dialog-masking').css({'height':$(document).height()})
}
recount();

//login弹窗计算
function resetfix(){
actualclientHeight=getClientHeight();
actualscrollTop=getScrollTop();
actualclientWidth=getClientWidth();
actualscrollLeft=getScrollLeft();
  $('#login-warp').css({'top':actualscrollTop+(actualclientHeight/2),'left':actualscrollLeft+(actualclientWidth/2)});
}

//登陆框位置计算
$(window).on('scroll resize',function(){
    myEfficientFn();
    recount();
})
// 防抖
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
var myEfficientFn = debounce(function() {
  resetfix();
}, 250);

//获取任务列表
function getTask() {
  $.ajax({
    url: 'http://credit.wan.liebao.cn/index.php/trygame/index?actid=xyfy_34_98',
    type: 'get',
    dataType: 'jsonp',
    success: function(res) {
      if (res.code != 1) {
        return false;
      }
      var item1 = '';
      var item2 = '';
      //userStatus  int   0：未完成。1：可领取。2：已领取             credit string 任务积分             glevel string  等级
      //判断如果是登录，则积分 isLogin: false, myCredit:
      if (res.data.isLogin) {
        $('.integral').html(res.data.myCredit);
        $('.dqdj').html('当前等级：' + res.data.mylevel);
      } else {
        $('.integral').html(0);
        // $('.user_Login').click();
        // $('.enroll').click();
      }
      getSevertime = res.data.servertime * 1000;
      for (var i = 0; i < res.data.tasks.length; i++) {
        // <tr><td>1</td><td>2</td><td>3</td><td><a class="fetch1" href="javascript:;">立即领取</a></td></tr>
        if (i == 0) {
          $('#hstime').html(fmdate(res.data.tasks[i].start_time));
          $('#endtime').html(fmdate(res.data.tasks[i].end_time));
          $('#hstime1').html(fmdate(res.data.tasks[i].start_time));
          $('#endtime1').html(fmdate(res.data.tasks[i].end_time));
          hdendtime = res.data.tasks[i].end_time * 1000;
          setClock(); //初始化
        }
        if (i < res.data.tasks.length / 2) {
          item1 += '<tr><td>' + (i + 1) + '</td><td>西游伏妖篇等级' + res.data.tasks[i].glevel + '级</td><td>' + res.data.tasks[i].credit + '积分</td><td>';
          if (res.data.tasks[i].userStatus == '1') {
            item1 += '<a class="fetch1" id="bt_' + res.data.tasks[i].id + '" href="javascript:openck(' + res.data.tasks[i].credit + ',' + res.data.tasks[i].id + ');">立即领取</a>';
          } else if (res.data.tasks[i].userStatus == '2') {
            item1 += '<a class="fetch2" id="bt_' + res.data.tasks[i].id + '" href="javascript:;">已领取</a>';
          } else {
            item1 += '<a class="fetch3" id="bt_' + res.data.tasks[i].id + '" href="javascript:;">未达标</a>';
          }
          item1 += '</td></tr>';
        }

        if (i >= res.data.tasks.length / 2) {
          item2 += '<tr><td>' + (i + 1) + '</td><td>西游伏妖篇等级' + res.data.tasks[i].glevel + '级</td><td>' + res.data.tasks[i].credit + '积分</td><td>';
          if (res.data.tasks[i].userStatus == '1') {
            item2 += '<a class="fetch1"  id="bt_' + res.data.tasks[i].id + '" href="javascript:openck(' + res.data.tasks[i].credit + ',' + res.data.tasks[i].id + ');">立即领取</a>';
          } else if (res.data.tasks[i].userStatus == '2') {
            item2 += '<a class="fetch2"  id="bt_' + res.data.tasks[i].id + '" href="javascript:;">已领取</a>';
          } else {
            item2 += '<a class="fetch3"  id="bt_' + res.data.tasks[i].id + '" href="javascript:;">未达标</a>';
          }
          item1 += '</td></tr>';
        }

      }
      $('#list1').html(item1);
      $('#list2').html(item2);
    }
  });
}
//判断奖励 http://credit.wan.liebao.cn/index.php/trygame/drawDown?callback=jQuery18304843784615943838_1500634299015&task_id=【任务id】
//领取奖励
function openck(obj, id) {
  $.ajax({
    url: 'http://credit.wan.liebao.cn/index.php/trygame/drawDown?&task_id=' + id,
    type: 'get',
    dataType: 'jsonp',
    success: function(res) {
      if (res.code == 1) {
        $('#bt_' + id).html('领取成功').removeClass('fetch1').addClass('fetch2').attr("href", "javascript:;");
        $('.integral').html(parseInt($('.integral').html()) - parseInt(obj));
      } else {
        alert(res.msg);
      }
    }
  });
}
//获取冲级list
function getuser_rank() {
  $.ajax({
    url: 'http://credit.wan.liebao.cn/index.php/trygame/prizeList?&actid=xyfy_34_98',
    type: 'get',
    dataType: 'jsonp',
    success: function(res) {
      if (res.code != 1) {
        return false;
      }
      itemrank = '';
      var str = '';
      obj = res.data.prize;
      for (var p in obj) {
        if (p < 4) {
          if (obj[p].passport != '') {
            $('#rank_no' + p).html(obj[p].passport);
          }
        }
        if (p > 3) {
          if (obj[p].passport != '') {
            itemrank += '<p class="lists' + (p - 2) + '">' + obj[p].passport + '</p>';
          } else {
            itemrank += '<p class="lists' + (p - 2) + '">虚位以待</p>';
          }
        }
      }
      if (itemrank != '') {
        $('#rank_no410').html(itemrank);
      }
    }
  });
}
//格式化时间
function fmdate(temptime) {
  Today = new Date(temptime * 1000);
  var NowMonth = Today.getMonth() + 1;
  var NowDate = Today.getDate();
  var NowYear = Today.getFullYear();
  return NowYear + '年' + NowMonth + '月' + NowDate + '日';
}

//换奖活动兑奖倒计时
var clockTime = null;
var clockRuning = false;
var getSevertime = 1; //服务器当前时间
var hdendtime = 2; //活动结束时间
var opentime = 1; //记录页面打开秒数
function setClock() {
  // getSevertime=1504148903000;//测试专用
  opentime += 1;
  var t = hdendtime - getSevertime - (opentime * 1000);
  if (t<0) {
    $('.count_down2').html('活动结束')
    return false;
  }
  var d = Math.floor(t / 1000 / 60 / 60 / 24);
  var h = Math.floor(t / 1000 / 60 / 60 % 24);
  var m = Math.floor(t / 1000 / 60 % 60);
  var s = Math.floor(t / 1000 % 60);
  var _html = '';
  //天时分秒
  if (d > 0) _html += '' + d + '天';
  _html += '' + h + '时';
  _html += '' + m + '分';
  _html += '' + s + '秒';
  $('.count_down2').html(_html);
  timerID = setTimeout("setClock()", 1000);
}

//积分兑换toast
$('.credits_exchange').on('click', function() {
    $('.creditstoast').css('visibility', 'visible');
})
//积分兑换toast关闭
function hideToast(){
   $('.creditstoast').css('visibility', 'hidden');
}
//积分兑换toast关闭
$(document).mouseup(function(e){
  var _con = $('#creditstoast ');
  if(!_con.is(e.target) && _con.has(e.target).length === 0){
    hideToast();
  }
});
//积分兑换跳转
function gourl(num) {
  var url;
  if (num == 0) {
    url = 'http://my.wan.liebao.cn/';
  } else if (num == 1) {
    url = 'http://my.wan.liebao.cn/shopinfo.html?item=9&source=';
  } else if (num == 2) {
    url = 'http://my.wan.liebao.cn/shopinfo.html?item=78&source=';
  } else if (num == 3) {
    url = 'http://my.wan.liebao.cn/shopinfo.html?item=130&source=';
  }
  window.open(url);
}
//视口高度
function getClientHeight(){
    var clientHeight=0;
    if(document.body.clientHeight&&document.documentElement.clientHeight){
        var clientHeight=(document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }else{
        var clientHeight=(document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }
    return clientHeight;
}
function getClientWidth(){
    var clientWidth=0;
    if(document.body.clientWidth&&document.documentElement.clientWidth){
        var clientWidth=(document.body.clientWidth<document.documentElement.clientWidth)?document.body.clientWidth:document.documentElement.clientWidth;
    }else{
        var clientWidth=(document.body.clientWidth>document.documentElement.clientWidth)?document.body.clientWidth:document.documentElement.clientWidth;
    }
    return clientWidth;
}
// 滚动条高度
function getScrollTop(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
    }else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}
function getScrollLeft(){
    var scrollLeft=0;
    if(document.documentElement&&document.documentElement.scrollLeft){
        scrollLeft=document.documentElement.scrollLeft;
    }else if(document.body){
        scrollLeft=document.body.scrollLeft;
    }
    return scrollLeft;
}
resetfix();
getTask();
getuser_rank();
