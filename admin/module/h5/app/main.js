import './style/main.less';

import app from '../../../app.js';
import navbar from './tpl/navbar.jade';
import container from './tpl/container.jade';

$('body').html( '<div ng-controller="appControl">'+navbar()+container()+'</div>' );

app.config(['$routeProvider', '$sceProvider', '$httpProvider', function($routeProvider, $sceProvider, $httpProvider){
    var errObj = {
        '10001': '游戏已存在',
        '10002': '用户已存在',
        '10003': '用户不存在',
        '10004': '用户被禁用',
        '10013': '用户在启用状态',
        '10006': '密码错误',
        '10007': '未登录',
        '10008': '登录失败',
        '10009': '厂商已存在',
        '10010': '厂商不存在',
        '10011': '厂商在使用中',
        '10012': '游戏已上线',
        '65535': '未知错误'
    };

    $sceProvider.enabled(false);

    $httpProvider.defaults.transformRequest = function(obj){
        var str = [];
        for(var p in obj){
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    };
    $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    $routeProvider
        .when('/plants',{
            template:'<list pstn="$resolve.pstn" errobj="$resolve.errobj" dictionary="$resolve.dictionary" search="$resolve.search" itemperpage="10" title="平台概况"></list>',
            resolve:{
                pstn:function(){
                    return {
                        hst:'http://h5back.kisops.com',
                        r:'/back/analysis/plat',
                        dfp: {
                            page_size: 10,
                            page_index: 1
                        }
                    }
                },
                errobj:function () {
                    return errObj;
                },
                dictionary:function () {
                    return {
                        date :{
                            label:'日期',
                            col:30
                        },
                        register_count: {
                            label:'平台新增数',
                            col:10
                        },
                        login_count: {
                            label:'平台DAU',
                            col:15
                        },
                        old_login_count: {
                            label:'老用户DAU',
                            col:15
                        },
                        pay_amount: {
                            label:'总付费金额',
                            col:15
                        },
                        frm: {
                            label:'渠道来源',
                            col:15
                        }
                    }
                },
                search:function(){
                    return [{
                        code:'begin',
                        label:'开始时间',
                        type:'date',
                        opt:{
                            minView:2,
                            startView:2,
                            format:'yyyy-mm-dd'
                        }
                    },{
                        code:'end',
                        label:'结束时间',
                        type:'date',
                        opt:{
                            minView:2,
                            startView:2,
                            format:'yyyy-mm-dd'
                        }
                    }];
                }
            }
        })
        .when('/regis',{
            template:'<list pstn="$resolve.pstn" errobj="$resolve.errobj" dictionary="$resolve.dictionary" search="$resolve.search" itemperpage="10" title="用户注册" sertrans="$resolve.sertrans"></list>',
            resolve:{
                pstn:function(){
                    return {
                        hst:'http://h5back.kisops.com',
                        r:'/back/analysis/user',
                        dfp: {
                            page_size: 10,
                            page_index: 1
                        }
                    }
                },
                errobj:function () {
                    return errObj;
                },
                dictionary:function () {
                    return {
                        uid :{
                            col: 20,
                            label:'用户id'
                        },
                        username :{
                            col: 20,
                            label: '用户名'
                        },
                        register_time :{
                            col: 20,
                            label: '注册时间'
                        },
                        frm :{
                            col: 20,
                            label: '渠道来源'
                        },
                        mobile :{
                            col: 20,
                            label: '手机号'
                        }
                    };
                },
                search:function(){
                    return [{
                        code: 'username',
                        label: '用户名',
                        type: 'cg-text'
                    },{
                        code: 'mobile',
                        label: '手机号',
                        type: 'mobile'
                    },{
                        code:'begin',
                        label:'开始时间',
                        type:'date',
                        opt:{
                            minView:2,
                            startView:2,
                            format:'yyyy-mm-dd'
                        }
                    },{
                        code:'end',
                        label:'结束时间',
                        type:'date',
                        opt:{
                            minView:2,
                            startView:2,
                            format:'yyyy-mm-dd'
                        }
                    }];
                },
                sertrans:function(){
                    return {
                        username:'uid'
                    };
                }
            }
        })
        .when('/sheets',{
            template:'<list pstn="$resolve.pstn" errobj="$resolve.errobj" dictionary="$resolve.dictionary" search="$resolve.search" itemperpage="10" title="总数据表" sertrans="$resolve.sertrans"></list>',
            resolve:{
                pstn:function(){
                    return {
                        hst:'http://h5back.kisops.com',
                        r:'/back/analysis/game',
                        dfp: {
                            page_size: 10,
                            page_index: 1
                        }
                    }
                },
                errobj:function () {
                    return errObj;
                },
                dictionary:function () {
                    return {
                        game_id: {
                            label: '游戏id',
                            col: 5
                        },
                        game_name: {
                            label: '游戏名称',
                            col: 8
                        },
                        date: {
                            label: '日期',
                            col: 8
                        },
                        register_count: {
                            label: '新增数',
                            col: 5
                        },
                        login_count: {
                            label: 'DAU',
                            col: 7.69
                        },
                        old_login_count: {
                            label: '老用户DAU',
                            col: 7.69
                        },
                        pay_count: {
                            label: '付费人数',
                            col: 5
                        },
                        pay_amount: {
                            label: '付费金额',
                            col: 7.69
                        },
                        pay_rate: {
                            label: '付费率',
                            col: 5
                        },
                        pay_arpu: {
                            label: '付费arpu',
                            col: 7.69
                        },
                        second_day_login: {
                            label: '次日存留',
                            col: 7.69
                        },
                        seventh_day_login: {
                            label: '7日存留',
                            col: 7.69
                        },
                        first_pay_count: {
                            label: '新增付费人数',
                            col: 10
                        },
                        first_pay_amount: {
                            label: '新增付费金额',
                            col: 10
                        }
                    };
                },
                search:function(){
                    return [{
                        code: 'game_id',
                        label: '游戏id',
                        type: 'number'
                    },{
                        code: 'game_name',
                        label: '游戏名称',
                        type: 'cg-text'
                    },{
                        code:'begin',
                        label:'开始时间',
                        type:'date',
                        opt:{
                            minView:2,
                            startView:2,
                            format:'yyyy-mm-dd'
                        }
                    },{
                        code:'end',
                        label:'结束时间',
                        type:'date',
                        opt:{
                            minView:2,
                            startView:2,
                            format:'yyyy-mm-dd'
                        }
                    }]
                },
                sertrans:function(){
                    return {
                        game_name:'game_id'
                    };
                }
            }
        })
        .when('/behaviors',{
            template:'<list pstn="$resolve.pstn" errobj="$resolve.errobj" dictionary="$resolve.dictionary" search="$resolve.search" itemperpage="10" title="用户行为表" sertrans="$resolve.sertrans"></list>',
            resolve:{
                pstn:function(){
                    return {
                        hst:'http://h5back.kisops.com',
                        r:'/back/analysis/user_game',
                        dfp: {
                            page_size: 10,
                            page_index: 1
                        }
                    }
                },
                errobj:function () {
                    return errObj;
                },
                dictionary:function () {
                    return {
                        uid : {
                            label:'用户id',
                            col: 10
                        },
                        game_name : {
                            label:'游戏名',
                            col: 10
                        },
                        server_name : {
                            label:'服务器',
                            col: 10
                        },
                        pay_total : {
                            label:'累计充值金额',
                            col: 10
                        },
                        first_login_time : {
                            label:'首次进入游戏时间',
                            col: 15
                        },
                        mobile : {
                            label:'绑定手机号',
                            col: 10
                        },
                        frm : {
                            label:'渠道来源',
                            col: 10
                        },
                        last_login_time : {
                            label:'最后一次登录时间',
                            col: 15
                        }
                    };
                },
                search:function(){
                    return [{
                        code: 'uid',
                        label: '用户id',
                        type: 'number'
                    },{
                        code: 'game_name',
                        label: '游戏名称',
                        type: 'cg-text'
                    },{
                        code: 'game_id',
                        label: '游戏id',
                        type: 'number'
                    }];
                },
                sertrans:function(){
                    return {
                        game_name: 'game_id'
                    }
                }
            }
        })
        .when('/orders',{
            template:'<list pstn="$resolve.pstn" errobj="$resolve.errobj" dictionary="$resolve.dictionary" search="$resolve.search" itemperpage="10" title="用户行为表" title="充值明细" sertrans="$resolve.sertrans"></list>',
            resolve:{
                pstn:function(){
                    return {
                        hst:'http://h5back.kisops.com',
                        r:'/back/analysis/order',
                        dfp: {
                            page_size: 10,
                            page_index: 1
                        }
                    }
                },
                errobj:function () {
                    return errObj;
                },
                dictionary:function () {
                    return {
                        order_id: {
                            label: '订单id',
                            col: 16
                        },
                        order_time : {
                            label:'下单时间',
                            col:14
                        },
                        game_name: {
                            label:'游戏名称',
                            col:15
                        },
                        server_name: {
                            label:'服务器名称',
                            col:15
                        },
                        uid: {
                            label:'用户id',
                            col:10
                        },
                        pay_amount: {
                            label:'充值金额',
                            col:10
                        },
                        success_time: {
                            label:'充值时间',
                            col:20
                        }
                    };
                },
                search:function(){
                    //充值方式搜索
                    return [{
                        code:'order_id',
                        type:'number',
                        label:'订单id'
                    },{
                        code:'uid',
                        type:'number',
                        label:'用户id'
                    },{
                        code:'game_name',
                        type:'cg-text',
                        label:'游戏名称'
                    },{
                        code:'game_id',
                        type:'number',
                        label:'游戏id'
                    },{
                        code:'payplant',
                        type:'xselect',
                        label:'充值方式',
                        pstn:{
                            hst:'http://h5back.kisops.com',
                            r:'/back/order_plat/get_list',
                            dfp:{
                                page_size:25,
                                page_index:1
                            },
                            opt: {
                                n:['plat_name','plat_sub_name'],
                                v:['plat_id','plat_sub_id']
                            }
                        }
                    },{
                        code:'begin',
                        type:'date',
                        label:'开始时间',
                        timestamp: 1,
                        opt:{
                            minView:0,
                            startView:2,
                            format:'yyyy-mm-dd hh:ii:ss'
                        }
                    },{
                        code:'end',
                        type:'date',
                        label:'结束时间',
                        timestamp: 1,
                        opt:{
                            minView:0,
                            startView:2,
                            format:'yyyy-mm-dd hh:ii:ss'
                        }
                    }];
                },
                sertrans:function(){
                    return {
                        game_name: 'game_id'
                    }
                }
            }
        })
        .when('/cps', {
            template:'<list title="cp列表" pstn="$resolve.pstn" dictionary="$resolve.dictionary" search="$resolve.search" btn="$resolve.btn" itemperpage="10" errobj="$resolve.errobj"></list>',
            resolve: {
                pstn: function(){
                    return {
                        hst:'http://h5back.kisops.com',
                        r:'/back/cp/get_list',
                        d:'/back/cp/delete',
                        detail:'cp',
                        unique:'id',
                        dfp: {
                            page_size: 10,
                            page_index: 1
                        }
                    }
                },
                errobj: function(){
                    return errObj;
                },
                dictionary: function(){
                    return {
                        cp_name: {
                            label:'cp名称',
                            col:20
                        },
                        cp_id: {
                            label: 'cpID',
                            col:10
                        },
                        status: {
                            label: 'cp状态',
                            col:20,
                            escaped: {
                                '1':'合同签署中',
                                '2':'合作中',
                                '3':'合作终止'
                            }
                        },
                        remark: {
                            label: '备注',
                            col:40
                        }
                    }
                },
                search: function(){
                    return [{
                        code: 'cp_name',
                        type: 'text',
                        label: 'cp名称'
                    }]
                },
                btn: function(){
                    return {
                        col:10,
                        item: {
                            edit: {
                                pstn:'cp',
                                icon:'edit',
                                label:'编辑'
                            },
                            delete: {
                                icon:'remove',
                                label:'删除'
                            }
                        },
                        top: {
                            add: {
                                pstn:'cp',
                                icon:'plus',
                                label:'新增cp'
                            }
                        }
                    };
                }
            }
        })
        .when('/cp/:_id?', {
            template: '<item title="cp表单" pstn="$resolve.pstn" controls="$resolve.controls" lstrt="cps" errobj="$resolve.errobj"></item>',
            resolve: {
                pstn:function(){
                    return {
                        hst: 'http://h5back.kisops.com',
                        c: '/back/cp/add',
                        r: '/back/cp/get',
                        u: '/back/cp/update',
                        unique:'id'
                    };
                },
                errobj: function(){
                    return errObj;
                },
                controls:function(){
                    return [{
                        code:'cp_id',
                        type:'number',
                        label:'cpID',
                        required:true
                    },{
                        code:'cp_name',
                        type:'text',
                        label:'cp名称',
                        required:true
                    },{
                        code:'status',
                        type:'radio',
                        label:'状态',
                        required:true,
                        radios: [{
                            n:'合同签署中',
                            v:'1'
                        },{
                            n:'合作中',
                            v:'2'
                        },{
                            n:'合作终止',
                            v:'3'
                        }]
                    },{
                        code:'remark',
                        type:'textarea',
                        label:'备注'
                    }];
                }
            }
        })
        .when('/games', {
            template:'<list title="游戏列表" pstn="$resolve.pstn" dictionary="$resolve.dictionary" search="$resolve.search" btn="$resolve.btn" itemperpage="10" errobj="$resolve.errobj"></list>',
            resolve: {
                pstn: function(){
                    return {
                        hst:'http://h5back.kisops.com',
                        r:'/back/game/get_list',
                        u:'/back/game/up_status',
                        d:'/back/game/delete',
                        detail:'game',
                        unique:'id',
                        dfp: {
                            page_size: 10,
                            page_index: 1
                        }
                    }
                },
                errobj:function(){
                    return errObj;
                },
                dictionary: function(){
                    return {
                        cp_id: {
                            label: 'cpID',
                            col:3
                        },
                        cp_name: {
                            label:'cp名称',
                            col:5
                        },
                        game_id: {
                            label:'游戏id',
                            col:3
                        },
                        game_full_name: {
                            label:'游戏全称',
                            col:10
                        },
                        game_short_name: {
                            label:'游戏简称',
                            col:5
                        },
                        game_online_time: {
                            label:'游戏上线时间',
                            col:6
                        },
                        game_address: {
                            label:'游戏地址',
                            col:9
                        },
                        login_key: {
                            label:'登录key',
                            col:5
                        },
                        pay_key: {
                            label:'支付key',
                            col:5
                        },
                        login_call_back: {
                            label:'登录回调地址',
                            col:9
                        },
                        pay_call_back: {
                            label:'支付回调地址',
                            col:9
                        },
                        game_icon: {
                            label:'游戏图标',
                            col:10
                        },
                        game_tmpl: {
                            label:'游戏模板类型',
                            col:3,
                            escaped: {
                                '1':'缩放',
                                '2':'不缩放'
                            }
                        },
                        game_status: {
                            label: '状态',
                            col:3,
                            escaped: {
                                '1':'上线',
                                '2':'测试',
                                '3':'下线'
                            }
                        },
                        mtime: {
                            label: '操作时间',
                            col:5
                        }
                    }
                },
                search: function(){
                    return [{
                        code: 'game_name',
                        type: 'text',
                        label: '游戏名'
                    },{
                        code: 'cp_name',
                        type: 'text',
                        label: 'cp名称'
                    }]
                },
                btn: function(){
                    // if ($rootScope.roleId!=2) return null;
                    return {
                        col:12,
                        item: {
                            edit: {
                                pstn:'game',
                                icon:'edit',
                                label:'编辑'
                            },
                            up:{
                                icon:'arrow-up',
                                label:'上线',
                                v:'1'
                            },
                            center:{
                                icon:'eye-open',
                                label:'测试',
                                v:'2'
                            },
                            btm:{
                                icon:'arrow-down',
                                label:'下线',
                                v:'3'
                            },
                            delete: {
                                icon:'remove',
                                label:'删除'
                            }
                        },
                        top: {
                            add: {
                                pstn:'game',
                                icon:'plus',
                                label:'新增游戏'
                            }
                        }
                    }
                }
            }
        })
        .when('/game/:_id?', {
            template: '<item title="游戏表单" pstn="$resolve.pstn" controls="$resolve.controls" lstrt="games" errobj="$resolve.errobj"></item>',
            resolve: {
                pstn:function(){
                    return {
                        hst: 'http://h5back.kisops.com',
                        c: '/back/game/add',
                        r: '/back/game/get',
                        u: '/back/game/update',
                        unique: 'id'
                    };
                },
                errobj: function(){
                    return errObj;
                },
                controls:function(){
                    return [{
                        code:'cp_id',
                        type:'number',
                        label:'cpID',
                        required:true
                    },{
                        code:'game_full_name',
                        type:'text',
                        label:'游戏全称',
                        required:true
                    },{
                        code:'game_short_name',
                        type:'text',
                        label:'游戏简称',
                        required:true
                    },{
                        code:'login_key',
                        type:'text',
                        label:'登录key',
                        required:true
                    },{
                        code:'login_call_back',
                        type:'text',
                        label:'登录回调地址',
                        required:true
                    },{
                        code:'pay_key',
                        type:'text',
                        label:'支付key',
                        required:true
                    },{
                        code:'pay_call_back',
                        type:'text',
                        label:'支付回调地址',
                        required:true
                    },{
                        code:'game_tmpl',
                        type:'radio',
                        label:'游戏模板类型',
                        required:true,
                        radios: [{
                            n:'缩放',
                            v:'1'
                        },{
                            n:'不缩放',
                            v:'2'
                        }]
                    },{
                        code:'game_icon',
                        type:'text',
                        label:'游戏图标'
                    }];
                }
            }
        })
        .when('/users',{
            template:'<list title="用户列表" pstn="$resolve.pstn" dictionary="$resolve.dictionary" search="$resolve.search" btn="$resolve.btn" itemperpage="10" errobj="$resolve.errobj"></list>',
            resolve: {
                pstn: function(){
                    return {
                        hst:'http://h5back.kisops.com',
                        r:'/back/admin/get_list',
                        d:'/back/admin/delete',
                        detail:'user',
                        unique:'id',
                        dfp: {
                            page_index: 1,
                            page_size: 10
                        }
                    }
                },
                errobj: function(){
                    return errObj;
                },
                dictionary: function(){
                    return {
                        account: {
                            label:'OA账号',
                            col:30
                        },
                        status: {
                            label: '状态',
                            col:10,
                            escaped: {
                                '0':'禁用',
                                '1':'启用'
                            }
                        },
                        role_id: {
                            label: '身份',
                            col:10,
                            escaped: {
                                '1':'超级管理员',
                                '2':'管理员',
                                '3':'运营',
                                '4':'客服'
                            }
                        },
                        remark: {
                            label: '备注',
                            col:40
                        }
                    }
                },
                search: function(){
                    return [{
                        code: 'account',
                        type: 'email',
                        label: '邮箱'
                    }]
                },
                btn: function(){
                    return {
                        col:10,
                        item: {
                            edit: {
                                pstn:'user',
                                icon:'edit',
                                label:'编辑'
                            },
                            delete: {
                                icon:'remove',
                                label:'删除'
                            }
                        },
                        top: {
                            add: {
                                pstn:'user',
                                icon:'plus',
                                label:'新增用户'
                            }
                        }
                    }
                }
            }
        })
        .when('/user/:_id?',{
            template: '<item title="用户表单" pstn="$resolve.pstn" controls="$resolve.controls" lstrt="users" errobj="$resolve.errobj"></item>',
            resolve: {
                pstn: function(){
                    return {
                        hst: 'http://h5back.kisops.com',
                        c: '/back/admin/add',
                        r: '/back/admin/get',
                        u: '/back/admin/update',
                        unique:'id'
                    };
                },
                errobj: function(){
                    return errObj;
                },
                controls: function(){
                    return [{
                        code:'account',
                        type:'email',
                        label:'OA账号',
                        required:true
                    },{
                        code:'status',
                        type:'radio',
                        label:'状态',
                        radios: [{
                            n:'启用',
                            v:'1'
                        },{
                            n:'禁用',
                            v:'0'
                        }],
                        required:true
                    },{
                        code:'role_id',
                        type:'radio',
                        label:'身份',
                        radios: [{
                            n:'管理员',
                            v:'2'
                        },{
                            n:'运营',
                            v:'3'
                        },{
                            n:'客服',
                            v:'4'
                        }],
                        required:true
                    },{
                        code:'remark',
                        type:'text',
                        label:'备注'
                    }]
                }
            }
        })
        .otherwise('/cps');
}]);


app.controller('appControl',['httpGet','$window','$rootScope',function(httpGet, $window, $rootScope){
    httpGet('http://h5back.kisops.com/back/login/auth',false).then(function(res){
        var u;
        if(res.data.ret != 1) {
            u = $window.decodeURIComponent(res.data.redirecturl);
            $window.location.href= u;
        }

        $rootScope.username=res.data.account+'<span class="caret"></span>';
        $rootScope.roleId=res.data.role_id;
        $rootScope.roleId<=2 ? $rootScope.editRight=true : $rootScope.editRight=false;

    });
}]);

app.controller('menuControl',['$location','$scope',function($location, $scope){
    $scope.cur=cur();
    $scope.$on('$routeChangeSuccess',function(){ $scope.cur=cur(); });

    function cur (){
        console.log($location);
        return $location.path().substring(1);
    }
}]);