helper={};
helper.userArr=ks_user;

//helper.domainName='http://10.33.29.84:7031';
helper.domainName='http://k.wan.liebao.cn';
helper.sidDomin='http://credit.wan.liebao.cn';
helper.apiDomain='http://api.wan.liebao.cn';
helper.itemPerPage=4;

helper.isLogin=function(){
    var userArr=this.userArr;
    if(!userArr || userArr.length==0){
        Login.show();
        return false;
    }
    return true;
};

helper.sendId=function(){
    var userArr=this.userArr;
    if(!userArr || userArr.length==0){
        return false;
    }
    $.ajax({
        url:helper.sidDomin+'/index.php/api/notifyServer?sid='+helper._id,
        type:'get',
        dataType: 'jsonp',
        jsonp: 'callback',
        //jsonpCallback:'',
        //cache:false,
        success:function(res){}
    });
};

helper.getTime=function(){
    $.ajax({
        url:helper.apiDomain+'/activity/20151023/activity_seconds',
        type:'get',
        dataType: 'jsonp',
        jsonp: 'callback',
        //jsonpCallback:'',
        //cache:false,
        success:function(res){
            //console.log(res);
            helper.time=res.time;
            helper._id=res.id;
            helper.countTime(res.time);
            helper.countdown();
            helper.sendId();
        }
    });
};


helper.getRecord=function(){
    $.ajax({
        url:helper.apiDomain+'/activity/20151023/prized_info',
        type:'get',
        dataType: 'jsonp',
        jsonp: 'callback',
        //jsonpCallback:'',
        //cache:false,
        success:function(res){
            //console.log(res);
            var data=res.data,
                content;
            if(res.ret==0){
                content=helper.noRecordContent('icon-norecord_06.jpg');
                new Window().madeContent({
                    width:500,
                    y:120,
                    winContent:content
                });
            }else if(res.ret>0){
                content=helper.recordContent(data);
                new Window().madeContent({
                    width:760,
                    y:120,
                    winContent:content
                });
            }

        }
    });
};

helper.getSpike=function(){
    $.ajax({
        url:helper.apiDomain+'/activity/20151023/seckill',
        type:'get',
        dataType: 'jsonp',
        jsonp: 'callback',
        //jsonpCallback:'',
        //cache:false,
        success:function(res){
            //console.log(res);
            var content;
            if(res.ret==1){
                content=helper.normalContent(res,'icon-success_07.jpg');
            }else if(res.ret==0){
                content=helper.failContent('未获奖','icon-failed_07.jpg');
            }else{
                content=helper.failContent('秒杀失败','icon-failed_07.jpg');
            }

            new Window().madeContent({
                width:500,
                y:150,
                winContent:content
            });
        }
    });
};

helper.countTime=function(time){
    var hours=Math.floor(time/60/60),
        mins= Math.floor(time/60) - (hours*60),
        seconds= time%60,
        str;

    if(mins==0){
        mins=59;
        hours--;
    }

    str=hours+'时'+mins+'分'+seconds+'秒';

    $('#countDown').html(str);
};

helper.countdown=function(){
    var timer=setInterval(function(){
        helper.time--;
        helper.countTime(helper.time);
    },1000);
};

/*
helper.normalContent=function(iconSrc,txt,title){
    var content='<img class="icon" src="'+helper.domainName+'/'+iconSrc+'" />';
    if(title){
        content+='<h3 class="title">'+title+'</h3>';
    }
    content+='<p class="text">'+txt+'</p>';

    return content;
};
*/

helper.recordContent=function(data){
    var content='<h3 class="title-record">我的中奖纪录</h3><ul class="l-record">';
    for (var i= 0,len=data.length;i<len;i++){
        content+='<li>';
        content+='<span>秒杀'+data[i].Prize+'充值卡一张</span>';
        content+='<span>卡号：'+data[i].PrizeCode+'</span>';
        content+='<span>密码：'+data[i].PrizePassword+'</span>';
        content+='</li>';
    }
    content+='</ul>';

    return content;
};

helper.normalContent=function(res,imgSrc){
    var content='<span class="poster"><img src="'+helper.domainName+'/k/active/201510/images/'+imgSrc+'" /></span>';
    content+='<p class="text">恭喜成功秒杀'+res.data.Prize+'充值卡</p>';

    return content;
};

helper.failContent=function(txt,imgSrc){
    var content='<span class="poster"><img src="'+helper.domainName+'/k/active/201510/images/'+imgSrc+'" /></span>';
    content+='<p class="text">'+txt+'</p>';

    return content;
};

helper.noRecordContent=function(imgSrc){
    var content='<span class="poster"><img src="'+helper.domainName+'/k/active/201510/images/'+imgSrc+'" /></span>';
    content+='<h4 class="title-fail">很抱歉</h4>';
    content+='<p class="text">您暂时还没有获奖纪录</p>';

    return content;
};
/*
helper.recordContent=function(total){
    var itemPerPage= helper.itemPerPage,
        content='<ul class="l-record">';

    for (var i= 0,len=Math.max(itemPerPage,total); i<len; i++){
        content+='<li></li>';
    }
    content+='</ul>';
    content+='<div class="pagination"></div>';
    if(total>itemPerPage){
        content+='<ul class="l-page" curPage="1"><li class="window_pageUp">上一页</li><li class="window_pageDown">下一页</li></ul>';
    }
    content+='</div>';

    return content;
};

helper.pageDown=function(curPage,data){
    var total=data.length,
        itemPerPage= helper.itemPerPage,
        chapters=Math.ceil(total/itemPerPage),
        lstContent='';
    if(curPage<chapters){
        for (var i=curPage*itemPerPage,len=(curPage+1)*itemPerPage; i<len; i++){
            if(i>total){
                break;
            }
            lstContent+='<li>'+data[i]+'</li>';

        }
        $('.l-record').html(lstContent);
        curPage++;
        $('.l-record').attr('curPage',curPage);
    }
};

helper.pageUp=function(curPage,data){
    var total=data.length,
        itemPerPage= helper.itemPerPage,
        chapters=Math.ceil(total/itemPerPage),
        lstContent='';
    if(curPage>1){
        for (var i= (curPage-2)*itemPerPage,len=(curPage-1)*itemPerPage;i<len;i++ ){
            lstContent+='<li>'+data[i]+'</li>';
        }
        $('.l-record').html(lstContent);
        curPage--;
        $('.l-record').attr('curPage',curPage);
    }
};
*/


$('.js-spike').click(function(){
    var judge=helper.isLogin();
    if(judge){
        helper.getSpike();
    }
});

$('.js-record').click(function(){
    var judge=helper.isLogin();
    if(judge){
        helper.getRecord();
    }

});

helper.getTime();