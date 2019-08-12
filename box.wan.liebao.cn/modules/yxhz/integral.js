var integral=angular.module('integral',[]);

integral.controller('integral',['$scope',function($scope){
    $scope.tabUrl='tpl/yxhz/fragment/tasks.html';
    $scope.tabs=[
        {title:'我的任务',url:'tpl/yxhz/fragment/tasks.html',isHref:0},
        {title:'积分抽奖',url:'tpl/yxhz/fragment/lottery.html',isHref:0},
        {title:'积分商城',url:'',isHref:'http://my.wan.liebao.cn/'}
    ];
    $scope.switchTab=function(tabUrl){
        $scope.tabUrl=tabUrl;
    };
    $scope.isCurrent=function(tabUrl){
        return tabUrl==$scope.tabUrl;
    };
}]);

integral.controller('sign',['$scope','signed',function($scope,signed){
    signed($scope);
    $scope.toaday = moment().format('YYYY-MM-DD');
    $scope.date = moment(moment().format('YYYY-MM'));
    $scope.dateUI = moment(moment().format('YYYY-MM-DD'));
}]);

integral.controller('tasks',['$scope','tasks','getPrize',function($scope,tasks,getPrize){
    // tasks($scope);
    tasks().then(function(res){
        $scope.tasks=res.data.data.tasks;
    });
    $scope.notifyScore=function(it){
        getPrize(it.id).then(function(res){
            if(res.data.code==1){
                it.userStatus = '2';
                if(window.external){
                    window.external.call('kieframe','notifyupdateinfo','');
                }
            }else{
                alert('领取失败');
            }
        });
    };

}]);

integral.controller('lottery',['$scope','$rootScope','record',function($scope,$rootScope,record){
    $scope.openRule=function(){
        $rootScope.$broadcast('dialog','text',{
            title:'抽奖规则',
            text:[
                '1.每日每个账号获得10次抽奖机会，每次抽奖消耗10积分。',
                '2.每日可通过完成“我的任务”或对游戏进行充值获得积分。',
                '3.活动中获得的积分奖励将于24小时内发送您的中奖账号。',
                '4.手机充值卡或京东E卡奖品将通过短信的形式发送兑换码。',
                '5.获得实物礼品的用户请按"我的奖品"页面提示信息填写正确的联系资料，否则无法联系并派送。',
                '6.快递默认EMS（若选用其他快递，请联系客服修改，邮费自理）',
                '7.客服联系方式：400-610-7777（周一至周五9:00-12:00,13:00-18:00）',
                '奖品兑换须知：联系资料填写完毕后，7个工作日内客服将与您联系确认。',
                '实物奖品将在30个工作日内发放。',
                '*奖励以中奖纪录中信息为准'
            ],
            icon:'dicon-blackboard',
            btn:{
                txt:'确定',
                size:'sm'
            },
            w:450,
            h:456
        });
    };

    $scope.openPrize=function(){
        record($scope,function(s){
            var type='';
            var opt={
                title:'我的奖品',
                icon:'dicon-gift',
                ft:{
                    txt:'*实物奖品在30天内发放'
                },
                w:450,
                h:456
            };
            var content='';

            if(s.count>0){
                type='content';
                content=$scope.generate(s.lucky);
                $.extend(opt,{
                    content:content,
                    btn:{size:'sm',txt:'确定'}
                });
            }else{
                type='tip';
                $.extend(opt,{text:'您还没有实物奖品哦~'});
            }
            $rootScope.$broadcast('dialog',type,opt);
        });
    };

    $scope.generate=function(arr){
        var item='<ul class="l-content-dialog"></ul>';
        for(var i=0;i<arr.length;i++){
            item+='<li class="li-content-dialog"><h4 class="panme-content-dialog">'+arr[i].name+'</h4><p class="time-content-dialog">'+arr[i].day+'</p></li>';
        }
        item+='</ul>';
        return item;
    };
}]);