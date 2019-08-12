/**
 * Created by Administrator on 2016/5/28.
 */
var helper={};
var ks_user;
helper.data=ks_user;
helper.userLogin=function () {
    var data=this.data;
    if (!data || data.length == 0){
        $('.yl-host-rank').show();
    }else{
        
        $('.yl-login').show();
        if(ks_user.nickname!=''){
            $('.nickname').html('您好,<span>'+ks_user.nickname+'</span>');
        }else{
            $('.nickname').html('您好,<span>'+ks_user.showname+'</span>');
        }
        
        getCredit();
    }
};
//console.log(typeof ks_user);
var opener={};
var obj;
opener=obj;
//console.log(obj instanceof Array);
//console.log(obj);
//console.log(obj.length);
$('.color-all').html(obj.length);
function getCredit(){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    $.ajax({
        url:'https://j.wan.liebao.cn/game/recent_invoked_by_frontend?v=2&limit=5&callback=recent_play&_=1464406202572&t='+timestamp,
        type:'GET',
        dataType:'jsonp',
        cache:'false',
        crossDomain: true,
        success:function(res){
            //console.log(res);
            if(res.code=='1'){
                $('.integral').html('积分：<span>'+res.credit+'</span>');
                $('.sign').attr('href',res.links.sign.url);
                $('.exchange').attr('href',res.links.exchange.url);
                var html='';
                var rehtml="";
                if(res.data.length!='0'){
                    var reg=new RegExp("20","g")
                    $('.yl-mygame').show();
                    for(var i=0;i<res.data.length;i++){
                        var img=
                    html+='<li><a href="'+res.data[i].play_url+'" target="_black"><img src="'+(res.data[i].icon1).replace(reg,'70')+'" alt=""></a><a href="'+res.data[i].play_url+'" target="_black">'+res.data[i].game_name+'</a></li>'
                    }
                    $('.y-mygame').prepend(html);
                }else{
                    $('.yl-recommondgame').show();

                     for(var i=0;i<gameObj.top_ranking.length;i++){
                    rehtml+='<li><a href="'+gameObj.top_ranking[i].play_url+'" target="_black"><img src="'+gameObj.top_ranking[i].icon1+'" alt=""></a><a href="'+gameObj.top_ranking[i].play_url+'" target="_black">'+gameObj.top_ranking[i].game_name+'</a></li>'
                    }
                    $('.yl-recommondgame').append(rehtml);
                }
                
            }

        }
    });
}
//getCredit();
helper.userLogin();
var gameObj={
    
    "Excellent_game": [
        {
            game_name: "神庙逃亡全新版",
            play_url: "http://xyx.9724.com/zt/run/?f=minis1",
            icon1: "images/2.jpg"
        },
         {
            game_name: "秒大龙得神装",
            play_url: "http://ac.wan.liebao.cn/s/1/1242/3276.html?frm=mini-yxcs-xt",
            icon1: "images/3.png"
        },
         {
            game_name: "《信喵》の传世画卷",
            play_url: "http://games.qq.com/a/20160603/037152.htm#p=1",
            icon1: "images/4.jpg"
        },
         {
            game_name: "《天下》新情缘系统",
            play_url: "http://games.qq.com/a/20160603/034414.htm#p=4",
            icon1: "images/5.jpg"
        }
    ],
    "Excellent_game1": [
         {
            game_name: "植物大战僵尸",
            play_url: "http://xyx.9724.com/zt/zombie2/?f=minis2",
            icon1: "images/6.jpg"
        },
         {
            game_name: "来帮妹子脱!",
            play_url: "http://xyx.9724.com/zt/bbw/?f=minis4",
            icon1: "images/7.jpg"
        },
         {
            game_name: "盘点魔兽迷人女王",
            play_url: "http://games.qq.com/a/20160603/048493.htm",
            icon1: "images/8.jpg"
        },
         {
            game_name: "守望先锋操作集锦",
            play_url: "http://v.17173.com/v_1_1000380/MzQ0MTcyMjM.html?vid=173sy",
            icon1: "images/9.jpg"
        }
    ],
    
    
      "first_info": [
        {            
            url: "http://games.qq.com/a/20160520/029422.htm",
            title: "《暗黑黎明2》内测 战斗宣传片首曝"
        },
        {            
            
             url: "http://games.qq.com/a/20160606/001372.htm#p=1",
            title: "看《魔兽》电影之前你一定要了解的角色"
        },
        {    url: "http://games.qq.com/a/20160504/038173.htm",
            title: "风暴英雄龙族新英雄短片：或为死亡之翼"        
            
        },
        {            
            url: "http://games.qq.com/a/20160520/009369.htm",
            title: "DNF史上十大经典神器 无影剑仅列第八"
        },
        {            
            url: "http://games.qq.com/a/20160509/045910.htm#p=1",
            title: "魔兽第8？本世纪最有影响力的12款游戏"
        },
        {            
            url: "http://news.shouyou.com/news/06062016/160950489.shtml",
            title: "手游《我叫MT3》6月9日登陆苹果商城"
        },
        {            
            url: "http://news.yeyou.com/content/04122016/155625097_1.shtml",
            title: "林允儿代言《武神赵子龙》抢先试玩评测"
        }
    ],
    "second_info": [
        {            
            url: "http://ac.wan.liebao.cn/s/1/1242/3275.html?frm=mini-yxcs-wz",
            title: "一刀升到99级，百倍掉宝概率你试过没有"
        },
        {            
            url: "http://dnf.17173.com/content/04052016/143327453_1.shtml",
            title: "DNF剑魂输出提升方案 教你轻松秒BOSS"
        },
        
        {            
            url: "http://newgame.17173.com/news/04202016/093426766_1.shtml",
            title: "《梦幻西游》无双版动作割草最鲜评测"
        },
        {            
            url: "http://news.yeyou.com/content/06062016/083456965.shtml",
            title: "传奇武侠必备《九阴绝学》暴强系统来袭"
        }
    ],

    "top_ranking": [
        {
            game_name: "武神赵子龙",
            game_name_tiny: "武神赵子龙",
            play_url: "http://ac.wan.liebao.cn/s/1/1242/3274.html?frm=mini-yxcs-rm1",
            icon1: "images/7.png",
            playing: "231056"
        },
        {
            game_name: "传奇霸业",
            game_name_tiny: "传奇霸业",
            play_url: "http://ac.wan.liebao.cn/s/1/1242/3273.html?frm=mini-yxcs-rm2",
            icon1: "images/8.png",
            playing: "189073"
        },
        {
            game_name: "剑雨江湖",
            game_name_tiny: "剑雨江湖",
            play_url: "http://ac.wan.liebao.cn/s/1/1242/3272.html?frm=mini-yxcs-rm3",
            icon1: "images/9.png",
            playing: "132586"
        }
    ]
}
//var obj="";
//console.log(gameObj);
function getinfo(){
    var extHtml="";
    var openHtml="";
    var topHtml="";
    var firstHtml='';
    var sedHtml="";
    
    //精品游戏
    for(var i=0;i<gameObj.Excellent_game.length;i++){
        extHtml+='<li class="">'+
                '<a href="'+gameObj.Excellent_game[i].play_url+'" target="_black" class="img succeed" itemid="2111" title="'+gameObj.Excellent_game[i].game_name+'" type="2" from="0" hidefocus="true" src="'+gameObj.Excellent_game[i].game_name+'" style="background: none;">'+
                '<img src="'+gameObj.Excellent_game[i].icon1+'" />'+
                '<span></span>'+
                '</a>'+
                '<a href="'+gameObj.Excellent_game[i].play_url+'" target="_black" class="title" itemid="2111" title="'+gameObj.Excellent_game[i].game_name+'" type="2" from="0" hidefocus="true">'+gameObj.Excellent_game[i].game_name+'</a>'+
                '</li>'
    }
    $('.Excellent_game').html(extHtml);
   
    //热门排行
    for(var i=0;i<gameObj.top_ranking.length;i++){
        topHtml+='<li>'+
                   '<div class="yl-host-left">'+
                    '<a href="'+gameObj.top_ranking[i].play_url+'" target="_black" hidefocus="true" class="oneLine"><p>0'+(i+1)+'</p></a>'+
                    '<a href="'+gameObj.top_ranking[i].play_url+'" target="_black" hidefocus="true"><img src="'+gameObj.top_ranking[i].icon1+'" alt=""><span></span></a>'+
                    '<div class="clear"></div>'+
                    '</div>'+
                    '<a href="'+gameObj.top_ranking[i].play_url+'" target="_black" hidefocus="true"><div class="yl-host-detail">'+
                    '<h6>'+gameObj.top_ranking[i].game_name+'</h6>'+
                    '<p>'+gameObj.top_ranking[i].playing+'人在玩</p>'+
                    '</div></a>'+
                    '</li>'
    }
    $('.topRank').prepend(topHtml);
    //第一部分
     for(var i=0;i<gameObj.first_info.length;i++){
        var big=i==0?'big':'';
        firstHtml+='<li class="'+big+'">'+
                    '<a href="'+gameObj.first_info[i].url+'" target="_black" class="title" itemid="" title="'+gameObj.first_info[i].title+'" type="" from="" hidefocus="true">'+gameObj.first_info[i].title+'</a>'+
                   '</li>'
    }
    $('.firstHtml').prepend(firstHtml);
    //第二部分
     for(var i=0;i<gameObj.second_info.length;i++){
        var big=i==0?'big':'';
        sedHtml+='<li class="'+big+'">'+
                    '<a href="'+gameObj.second_info[i].url+'" target="_black" class="title" itemid="" title="'+gameObj.second_info[i].title+'" type="" from="" hidefocus="true">'+gameObj.second_info[i].title+'</a>'+
                   '</li>'
    }
    $('.sedHtml').prepend(sedHtml);

    var aaa='';
    for(var i=0;i<gameObj.Excellent_game1.length;i++){
        aaa+='<li class="">'+
                '<a href="'+gameObj.Excellent_game1[i].play_url+'" target="_black" class="img succeed" itemid="2111" title="'+gameObj.Excellent_game1[i].game_name+'" type="2" from="0" hidefocus="true" src="'+gameObj.Excellent_game1[i].game_name+'" style="background: none;">'+
                '<img src="'+gameObj.Excellent_game1[i].icon1+'" />'+
                '<span></span>'+
                '</a>'+
                '<a href="'+gameObj.Excellent_game1[i].play_url+'" target="_black" class="title" itemid="2111" title="'+gameObj.Excellent_game1[i].game_name+'" type="2" from="0" hidefocus="true">'+gameObj.Excellent_game1[i].game_name+'</a>'+
                '</li>'
    }
    $('.Excellent_game1').prepend(aaa);
}
getinfo();


$('#templatenew').on('click',function(e){
   // console.log(e.target);
    //alert(event.srcElement);
})
$('.changeASet').on('click',function(e){
    if(e&&e.preventDefault){
        e.preventDefault();
    }else{
        window.event.returnValue=false;
        return false;
    }
    $(this).parent().parent().parent().toggleClass('disnone');
    
})

function getNewOpen(){
   
   var openHtml="";
    $('.color-all').html(obj.length);
    for(var i=0;i<5;i++){
        openHtml+='<li><span>'+obj[i].openTime+'</span><span class="game_name">'+obj[i].gameName+'</span><a href="'+obj[i].gameUrl+'" target="_blank">'+obj[i].server+'>></a></li>'
    }
    $('.opening').prepend(openHtml);
}
getNewOpen();

$('a').on('click',function(e){
    var infocUrl = 'http://infoc2.duba.net/g/v1/';
    var link=$(this).attr('href');
    var text=$(this).attr('title');
    //console.log($(this).attr('href'));

   __r.report({link:link,text:text});
})
// //上报函数

function reportFun(infocUrl,ver){
    //console.log('12321');
     var infocParams = {
        product_no: 1, // 大分类：毒霸   产品id
        public_index: 5, // 该分类迭代版本，一般我们填最大那个  产品版本

        // public
        uuid: Infoc.getUUID(true),
        tid1: 0,
        tid2: 0,
        tod1: 0,
        tod2: 0,
        type: 0,
        tryno:1,
        iid: 0,
        collect_time: (+new Date()).toString().substr(0, 10),
        lastver: 0,
        svrid: 1,
        wtod2: 1
    };
    //console.log(infocParams);
    infoc = new Infoc(infocUrl, {
        business_index: 4402, // duba_wallpaper_web   需要根据运营点写
        ver:ver
    });
    //console.log(infoc);
    infoc.addParams(infocParams);
    return infoc;
}
window.__r = reportFun('http://infoc2.duba.net/g/v1/',1);


__r.report({link:'',text:''});
