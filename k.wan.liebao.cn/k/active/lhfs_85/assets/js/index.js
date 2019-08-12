var myDate = Date.parse(new Date());
var dtsp= myDate/1000;     //获取当前时间戳秒数
var gamesp = 'http://wan.liebao.cn/game_frame/play_1089.php?sid=95';
if(dtsp>1502503500){
  gamesp = 'http://wan.liebao.cn/game_frame/play_1089.php?sid=95';
}
if(ks_user != ' ' && ks_user.guest == 0) {
    $('.usercon').css({display: 'inline-block'})
    $('.user_register').css({display: 'none'})
    var passport = ks_user.passport;
    $('.username').text(passport);
    $(".start_game").attr("href",gamesp);
    if($.cookie('sg_cookie')=='ok'){
        $.cookie('sg_cookie', null);
        //$(".start_game").click();
        window.location = gamesp;
    }
}else if(ks_user == '' || ks_user.guest != 0) {
    $('.usercon').css({display: 'none'});
    $('.user_register').css({display: 'inline-block'});
    $(".start_game").attr("target","");
    if($.cookie('sg_cookie')=='ok'){
        $.cookie('sg_cookie', null);
    }
    $(".start_game").on('click', function () {
        $.cookie('sg_cookie', 'ok');
        $('.user_Login').click();
    });
}


//登录
$('.user_Login').on('click', function () {
    var Login_ = function () {
        return new SQ.LoginDialog({
            autoShow: !0,
            mask: !0
        })
    }
    Login_();
});

//收藏
$('.collects').on('click', function () {
    addfavorite();
})

$('.anchor ul li').on('click', function () {
    $('.anchor ul li').css({background: '#583329'})
    $(this).css({background: '#3F251E'})
})


function resErr(){}
//获取任务列表并打印
function getTask(){
    $.ajax({
        url:'http://credit.wan.liebao.cn/index.php/trygame/index?actid=lhfs_94-95_128',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            if(res.code!=1){
                resErr();
                return false;
            }
            var item1='';
            var item2='';
            //userStatus  int   0：未完成。1：可领取。2：已领取             credit string 任务积分             glevel string  等级
            //判断如果是登录，则积分 isLogin: false, myCredit:
            if(res.data.isLogin){
                $('.integral').html(res.data.myCredit);
                $('.dqdj').html('当前等级：'+res.data.mylevel);
            }else{
                $('.integral').html(0);
                $('.user_Login').click();
            }
            getSevertime = res.data.servertime *1000;
            for (var i=0;i<res.data.tasks.length;i++){
                // <tr><td>1</td><td>2</td><td>3</td><td><a class="fetch1" href="javascript:;">立即领取</a></td></tr>
                if(i==0){

                    $('#hstime').html(fmdate(res.data.tasks[i].start_time));
                    $('#endtime').html(fmdate(res.data.tasks[i].end_time));
                    $('#hstime1').html(fmdate(res.data.tasks[i].start_time));
                    $('#endtime1').html(fmdate(res.data.tasks[i].end_time));
                    hdendtime = res.data.tasks[i].end_time *1000;
                    setClock();//初始化

                }
                if(i<res.data.tasks.length/2){
                    item1+='<tr><td>'+(i+1)+'</td><td>烈火封神等级'+res.data.tasks[i].glevel+'级</td><td>'+res.data.tasks[i].credit+'积分</td><td>';
                    if(res.data.tasks[i].userStatus=='1'){
                        item1+= '<a class="fetch1" id="bt_'+res.data.tasks[i].id+'" href="javascript:openck('+res.data.tasks[i].credit+','+res.data.tasks[i].id+');">立即领取</a>';
                    }else if(res.data.tasks[i].userStatus=='2'){
                        item1+= '<a class="fetch2" id="bt_'+res.data.tasks[i].id+'" href="javascript:;">已领取</a>';
                    }else{
                        item1+= '<a class="fetch3" id="bt_'+res.data.tasks[i].id+'" href="javascript:;">未达标</a>';
                    }
                    item1+= '</td></tr>';
                }

                if(i>=res.data.tasks.length/2){
                    item2+='<tr><td>'+(i+1)+'</td><td>烈火封神等级'+res.data.tasks[i].glevel+'级</td><td>'+res.data.tasks[i].credit+'积分</td><td>';
                    if(res.data.tasks[i].userStatus=='1'){
                        item2+= '<a class="fetch1"  id="bt_'+res.data.tasks[i].id+'" href="javascript:openck('+res.data.tasks[i].credit+','+res.data.tasks[i].id+');">立即领取</a>';
                    }else if(res.data.tasks[i].userStatus=='2'){
                        item2+= '<a class="fetch2"  id="bt_'+res.data.tasks[i].id+'" href="javascript:;">已领取</a>';
                    }else{
                        item2+= '<a class="fetch3"  id="bt_'+res.data.tasks[i].id+'" href="javascript:;">未达标</a>';
                    }
                    item1+= '</td></tr>';
                }

            }

            $('#list1').html(item1);
            $('#list2').html(item2);
        }
    });
}
//判断奖励 http://credit.wan.liebao.cn/index.php/trygame/drawDown?callback=jQuery18304843784615943838_1500634299015&task_id=【任务id】
function openck(obj,id) {
    $.ajax({
        url:'http://credit.wan.liebao.cn/index.php/trygame/drawDown?&task_id='+id,
        type:'get',
        dataType:'jsonp',
        success:function(res){
            if(res.code==1){
                $('#bt_'+id).html('领取成功');
                $('#bt_'+id).removeClass('fetch1');
                $('#bt_'+id).addClass('fetch2');
                $('#bt_'+id).attr("href","javascript:;");
                $('.integral').html(parseInt($('.integral').html())+obj);
            }else{
                alert(res.msg);
            }
        }
    });
}
//获取冲ji赛
function getuser_rank(){
    $.ajax({
        url:'http://credit.wan.liebao.cn/index.php/trygame/prizeList?&actid=lhfs_94-95_128',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            if(res.code!=1){
                resErr();
                return false;
            }
            itemrank ='';
            //for(var p in myJson){//遍历json对象的每个key/value对,p为key
            /*
            * 有如下 json对象：
             var obj ={"name":"冯娟","password":"123456","department":"技术部","sex":"女","old":30};
             遍历方法：
             for(var p in obj){
             str = str+obj[p]+’,';
             return str;
             }*/
            var str ='';
            obj = res.data.prize;
            for(var p in obj){
                    if(p<4){
                        if(obj[p].passport!=''){
                        $('#rank_no'+p).html(obj[p].passport);
                        }
                    }
                    if(p>3){
                        if(obj[p].passport!='') {
                            itemrank += '<p class="lists' + (p - 2) + '">' + obj[p].passport + '</p>';
                        }else{
                            itemrank += '<p class="lists' + (p - 2) + '">虚位以待</p>';
                        }
                    }
                //  str = str+obj[p].passport+',';
                //alert(p);
            }
            // for (var i=1;i<res.data.count;i++){

            //
            // }
            if(itemrank!=''){
                $('#rank_no410').html(itemrank);
            }



        }
    });
}
//格式化时间
function fmdate(temptime) {
    Today = new Date(temptime*1000);
    var NowMonth = Today.getMonth()+1;
    var NowDate = Today.getDate();
    var NowYear = Today.getFullYear();
    return NowYear + '年'+NowMonth+ '月'+NowDate+ '日';
}

//换奖活动兑奖倒计时
var clockTime = null;
var clockRuning = false;
var getSevertime = 1;//服务器当前时间
var hdendtime=2;//活动结束时间
var opentime = 1;//记录页面打开秒数
function setClock(){
    var now = getSevertime;
    //var endTime = new Date('2016/01/16 10:00:00');
    opentime +=1;
    var t = hdendtime - getSevertime -(opentime*1000);
    if(t < 0) clearInterval(clockTime);
    var d=Math.floor(t/1000/60/60/24);
    var h=Math.floor(t/1000/60/60%24);
    var m=Math.floor(t/1000/60%60);
    var s=Math.floor(t/1000%60);
    var _html = '';
    //天时分秒
    if(d>0) _html += ''+d+'天';
    _html += ''+h+'时';
    _html += ''+m+'分';
    _html += ''+s+'秒';
    $('.count_down2').html(_html);
    timerID = setTimeout("setClock()",1000);
}


getTask();
getuser_rank();