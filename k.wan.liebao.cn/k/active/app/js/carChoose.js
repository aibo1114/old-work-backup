/**
 * Created by yuli on 2016/12/20.
 */
 var commonUrl = 'http://autogeekapi.cmcm.com';
var cars = {
    data:[
        ["特斯拉",
            [["Model S 60"], ["Model S 60D"], ["Model S 75"], ["Model S 75D"], ["Model S 90D"], ["Model S P90D"], ["Model S P100D"], ["Model X 75D"], ["Model X 90D"], ["Model X P90D"], ["Model X P100D"]]
        ],
        ["比亚迪",
            [["e5"], ["e6"], ["秦 EV300"], ["秦 混动"], ["元 混动"], ["唐 混动"]]
        ],
        ["宝马",
            [["i3"], ["i3 混动"], ["i8 混动"], ["530Le 混动"], ["740Le 混动"], ["740Le xDrive 混动"], ["x5  xDrive40e 混动"]]
        ],
        ["大众",
            [["electric up"], ["高尔夫 GTE 混动"]]
        ],
        ["北汽新能源",
            [["EV160"], ["EU260"], ["EX200"], ["EV200"], ["ES210"]]
        ],
        ["长安",
            [["逸动EV"]]
        ],
        ["雪佛兰",
            [["赛欧SPRINGO"]]
        ],
        ["江淮",
            [["iEV4"], ["iEV5"], ["iEV6S"]]
        ],
        ["荣威",
            [["e50"], ["e550 混动"], ["e950 混动"], ["750HYBRID 混动"]]
        ],
        ["众泰",
            [["芝麻E30"], ["E200"], ["云100"]]
        ],
        ["康迪",
            [["K10B"], ["K11B"]]
        ],
        ["沃尔沃",
            [["S60L 混动"], ["XC90 T8 混动"]]
        ],
        ["奔驰",
            [["C350 eL 混动"], ["GLE 500e 4MATIC 混动"], ["S500 eL 混动"], ["E400 L 混动"]]
        ],
        ["奇瑞",
            [["eQ"], ["艾瑞泽7e 混动"]]
        ],
        ["吉利",
            [["帝豪EV"]]
        ],
        ["奥迪",
            [["A3 Sportback e-tron 混动"]]
        ],
        ["东风风神",
            [["E30"]]
        ],
        ["腾势",
            [["腾势"]]
        ],
        ["保时捷",
            [["Cayenne S E-Hybrid 混动"], ["Panamera S E-Hybrid  混动"]]
        ],
        ["广汽传祺",
            [["GA5 PHEV 混动"]]
        ],
        ["海马",
            [["普力马"]]
        ],
        ["华泰",
            [["iEV230"], ["XEV260"]]
        ],
        ["力帆",
            [["330EV"], ["620EV"]]
        ],
        ["知豆",
            [["D1"], ["D2"]]
        ],
        ["Smart",
            [["fortwo"]]
        ],
        ["启辰",
            [["晨风"]]
        ],
        ["起亚",
            [["K5 hybrid 混动"]]
        ],
        ["现代",
            [["索纳塔九 hybrid 混动"]]
        ],
        ["野马",
            [["T70"]]
        ]
    ],
    init:function () {
        var that = this,
            liWidth = 150,
            width = 0;

        var interText = doT.template($("#J_temp").text());
        $("body").append(interText(that.data));
        var length = $('.section').length;
        for(var i = 0;i<length;i++){
            var x = that.data[i][1].length;
            $('.section'+i+' ul').css('width',liWidth*x);
            var myScroll = new IScroll('.section'+i,{
                eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false,tap:true
            });
        }
        $('.section li').on('tap',function () {
            $('.section li').removeClass('selected');
            $(this).addClass('selected');
            var obj = {
                carFirm:$(this).attr('data-x') || '',
                carType:$(this).attr('data-y') || ''
            };
            var str = JSON.stringify(obj);
            try{
                jsInterface.setCarLists(str);
            }catch(e){
                console.log(e);
            }
        })
    }
};

$(function () {
    cars.init();
});

// var cars={
//     getCar:function(){
//         $.ajax({
//             url: commonUrl+'/cmauto/car_type/1/api/brand',
//             data:'',
//             dataType: "jsonp",
//             type:'GET',
//             cache:true,
//             contentType:'application/json'
//         }).success(function(data) {
//             if(data.data) {
//                 var str='';
//                 for(var i=0;i<data.data.length;i++){
//                     str+='<div class="sort_list" masterId="'+data.data[i].masterId+'">'+
//                          '<a href="https://autogeekcms.cmcm.com/web/carChoose/carSeries.html?masterId='+data.data[i].masterId+'">'+
//                          '<div class="num_logo">'+
//                          '<img src="'+data.data[i].logoUrl+'" alt="">'+
//                          '</div>'+
//                          '<div class="num_name">'+data.data[i].name+'</div>'+
//                          '</a>'+
//                          '</div>'
//                 }
//                 $('.sort_box').prepend(str);
//                 sort.sortDel();
//             }
//         });
//     },
//     getCarSeries:function(){
//         var masterId=getUrlParam('masterId')||'1';
//        $.ajax({
//             url: commonUrl+'/cmauto/car_type/1/api/series',
//             data:{'masterId':masterId},
//             dataType: "jsonp",
//             type:'GET',
//             cache:true,
//             contentType:'application/json'
//         }).success(function(data) {
//             if(data.data) {
//                 var str='';
//                 var str2='';
//                 for(var i=0;i<data.data.length;i++){
//                     for(var j=0;j<data.data[i].serialList.length;j++){
//                         str+='<div class="sort_list sort_seriers">'+
//                              '<a href="https://autogeekcms.cmcm.com/web/carChoose/CarList.html?serialId='+data.data[i].serialList[j].serialId+'">'+
//                              '<div class="num_logo num_seriers">'+
//                              '<img src="'+data.data[i].serialList[j].Picture+'" alt="">'+
//                              '</div>'
//                         if(data.data[i].serialList[j].saleStatus=='0'){
//                             str+='<div class="num_name num_lineheight"><p>'+data.data[i].serialList[j].serialName+'</p><span>未上市</span></div>';
//                         }else if(data.data[i].serialList[j].saleStatus=='-1'){
//                             str+='<div class="num_name num_lineheight"><p>'+data.data[i].serialList[j].serialName+'</p><span>停销</span></div>';
//                         }else{
//                             str+='<div class="num_name "><p>'+data.data[i].serialList[j].serialName+'</p></div>';
//                         }
                        
//                         str+=
//                              '</a>'+
//                              '</div>'
//                     }
//                     str2='<div class="sort_letter">'+data.data[i].brandName+'</div>'+str;
//                     $('.sort_box').append(str2);
//                 }
//             }
//         }); 
//     },
//      getCarList:function(){
//         var serialId=getUrlParam('serialId');
//        $.ajax({
//             url: commonUrl+'/cmauto/car_type/1/api/group',
//             data:{'serialId':serialId},
//             dataType: "jsonp",
//             type:'GET',
//             cache:true,
//             contentType:'application/json'
//         }).success(function(data) {
//             if(data.data) {
//                 var str='';
//                 var str2='';
//                 for(var i=0;i<data.data.length;i++){
//                     for(var j=0;j<data.data[i].serialList.length;j++){
//                         str+='<div class="sort_list sort_seriers">'+
//                              '<a href="https://autogeekcms.cmcm.com/web/carChoose/CarList.html?serialId='+data.data[i].serialList[j].serialId+'">'+
//                              '<div class="num_logo num_seriers">'+
//                              '<img src="'+data.data[i].serialList[j].Picture+'" alt="">'+
//                              '</div>'
//                         if(data.data[i].serialList[j].saleStatus=='0'){
//                             str+='<div class="num_name num_lineheight"><p>'+data.data[i].serialList[j].serialName+'</p><span>未上市</span></div>';
//                         }else if(data.data[i].serialList[j].saleStatus=='-1'){
//                             str+='<div class="num_name num_lineheight"><p>'+data.data[i].serialList[j].serialName+'</p><span>停销</span></div>';
//                         }else{
//                             str+='<div class="num_name "><p>'+data.data[i].serialList[j].serialName+'</p></div>';
//                         }
                        
//                         str+=
//                              '</a>'+
//                              '</div>'
//                     }
//                     str2='<div class="sort_letter">'+data.data[i].brandName+'</div>'+str;
//                     $('.sort_box').append(str2);
//                 }
//             }
//         }); 
//     }

// }
// function getUrlParam(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
//     var r = window.location.search.substr(1).match(reg);  //匹配目标参数
//     if (r != null) return unescape(r[2]); return null; //返回参数值
// }