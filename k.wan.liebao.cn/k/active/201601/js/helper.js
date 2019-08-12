helper={};

helper.saveData=function(arr){
    localStorage.setItem('command',arr[0]);
    localStorage.setItem('content',arr[1]);
};

helper.router=function(){
    var command=parseInt( localStorage.getItem('command') );
    var content=JSON.parse(localStorage.getItem('content'));

    switch(command){
        //initial
        case 210://剩余次数
            helper._score4play? router.times4play(content) : router.getTimes(content);
            break;
        case 211://累计积分
            router.getScore(content);
            break;
        case 212://奖品列表
            router.getPrizeLst(content);
            break;
        //action
        case 220://新游戏积分
            router.addScore(content);
            break;
        case 221://兑换奖品
            router.exchangePrize(content);
            break;
        case 222://中奖纪录
            router.getPrizeHistory(content);
            break;
        default:
            break;
    }
};

helper.generateDom=function(){
    $('[the-id=exchangeBtn]').click(function(){
        var prizeId=parseInt($(this).attr('pid'));
        console.log(prizeId);
        ws.doSend(connection,{
            command:221,
            content:JSON.stringify({
                PrizeID:prizeId
            })
        });
    });
};


router={};

router.getTimes=function(data){
    if(data.Ret==1){
        $('#times').text(data.Times);
    }
};
router.times4play=function(data){
    var times=data.Times;
    if(times==0){
        new Window().alert({
            y:100,
            title:'CM系统消息',
            content:'您的游戏次数不足'
        });
        return;
    }else{
        $('.js-btn-play').hide();
        $('.mask-phone').hide();
    }
};

router.getScore=function(data){
    if(data.Ret==1){
        $('#score').text(data.Score);
    }
};


router.getPrizeLst=function(data){
    console.log(data);
    var ret=data.Ret;
    var lst=data.Data;
    if(lst){
        var str='<ul class="l-prize">';
        for (var i= 0,len=lst.length;i<len;i++){
            str+='<li class="li-prize">';
            str+='<span class="poster-li-prize"><img src='+lst[i].IconAddres+' /></span>';
            str+='<h4 class="name-li-prize">'+lst[i].PrizeName+'</h4>';
            str+='<p class="score-li-prize">兑换积分：'+lst[i].Score+'</p>';
            str+='<a the-id="exchangeBtn" pid="'+lst[i].ID+'" class="btn-li-prize" href="javascript:void(0);">立即领取</a>';
            str+='</li>';
        }
        str+='</ul>';
        $('#prizeBox').html(str);
        helper.generateDom();
    }
};

router.addScore=function(data){
    console.log(data);
    var ret=data.Ret;
    var msg=data.Msg;
    var score=parseInt($('#score').text());
    var times=parseInt($('#times').text());
    times--;
    console.log(__score);
    $('#times').text(times);
    if(ret>=0){
        score=score+__score;
        $('#score').text(score);
    }
    if(ret<0){
        new Window().alert({
            y:100,
            title:'CM系统消息',
            content:msg
        });
    }
};

router.exchangePrize=function(data){
    console.log(data);
    var msg=data.Msg;
    new Window().alert({
        y:100,
        title:'CM系统消息',
        content:msg
    });
};

router.getPrizeHistory=function(data){
    console.log(data);
    var ret=data.Ret;
    var lst=data.Data;

    if(ret==1){
        if(!lst){
            new Window().alert({
                y:100,
                title:'CM系统消息',
                content:'您还没有获奖纪录哦，赶紧兑换吧'
            });
            return;
        }
        var str='<div class="box-record"><ul class="l-record">';
        for(var i= 0,len=lst.length;i<len;i++){
            str+='<li class="li-record">';
            str+='<span class="poster"><img src='+lst[i].IconAddres+' /></span>';
            str+='<h4 class="title">'+lst[i].PrizeName+'*'+lst[i].Count+'</h4>';
            //str+='<p class="score">兑换积分：'+lst[i].Score+'</p>';
            str+='</li>';
        }
        str+='</ul></div>';
        new Window().alert({
            y:100,
            title:'您的获奖记录',
            content:str,
            height:'auto'
        });
    }
};
