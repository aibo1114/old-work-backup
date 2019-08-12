var commonUrl = 'https://autogeekapi.cmcm.com',
    id = getUrlParam("id") || "1";
var infocUrl = 'http://helpcmcar1.ksmobile.com/g/v1/',
    infocParams = {
        product_no: 159,
        public_index: 1,

        // public
        login_state:0,
        uuid:0,
        ver:0,
        mcc:0,
        mnc:0,
        cl:"",
        cn:0,
        prodid:0,
        xaid:"",
        uptime:0,
        root2:0,
        capi:0,
        brand2:"",
        model2:"",
        serial2:"",
        cn2:"",
        rom:"",
        rom_ver:"",
        host_ver:0,
        plugin_vers:"",
        built_chnelid:"",
        utc:0
    };
infoc = new Infoc(infocUrl, {
    business_index: 117
});
infoc.addParams(infocParams);

//上报
var report = {
    pv:function () {
        infoc.report({
            topic:id.toString() || "1",
            action: 1
        });
    },
    click:function () {
        infoc.report({
            topic:id.toString() || "1",
            action: 2
        });
    }
};
var getAnswerDetail = {
    init:function () {
        $.ajax({
            url: commonUrl+'/cmauto/jp/get_question',
            data:{'question_id':id},
            dataType: "jsonp",
            type:'POST',
            cache:true,
            contentType:'application/json'
        }).success(function(data) {
            if(data.status=='0'){
				$('title').html(data.data.title);
                var interText = doT.template($("#Y_answer_temp").text());
                $("#J_answer_temp").prepend(interText(data.data));
            }else{
                alert('错误信息'+data.msg);
            }
           
        });
    }
};
var getAnswerList = {
    init:function () {
        $.ajax({
            url: commonUrl+'/cmauto/jp/get_answer_list',
            data:{'question_id':id,'number':'10'},
            dataType: "jsonp",
            type:'POST',
            cache:true,
            contentType:'application/json'
        }).success(function(data) {
            var answer_str='';
            if(data.data.answers.length > 0) {
                var interText = doT.template($("#Y_answerComment_temp").text());
                for(var i = 0;i < data.data.answers.length;i++){
                    data.data.answers[i].publish_time = formatTimeStamp(data.data.answers[i].publish_ts);
                }
                $(".answer_footer").append(interText(data.data.answers));
            }else{
            }
        });
    }
};
$(function () {
   	report.pv();
    getAnswerDetail.init();
    getAnswerList.init();
    $('.download').on('click',function () {
       report.click();
    });
});
//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function formatTimeStamp(time) {
    var oDate = new Date();
    var nowTime = oDate.getTime();
    var oldTime = time * 1000;
    var H = Math.floor((nowTime - oldTime) / 1000 / 60 / 60); // h
    var T = Math.floor((nowTime - oldTime) / 1000 / 60 / 60 / 24); // T
    var m = Math.floor((nowTime - oldTime) / 1000 / 60); // m
    var h = Math.floor((nowTime - oldTime) / 1000 / 60 / 60); // h
    var y = 0;
    if(T >0){
        if (T >= 2) {
            y = parseInt(time, 10) * 1000;
            var t = new Date(y);
            var M = t.getMonth() + 1;
            // if (t.getFullYear() == oDate.getFullYear()) {
            //   return M + '-' + t.getDate();
            // } else {
            return t.getFullYear() + '-' + M + '-' + t.getDate();
            // }
        }
        else if (T < 2) {
            return (T + '天前');
        }
    }
    else if (H > 0) {
        return (H + '小时前');
    } else if (m > 0) {
        return (m + '分钟前');
    } else {
        return ('刚刚');
    }
}