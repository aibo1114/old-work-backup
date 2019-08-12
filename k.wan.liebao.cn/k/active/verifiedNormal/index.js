function Verified (cb){
    var that=this;
    //view
    this.title='实名认证';
    this.rootNode=$('<div id="gbVerified" class="mod-verified-gb"></div>');
    this.mask=$('<div id="gbVerifiedMask" class="mask-verified-gb"></div>');
    this.sucTip=$('<div id="gbVerifiedTip" class="success-verified-gb"></div>');
    this.hd='<div class="hd-verified-gb"><div class="title-verified-gb">'+this.title+'</div></div>';
    this.hd='<div class="hd-verified-gb"><div class="title-verified-gb">'+this.title+'</div><span class="fork-verified-gb">X</span></div>';
    this.tabs='<ul class="tabs-verified-gb"><li id="phoneTab" class="tab-verified-gb current-tab-verified">绑定手机号</li><li id="identTab" class="tab-verified-gb">绑定身份证</li></ul>';
    this.main='<div class="content-verified-gb"></div>';
    this.btn='<button class="btn-verified-gb">提交认证</button>';

    this.cb=cb || function(){};

    this.iptItem=function(id,lb,ph){
        var content='<li class="item-verified-gb"><p class="errtip-verified-gb"></p><label class="label-verified-gb">'+lb+'</label><input id="'+id+'" class="ipt-verified-gb" type="text" placeholder="'+ph+'" /></li>';
        return content;
    };

    this.picCheck=function(){
        var content='<li class="item-verified-gb"><p class="errtip-verified-gb"></p><p class="rightip-verified-gb"></p><label class="label-verified-gb">图片验证</label><input id="code" class="ipt-verified-gb mid-ipt-gb" type="text" placeholder="请输入右侧的图形验证码" /><div class="picode-verified-gb"></div></li>';
        return content;
    };
    this.msgCheck=function(){
        var content='<li class="item-verified-gb"><p class="errtip-verified-gb"></p><label class="label-verified-gb">短信验证码</label><input id="message" class="ipt-verified-gb mid-ipt-gb" type="text" placeholder="请输入收到的验证码" /><a href="javascript:void(0);" class="codebtn-verified-gb">获取验证码</a></li>';
        return content;
    };


    this.phoneContent=function(){
        //var pList=$('<ul class="list-verified-gb"></ul>');
        //pList.append( this.iptItem('mPhone','手机号','请输入手机号') );
        //pList.append( this.picCheck() );
        //pList.append( this.msgCheck() );
        var pTxt='<p class="tip-verified-gb">根据《互联网跟帖评论服务管理规定》对注册用户进行真实身份信息认证，不得向未认证真实身份信息的用户提供跟帖评论服务。</p>';
        var pList='<ul class="list-verified-gb">'+ this.iptItem('mPhone','手机号','请输入手机号') + this.picCheck() + this.msgCheck() + '</ul>';

        this.status='phone';

        return pTxt + pList;
    };
    this.identContent=function(){
        var pTxt='<p class="tip-verified-gb">根据《互联网跟帖评论服务管理规定》对注册用户进行真实身份信息认证，不得向未认证真实身份信息的用户提供跟帖评论服务。</p>';
        var pList='<ul class="list-verified-gb">'+this.iptItem('trueName','真实姓名','请输入真实姓名') + this.iptItem('identity','身份证','请输入15或18位有效身份证号码') +'</ul>';
        this.status='ident';

        return pTxt + pList;
    };
    this.renderUI=function(type){
        typeof type=='number' ? this.rootNode.html( this.hd + this.tabs + this.main + this.btn ) : this.rootNode.html( this.hd + this.main + this.btn );

        this.rootNode.find('.content-verified-gb').html( this.identContent() );
        if(type==1 || type=='phone'){
            this.rootNode.find('.content-verified-gb').html( this.phoneContent() );
            this.getPicCode();
        }
        if(type==2){
            this.rootNode.find('#identTab').addClass('current-tab-verified').siblings('.tab-verified-gb').removeClass('current-tab-verified');
        }
        if( $('#gbVerified')[0]!=undefined ) this.closeVerified();
        // if( $('#gbVerified')[0]!=undefined ) $('#gbVerified').remove();
        // $('body').append( this.rootNode );
        $('body').append( this.mask,this.rootNode );
    };

    //controller
    this.status='';

    this.validName=function(v){
        return /^[\u4E00-\u9FA3]{1,}$/.test(v);
    };
    this.validIdent=function (code) {
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;

        if (!/^\d{17}(\d|x)$/i.test(code)){
            // if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
            tip = "身份证号格式错误";
            pass = false;
        }
        else if(!city[code.substr(0,2)]){
            tip = "地址编码错误";
            pass = false;
        }
        else{
            //18位身份证需要验证最后一位校验位
            if(code.length == 18){
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != code[17]){
                    tip = "校验位错误";
                    pass =false;
                }
            }
        }
        // if(!pass) console.log(tip);
        return pass;
    };
    this.validMobile=function(v){
        return /\d{11}/.test(v);
    };

    this.fieldRight=function(id){
        $('#'+id).removeClass('err-verified-gb').siblings('.errtip-verified-gb').text('');
    };
    this.fieldWrong=function(id,tip){
        $('#'+id).addClass('err-verified-gb').siblings('.errtip-verified-gb').text(tip).siblings('.rightip-verified-gb').text('');
    };
    this.fieldRighTip=function(id,tip){
        $('#'+id).removeClass('err-verified-gb').siblings('.errtip-verified-gb').text('').siblings('.rightip-verified-gb').text(tip);
    };

    this.getPicCode=function(){
        $.ajax({
            url:'http://api.wan.liebao.cn/card/1/api/validimg',
            dataType :'jsonp',
            success:function(res){
                if(res.ret==1){
                    var $img =   $('<img src="'+res.data.url+'" />');
                    that.rootNode.find('.picode-verified-gb').html('').append($img);
                }
            },
            error:function (err) {}
        });
    };
    this.getMsg=function(){
        var m= encodeURI( $('#mPhone').val() ) ,
            c= encodeURI( $('#code').val() ),
            mJ=true,
            cJ=true;

        if( !this.validMobile(m) ){
            this.fieldWrong('mPhone','请输入正确的手机号');
            mJ=false;
        }
        if(!c){
            this.fieldWrong('code','请输入图片验证码');
            cJ=false;
        }
        if( !mJ || !cJ ) return false;

        $.ajax({
            url:'http://api.wan.liebao.cn/card/1/api/mobilebindsms?mobile='+m+'&vercode='+c,
            dataType :'jsonp',
            success:function(res){
                if(res.ret==10006){
                    that.fieldWrong('code','验证码错误');
                }
                if(res.ret==10007){
                    that.fieldWrong('code','无效手机号');
                }
                if(res.ret==1){
                    that.fieldRighTip('code','短信验证码已发送');
                }
            },
            error:function (err) {}
        });
    };
    this.nameBind=function(ident,trueName){
        ident=encodeURI(ident);
        trueName=encodeURI(trueName);
        $.ajax({
            url:'http://i.wan.liebao.cn/user/modify?idcard='+ident+'&truename='+trueName,
            dataType :'jsonp',
            success:function(res){
                if(res.code!=1){
                    alert('提交失败');
                    return false;
                }
                that.successVerified();
            },
            error:function (err) {}
        });
    };
    this.phoneBind=function(m,msg){
        $.ajax({
            url:'http://api.wan.liebao.cn/card/1/api/mobilebind?mobile='+m+'&code='+msg,
            dataType :'jsonp',
            success:function(res){
                if(res.ret!=1){
                    that.fieldWrong('message','短信验证码错误');
                    return false;
                }
                that.successVerified();
            },
            error:function (err) {}
        });
    };
    this.successVerified=function(){
        if( $('#gbVerifiedTip')[0]!=undefined ) $('#gbVerifiedTip').remove();
        this.rootNode.remove();
        this.sucTip.html(this.hd+'<div class="txt-versuc-gb">认证成功</div>');

        if( window.parent.document.getElementById('idCheckIframe')!=undefined ){
            window.parent.document.getElementById('idCheckIframe').style.width ='394px';
            window.parent.document.getElementById('idCheckIframe').style.height ='196px';
        }

        $('body').append(this.sucTip);

        setTimeout(function(){
            that.closeVerified();
            that.cb();
        },2000);
    };
    this.closeVerified=function(){
        this.rootNode.remove();
        this.mask.remove();
        this.sucTip.remove();
    };

    //evts
    this.rootNode.on('click','.tab-verified-gb',function(){
        var h;
        $(this).addClass('current-tab-verified').siblings('.tab-verified-gb').removeClass('current-tab-verified');
        switch ( $(this).attr('id') ) {
            case 'phoneTab':
                that.rootNode.find('.content-verified-gb').html( that.phoneContent() );
                that.getPicCode();
                break;
            case 'identTab':
                that.rootNode.find('.content-verified-gb').html( that.identContent() );
                break;
            default:
                break;
        }
        h=$('.mod-verified-gb ').height()+15;
        if( window.parent.document.getElementById('idCheckIframe')!=undefined ){
            window.parent.document.getElementById('idCheckIframe').style.height = h + 'px';
        }
    });
    this.rootNode.on('click','.fork-verified-gb',function(){
        that.closeVerified();
    });

    this.rootNode.on('blur','.ipt-verified-gb',function(){
        var v=$(this).val(),
            id=$(this).attr('id'),
            errTip='',
            isTrue;
        if(that.status=='ident'){
            switch (id){
                case 'trueName' :
                    isTrue=that.validName(v);
                    errTip='请输入真实姓名（中文名）';
                    break;
                case 'identity' :
                    isTrue=that.validIdent(v);
                    errTip='请输入正确的身份证号';
                    break;
                default:
                    break;
            }
            isTrue ? that.fieldRight(id) : that.fieldWrong(id,errTip);
        }
    });
    this.rootNode.on('focus','.ipt-verified-gb',function(){
        $('.ipt-verified-gb').removeClass('err-verified-gb').siblings('.errtip-verified-gb').text('');
    });
    this.rootNode.on('click','.btn-verified-gb',function(){
        if(that.status=='ident'){
            var trueName=$('#trueName').val(),
                identity=$('#identity').val(),
                nameJ=true,
                idnetJ=true;
            if( !that.validName(trueName) ){
                that.fieldWrong('trueName','请输入真实姓名（中文名）');
                nameJ=false;
            }
            if( !that.validIdent(identity) ){
                that.fieldWrong('identity','请输入正确的身份证号');
                idnetJ=false;
            }
            if (!nameJ || !idnetJ) return false;

            that.nameBind(identity,trueName);
        }
        if(that.status=='phone'){
            var m=$('#mPhone').val(),
                msg=$('#message').val(),
                mJ=true,
                msgJ=true;
            if( !that.validMobile(m) ){
                that.fieldWrong('mPhone','请输入正确的手机号');
                mJ=false;
            }
            if( !msgJ ){
                that.fieldWrong('message','请输入短信验证码');
                msgJ=false;
            }
            if( !mJ || !msgJ ) return false;

            that.phoneBind(m,msg);
        }
    });

    this.rootNode.on('click','.picode-verified-gb',function(){
        that.getPicCode();
    });
    this.rootNode.on('click','.codebtn-verified-gb',function(e){
        e.preventDefault();
        that.getMsg();
    });
}

