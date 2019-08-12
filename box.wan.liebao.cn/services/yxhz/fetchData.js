//in games(sidebar)
app.factory('dictionary',function(){
    var dictionary= {
        //gid ：用来在选中成功时，匹配到allGames的数据源
        //exact :2字；blur:1字；all：单个元素全部匹配 (如果有用户拼错的情况，总能拼对一个吧，就可以了)
        //多音字 或者 发音不准 怎么办
        '1052':{
            blur:'传奇霸业',
            all:'chuan,qi,ba,ye',
            exact:'cqby'
        },
        '1069':{
            blur:'蓝月传奇',
            all:'lan,yue,chuan,qi',
            exact:'lycq'
        },
        '1040':{
            blur:'大天使之剑',
            all:'da,tian,shi,zhi,jian',
            exact:'dtszj'
        },
        '1087':{
            blur:'神仙劫',
            all:'shen,xian,jie',
            exact:'sxj'
        },
        '1077':{
            blur:'盗墓笔记',
            all:'dao,mu,bi,ji',
            exact:'dmbj'
        },
        '1084':{
            blur:'少年群侠传',
            all:'shao,nian,qun,xia,zhuan',
            exact:'snqxz'
        },
        '1091':{
            blur:'天地诸神',
            all:'tian,di,zhu,shen',
            exact:'tdzs'
        },
        '1090':{
            blur:'第一舰队',
            all:'di,yi,jian,dui',
            exact:'dyjd'
        },
        '1089':{
            blur:'烈火封神',
            all:'lie,huo,feng,shen',
            exact:'lhfs'
        },
        '1088':{
            blur:'乾坤战纪',
            all:'qian,kun,zhan,ji',
            exact:'qkzj'
        },
        '1065':{
            blur:'九阴绝学',
            all:'jiu,yin,jue,xue',
            exact:'jyjx'
        },
        '1076':{
            blur:'青云志',
            all:'qing,yun,zhi',
            exact:'qyz'
        },
        '1080':{
            blur:'铁骑冲锋',
            all:'tie,ji,chong,feng',
            exact:'tjcf'
        },
        '1020':{
            blur:'攻城掠地',
            all:'gong,cheng,lue,di',
            exact:'gcld'
        },
        '1064':{
            blur:'剑雨江湖',
            all:'jian,yu,jiang,hu',
            exact:'jyjh'
        },
        '1066':{
            blur:'武神赵子龙',
            all:'wu,shen,zhao,zi,long',
            exact:'wszzl'
        },
        '1060':{
            blur:'战国之怒',
            all:'zhan,guo,zhi,nu',
            exact:'zgzn'
        },
        '1086':{
            blur:'神鬼无双',
            all:'shen,gui,wu,shuang',
            exact:'sgws'
        },
        '501':{
            blur:'猎豹棋牌',
            all:'lie,bao,qi,pai',
            exact:'lbqp'
        },
        '1081':{
            blur:'最佳阵容',
            all:'zui,jia,zhen,rong',
            exact:'zjzr'
        },
        '1083':{
            blur:'君王之路',
            all:'jun,wang,zhi,lu',
            exact:'jwzl'
        },
        '1078':{
            blur:'热血三国3',
            all:'re,xue,san,guo',
            exact:'rxsg3'
        },
        '1075':{
            blur:'雪鹰领主',
            all:'xue,ying,ling,zhu',
            exact:'xylz'
        },
        '1073':{
            blur:'幻城',
            all:'huan,cheng',
            exact:'hc'
        },
        '1074':{
            blur:'龙城',
            all:'long,cheng',
            exact:'lc'
        },
        '1072':{
            blur:'决战武林',
            all:'jue,zhan,wu,lin',
            exact:'jzwl'
        },
        '1071':{
            blur:'唐门六道',
            all:'tang,men,liu,dao',
            exact:'tmld'
        },
        '1062':{
            blur:'轩辕剑',
            all:'xuan,yuan,jian',
            exact:'xyj'
        },
        '1056':{
            blur:'琅琊榜',
            all:'lang,ya,bang',
            exact:'lyb'
        },
        '1058':{
            blur:'诸神黄昏',
            all:'zhu,shen,huang,hun',
            exact:'zshh'
        },
        '1059':{
            blur:'花千骨',
            all:'hua,qian,gu',
            exact:'hqg'
        },
        '1054':{
            blur:'混沌战域',
            all:'hun,dun,zhan,yu',
            exact:'hdzy'
        },
        '1061':{
            blur:'勇者盟约',
            all:'yong,zhe,lian,meng',
            exact:'yzmy'
        },
        '1068':{
            blur:'主宰西游',
            all:'zhu,zai,xi,you',
            exact:'zzxy'
        },
        '1067':{
            blur:'热血江湖传',
            all:'re,xue,jiang,hu,zhuan',
            exact:'rxjhz'
        },
        '1028':{
            blur:'暗黑西游记',
            all:'an,hei,xi,you,ji',
            exact:'ahxyj'
        },
        '1044':{
            blur:'傲世九重天',
            all:'ao,shi,jiu,chong,tian',
            exact:'asjct'
        },
        '1045':{
            blur:'战神诀',
            all:'zhan,shen,jue',
            exact:'zsj'
        },
        '1036':{
            blur:'风云无双',
            all:'feng,yun,wu,shuang',
            exact:'fyws'
        },
        '1021':{
            blur:'女神联盟',
            all:'nv,shen,lian,meng',
            exact:'nslm'
        },
        '1050':{
            blur:'百战天下',
            all:'bai,zhan,tian,xia',
            exact:'bztx'
        },
        '1055':{
            blur:'天将雄师',
            all:'tian,jiang,xiong,shi',
            exact:'tjxs'
        },
        '1023':{
            blur:'武易传奇',
            all:'wu,yi,chuan,qi',
            exact:'wycq'
        },
        '1026':{
            blur:'大闹天宫',
            all:'da,nao,tian,gong',
            exact:'dntg'
        },
        '1030':{
            blur:'三国魂',
            all:'san,guo,hun',
            exact:'sgh'
        },
        '1016':{
            blur:'武尊',
            all:'wu,zun',
            exact:'wz'
        },
        '4':{
            blur:'三国演义',
            all:'san,guo,yan,yi',
            exact:'sgyy'
        },
        '10':{
            blur:'秦美人',
            all:'qin,mei,ren',
            exact:'qmr'
        },
        '1001':{
            blur:'烈火战神',
            all:'lie,huo,zhan,shen',
            exact:'lhzs'
        },
        '1013':{
            blur:'街机三国',
            all:'jie,ji,san,guo',
            exact:'jjsg'
        },
        '1017':{
            blur:'龙纹战域',
            all:'long,wen,zhan,yu',
            exact:'lwzy'
        },
        '1025':{
            blur:'太古遮天',
            all:'tai,gu,zhe,tian',
            exact:'tgzt'
        },
        '1004':{
            blur:'神曲',
            all:'shen,qu',
            exact:'sq'
        },
        '13':{
            blur:'神仙道',
            all:'shen,xian,dao',
            exact:'sxd'
        },
        '3':{
            blur:'凡人修真2',
            all:'fan,ren,xiu,zhen',
            exact:'frxz2'
        },
        '1006':{
            blur:'新梦幻之城',
            all:'xin,meng,huan,zhi,cheng',
            exact:'xmhzc'
        },
        '1005':{
            blur:'侠义水浒传',
            all:'xia,yi,shui,hu,zhuan',
            exact:'xyshz'
        },
        '1082':{
            blur:'五鼠闹东京',
            all:'wu,shu,nao,dong,jing',
            exact:'wsndj'
        },
        '1085':{
            blur:'神泽',
            all:'shen,ze',
            exact:'sz'
        },
        '1051':{
            blur:'热血屠龙',
            all:'re,xue,tu,long',
            exact:'rxtl'
        },
        '1049':{
            blur:'权倾天下',
            all:'quan,qin,tian,xia',
            exact:'qqtx'
        },
        '1092':{
            blur:'西游伏妖篇',
            all:'xi,you,fu,yao,pian',
            exact:'xyfyp'
        },
        '1094':{
            blur:'思美人',
            all:'si,mei,ren',
            exact:'smr'
        },
        '1095':{
            blur:'传奇世界网页版',
            all:'chuan,qi,shi,jie,wang,ye,ban',
            exact:'cqsjwyb'
        },
        '1096':{
            blur:'攻沙',
            all:'gong,sha',
            exact:'gs'
        },
        '1097':{
            blur:'楚乔传',
            all:'chu,qiao,zhuan',
            exact:'cqz'
        },
        '1099':{
            blur:'九天封神',
            all:'jiu,tian,feng,shen',
            exact:'jtfs'
        },
        '1100':{
            blur:'魔域永恒',
            all:'mo,ju,yong,hen',
            exact:'myyh'
        },
        1101:{
            blur:'三生三世十里桃花',
            all:'san,sheng,san,shi,shi,li,tao,hua',
            exact:'ssssslth'
        }
    };
    return dictionary;
});
app.factory('played',['$q',function($q){
    return function(){
        var deferred=$q.defer();
        var p=deferred.promise;
        deferred.resolve(ks_user.played);
        return p;
    };
}]);
app.factory('playHistory',[function(){
    return function(cb){
        // var deferred=$q.defer();
        // var p=deferred.promise;
        // deferred.resolve(ks_user.play_history);
        if(cb) cb();
        return ks_user.play_history;
        // return p;
    };
}]);
app.factory('recommend',['$http','$q',function($http,$q){
    return function(){
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'jsonp',
            url:'http://b.liebao.cn/api/box_game_left.php?callback=JSON_CALLBACK'
        }).then(function(res){
            deferred.resolve(res);
        },function(err){
            deferred.reject();
        });
        return p;
    }
}]);
app.factory('toOpen',['$q','$http',function($q,$http){
    return function(){
        var r=Math.random();
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'jsonp',
            url:'http://api.wan.liebao.cn/game/newestserver?act=expect&limit=20&callback=JSON_CALLBACK'
        }).then(function(res){
            deferred.resolve(res);
            // console.log(res.data.data.servers);
        },function(res){
            deferred.reject();
        });
        return p;
    }
}]);
app.factory('lately',['$q','$http',function($q,$http){
    return function(){
        var r=Math.random();
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'jsonp',
            url:'http://api.wan.liebao.cn/game/newestserver?act=open&limit=20&callback=JSON_CALLBACK'
        }).then(function(res){
            deferred.resolve(res);
            // console.log(res.data.data.servers);
        },function(res){
            deferred.reject();
        });
        return p;
    }
}]);
app.factory('clockList',['$q','$http',function($q,$http){
    return function () {
        var r=Math.random();
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'jsonp',
            url:'http://box.wan.liebao.cn/1/api/alarm?v='+r+'&callback=JSON_CALLBACK'
            // url:'models/yxhz/clock.json?callback=JSON_CALLBACK'
        }).then(function(res){
            deferred.resolve(res);
        },function(res){
            deferred.reject();
        });
        return p;
    }
}]);
app.factory('setSclock',['$q','$http',function($q,$http){
    return function (data) {
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'post',
            url:'http://box.wan.liebao.cn/1/api/alarm',
            data:data
        }).then(function(res){
            deferred.resolve(res);
        },function(res){
            deferred.reject();
        });
        return p;
    }
}]);

//in index
app.factory('pushys',['$http','$q',function($http,$q){
    return function(){
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'jsonp',
            url:'http://b.liebao.cn/api/content.php?callback=JSON_CALLBACK'
            // url:'http://b.liebao.cn/www/99/box_liebao/index.html?callback=JSON_CALLBACK'
            // method:'get',
            // url:'models/yxhz/pushys.json'
        }).then(function(res){
            deferred.resolve(res);
        },function(){
            deferred.reject();
        });

        return p;
    }
}]);
app.factory('getAllGames',['$http','$q',function($http,$q){
    return function(){
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method: 'jsonp',
            url: 'http://b.liebao.cn/api/game_list.php?callback=JSON_CALLBACK'
            // url: 'http://api.wan.liebao.cn/game/list/2?callback=JSON_CALLBACK'
        }).then(function successCallback(response) {
            deferred.resolve(response);
        }, function errorCallback(response) {
            deferred.reject();
        });
        return p;
    };
}]);

//in task
app.factory('signed',['$http',function($http){
    var r=Math.random();
    return function(ctx){
        $http({
            method:'jsonp',
            url:'http://credit.wan.liebao.cn/index.php/api/calendar?v='+r+'&callback=JSON_CALLBACK'
        }).then(function(res){
            ctx.signed=res.data.data;
            ctx.isSigned = function(day,arr){
                for (var i=0;i<arr.length;i++){
                    if(parseInt(arr[i])==day){
                        return true;
                    }
                }
                return false;
            };
        },function(res){});
    }
}]);
app.factory('tasks',['$http','$q',function($http,$q){
    return function(){
        var r=Math.random();
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            // method:'get',
            // url:'models/yxhz/tasks.json'
            method:'jsonp',
            url:'http://credit.wan.liebao.cn/index.php/gameboxtask?v='+r+'&callback=JSON_CALLBACK'
        }).then(function(res){
            // ctx.tasks=res.data;
            deferred.resolve(res);
        },function(res){
            deferred.reject();
        });
        return p;
    }
}]);
app.factory('getPrize',['$http','$q',function($http,$q){
    var r=Math.random();
    return function(tid){
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'jsonp',
            url:'http://credit.wan.liebao.cn/index.php/api/drawDown?&task_id='+tid+'&v='+r+'&callback=JSON_CALLBACK'
        }).then(function(res){
            deferred.resolve(res);
        },function(res){
            deferred.reject();
        });

        return p;
    };

}]);

//in lottery
app.factory('lotterynum',['$http','$q','$rootScope',function($http,$q,$rootScope){
    return function(ctx){
        if (ctx.ing) return;
        var r=Math.random();
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'jsonp',
            url:'http://credit.wan.liebao.cn/index.php/boxprize/myLuckyCount?v='+r+'&callback=JSON_CALLBACK'
        }).then(function(res){
            deferred.resolve(res);
        },function(){
            deferred.reject();
        });
        return p;
    };
}]);
app.factory('drawlots',['$http','$rootScope',function($http,$rootScope){
    return function(ctx){
        var r=Math.random();
        ctx.ing=true;
        $rootScope.hasDialog=true;
        $http({
            method:'jsonp',
            url:'http://credit.wan.liebao.cn/index.php/boxprize/luckyDraw?v='+r+'&callback=JSON_CALLBACK'
            // method:'get',
            // url:'models/yxhz/lottery.json'
        }).then(function(res){
            ctx.prize=res.data;
            if(res.data.code== -42){
                $rootScope.$broadcast('dialog','tip',{
                    title:'提示',
                    text:'抱歉！您的积分不足',
                    icon:'dicon-bell',
                    btn:{
                        txt:'知道了',
                        size:'lg'
                    },
                    w:364,
                    h:204,
                    tipCls:'grey'
                });
                return false;
            }
            if(res.data.code==1){
                ctx.pid=res.data.data.prize_id;
                ctx.pname=res.data.data.prize_name;
                $rootScope.$broadcast('drawed');
                // if(window.external){
                //     window.external.call('kieframe','notifyupdateinfo','');
                // }
            }else{
                $rootScope.$broadcast('dialog','tip',{
                    title:'提示',
                    text:'抱歉！抽奖失败',
                    icon:'dicon-bell',
                    btn:{
                        txt:'知道了',
                        size:'lg'
                    },
                    w:364,
                    h:204,
                    tipCls:'grey'
                });
                window.external.call('kieframe','relogin','');
            }
        },function(res){
            ctx.ing=false;
        });
    }
}]);
app.factory('lucky',['$http','$q',function($http,$q){
    return function(){
        var deferred=$q.defer();
        var p=deferred.promise;
        var r=Math.random();
        $http({
            // method:'jsonp',
            // url:'http://credit.wan.liebao.cn/index.php/boxprize/superStar?callback=JSON_CALLBACK'
            method:'get',
            url:'models/yxhz/lucky.json?v='+r
        }).then(function(res){
            deferred.resolve(res);
        },function(){
            deferred.reject();
        });
        return p;
    }
}]);
app.factory('record',['$http',function($http){
    return function(ctx,cb){
        $http({
            method:'jsonp',
            url:'http://credit.wan.liebao.cn/index.php/boxprize/superStar?callback=JSON_CALLBACK'
        }).then(function(res){
            if(res.data.code==1){
                ctx.lucky=res.data.data.prize;
                ctx.count=res.data.data.count;
                cb(ctx);
            }
        },function(res){});
    }
}]);

//in package
app.factory('gifts',['$q','$http',function($q,$http){
    return function () {
        var r=Math.random();
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'jsonp',
            url:'http://box.wan.liebao.cn/1/api/game?type=2&v='+r+'&callback=JSON_CALLBACK'
            // url:'http://gift.wan.liebao.cn/gift/1/api/get_game?platform_id=3&platform_sub_id=2&callback=JSON_CALLBACK'
        }).then(function(res){
            deferred.resolve(res);
        },function(err){
            deferred.reject();
        });
        return p;
    }
}]);
app.factory('takeGift',['$q','$http',function($q,$http){
    return function (gid) {
        var r=Math.random();
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            url:'http://box.wan.liebao.cn/1/api/gift?v='+r,
            // url:'http://box.wan.liebao.cn/1/api/gift?v='+r,
            method:'post',
            data:{
                type:'2',
                game_id:gid
            }
        }).then(function(res){
            deferred.resolve(res);
        },function(err){
            deferred.reject();
        });
        return p;
    }
}]);
app.factory('gettedGifts',['$q','$http',function($q,$http){
    return function () {
        var r=Math.random();
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            // url:'models/yxhz/gifts.json',
            // method:'get'
            url:'http://box.wan.liebao.cn/1/api/gifts?v='+r+'&callback=JSON_CALLBACK',
            method:'jsonp'
        }).then(function(res){
            deferred.resolve(res);
        },function(err){
            deferred.reject();
        });
        return p;
    }
}]);

//home pick server
app.factory('assorted',['$q','$http',function($q,$http){
    return function(gid){
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            url:'http://api.wan.liebao.cn/game/server/list?gid='+gid+'&callback=JSON_CALLBACK',
            method:'jsonp'
        }).then(function(res){
            // ctx.all=res.data.data;
            deferred.resolve(res);
        },function(){
            deferred.reject();
        });
        return p;
    };
}]);

/*以后或许会重用的废弃（玩过的游戏接口）*/
// app.factory('played',['$http','$q',function($http,$q,limitToFilter,transformPlayedFilter){
//     return function(){
//         var deferred=$q.defer();
//         var p=deferred.promise;
//         $http({
//             method:'get',
//             url:'models/yxhz/playHistory.json'
//         }).then(function(res){
//             deferred.resolve(res);
//         },function(res){
//             deferred.reject();
//         });
//         return p;
//     }
// }]);