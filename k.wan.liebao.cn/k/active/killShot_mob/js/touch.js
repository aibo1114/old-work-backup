(function(){
    var ele=document.getElementById('containerBox'),
        startY, y, h=parseInt( $('.js-screen').height() ),ndx,mt=parseInt(ele.style['margin-top']),curPage= 1,moved=false;

    ele.addEventListener('touchstart',touchStart);
    ele.addEventListener('touchmove',touchMove);
    ele.addEventListener('touchend',touchEnd);

    function touchStart (e){
        console.log('start');
        moved=false;
        var touch= e.touches[0];
        startY=touch.screenY;
        ndx=Math.floor(startY/h);
    }

    function touchMove (e){
        console.log('move');
        console.log(e.touches);
        moved=true;
        e.preventDefault();
        y=e.touches[0].screenY;
    }

    function touchEnd(e){
        console.log('end');
        e.stopPropagation();
        var thisTop=Math.abs(parseInt( $('#containerBox').css('top') )) || 0;
        var ht;

        if(startY==y){
            return;
        }
        if(startY>y && moved){
            ht='-'+(thisTop+h)+'px';
            if(curPage>=2) return;
            curPage++;
        }
        if(startY<y && moved){
            ht='-'+(thisTop-h)+'px';
            if(curPage<=1) return;
            curPage--;
        }
        $('#containerBox').animate({
            'top':ht
        });

    }

    $('.li-btn-active:eq(0)').click(function(e){
        e.preventDefault();
        $('.mask-dialog').show();
        $('.dialog-tcode').show();
    });
    $('.li-btn-active:eq(1)').click(function(e){
        e.preventDefault();
        $('.mask-dialog').show();
        $('.dialog-share').show();
    });
    $('.mask-dialog').click(function(){
        $(this).hide();
        $('.dialog-tcode').hide();
        $('.dialog-share').hide();
    });
    $('.dialog-tcode').click(function(){
        $(this).hide();
        $('.mask-dialog').hide();
    });
    $('.dialog-share').click(function(){
        $(this).hide();
        $('.mask-dialog').hide();
    });

    $('.li-btn-carousel').click(function(){
        var ndx=$(this).index();
        $('.li-btn-carousel').children('.img').show().siblings('.img-active').hide();
        $(this).children('.img').hide().siblings('.img-active').show();
        $('.li-words-carousel:eq('+ndx+')').show().siblings('.li-words-carousel').hide();
        $('.li-content-carousel:eq('+ndx+')').show().siblings('.li-content-carousel').hide();
    });

    /*video*/
    $('.content-video')[0].addEventListener('touchstart',function(e){
        e.preventDefault();
        $('.videoBox').show();
        $('#video')[0].play();
    });

    $('#closeVideo')[0].addEventListener('touchstart',function(e){
        e.preventDefault();
        $('#video')[0].currentTime=0;
        $('#video')[0].pause();
        $('.videoBox').hide();
    });











})();