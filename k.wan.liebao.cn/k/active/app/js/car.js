/**
 * Created by yuli on 2016/12/20.
 */
 var commonUrl = 'http://autogeekapi.cmcm.com';

var cars={
    getCar:function(){
        $.ajax({
            url: commonUrl+'/cmauto/car_type/1/api/brand',
            data:'',
            dataType: "jsonp",
            type:'GET',
            cache:true,
            contentType:'application/json'
        }).success(function(data) {
            if(data.data) {
                var str='';
                for(var i=0;i<data.data.length;i++){
                    str+='<div class="sort_list carList" masterId="'+data.data[i].masterId+'" carName="'+data.data[i].name+'" carSrc="https://autogeekcms.cmcm.com/web/carChoose/carSeries.html?id='+data.data[i].masterId+'">'+
                         // '<a href="https://autogeekcms.cmcm.com/web/carChoose/carSeries.html?id='+data.data[i].masterId+'">'+
                         '<div class="num_logo">'+
                         '<img src="'+data.data[i].logoUrl+'" alt="">'+
                         '</div>'+
                         '<div class="num_name">'+data.data[i].name+'</div>'+
                         // '</a>'+
                         '</div>'
                }
                $('.sort_box').prepend(str);
                sort.sortDel();
            }
        });
        //第一级
        $('.sort_box .carList').live('click',function(){
            //alert("1111");
            //localStorage.car=$(this).attr('carName') || '';
            var obj = {
                car:$(this).attr('carName') || '',
                carUrl:$(this).attr('carSrc') || ''
            };
            var str = JSON.stringify(obj);
           // console.log(str);
            try{
                jsInterface.setTitle(str);
            }catch(e){
                console.log(e);
            }
        })
    },
    getCarSeries:function(){
        var id=getUrlParam('id')||'1';
       $.ajax({
            url: commonUrl+'/cmauto/car_type/1/api/series',
            data:{'id':id},
            dataType: "jsonp",
            type:'GET',
            cache:true,
            contentType:'application/json'
        }).success(function(data) {
            if(data.data) {
                var str='';
                var str2='';
                for(var i=0;i<data.data.length;i++){
                    for(var j=0;j<data.data[i].serialList.length;j++){
                        str+='<div class="sort_list sort_seriers" carSerialName="'+data.data[i].serialList[j].serialName+'" carSeriesUrl="https://autogeekcms.cmcm.com/web/carChoose/CarList.html?id='+data.data[i].serialList[j].serialId+'">'+
                             // '<a href="https://autogeekcms.cmcm.com/web/carChoose/CarList.html?id='+data.data[i].serialList[j].serialId+'">'+
                             '<div class="num_logo num_seriers">'+
                             '<img src="'+data.data[i].serialList[j].Picture+'" alt="">'+
                             '</div>'
                        if(data.data[i].serialList[j].saleStatus=='0'){
                            str+='<div class="num_name num_lineheight"><p>'+data.data[i].serialList[j].serialName+'</p><span>未上市</span></div>';
                        }else if(data.data[i].serialList[j].saleStatus=='-1'){
                            str+='<div class="num_name num_lineheight"><p>'+data.data[i].serialList[j].serialName+'</p><span>停销</span></div>';
                        }else{
                            str+='<div class="num_name "><p>'+data.data[i].serialList[j].serialName+'</p></div>';
                        }
                        
                        str+=
                             // '</a>'+
                             '</div>'
                    }
                    str2='<div class="sort_letter">'+data.data[i].brandName+'</div>'+str;
                    $('.sort_box').append(str2);
                }
            }
        }); 
        //第二级
        $('.sort_seriers').live('click',function(){
            localStorage.carSerialName=$(this).attr('carSerialName') || '';
            var obj = {
                car:$(this).attr('carSerialName') || '',
                carSeriesUrl:$(this).attr('carSeriesUrl') || ''
            };
            var str = JSON.stringify(obj);
            //console.log(str);
            try{
                jsInterface.setSerialNameTitle(str);
            }catch(e){
                console.log(e);
            }
        })
    },
     getCarList:function(){
        var id=getUrlParam('id')||'1';
       $.ajax({
            url: commonUrl+'/cmauto/car_type/1/api/group',
            data:{'id':id},
            dataType: "jsonp",
            type:'GET',
            cache:true,
            contentType:'application/json'
        }).success(function(data) {
            if(data.data) {
                var arr=[];
                var yearArr=[];
              //  console.log(data.data.length);
                for(var i=0;i<data.data.length;i++){
                     arr.push(data.data[i].Year);
                }
                //console.log(arr.sort());
                arr=arr.sort();
                var alink='';
                var aTab='';
                for(var n=arr.length-1;n>=0;n--){
                  //class="active"
                  alink+='<a href="#" hidefocus="true">'+arr[n]+'款</a>';
                  aTab+='<div class="swiper-slide" id="tab'+arr[n]+'">'+
                        '<div class="content-slide">'
                    for(var i=0;i<data.data.length;i++){
                        if(data.data[i].Year==arr[n]){
                            for(var j=0;j<data.data[i].CarGroup.length;j++){
                                aTab+='<div class="sort_letter">'+data.data[i].CarGroup[j].Name+'</div>'
                                for(var m=0;m<data.data[i].CarGroup[j].CarList.length;m++){
                                    aTab+= '<div class="sort_list"><div class="num_name" carListName="'+data.data[i].CarGroup[j].CarList[m].Name+'">'+data.data[i].CarGroup[j].CarList[m].Name+'</div></div>'
                                } 
                            }
                        }
                    }
                    aTab+='</div>'+
                          '</div>'
                }
                $('.tabs').append(alink);
                $('.swiper-wrapper').append(aTab);
                $('.tabs a').eq(0).addClass('active');
                $('.swiper-wrapper .swiper-slide').eq(0).addClass('swiper-slide-visible swiper-slide-active');
                //tab切换
                var tabsSwiper = new Swiper('.swiper-container',{
                  speed:500,
                  onSlideChangeStart: function(){
                    $(".tabs .active").removeClass('active');
                    $(".tabs a").eq(tabsSwiper.activeIndex).addClass('active');
                  }
                });

                $(".tabs a").on('tap',function(e){
                  e.preventDefault()
                  $(".tabs .active").removeClass('active');
                  $(this).addClass('active');
                  tabsSwiper.swipeTo($(this).index());
                });

                $(".tabs a").click(function(e){
                  e.preventDefault();
                });
                var liWidth = 100;
                  var x = $('.tabs a').length;
                  $('.tabs').css('width',liWidth*x);
                  var myScroll = new IScroll('.tab_slid',{
                      eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false,tap:true
                  });
            }
        }); 
 //第三级
        $('.sort_list .num_name').live('click',function(){
            localStorage.carListName=$(this).attr('carListName') || '';
            var obj = {
                car:$(this).attr('carListName') || ''
            };
            var str = JSON.stringify(obj);
            //console.log(str);
            try{
                jsInterface.setCarListName(str);
            }catch(e){
                console.log(e);
            }
        })
    }

}


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}