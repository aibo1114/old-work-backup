$(document).ready(function(){
      var $sniper = $("#sniper img");
      $sniper.click(function(){
          $(".qrcodes_sniper").css("display","block");
      });

      var $piano = $("#piano img");
      $piano.click(function(){
          $(".qrcodes_piano").css("display","block");
      });

      var $disease = $("#disease img");
      $disease.click(function(){
          $(".qrcodes_disease").css("display","block");
      });

      var $close = $(".close_btn");
      $close.click(function(){
         $(this).parent().css("display","none");
      })
      /*以上为二维码展现*/ 
});