$.fn.switchStatus = function(cls) {
    var st_map = ['st_err', 'st_ready'];

    $(this).removeClass('st_err')
        .removeClass('st_ready');

    if (cls === st_map[0] || cls === st_map[1]) $(this).addClass(cls);
    return $(this);
};

var App = (function() {
    var idCardTest = function(idcard) {
        var area = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"xinjiang",71:"台湾",81:"香港",82:"澳门",91:"国外"};
        var idcard,Y,JYM; 
        var S,M; 
        var idcard_array = [];
        idcard_array = idcard.split(""); 
        if (area[parseInt(idcard.substr(0,2))] === null) return 4; 
        switch (idcard.length){
            case 15: 
                if ((parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){ 
                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
                } else {
                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
                } 
                if (ereg.test(idcard)) 
                    return 0; 
                else
                    return 2;
                break;
            case 18:
                if(parseInt(idcard.substr(6,4)) % 4 == 0 || ( parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){
                    ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
                } else { 
                    ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式 
                }
                if(ereg.test(idcard)){ 
                    S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3 ; 
                    Y = S % 11;
                    M = "F";
                    JYM = "10X98765432";
                    M = JYM.substr(Y,1);
                    if (M === idcard_array[17]) 
                        return 0;
                    else
                        return 3;
                } else {
                    return 2;
                }
                break;
            default:
                return 1;
                break;
        }
    };
    
    var MSG = {
        'tname': {
            'tip'       : '请填写您的真实姓名，以保护您的用户权益',
            'success'   : '姓名格式正确',
            'err' : {
                'len'   : '姓名不能为空',
                'ch'    : '姓名只能为中文'
            }
        },
        'idcard': {
            'tip'       : '输入身份证号',
            'success'   : '身份证格式正确',
            'err' : {
                0       : '身份证格式正确',
                1       : '身份证号码位数不对',
                2       : '身份证号码出生日期超出范围或含有非法字符',
                3       : '身份证号码校验错误',
                4       : '身份证地区非法'
            }
        }
    };

    var BlurEvent = {
        tname: function() {
            var $target = $('#tname');
            var $notice = $('#tname_msg');
            
            var tname = $target.val();
            
            // length dely
            if (tname.length === 0) {
                $target.switchStatus('st_err');
                $notice.switchStatus('st_err').html(MSG['tname']['err']['len']);
                return;
            }
            
            // ch dely
            var reg = /^[\u4e00-\u9fa5]+$/i;
            if (!reg.test(tname)) {
                $target.switchStatus('st_err');
                $notice.switchStatus('st_err').html(MSG['tname']['err']['ch']);
                return;
            }

            $target.switchStatus('st_ready');
            $notice.switchStatus('st_ready').html(MSG['tname']['success']);
            return;
        },
        idcard: function() {
            var $target = $('#idcard');
            var $notice = $('#idcard_msg');
            
            var idcard = $target.val();
        
            var ret = idCardTest(idcard);
            if (ret !== 0) {
                $target.switchStatus('st_err');
                $notice.switchStatus('st_err').html(MSG['idcard']['err'][ret]);
                return;
            }

            $target.switchStatus('st_ready');
            $notice.switchStatus('st_ready').html(MSG['idcard']['success']);
            return;
        }
    };

    var initPageData = function() {
        for (var key in MSG) {
            if ($('#' + key).length !== 0) {
                $('#' + key + '_msg').html(MSG[key]['tip']);
            }
        }
    };

    var initBtn = function() {
        $('#fcminfo_btn').on('click', function() {
            var $this = $(this);

            if ($this.hasClass('disable')) return;

            $this.addClass('disable');

            // all check
            $('input').each(function(index) {
                if (!$(this).hasClass('st_ready')) {
                    $(this).blur();
                }
            });

            if ($('.st_err').length > 0) {
                $this.removeClass('disable');
                return;
            }

            var tname = $('#tname').val();
            var idcard = $('#idcard').val();

            var data = {};
            if (tname !== undefined && tname !== '') {
                data['truename'] = tname;
            }
            if (idcard !== undefined && idcard !== '') {
                data['idcard'] = idcard;
            }
            var url = '/user/modify';
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function(json) {
                    if (json.code === 1) {
                            $('#tname').parent().html(data['truename']);
                            $('#idcard').parent().html(data['idcard']);
                            $('#tname_msg').removeClass('st_ready').html('');
                            $('#idcard_msg').removeClass('st_ready').html('');
                            $('#fcminfo_btn').removeClass('disable').addClass('btn_hide');
                    }
                }
            });
        });
    };

    var initBlurEvent = function() {
        for (var key in BlurEvent) {
            $('#' + key).on('blur', BlurEvent[key]);
        }
    };

    return {
        init: function() {
            initPageData();
        },
        initInter: function() {
            initBtn();
            initBlurEvent();
        }
    };
}());

$(document).ready(function() {
    App.init();
});

$(window).load(function() {
    App.initInter();
});