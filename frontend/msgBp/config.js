app.config(['$routeProvider','$sceProvider','$httpProvider',function($routeProvider,$sceProvider,$httpProvider){
    $sceProvider.enabled(false);
    //request payload 转 form data [post]
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
        .when('/tpls',{
            template:'<list pstn="$resolve.pstn" dictionary="$resolve.dictionary" entities="$resolve.entities" btns="$resolve.btns" title="模板列表"></list>',
            resolve:{
                pstn:function(){
                    return {
                        unique:'id',
                        hst:'http://back.news.wan.liebao.cn',
                        r:'/message/back/api/content/get_list',
                        d:'/message/back/api/content/delete',
                        rp:{
                            plat_id:1,
                            plat_sub_id:1,
                            page_size:10,
                            page_index:1
                        }
                    };
                },
                dictionary:function(){
                    return {
                        id:{
                            label:'模板ID',
                            col:1
                            //col 单格在表格中占的比例（共十份）
                        },
                        //这个content是固定的，要被放到tpl中
                        content:{
                            label:'模板内容',
                            col:6
                        },
                        type:{
                            label:'类型',
                            col:1,
                            escaped:{
                                '1':'系统消息',
                                '2':'活动消息'
                            }
                        }
                    }
                },
                entities:['crossGet',function(crossGet){
                    return crossGet('http://back.news.wan.liebao.cn','/message/back/api/content/get_list',{
                        plat_id:1,
                        plat_sub_id:1,
                        page_size:10,
                        page_index:1
                    }).then(function(res){
                        return res.data.data;
                    });
                }],
                btns:function(){
                    return {
                        col:2,
                        btn:{
                            edit:{
                                pstn:'tpl',
                                icon:'edit'
                            },
                            delete:{
                                icon:'remove'
                            }
                        }
                    }
                }
            }
        })
        .when('/tpl/:_id?',{
            template:'<item pstn="$resolve.pstn" controls="$resolve.controls" extparm="$resolve.extparm" listrt="$resolve.listrt" title="模板"></item>',
            resolve:{
                pstn:function(){
                    return {
                        unique:'id',
                        hst:'http://back.news.wan.liebao.cn',
                        c:'/message/back/api/content/add',
                        r:'/message/back/api/content/get_by_id',
                        u:'/message/back/api/content/update'
                    };
                },
                controls:function(){
                    return [{
                        code:'content',
                        type:'textarea',
                        label:'模板内容',
                        required:true
                    }, {
                        code:'type',
                        type:'select',
                        label:'消息类型',
                        required:true,
                        nonsense:'选择消息类型',
                        refer_n:'n',
                        refer_v:'v',
                        option:[{
                            v:1,
                            n:'系统消息'
                        },{
                            v:2,
                            n:'活动消息'
                        }]
                    }]
                },
                extparm:function(){
                    return {
                        plat_id:1,
                        plat_sub_id:1
                    }
                },
                listrt:function(){
                    return 'tpls';
                }
            }
        })
        .when('/msgs',{
            template:'<list pstn="$resolve.pstn" dictionary="$resolve.dictionary" search="$resolve.search" title="消息列表"></list>',
            resolve:{
                pstn:function(){
                    return {
                        unique:'id',
                        hst:'http://back.news.wan.liebao.cn',
                        r:'/message/back/api/message/get_list',
                        rp:{
                            plat_id:1,
                            plat_sub_id:1,
                            page_size:10,
                            page_index:1
                        }
                    };
                },
                dictionary:function(){
                    return {
                        message_id:{
                            label:'消息ID',
                            col:1
                            //col 单格在表格中占的比例（共十份）
                        },
                        uid:{
                            label:'用户UID',
                            col:1
                            //col 单格在表格中占的比例（共十份）
                        },
                        content:{
                            label:'消息内容',
                            col:3
                            //col 单格在表格中占的比例（共十份）
                        },
                        type:{
                            label:'消息类型',
                            col:1,
                            //col 单格在表格中占的比例（共十份）
                            escaped:{
                                '1':'系统消息',
                                '2':'活动消息'
                            }
                        },
                        ctime_str:{
                            label:'发送时间',
                            col:1
                            //col 单格在表格中占的比例（共十份）
                        },
                        nohave1:{
                            label:'发送状态',
                            col:1
                            //col 单格在表格中占的比例（共十份）
                        },
                        is_read:{
                            label:'已读状态',
                            col:1,
                            //col 单格在表格中占的比例（共十份）
                            escaped:{
                                '0':'未读',
                                '1':'已读'
                            }
                        },
                        nohave2:{
                            label:'操作人',
                            col:1
                            //col 单格在表格中占的比例（共十份）
                        }
                    }
                },
                search:function(){
                    return [{
                        code:'uid',
                        type:'text',
                        required:true,
                        label:'请输入用户ID'
                    },{
                        code:'message_type',
                        type:'select',
                        label:'消息类型',
                        required:false,
                        nonsense:'选择消息类型',
                        option:[{
                            v:1,
                            n:'系统消息'
                        },{
                            v:2,
                            n:'活动消息'
                        }]
                    },{
                        code:'begin',
                        type:'date',
                        label:'开始时间',
                        required:false,
                        opt:{
                            minView:0,
                            startView:2
                        }
                    },{
                        code:'end',
                        type:'date',
                        label:'结束时间',
                        required:false,
                        opt:{
                            minView:0,
                            startView:2
                        }
                    }]
                }
            }
        })
        .when('/msg',{
            template:'<item pstn="$resolve.pstn" controls="$resolve.controls" extparm="$resolve.extparm" title="发送消息"></item>',
            resolve:{
                pstn:function(){
                    return {
                        unique:'id',
                        hst:'http://back.news.wan.liebao.cn',
                        c:'/message/back/api/pub/add'
                    };
                },
                controls:['crossGet',function(crossGet){
                    return crossGet('http://back.news.wan.liebao.cn','/message/back/api/group/get_list',{
                        page_size:100,
                        page_index:1
                    }).then(function(res){
                        var grps=res.data.data;
                        var tpls;

                        return crossGet('http://back.news.wan.liebao.cn','/message/back/api/content/get_list',{
                            plat_id:1,
                            plat_sub_id:1,
                            page_size:100,
                            page_index:1
                        }).then(function(res){
                            tpls=res.data.data;
                            //console.log(tpls);
                            return [{
                                code:'users',
                                type:'select',
                                label:'选择用户组',
                                required:true,
                                nonsense:'选择用户组',
                                refer_n:'group_name',
                                refer_v:'group_name',
                                //refer_v:'id',
                                option:grps
                            },{
                                code:'content_id',
                                type:'select',
                                label:'选择模板',
                                required:true,
                                nonsense:'选择模板',
                                refer_n:'content',
                                refer_v:'id',
                                option:tpls
                            },{
                                code:'pub_type',
                                type:'radio',
                                label:'发送时间',
                                require:true,
                                radios:[{
                                    n:'立即发送',
                                    v:'1'
                                },{
                                    n:'定时发送',
                                    v:'2',
                                    controls: [{
                                        code:'pub_time',
                                        type:'date',
                                        label:'定时时间',
                                        require:true,
                                        opt:{
                                            minView:0,
                                            startView:2
                                        }
                                    }]
                                }]
                            }];
                        })
                    });
                }],
                extparm:function(){
                    return {
                        pub_time:0
                    }
                }
            }
        })
        .when('/groups',{
            template:'<list pstn="$resolve.pstn" dictionary="$resolve.dictionary" entities="$resolve.entities" btns="$resolve.btns" title="用户组列表"></list>',
            resolve:{
                pstn:function(){
                    return {
                        unique:'id',
                        hst:'http://back.news.wan.liebao.cn',
                        r:'/message/back/api/group/get_list',
                        d:'/message/back/api/group/delete',
                        rp:{
                            page_size:10,
                            page_index:1
                        }
                    };
                },
                dictionary:function(){
                    return {
                        id:{
                            label:'用户组ID',
                            col:1
                            //col 单格在表格中占的比例（共十份）
                        },
                        //这个content是固定的，要被放到tpl中
                        group_name:{
                            label:'组名称',
                            col:2
                        },
                        remark:{
                            label:'备注',
                            col:3
                        },
                        ctime:{
                            label:'创建时间',
                            col:2
                        }
                    }
                },
                entities:['crossGet',function(crossGet){
                    return crossGet('http://back.news.wan.liebao.cn','/message/back/api/group/get_list',{
                        page_size:10,
                        page_index:1
                    }).then(function(res){
                        return res.data.data;
                    });
                }],
                btns:function(){
                    return {
                        col:2,
                        btn:{
                            edit:{
                                pstn:'group',
                                icon:'edit'
                            },
                            delete:{
                                icon:'remove'
                            }
                        }
                    }
                }
            }
        })
        .when('/group/:_id?',{
            template:'<item pstn="$resolve.pstn" controls="$resolve.controls" extparm="$resolve.extparm" listrt="$resolve.listrt" title="用户组" uglyfield="$resolve.uglyfield", uglyurl="$resolve.uglyurl"></item>',
            //template:'<item pstn="$resolve.pstn" controls="$resolve.controls" extparm="$resolve.extparm" listrt="$resolve.listrt" title="用户组" exdata="$resolve.exdata"></item>',
            resolve:{
                pstn:function(){
                    return {
                        unique:'id',
                        hst:'http://back.news.wan.liebao.cn',
                        c:'/message/back/api/group/add',
                        r:'/message/back/api/group/get_by_id',
                        u:'/message/back/api/group/update'
                    };
                },
                controls:['crossGet',function(crossGet){
                    //更多数据接口,就引q库
                    return crossGet('http://b.liebao.cn/api/game_list.php').then(function(res){
                        for (i in res.data.data.games){
                            res.data.data.games[i].gid=res.data.data.games[i].gid.toString();
                        }
                        return [{
                            code:'group_name',
                            type:'text',
                            required:true,
                            label:'用户组名称'
                        },{
                            type:'exCheckbox',
                            label:'用户条件',
                            code:'url_address',
                            // required:true,
                            items:[{
                                label:'按消费',
                                checked:false,
                                id:'consume',
                                controls:[{
                                    code:'money_condition',
                                    type:'select',
                                    nonsense:'选择金额区间',
                                    refer_n:'n',
                                    refer_v:'v',
                                    option:[{
                                        v:'1',
                                        n:'充值大于'
                                    },{
                                        v:'2',
                                        n:'充值小于'
                                    },{
                                        v:'3',
                                        n:'充值等于'
                                    }]
                                },{
                                    code:'money',
                                    type:'number',
                                    unit:'元'
                                }]
                            },{
                                label:'按游戏',
                                id:'games',
                                checked:false,
                                controls:[{
                                    code:'game',
                                    type:'select',
                                    nonsense:'选择游戏',
                                    refer_n:'gname',
                                    refer_v:'gid',
                                    option:res.data.data.games
                                }]
                            }]
                        },{
                            code:'remark',
                            type:'textarea',
                            label:'备注',
                            required:true
                        }]
                    });

                }],
                listrt:function(){
                    return 'groups';
                },
                uglyfield:function(){
                    return 'url_address';
                },
                uglyurl:function(){
                    return 'http://news.wan.liebao.cn/message/specific/user/game_money';
                }

            }
        })
        .otherwise('/msgs');
}]);