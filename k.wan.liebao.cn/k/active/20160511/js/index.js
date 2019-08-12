/**
 * Created by Administrator on 2016/5/11.
 */
var localUrl='http://10.60.82.117:8096';
var onUrl='http://10.60.82.117:8096';
var helper={};
var ks_user;
//alert(helper.data);
helper.data=ks_user;
// $('.lg-icon').text(ks_user.nickname);
// $('.lg-icon').addClass('bdn');
helper.userLogin=function () {
    var data=this.data;
    if (!data || data.length == 0){
        Login.show();
    }else{
        $('.lg-icon').text(ks_user.nickname);
        $('.lg-icon').addClass('bdn');
    }
};
//helper.userLogin();
helper.userLogin1=function () {
    var data=this.data;
    if (!data || data.length == 0){
        //Login.show();
    }else{
        $('.lg-icon').text(ks_user.nickname);
        $('.lg-icon').addClass('bdn');
    }
};
helper.userLogin1();
var uid=ks_user.uid;
$(function(){
    $("#normaltab").tabso({
        cntSelect:"#normalcon",
        tabEvent:"mouseover",
        tabStyle:"normal"
    });
})
$('.lg-icon').on('click',function () {
    helper.userLogin();
})
$(".lg-me").hover(function(){
    $('.lg-inner').show();
},function(){
    $('.lg-inner').hide();
});
$('.lb-game em').on('click',function(){
    $(this).parent().hide();
    $('.lb-doublemark').hide();
})
$('.lb-tel em').on('click',function(){
    $(this).parent().hide();
    $('.lb-doublemark').hide();
})
$('.lb-back').on('click',function(){
    $('.lb-jilv').hide();
    $('.lb-mark').hide();
})
$('.lb-backtop').on('click',function(){
    $('.lb-jilv').hide();
    $('.lb-mark').hide();
})
//lb-congratulationsPrizelb-return
$('.lb-congratulationsPrize span').on('click',function(){
    $(this).parent().hide();
    $('.lb-mark').hide();
})
$('.lb-return').on('click',function(){
    //helper.userLogin();
    $('.lb-payInfo').hide();
    $('.lb-mark').hide();
})
$('.liebaojilv').on('click',function(){
    helper.userLogin=function () {
        var data=this.data;
        if (!data || data.length == 0){
            Login.show();
        }else{
            gethuntPrize(uid,'1');
            gethunt(uid,'1');
            $('.lb-mark').show();
            $('.lb-jilv').show();
            $('#normaltab').find('li').eq('0').addClass('current').siblings().removeClass('current');
            $('#normalcon').find('.sublist').eq('0').css('display','block').siblings().css( "display","none" );
        }
    };
    helper.userLogin();

})
$('.zhongjiangjilu').on('click',function(){
    helper.userLogin=function () {
        var data=this.data;
        if (!data || data.length == 0){
            Login.show();
        }else{
            var uid=ks_user.uid;
            gethuntPrize(uid,'1');
            gethunt(uid,'1');
            $('.lb-mark').show();
            $('.lb-jilv').show();
            $('#normaltab').find('li').eq('1').addClass('current').siblings().removeClass('current');
            $('#normalcon').find('.sublist').eq('1').css('display','block').siblings().css( "display","none" );
        }
    };
    helper.userLogin();

})

function gethunt(uid,page){
    $.ajax({
        url:localUrl+'/hunt/1/getUserHuntInfo?uid='+uid+'&page='+page,
        type:'GET',
        dataType:'jsonp',
        crossDomain: true,
        success:function(res){
            // console.log(res);
            // console.log(res.data.length);
            if(res.data!=''){
                var html=""
                for(var i=0;i<res.data.length;i++){
                    //if(res.data[i].status=='3'){
                    html +='<tr class="bdbt">' +
                        '<td class="lb-goodsshare"><img src="images/zhanwei3.png">' ;

                    if(res.data[i].status=='3') {
                        html += '<div class="lb-overdiv">' +
                            '<h3>'+res.data[i].title+'</h3>'+
                            '<h4>获得者：<em>'+res.data[i].winner_nickname+'</em>  (本期参与 <span>'+res.data[i].hunt_num+'</span>人次)</h4>' +
                            '<h5>幸运代码：<em>'+res.data[i].win_num+'</em></h5>' +
                            '<h6>揭晓时间：' + res.data[i].otime + '</h6>'+
                            '</div>' +
                            '</td>' +
                            '<td>'+res.data[i].period_id+'</td>' +
                            '<td>'+res.data[i].hunt_num+'</td>' +
                            '<td >已揭晓</td>' +
                            '</tr>'
                    }else{
                        html+='<div>' +
                            '<h3>'+res.data[i].title+'</h3>' +
                            '<h5>揭晓时间：'+res.data[i].otime+'</h5>' +
                            '<h6>敬请期待</h6>'+
                            '</div>' +
                            '</td>' +
                            '<td>'+res.data[i].period_id+'</td>' +
                            '<td>'+res.data[i].hunt_num+'</td>' +
                            '<td class="lb-waiting">待揭晓</td>' +
                            '</tr>'
                    }

                }
                $('.lb-hunt').html(html);
                $('.lb-hunt').attr('total',res.totalPage);
            }else{
                $('.lb-molb-tab').hide();
                $('.lb-molb-tab').next().hide();
                $('.lb-molb').show();
            }


        }
    });
}

//中奖记录
function gethuntPrize(uid,page){
    $.ajax({
        url:localUrl+'/hunt/1/getUserWinInfo?uid='+uid+'&page='+page,
        type:'GET',
        dataType:'jsonp',
        crossDomain: true,
        success:function(res){
            // console.log(res);
            // console.log(res.data.length);
            if(res.data!=''){
                var html=""
                for(var i=0;i<res.data.length;i++){
                    html +='<tr class="bdbt">' +
                        '<td class="lb-goodsshare"><img src="images/zhanwei3.png">' +
                        '<div class="lb-overdiv">' +
                        '<h3>'+res.data[i].title+'</h3>' +
                        '<h4>(本期参与 <span>'+res.data[i].hunt_num+'</span>人次)</h4>' +
                        '<h5>幸运代码：<em>'+res.data[i].win_num+'</em></h5>' +
                        '<h6>揭晓时间：'+res.data[i].otime+'</h6>' +
                        '</div>' +
                        '</td>' +
                        '<td>'+res.data[i].period_id+'</td>'
                        if(res.data[i].is_get=='0'){
                            html+='<td class="lb-tapget" get_type="'+res.data[i].get_type+'" tid="'+res.data[i].treasure_id+'" pid="'+res.data[i].period_id+'">领取奖品</td>';
                        }else if(res.data[i].is_get=='1'){
                            if(res.data[i].get_type=='0'){
                                html+='<td class="lb-gettel"><h6>手机号：'+res.data[i].phone+'</h6><span>已领取</span></td>';
                            }else if(res.data[i].get_type=='1'){
                                html+='<td class="lb-gettel"><h6>游戏名称：'+res.data[i].game_name+'</h6><h6>服务器名称：'+res.data[i].server_name+'</h6><h6>角色名称：'+res.data[i].role_name+'</h6><h6>元宝：'+res.data[i].role_name+'</h6><span>已领取</span></td>';
                            }
                        }

                    html+='</tr>'
                }
                $('.lb-zhongjiangList').html(html);
                $('.lb-zhongjiangList').attr('total',res.totalPage);
            }else{
                $('.lb-table').hide();
                $('.lb-table').next().hide();
                $('.lb-weizhongjiang').show();
            }

        }
    });
}
//首页猎宝记录
function getHuntList(){
    $.ajax({
        url:localUrl+'/hunt/1/getMainPageData',
        type:'GET',
        dataType:'jsonp',
        crossDomain: true,
        success:function(res){
            // console.log(res);
            // console.log(res.info.length);
            var html=""
            for(var i=0;i<res.info.length;i++){
                html+='<li>' +
                    '<div class="lb-listing-del">' +
                    '<div class="lb-img"><img src="images/zhanwei.png"></div>' +
                    '<div class="flr lb-rwid">' +
                    '<h2>'+res.info[i].hunting.title+'</h2>' +
                    '<h3>'+res.info[i].hunting.desc+'</h3>'
                if(res.info[i].hunting.status=='2'){
                    html+= '<div class="lb-listing-zongxu"><span class="lb-comspan">总需'+res.info[i].hunting.join_count+'人次</span></div>' +
                        '<div class="lb-over">' +
                        '<div></div>' +
                        '</div>' +
                        '<p class="lb-qihao">期号：'+res.info[i].hunting.pid+'<span>（每满总需人次，即抽取1人获得该商品）</span></p>' +
                        '<p class="lb-sellOut">已售罄</p>'
                        '<div class="clear"></div>'
                }else if(res.info[i].hunting.status=='1'){
                    html+= '<div class="lb-listing-zongxu"><span class="lb-comspan">总需'+res.info[i].hunting.join_count+'人次</span><span class="lb-comspan flr">'+(res.info[i].hunting.join_count-res.info[i].hunting.join_remain)/res.info[i].hunting.join_count*100+'%</span></div>' +
                        '<div class="lb-lev">' +
                        '<div class="lb-overlev">' +
                        '<div class="lb-inglev" style="width:'+(res.info[i].hunting.join_count-res.info[i].hunting.join_remain)/res.info[i].hunting.join_count*100+'%"></div>' +
                        '</div><span class="lb-comspan">剩余'+res.info[i].hunting.join_remain+'人次</span>'+
                        '<div class="clear"></div></div>' +
                        '<p class="lb-qihao">期号：'+res.info[i].hunting.pid+'<span>（每满总需人次，即抽取1人获得该商品）</span></p>' +
                        '<div class="lb-count">'+
                         '<p class="lb-countdel">猎宝:  <a class="lb-plus">-</a> ' +
                        '<input type="text" value="1"> <a class="lb-add">+</a> 人次' +
                        '</p>' +
                        '<p class="lb-immediatelyLiebao" pid="'+res.info[i].hunting.pid+'" tid="'+res.info[i].hunting.tid+'">立即猎宝</p>' +
                        '</div>'

                }

                html+='</div>' +
                    '<div class="clear"></div>'+
                    '</div>'
                if(res.info[i].hunting){
                    html+=
                        '<div class="lb-lastLottery">' +
                        '<p class="lb-firstLine"><span>期号：'+res.info[i].end_hunt.pid+'</span><span>恭喜 <b class="277af5">'+res.info[i].end_hunt.winner_nickname+'</b> 获得了本期商品</span><span>揭晓时间：'+res.info[i].end_hunt.otime+'</span></p>' +
                        '<p class="lb-sendLine"><span>幸运号码：'+res.info[i].end_hunt.win_num+'</span><span>本期参与：<span class="ef2349">'+res.info[i].end_hunt.hunt_num+'人次</span></span><span>猎宝时间：'+res.info[i].end_hunt.ctime+'</span></p>' +
                        '</div>' +
                        '<div class="clear"></div>' +
                        '</li>'
                }

            }
            $('.lb-selloutlist').append(html);

        }
    });
}
//获取中奖信息
function getPrizeList(){
    $.ajax({
        url:localUrl+'/hunt/1/get12OpenedUser',
        type:'GET',
        dataType:'jsonp',
        crossDomain: true,
        success:function(res){
            //console.log(JSON.stringify(res)+'============');
            //console.log(res.data.length+'============');
            if(res.data.length==0){
                $('.lb-zhongjiang').hide();
            }else {
                var html = "";
                for (var i = 0; i < res.data.length; i++) {
                    html += '<li class="active">'
                    for (var j = 0; j < res.data[i].length; j++) {
                        html += '<div class="lb-zhonglist"><img src="images/zhanwei1.png">' +
                            '<div class="lb-zhonglist-right"><span>' + res.data[i][j].winner_nickname + '</span><span class="flrspan">' + res.data[i][j].otime + '</span>' +
                            '<h5><b>' + res.data[i][j].hunt_num + '</b>人次  猎得 ' + res.data[i][j].title + '</h5>' +
                            '<h5>总需：' + res.data[i][j].join_count + '人次</h5>' +
                            '</div>' +
                            '</div>'
                    }

                    html += '</li>'
                }
                $('.items').prepend(html);
            }
        }
    });
    setTimeout(function(){
        $('#zhongjianglist').slideBox({
            direction: 'top',//left,top#方向
            duration: 0.3,//滚动持续时间，单位：秒
            easing: 'linear',//swing,linear//滚动特效
            delay: 5,//滚动延迟时间，单位：秒
            startIndex: 1,//初始焦点顺序
            width: 710,
            height: 88
        });
    },1000)

}
//第二页<span class="time lbm-f">0</span><span class="time">0</span><span class="commer">:</span><span class="time">0</span><span class="time">0</span><span class="commer">:</span><span class="time">0</span><span class="time">0</span>
function getMore(){
    $.ajax({
        url:localUrl+'/hunt/1/getTodayOpeningInfo',
        type:'GET',
        dataType:'jsonp',
        crossDomain: true,
        success:function(res){
            // console.log(res.data.length);
            var html="";
            var timeArr;
            var wait=[];
            for(var i=0;i<res.data.length;i++){
                wait.push(res.data[i].rest_second);
                html+='<li>' +
                    '<div class="lbm-listing-del">' +
                    '<div class="lbm-img"><img src="images/chongzika.png"></div>' +
                    '<div class="lbm-listdel">' +
                    '<h2>'+res.data[i].title+'</h2>' +
                    '<h3>总需：'+res.data[i].join_count+'人次</h3>' +
                    '<h4>期号：'+res.data[i].id+'</h4>' +
                    '</div>' +
                    '<div class="clear"></div>' +
                    '</div>' +

                    '<div class="lbm-overtime">'+
                    '<p id="retroclockbox1">揭晓倒计时<span class="sec-contdown'+i+'" time="'+res.data[i].rest_second+'"></span></p>'//<b class="time lbm-f">'+timeArr[0]+'</b><span class="time">'+timeArr[1]+'</span><b class="commer">:</b><b class="time">'+timeArr[3]+'</b><b class="time">'+timeArr[4]+'</b><b class="commer">:</b><b class="time">'+timeArr[6]+'</b><b class="time">'+timeArr[7]+'</b>
                    '</div>' +
                    '<div class="clear"></div>' +
                    '</li>';

            }
            $('.lbm-listing-ing').prepend(html);
            //for(var i=0;i<res.data.length;i++){
            console.log(wait);
           //      var wait=$('.sec-contdown'+i).attr('time');
                console.log(wait);
            for(var i=0;i<wait.length;wait++){
                function time(wait) {
                    if (wait == 0) {
                        wait =wait;
                    } else {
                        wait--;
                        timeArr=formatSeconds(wait);
                        var tstr='<b class="time lbm-f">'+timeArr[0]+'</b><b class="time">'+timeArr[1]+'</b><b class="commer">:</b><b class="time">'+timeArr[3]+'</b><b class="time">'+timeArr[4]+'</b><b class="commer">:</b><b class="time">'+timeArr[6]+'</b><b class="time">'+timeArr[7]+'</b>'
                        $('.sec-contdown'+i).html(tstr);
                        setTimeout(function() {
                                time(wait);
                            },
                            1000)

                        return timeArr;
                    }
                }
                time(wait[i]);
                //time(wait[i+1]);
            }

           // time(wait1);
        }
    });

}
function getMoreover(){
    $.ajax({
        url:localUrl+'/hunt/1/getMoreOpenedInfo',
        type:'GET',
        dataType:'jsonp',
        crossDomain: true,
        success:function(res){
            // console.log(res.data.length);
            var html="";
            for(var i=0;i<res.data.length;i++){
                html+='<li>' +
                    '<div class="lbm-listing-del">' +
                     '<div class="lbm-img"><img src="images/chongzika.png"></div>'+
                    '<div class="lbm-listdel">' +
                    '<h2>'+res.data[i].title+'</h2>' +
                    '<h3>总需：<em>'+res.data[i].join_count+'</em>人次</h3>' +
                    '<h4>期号：'+res.data[i].id+'</h4>' +
                    '</div>' +
                    '<div class="clear"></div>' +
                    '</div>' +
                    '<div class="lbm-lastLottery">' +
                    '<p class="lb-firstLine">' +
                    '<span class="lb-first">恭喜 <b>'+res.data[i].winner_nickname+'</b> 获得了本期商品</span><span class="lb-sed">本期参与：<span>'+res.data[i].hunt_num+'</span>人次</span>' +
                    '</p>' +
                    '<p class="lb-sendLine"><span class="lb-first">揭晓时间：'+res.data[i].otime+'</span><span class="lb-sed">幸运号码：<span>'+res.data[i].win_num+'</span></span></p>' +
                    '</div>' +
                    '</li>'
            }
            $('.lbm-listing-ing').prepend(html);
        }
    });
    setTimeout(getMore(),5);
}
$('.lb-plus').live('click',function(){
    console.log("333");
    var inVal=parseInt($(this).next('input').val());
    console.log(inVal);
    if(inVal>1){
        var sum=inVal-1;
        $(this).next('input').val(sum);
    }
})
$('.lb-add').live('click',function(){
    console.log("333");
    var inVal=parseInt($(this).prev('input').val());
    console.log(inVal);
    var sum=inVal+1;
    $(this).prev('input').val(sum);
})
$('.op-plus').live('click',function(){
    //console.log("333");
    var inVal=parseInt($(this).next('input').val());
   // console.log(inVal);
    if(inVal>1){
        var sum=inVal-1;
        $(this).next('input').val(sum);
        $(this).parent().next().text(sum);
        $('.lb-payconut span').html('<em>￥'+sum+'</em>');
    }
})
$('.op-add').live('click',function(){
    console.log("333");
    var inVal=parseInt($(this).prev('input').val());
    console.log(inVal);
    var sum=inVal+1;
    $(this).prev('input').val(sum);
    $(this).parent().next().text(sum);
    $('.lb-payconut span').html('<em>￥'+sum+'</em>');
})
//倒计时
function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
        }
    }
    if(theTime<10){
        var result = "0"+parseInt(theTime)+"";
    }else{
        var result = ""+parseInt(theTime)+"";
    }
    if(theTime1 > 0) {
        if(theTime1<10){
             result = "0"+parseInt(theTime1)+":"+result;
        }else{
             result = +parseInt(theTime1)+":"+result;
        }
        //result = ""+parseInt(theTime1)+":"+result;
    }else{
        result = "0"+"0"+":"+result;
    }
    if(theTime2 > 0) {
        if(theTime2<10){
            result = "0"+parseInt(theTime2)+":"+result;
        }else{
            result = +parseInt(theTime2)+":"+result;
        }
    }else{
        result = "0"+"0"+":"+result;
    }
    //console.log(result.split(''));
    return result.split('');

}
//是否中奖信息提示
function isPrize(){
    console.log(ks_user.uid);
 if(ks_user.uid!=''&&ks_user.uid!=undefined){
     $.ajax({
         url:'http://hunt.wan.liebao.cn/hunt/1/sessionSave',
         type:'GET',
         dataType:'jsonp',
         crossDomain: true,
         success:function(res){
             console.log(res);
             if(res.ret=='1'){
                 $.ajax({
                     url:'http://hunt.wan.liebao.cn/hunt/1/getUserWinState',
                     type:'GET',
                     dataType:'jsonp',
                     crossDomain: true,
                     success:function(res){
                         console.log(res);
                         if(res.ret=='1'){
                             $('.lb-congratulationsPrize').show();
                             $('.lb-mark').show();
                         }

                     }
                 });
             }

         }
     });
 }
}
$('.lb-congratulationsPrize span').on('click',function(){
    $('.lb-congratulationsPrize').hide();
    $('.lb-mark').hide();
})
//分页
//中奖纪录
$('.next-prize').on('click',function(){
    var pageCurren=parseInt($(this).prev().text());
    var total=$('.lb-zhongjiangList').attr('total');
    if(pageCurren<total){
        var page=pageCurren+1;
        $(this).prev().text(page);
        // gethuntPrize('123',page);
        gethuntPrize(uid,page);
    }
})
$('.pre-prize').on('click',function(){
    var pageCurren=parseInt($(this).next().text());
    if(pageCurren>1){
        var page=pageCurren-1;
        $(this).next().text(page);
        gethuntPrize(uid,page);
    }
})
$('.last-prize').on('click',function(){
    var pageCurren=parseInt($(this).prev().prev().text());
    // var page=pageCurren-1;
    var page=$('.lb-zhongjiangList').attr('total');
    if(pageCurren<=page){
           $(this).prev().prev().text(page);
        gethuntPrize(uid,page);
    }

})

//猎宝记录 分页
// var uid=ks_user.uid;
$('.lb-n-hunt').on('click',function(){
    var pageCurren=parseInt($(this).prev().text());
    var total=$('.lb-hunt').attr('total');
    if(pageCurren<total){
        var page=pageCurren+1;
        $(this).prev().text(page);
        gethunt(uid,page);
        //gethunt('123',page);
    }
})
$('.lb-pre-hunt').on('click',function(){
    //var uid=ks_user.uid;
    var pageCurren=parseInt($(this).next().text());
    if(pageCurren>1){
        var page=pageCurren-1;
        $(this).next().text(page);
        gethunt(uid,page);
        //gethunt('123',page);
    }
})
$('.lb-l-hunt').on('click',function(){
    var pageCurren=parseInt($(this).prev().prev().text());
    // var page=pageCurren-1;
    var page=$('.lb-hunt').attr('total');
    if(pageCurren<=page){
        $(this).prev().prev().text(page);
        //gethunt('123',page);
        gethunt(uid,page);
    }

})
//显示提交信息
$('.lb-tapget').live('click',function(e){
    //var uid=ks_user.uid;
    //var uid='123';
    var get_type=$(this).attr('get_type');
    var pid=$(this).attr('pid');
    var tid=$(this).attr('tid');
    $('.lb-doublemark').show();
    var target =e.target||e.srcElement;
    if(get_type=='0'){
        $('.lb-tel').show();
        //提交电话号码
        $('.lb-tel-sub').on('click',function() {
            var phone = $('.phone').val();
            $.ajax({
                url: localUrl+'/hunt/1/cmtWinUserInfo?uid=' + uid + '&pid=' + pid + '&tid=' + tid + '&get_type=' + get_type + '&phone=' + phone,
                type: 'GET',
                dataType: 'jsonp',
                crossDomain: true,
                success: function (res) {
                    if (res.ret == '1') {
                        $('.lb-tel').hide();
                        $('.lb-doublemark').hide();
                        $(target).removeClass('lb-tapget');
                        $(target).addClass('lb-gettel');
                        $(target).html('<h6>手机号：' + res.data.phone + '</h6><span>已领取</span>');
                    } else {
                        alert(res.msg);
                    }

                }
            });
       })
    }else if(get_type=='1'){
        $('.lb-game').show();
        $('.lb-tel-sub').on('click',function(){
            var gname=$('.gameName').val();
            var sname=$('.lb-service').val();
            var rname=$('.lb-roleNme').val();
            $.ajax({
                url:localUrl+'/hunt/1/cmtWinUserInfo?uid='+uid+'&pid='+pid+'&tid='+tid+'&get_type='+get_type+'&sname='+sname+'&gname='+gname+'&rname='+rname,
                type:'GET',
                dataType:'jsonp',
                crossDomain: true,
                success:function(res){
                    if(res.ret=='1'){
                        console.log(res.data);
                        $('.lb-game').hide();
                        $('.lb-doublemark').hide();
                        $(target).html('<h6>游戏名称：'+res.data.game_name+'</h6><h6>服务器名称：'+res.data.server_name+'</h6><h6>角色名称：'+res.data.role_name+'</h6><h6>元宝：'+res.data.num+'</h6><span>已领取</span>');
                        $(target).removeClass('lb-tapget');
                        $(target).addClass('lb-gettel');
                    }else{
                        alert(res.msg);
                    }

                }
            });
        })
    }
})
//首页正在开奖
function getBeingRevealed(){
    $.ajax({
        url:localUrl+'/hunt/1/getOpeningPeriod',
        type:'GET',
        dataType:'jsonp',
        crossDomain: true,
        success:function(res){
            console.log(res.data);
            var wait=res.data.rest_second;
            function time(wait) {
                if (wait == 0) {
                    wait =wait;
                } else {
                    wait--;
                    timeArr=formatSeconds(wait);
                    var tstr='<b class="time lbm-f">'+timeArr[0]+'</b><b class="time">'+timeArr[1]+'</b><b class="commer">:</b><b class="time">'+timeArr[3]+'</b><b class="time">'+timeArr[4]+'</b><b class="commer">:</b><b class="time">'+timeArr[6]+'</b><b class="time">'+timeArr[7]+'</b>'
                    $('.lb-countDown').html(tstr);
                    setTimeout(function() {
                            time(wait);
                        },
                        1000)

                    return timeArr;
                }
            }
            time(wait);
            var html="";
                html='<li>' +
                    '<div class="lb-listing-del">' +
                    '<div class="lb-img"><img src="images/zhanwei.png">'+
                    '<div class="clear"></div>' +
                    '</div>'+
                    '<div class="flr lb-rwid">' +
                    '<h2>'+res.data.title+'</h2>' +
                    '<h3>'+res.data.desc+'</h3>' +
                    '<div class="lb-listing-zongxu"><span class="lb-comspan">总需'+res.data.join_count+'人次</span><span class="lb-comspan flr">100%</span></div>' +
                    '<div class="lb-wanchen">' +
                    '<div class="ingDiv"></div><span class="lb-comspan">剩余 0 人次</span>' +
                    '<div class="clear"></div></div>' +
                    '<p class="lb-qihao">期号：'+res.data.pid+'<span>（每满总需人次，即抽取1人获得该商品）</span></p>' +
                    '<p class="lb-ing">正在揭晓</p>' +
                    '<div class="clear"></div>' +
                    '</div>' +
                    '<div class="clear"></div>' +
                    '<div class="lb-overtime">' +
                    '<p>揭晓倒计时<span class="magspan">期号：'+res.data.pid+'</span><span class="lb-countDown"><b class="time">0</b><b class="time">0</b><b class="commer">:</b><b class="time">0</b><b class="time">0</b><b class="commer">:</b><b class="time">0</b><b class="time">0</b></span></p>'+
                    '</div>' +
                    '</li>'
            $('.lb-listing-ing').prepend(html);
        }
    });
}
//立即猎宝(支付流程)
$('.lb-immediatelyLiebao').live('click',function(){
    //var uid=ks_user.uid;
    //console.log(uid);
    var pid=$(this).attr('pid');
    var tid=$(this).attr('tid');
    var buy=$(this).prev().find('input').val();
    console.log(pid+' '+tid+'========'+buy);
    if(uid==undefined){
        helper.userLogin();
    }else{
        $.ajax({
            url:localUrl+'/hunt/1/getUserPrepareBuy?uid='+uid+'&pid='+pid+'&tid='+tid+'&buy='+buy,
            type:'GET',
            dataType:'jsonp',
            crossDomain: true,
            success:function(res){
                if(res.ret=='1'){
                    var html='<tr>' +
                        '<td class="lb-goodsPay"><img src="images/zhanwei3.png">' +
                        '<div>' +
                        ' <h3>'+res.data.title+'</h3>' +
                        '<h5>总需'+res.data.join_count+'人次参与，还剩'+res.data.join_remain+'人次</h5>' +
                        '</div>' +
                        '</td>' +
                        '<td>'+res.data.price+'</td>' +
                        '<td class="operation"><em class="op-plus">-</em>' +
                        '<input type="text" value="'+res.data.my_join_count+'"> <em class="op-add">+</em>' +
                        '</td>' +
                        '<td>'+res.data.cost+'</td>' +
                        '</tr>'
                    $('.lb-jiesuan tbody').html(html);
                    $('.lb-payconut span').html('<em>￥'+res.data.cost+'</em>');
                    $('.lb-mark').show();
                    $('.lb-payInfo').show();
                    //支付
                    $('.lb-jiesuan .lb-gotopay').on('click',function(){
                        var buy=$('.operation input').val();
                        console.log(buy);
                        //确认订单接口
                        $.ajax({
                            url:localUrl+'/hunt/1/getUserConfirmPay?uid='+uid+'&pid='+pid+'&tid='+tid+'&buy='+buy,
                            type:'GET',
                            dataType:'jsonp',
                            crossDomain: true,
                            success:function(res){

                                if(res.ret=='1'){
                                    var html='<tr>' +
                                        '<td>'+res.data.title+'</td>' +
                                        '<td>'+res.data.period+'</td>' +
                                        '<td>'+res.data.price+'</td>' +
                                        '<td>'+res.data.unit_price+'</td>' +
                                        '<td>'+res.data.my_join_count+'</td>' +
                                        '<td>'+res.data.join_prd_num+'</td>' +
                                        '<td>'+res.data.cost+'</td>' +
                                        '</tr>'
                                    $('.lb-zhifu tbody').html(html);
                                    $('.lb-payconut span').html('<em>￥'+res.data.cost+'</em>');
                                    $('.lb-jiesuan').hide();
                                    $('.lb-zhifu').show();
                                }else{
                                    alert(res.msg);
                                }

                            }
                        });
                        //是否有钱
                        isHaveMoney();
                    })

                }else{
                    alert(res.msg);
                }

            }
        });


    }
})
// $('.lb-jiesuan .lb-gotopay').on('click',function(){
//     $('.lb-jiesuan').hide();
//     $('.lb-zhifu').show();
// })
//返回清单
$('.goback').on('click',function(){
    $('.lb-jiesuan').show();
    $('.lb-zhifu').hide();
})
function isHaveMoney(){
    $.ajax({
        url:'http://pay1.wan.liebao.cn/index.php/platform/balance',
        type:'GET',
        dataType:'jsonp',
        crossDomain: true,
        success:function(res){
            console.log(res);
            if(res.ret=='1'){
                $('.lb-fangshi').html('支付方式: 平台币（'+res.data.balance+'）');
                if(res.data.balance=='0'){
                    $('.lb-error').show();
                    $('.lb-zhifu .lb-gotopay ').addClass('bgcc');
                }
            }else{
                alert(res.msg);
            }

        }
    });
}
$('.lb-error').on('click',function(){
    $(this).html('显示余额>>');
    $(this).addClass('getMoney');
    $(this).removeClass('lb-error');
    $(this).next().removeClass('bgcc');
})
$('.getMoney').live('click',function(){
    //getOurMoney();
    //function getOurMoney(){
        $.ajax({
            url:'http://pay1.wan.liebao.cn/index.php/platform/balance',
            type:'GET',
            dataType:'jsonp',
            crossDomain: true,
            success:function(res){

                if(res.ret=='1'){
                    $('.lb-fangshi').html('支付方式: 平台币（'+res.data.balance+'）');
                    if(res.data.balance=='0'){
                        // $('.lb-error').show();
                        $(this).html('<a href="http://wan.liebao.cn/pay/" target="_blank">  余额不足，点击充值&gt;&gt;</a>');
                        $(this).removeClass('lb-error');
                        $(this).addClass('getMoney');
                        $('.lb-zhifu .lb-gotopay ').addClass('bgcc');
                    }
                }else{
                    alert(res.msg);
                }

            }
        });
    //}
})
function isHasHunt(){
    var lilen=$('.lbm-listing-ing').find('li').length;
    if(lilen=='0'){
        $('.lbm-listing-ing').html('<h1>活动正在火热进行中，尽情期待！</h1>')
    }
}

