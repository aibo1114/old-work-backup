// /*
//  * jQuery tSlide
//  * @Version: 1.0
//  * @Author:  Travis
//  * @Date:    October 10th, 2012
//  * @Website: http://travisup.com/
//  */
// (function($) {
//     $.fn.extend({
//         tSlide:init
//     });
    
//     var opt = {
//         time:4000,
//         overtime: 200,
//         opacity: '0.5',
//         mouseevent: 'mouseover',
//         classcur: 'current',
//         classcon: 't_slide_con',
//         classmask: 't_slide_mask',
//         classtitle: 't_slide_title',
//         classpage: 't_slide_page'
//     };
    
//     var $obj = {};
    
//     var current = 0;
    
//     function slide() {
//         current = (current+1) % opt.len;
//         var left = 0 - current * opt.width;
//         $obj.con.stop().animate({left:left}, opt.overtime);
//         $obj.title.removeClass(opt.classcur).eq(current).addClass(opt.classcur);
//         $obj.page.removeClass(opt.classcur).eq(current).addClass(opt.classcur);
//     };
    
//     function init(options) {
//         if(options) $.extend(opt, options);
        
//         $obj.con = $(this).find('.'+opt.classcon).find("ul");
//         $obj.mask = $(this).find('.'+opt.classmask);
//         $obj.title = $(this).find('.'+opt.classtitle).find("li");
//         $obj.page = $(this).find('.'+opt.classpage).find("li");

//         opt.width = $(this).find('.'+opt.classcon).width();
//         opt.len = $obj.page.length;
        
//         $obj.mask.css({'opacity':opt.opacity});
//         $obj.title.eq(0).addClass(opt.classcur);
//         $obj.page.eq(0).addClass(opt.classcur);

//         if(opt.len == 1) {
//             return;
//         }

//         var timer = setInterval(slide, opt.time);

//         $(this).hover(function() {
//             clearInterval(timer);
//         }, function() {
//             timer = setInterval(slide, opt.time);
//         });
        
//         $obj.page.each(function(i){
//             $(this).bind(opt.mouseevent, function(){
//                 current = i - 1;
//                 slide();
//             });
//         });
//     }
// })(jQuery);
/* 
    Banner婊戝姩鏁堟灉 
*/
function Banner($Banner){
    //console.log(this);
    this.$imgList = $Banner.find('.imgList');
    this.cirs = $Banner.find('.titleCircle').find("span");
    this.titles = $Banner.find('.titleList').find("li");
    this.width = $Banner.width();
    this.num = this.$imgList.find("li").length;
    this.$imgList.css('width',this.num * this.width + 'px');
    this.interval = 0;
    this.imgindex = 0;
    this.status = -1;
    this.bind();
    this.refresh();
    // return this;
}; 

Banner.prototype.start = function(){
    var _this = this;
    if(_this.status == -1){
        _this.move();
        _this.interval = setInterval(function(){_this.scroll()}, 3000);
        _this.status = 0;
    }
};

Banner.prototype.stop = function(){
    var _this = this;
    if(_this.status == 0){
        clearInterval(_this.interval);
        _this.move();
        _this.status = -1;
    }
};

Banner.prototype.move = function(){
    var _this = this;
    var left = this.imgindex * this.width;
    this.$imgList.stop().animate({marginLeft: -left + "px"},300,function(){_this.refresh()});
};

Banner.prototype.refresh = function(){
    this.titles.removeClass("cur").eq(this.imgindex).addClass("cur");
    this.cirs.removeClass("cur").eq(this.imgindex).addClass("cur");
};

Banner.prototype.scroll = function(){
    this.imgindex =  (this.imgindex + 1) % this.num;
    this.move();
};

Banner.prototype.bind = function(){
    var _this = this;
    this.cirs.each(function(i){
        $(this).on({
            mouseover: function(){
                //Tabs.stopScroll();
                clearInterval(_this.interval);
                _this.imgindex = i;
                _this.move();
            },
            mouseleave: function(){
                clearInterval(_this.interval);
                _this.interval = setInterval(function(){_this.scroll()}, 3000);
            }
        });
    });
    this.$imgList.parent().on({
        mouseover: function () {
            //Tabs.stopScroll();
            clearInterval(_this.interval);
        },
        mouseleave: function () {
            clearInterval(_this.interval);
            _this.interval = setInterval(function(){_this.scroll()}, 3000);
        }
    });
};

