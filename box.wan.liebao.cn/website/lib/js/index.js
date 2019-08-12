
$('#indexs1').css({display: 'block'})
var arr = [];
var screenH = window.screen.height;
isIE_s();
function isIE_s() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        window.location.href = "./index2.html";
    }
}
window.onload = function () {

    isIE_();
    function isIE_() {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
        } else {
            //初次进入页面，展示动画一
            showFirstAnimation();
        }
    }

    var count = 1;
    var time = 0;
    var stops;
    for (var i = 0; i < $('.indexs').length; i++) {
        arr.push($('.indexs')[i])
    }
    var scrollFuncs = function (e) {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {

        }
        else {
            $('.i_1').css({display: 'none'})
            $('.i_2').css({display: 'none'})
            $('.i_3').css({display: 'none'})
            $('.i_4').css({display: 'none'})
            $('.column1').css({display: 'block'})
            $('.column2').css({display: 'block'})
            $('.column3').css({display: 'block'})
            $('.column4').css({display: 'block'})
            //判断计时器是否处于关闭状态
            if (time == 0) {
                time = 3; //间隔时间（秒）
                //启动计时器，倒计时time秒后自动关闭计时器。
                var indexs = setInterval(function () {
                    time--;
                    if (time == 0) {
                        clearInterval(indexs);
                    }
                }, 1000);
                stops = true;
                //alert('事件被触发');
            } else {
                stops = false;
                //alert('事件不允许被触发');
            }

            e = e || window.event;
            if (e.wheelDelta) {  // IE，谷歌滑轮事件
                if (e.wheelDelta > 0) {
                    if (stops == true) {
                        count--;
                    }

//alert("滑轮向上滚动");
                    if (count == 0) {
                        count = 4;
                    }
                    ;
                    if (count == 4 && stops == true) {
                        hidefour_Animation();
                    }
                    else if (count == 3 && stops == true) {
                        hidethree_Animation();

                    } else if (count == 2 && stops == true) {
                        hidetwo_Animation();

                    } else if (count == 1 && stops == true) {
                        hideone_Animation()
                    }
                    ;
                } else if (e.wheelDelta < 0) {
//alert("滑轮向下滚动");
                    if (stops == true) {
                        count++;
                    }
                    if (count == 5) {
                        count = 1;
                    }
                    if (count == 1 && stops == true) {
                        showFirstAnimation();
                        //console.log(count);
                    } else if (count == 2 && stops == true) {
                        //one_();
                        showSecondAnimation();
                        //if($(".one_map7").css('opacity') == 1){
                        //    count = 3;
                        //}
                        count = 2;
                    } else if (count == 3 && stops == true) {
                        two_();
                        showThirdAnimation();
                        //if($(".three_map9").css('opacity')==1){
                        count = 3;
                        //}
                    } else if (count == 4 && stops == true) {
                        three_();
                        showForthAnimation();
                    }
                }
            }
            if (e.detail) {  //Firefox滑轮事件
                $('.i_1').css({display: 'none'})
                $('.i_2').css({display: 'none'})
                $('.i_3').css({display: 'none'})
                $('.i_4').css({display: 'none'})
                $('.column1').css({display: 'block'})
                $('.column2').css({display: 'block'})
                $('.column3').css({display: 'block'})
                $('.column4').css({display: 'block'})
                if (e.detail < 0) {
                    if (stops == true) {
                        count--;
                    }
//alert("滑轮向上滚动");
                    if (count == 0) {
                        count = 4;
                    }
                    ;
                    if (count == 4 && stops == true) {
                        hidefour_Animation();
                    }
                    else if (count == 3 && stops == true) {
                        hidethree_Animation();
                    } else if (count == 2 && stops == true) {
                        hidetwo_Animation();
                    } else if (count == 1 && stops == true) {
                        hideone_Animation()
                    }
                    ;
                } else if (e.detail > 0) {
//alert("滑轮向下滚动");
                    if (stops == true) {
                        count++;
                    }
                    if (count == 5) {
                        count = 1;
                    }
                    if (count == 1 && stops == true) {
                        showFirstAnimation();
                    } else if (count == 2 && stops == true) {
                        one_();
                        showSecondAnimation();
                        //if($(".one_map7").css('opacity') == 1){
                        //    count = 3;
                        //}
                        count = 2;
                    } else if (count == 3 && stops == true) {
                        two_();
                        showThirdAnimation();
                        //if($(".three_map9").css('opacity')==1){
                        count = 3;
                        //}
                    } else if (count == 4 && stops == true) {
                        three_();
                        showForthAnimation();
                    }
                }
            }
        }
    }
//页面绑定滑轮滚动事件
    if (document.addEventListener) {//firefox
        document.addEventListener('DOMMouseScroll', scrollFuncs, false);
    }
//滚动滑轮触发scrollFunc方法  //ie 谷歌
    window.onmousewheel = scrollFuncs;

    $('.data1').on('click', function () {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            $('#imgs_2').removeClass('itt')
            $('#imgs_3').removeClass('itt')
            $('#imgs_4').removeClass('itt')
            $('#imgs_1').addClass('itt')
            //$('.i_2').css({display: 'none'})
            //$('.i_1').css({display: 'block'})
            //$('.i_3').css({display: 'none'})
            //$('.i_4').css({display: 'none'})
            $('.nametext').html('<p class="nametext1 i1_1">热门页游</p>' + ' <p class="nametext2 i1_2">汇聚当下热门页游</p>')
        } else {
            $('.column1').css({display: 'none'})
            $('.column2').css({display: 'block'})
            $('.column3').css({display: 'block'})
            $('.column4').css({display: 'block'})
            $('.i_2').css({display: 'none'})
            $('.i_1').css({display: 'block'})
            $('.i_3').css({display: 'none'})
            $('.i_4').css({display: 'none'})
            count = 1;
            $('#indexs2').css({display: 'none', opacity: 0})
            $('#indexs3').css({display: 'none', opacity: 0})
            $('#indexs4').css({display: 'none', opacity: 0})
            $('#indexs1').css({display: 'block'})
            setTimeout(function () {
                $('#indexs1').animate({opacity: 1})
            }, 1300);
            if (screenH > 800) {
                maxs1();
                max1()
            } else if (screenH < 800) {
                mins1();
                min1()
            }
        }
    })
    $('.data2').on('click', function () {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            $('#imgs_2').addClass('itt')
            $('#imgs_3').removeClass('itt')
            $('#imgs_4').removeClass('itt')
            $('#imgs_1').removeClass('itt')
            $('#imgs_1').removeClass('itt')
            //$('.i_1').css({display: 'none'})
            //$('.i_2').css({display: 'block'})
            //$('.i_3').css({display: 'none'})
            //$('.i_4').css({display: 'none'})
            $('.nametext').html(' <p class="nametext1 i2_1">智能提醒</p>' + ' <p class="nametext2 two_text">一键添加游戏提醒 自定义提醒</p>' + '  <p class="nametext2">再也不会错过重要福利<p>')
        } else {
            $('.column2').css({display: 'none'})
            $('.column1').css({display: 'block'})
            $('.column3').css({display: 'block'})
            $('.column4').css({display: 'block'})
            $('.i_2').css({display: 'block'})
            $('.i_1').css({display: 'none'})
            $('.i_3').css({display: 'none'})
            $('.i_4').css({display: 'none'})
            count = 2;
            setTimeout(function () {
                $('#indexs2').css({display: 'block'})
                $('#indexs2').animate({opacity: 1})
                if (screenH > 800) {
                    maxs2();
                    max2()
                } else if (screenH < 800) {
                    mins2();
                    min2()
                }
            }, 300);
            $('#indexs1').css({display: 'none', opacity: 0})
            $('#indexs3').css({display: 'none', opacity: 0})
            $('#indexs4').css({display: 'none', opacity: 0})
        }
    })
    $('.data3').on('click', function () {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            $('#imgs_2').removeClass('itt')
            $('#imgs_3').addClass('itt')
            $('#imgs_4').removeClass('itt')
            $('#imgs_1').removeClass('itt')
            //$('.i_2').css({display: 'none'})
            //$('.i_3').css({display: 'block'})
            //$('.i_1').css({display: 'none'})
            //$('.i_4').css({display: 'none'})
            $('.nametext').html('   <p class="nametext1">小号管理</p>' + '    <p class="nametext2 two_text">无需多次登录 添加多个帐号</p>' + '<p class="nametext2">一键进入游戏<p>')
            $('#indexs4 .nametext').addClass('and')
        } else {
            $('.column3').css({display: 'none'})
            $('.column1').css({display: 'block'})
            $('.column2').css({display: 'block'})
            $('.column4').css({display: 'block'})
            $('.i_3').css({display: 'block'})
            $('.i_1').css({display: 'none'})
            $('.i_2').css({display: 'none'})
            $('.i_4').css({display: 'none'})
            count = 3;
            $('#indexs2').css({display: 'none', opacity: 0})
            $('#indexs1').css({display: 'none', opacity: 0})
            $('#indexs4').css({display: 'none', opacity: 0})
            setTimeout(function () {
                $('#indexs3').css({display: 'block'})
                $('#indexs3').animate({opacity: 1})
                if (screenH > 800) {
                    maxs3()
                    max3()
                } else if (screenH < 800) {
                    mins3()
                    min3()
                }
            }, 300);
        }
    })
    $('.data4').on('click', function () {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            $('#imgs_2').removeClass('itt')
            $('#imgs_3').removeClass('itt')
            $('#imgs_4').addClass('itt')
            $('#imgs_1').removeClass('itt')
            //$('.i_2').css({display: 'none'})
            //$('.i_4').css({display: 'block'})
            //$('.i_3').css({display: 'none'})
            //$('.i_1').css({display: 'none'})
            $('.nametext').html(' <p class="nametext1">游戏助手</p>' + '     <p class="nametext2 two_text">智能挂机 一键操作 省时 省心</p>')
        } else {
            $('.column4').css({display: 'none'})
            $('.column1').css({display: 'block'})
            $('.column2').css({display: 'block'})
            $('.column3').css({display: 'block'})
            $('.i_4').css({display: 'block'})
            $('.i_1').css({display: 'none'})
            $('.i_2').css({display: 'none'})
            $('.i_3').css({display: 'none'})
            count = 4;
            setTimeout(function () {
                $('#indexs4').css({display: 'block'})
                $('#indexs4').animate({opacity: 1})
                if (screenH > 800) {
                    maxs4()
                    max4()
                } else if (screenH < 800) {
                    mins4()
                    min4()
                }
            }, 300);
            $('#indexs1').css({display: 'none', opacity: 0})
            $('#indexs2').css({display: 'none', opacity: 0})
            $('#indexs3').css({display: 'none', opacity: 0})
        }
    })

//bottom1
    function showFirstAnimation() {
        $('#indexs1').animate({opacity: 0})
        $('#indexs2').animate({opacity: 0})
        $('#indexs4').animate({opacity: 0})
        $('#indexs3').animate({opacity: 0})
        //一屏显示
        setTimeout(function () {
            $('#indexs1').css({display: 'block', opacity: '1'})
            if (screenH > 800) {
                maxs1();
                max1()
            } else if (screenH < 800) {
                mins1();
                min1()
            }
        }, 500);
    };
//bottom2
    function showSecondAnimation() {
        isIEs();
        function isIEs() {
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                $('#indexs1').css({display: 'none'})
            }
        }

        $('#indexs1').animate({opacity: 0})
        $('#indexs2').animate({opacity: 0})
        $('#indexs4').animate({opacity: 0})
        $('#indexs3').animate({opacity: 0})
        //二屏显示
        setTimeout(function () {

            $('#indexs2').css({display: 'block'})
            $('#indexs2').animate({opacity: '1'})
            if (screenH > 800) {
                maxs2()
                max2()
            } else if (screenH < 800) {
                mins2()
                min2()
            }
        }, 500);
    };
//bottom3
    function showThirdAnimation() {
        $('#indexs1').animate({opacity: 0})
        $('#indexs2').animate({opacity: 0})
        $('#indexs3').animate({opacity: 0})
        $('#indexs4').animate({opacity: 0})
        //三屏显示
        setTimeout(function () {
            $('#indexs3').css({display: 'block'})
            $('#indexs3').animate({opacity: '1'})
            if (screenH > 800) {
                maxs3()
                max3()
            } else if (screenH < 800) {
                mins3()
                min3()
            }
        }, 500);
    }
//bottom4
    function showForthAnimation() {
        //三屏隐藏
        //three_();
        $('#indexs1').animate({opacity: 0})
        $('#indexs2').animate({opacity: 0})
        $('#indexs3').animate({opacity: 0})
        $('#indexs4').animate({opacity: 0});
        //四屏显示
        setTimeout(function () {
            $('#indexs4').css({display: 'block'})
            $('#indexs4').animate({opacity: '1'})
            if (screenH > 800) {
                maxs4()
                max4()
            } else if (screenH < 800) {
                mins4()
                min4()
            }
        }, 500);
    };

//top4
    function hidefour_Animation() {
        //三屏隐藏
        one_();
        $('#indexs1').animate({opacity: 0})
        $('#indexs2').animate({opacity: 0})
        $('#indexs3').animate({opacity: 0})
        $('#indexs4').animate({opacity: 0})
        //四屏展示
        setTimeout(function () {
            $('#indexs4').css({display: 'block', opacity: '1'})
            if (screenH > 800) {
                maxs4();
                max4()
            } else if (screenH < 800) {
                mins4();
                min4()
            }
        }, 500);
    };
//top4
    function hidethree_Animation() {
        //四屏隐藏
        four_();
        $('#indexs1').animate({opacity: 0})
        $('#indexs2').animate({opacity: 0})
        $('#indexs3').animate({opacity: 0})
        $('#indexs4').animate({opacity: 0})
        //三屏展示
        setTimeout(function () {
            $('#indexs3').css({display: 'block', opacity: '1'})
            if (screenH > 800) {
                maxs3();
                max3()
            } else if (screenH < 800) {
                mins3();
                min3()
            }
        }, 500);
    };
//top3
    function hidetwo_Animation() {
        //三屏隐藏
        three_()
        $('#indexs1').animate({opacity: 0})
        $('#indexs2').animate({opacity: 0})
        $('#indexs4').animate({opacity: 0})
        $('#indexs3').animate({opacity: 0})
        //二屏展示
        setTimeout(function () {
            $('#indexs2').css({display: 'block', opacity: '1'})
            if (screenH > 800) {
                maxs2();
                max2()
            } else if (screenH < 800) {
                mins2();
                min2()
            }
        }, 500);
    };
//top2
    function hideone_Animation() {
        //二屏隐藏
        two_();
        $('#indexs1').css({opacity: 0, display: 'block'})
        $('#indexs2').css({opacity: 0})
        $('#indexs3').css({opacity: 0})
        $('#indexs4').css({opacity: 0})
        //一屏展示
        $('#indexs1').animate({opacity: '1'})
        setTimeout(function () {
            if (screenH > 800) {
                maxs1();
                max1()
            } else if (screenH < 800) {
                mins1();
                min1()
            }
        }, 500);
    };

}

//背景
setTimeout(function () {
    $('.section').addClass('current');
}, 100);

//一屏隐藏动画
function one_() {
    $('.one_map .is').each(function () {
        $(this).css({
            transform: 'scale(0.5) rotateZ(360deg)',
            transition: ' 0.5s ease-out',
            left: '45px',
            top: '100px',
            opacity: 0
        })
    })
    setTimeout(function () {
        $('.one_map0').css({
            transform: 'scale(0.5) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: 0
        })
        $('.one_map8').css({
            transform: 'scale(0.5) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: 0
        })
        $('.nametext').animate({left: '300px', opacity: 0});
        $('#indexs1').animate({opacity: 0})
    }, 700);
}

// 一屏上滚显示动画
function mins1() {
    setTimeout(function () {
        $('.one_map0').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1s ease',
            opacity: '1'
        })
        $('.one_map8').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1s ease',
            opacity: '1'
        })
    }, 300);
    $('.one_map .is').each(function () {
        $(this).css({
            transform: 'scale(1)',
        })
    })
}
function maxs1() {
    setTimeout(function () {
        $('.one_map0').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1s ease',
            opacity: '1'
        })
        $('.one_map8').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1s ease',
            opacity: '1'
        })
    }, 300);
    $('.one_map .is').each(function () {
        $(this).css({
            transform: 'scale(1.2)',
        })
    })
}
// 一屏展示通用动画
function min1() {
    //文案
    setTimeout(function () {
        $("#indexs1 .nametext").animate({left: '255px', opacity: 1});
    }, 1500);
    // 一屏内容
    setTimeout(function () {
        $(".one_map1").animate({
            width: '105px', height: '105px', left: '-100px', top: '-55px', opacity: 1
        });
    }, 2000);
    setTimeout(function () {
        $(".one_map2").animate({width: '50px', height: '50px', left: '80px', top: '100px', opacity: 1});
    }, 2100);
    setTimeout(function () {
        $(".one_map3").animate({width: '73px', height: '74px', left: '0', top: '30px', opacity: 1});
    }, 2200);
    setTimeout(function () {
        $(".one_map4").animate({width: '62px', height: '59px', left: '135px', top: '75px', opacity: 1});
    }, 2300);
    setTimeout(function () {
        $(".one_map5").animate({width: '104px', height: '100px', left: '40px', top: '-45px', opacity: 1});
    }, 2400);
    setTimeout(function () {
        $(".one_map6").animate({width: '108px', height: '110px', left: '170px', top: '-105px', opacity: 1});
    }, 2500);
    setTimeout(function () {
        $(".one_map7").animate({width: '82px', height: '78px', left: '24px', top: '-152px', opacity: 1});
    }, 2600);
}
function max1() {
    //文案
    setTimeout(function () {
        $(".nametext").animate({left: '225px', top: '-80px', opacity: 1});
    }, 1500);
    // 一屏内容
    setTimeout(function () {
        $(".one_map1").animate({width: '110px', height: '102px', left: '-95px', top: '-27px', opacity: 1});
    }, 2000);
    setTimeout(function () {
        $(".one_map2").animate({width: '50px', height: '50px', left: '85px', top: '180px', opacity: 1});
    }, 2100);
    setTimeout(function () {
        $(".one_map3").animate({width: '144px', height: '74px', left: '2px', top: '85px', opacity: 1});
    }, 2200);
    setTimeout(function () {
        $(".one_map4").animate({width: '62px', height: '60px', left: '145px', top: '130px', opacity: 1});
    }, 2300);
    setTimeout(function () {
        $(".one_map5").animate({width: '104px', height: '100px', left: '40px', top: '-25px', opacity: 1});
    }, 2400);
    setTimeout(function () {
        $(".one_map6").animate({width: '108px', height: '110px', left: '190px', top: '-105px', opacity: 1});
    }, 2500);
    setTimeout(function () {
        $(".one_map7").animate({width: '82px', height: '78px', left: '24px', top: '-152px', opacity: 1});
    }, 2600);
}

//二屏隐藏动画
function two_() {
    $('.two_map .is').each(function () {
        $(this).css({
            transform: 'scale(0.5) rotateZ(360deg)',
            transition: ' 0.5s ease-out',
            left: '45px',
            top: '100px',
            opacity: 0
        })
    })
    setTimeout(function () {
        $('.two_map0').css({
            transform: 'scale(0.5) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: '0'
        })
        $('.two_map8').css({
            transform: 'scale(0.5) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: 0
        })
        $('#indexs2 .nametext').animate({opacity: 0});
        $('#indexs2').animate({opacity: 0})
    }, 700);
}
//其他隐藏，二屏上滚显示
function mins2() {
    $('.two_map .is').each(function () {
        $(this).css({
            top: '15px',
            left: '15px',
            transform: 'scale(1)',
            opacity: 0
        })
    })
    setTimeout(function () {
        $('.two_map0').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: '1'
        })
        $('.two_map8').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: '1'
        })
        $('#indexs2 .nametext').animate({left: '267px', opacity: 1});
    }, 300);
    //setTimeout(function () {
    //    $('.two_map .is').each(function () {
    //        $(this).css({
    //            transform: 'scale(1)',
    //            opacity: 1
    //        })
    //    })
    //}, 1500);
}
function maxs2() {
    $('.two_map .is').each(function () {
        $(this).css({
            top: '15px',
            left: '15px',
            transform: 'scale(1.2)',
            opacity: 0
        })
    })
    setTimeout(function () {
        $('.two_map0').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: '1'
        })
        $('.two_map8').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: '1'
        })

        //$('#indexs2 .nametext').animate({left: '267px', opacity: 1});
    }, 300);
    //setTimeout(function () {
    //    $('.two_map .is').each(function () {
    //        $(this).css({
    //            transform: 'scale(1)',
    //            opacity: 1
    //        })
    //    })
    //}, 1500);
}
//二屏通用展示，其他隐藏
function min2() {
    //文案
    setTimeout(function () {
        //$("#indexs2 .nametext").animate({left: '225px', opacity: 1});
    }, 500);
    // 二屏内容
    setTimeout(function () {
        $(".two_map2").animate({left: '20px', top: '-75px', opacity: 1});
    }, 1600);
    setTimeout(function () {
        $(".two_map1").animate({left: '180px', top: '-102px', opacity: 1});
    }, 2200);
    setTimeout(function () {
        $(".two_map4").animate({left: '190px', top: '20px', opacity: 1});
    }, 1800);
    setTimeout(function () {
        $(".two_map3").animate({left: '-110px', top: '13px', opacity: 1});
    }, 2000);

}
function max2() {
    //文案
    setTimeout(function () {
        $("#indexs2 .nametext").animate({left: '225px', top: '-80px', opacity: 1});
    }, 500);
    // 二屏内容
    $(".two_map8").css({bottom: '-45px', left: '15px', opacity: 1});
    $(".two_map0").css({top: '-155px', left: '-145px', opacity: 1});
    setTimeout(function () {
        $(".two_map1").animate({width: '80px', height: '92px', left: '200px', top: '-105px', opacity: 1});
    }, 1000);
    setTimeout(function () {
        $(".two_map2").animate({width: '139px', height: '157px', left: '30px', top: '-55px', opacity: 1});
    }, 1100);
    setTimeout(function () {
        $(".two_map3").animate({width: '98px', height: '87px', left: '-110px', top: '40px', opacity: 1});
    }, 1200);
    setTimeout(function () {
        $(".two_map4").animate({width: '80px', height: '80px', left: '180px', top: '80px', opacity: 1});
    }, 1300);
}

//三屏隐藏
function three_() {
    $('.three_map .is').each(function () {
        $(this).css({
            transform: 'scale(0.5) rotateZ(360deg)',
            transition: ' 0.5s ease-out',
            left: '45px',
            top: '100px',
            opacity: 0
        })
    })
    setTimeout(function () {
        $('.three_map0').css({
            transform: 'scale(0.5) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: 0
        })
        $('.three_map8').css({
            transform: 'scale(0.5) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: 0
        })
        $('#indexs3 .nametext').animate({left: '300px', opacity: 0});
        $('#indexs3').animate({opacity: 0})
    }, 700);
}
//三屏上滚展示
function mins3() {
    $('.three_map .is').each(function () {
        $(this).css({
            top: '80px',
            left: '50px',
            opacity: 0
        })
    })
    setTimeout(function () {
        $('.three_map0').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: '1'
        })
        $('.three_map8').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: '1'
        })

        $('#indexs3 .nametext').animate({left: '225px', opacity: 1});
    }, 700);
    setTimeout(function () {
        $('.three_map .is').each(function () {
            $(this).css({
                transform: 'scale(1)',
                opacity: 1
            })
        })
    }, 1500);
}
function maxs3() {
    $('.three_map .is').each(function () {
        $(this).css({
            top: '15px',
            left: '15px',
            opacity: 0
        })
    })
    setTimeout(function () {
        $('.three_map0').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: '1'
        })
        $('.three_map8').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: '1'
        })

        $('#indexs3 .nametext').animate({left: '225px', opacity: 1});
    }, 700);
    setTimeout(function () {
        $('.three_map .is').each(function () {
            $(this).css({
                transform: 'scale(1.2)',
                opacity: 1
            })
        })
    }, 1500);
}
//三屏通用展示
function min3() {
    //文案
    setTimeout(function () {
        $("#indexs3 .nametext").animate({left: '255px', opacity: 1});
    }, 500);
    setTimeout(function () {
        $(".three_map1").animate({left: '150px', top: '-85px', opacity: 1});
    }, 1500);
    setTimeout(function () {
        $(".three_map2").animate({left: '20px', top: '-60px', opacity: 1});
    }, 1700);
    setTimeout(function () {
        $(".three_map3").animate({left: '-90px', top: '-25px', opacity: 1});
    }, 1800);
    setTimeout(function () {
        $(".three_map4").animate({left: '180px', top: '-20px', opacity: 1});
    }, 1900);
    setTimeout(function () {
        $(".three_map5").animate({left: '-23px', top: '48px', opacity: 1});
    }, 2000);
    setTimeout(function () {
        $(".three_map6").animate({left: '73px', top: '-138px', opacity: 1});
    }, 2100);
    setTimeout(function () {
        $(".three_map7").animate({left: '20px', top: '-95px', opacity: 1});
    }, 2200);
    setTimeout(function () {
        $(".three_map9").animate({left: '182px', top: '38px', opacity: 1});
    }, 2300);

}
function max3() {
    //文案
    setTimeout(function () {
        $("#indexs3 .nametext").animate({left: '225px', top: '-80px', opacity: 1});
    }, 500);
    $(".three_map0").css({left: '-150px', top: '-155px', opacity: 1});
    $(".three_map8").css({left: '15px', bottom: '-55px', opacity: 1});
    setTimeout(function () {
        $(".three_map1").animate({width: '57px', height: '45px', left: '170px', top: '-65px', opacity: 1});
    }, 1000);
    setTimeout(function () {
        $(".three_map2").animate({width: '135px', height: '137px', left: '20px', top: '0px', opacity: 1});
    }, 1100);
    setTimeout(function () {
        $(".three_map3").animate({width: '65px', height: '60px', left: '-90px', top: '0px', opacity: 1});
    }, 1200);
    setTimeout(function () {
        $(".three_map4").animate({width: '55px', height: '50px', left: '211px', top: '35px', opacity: 1});
    }, 1300);
    setTimeout(function () {
        $(".three_map5").animate({width: '37px', height: '45px', left: '-45px', top: '100px', opacity: 1});
    }, 1400);
    setTimeout(function () {
        $(".three_map6").animate({width: '65px', height: '66px', left: '73px', top: '-125px', opacity: 1});
    }, 1500);
    setTimeout(function () {
        $(".three_map7").animate({width: '37px', height: '34px', left: '10px', top: '-65px', opacity: 1});
    }, 1600);
    setTimeout(function () {
        $(".three_map9").animate({width: '54px', height: '30px', left: '200px', top: '95px', opacity: 1});
    }, 1700);
}

//四屏隐藏
function four_() {
    $('.four_map .is').each(function () {
        $(this).css({
            transform: 'scale(0.5) rotateZ(360deg)',
            transition: ' 0.5s ease-out',
            left: '45px',
            top: '100px',
            opacity: 0
        })
    })
    setTimeout(function () {
        $('.four_map0').css({
            transform: 'scale(0.5) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: 0
        })
        $('.four_map8').css({
            transform: 'scale(0.5) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: 0
        })
        $('#indexs4 .nametext').animate({left: '300px', opacity: 0});
        $('#indexs4').animate({opacity: 0})
    }, 700);
}
//四屏上滚展示
function mins4() {
    setTimeout(function () {
        $('.four_map0').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: '1'
        })
        $('.four_map8').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: '1'
        })
        $('#indexs4 .nametext').animate({left: '225px', opacity: 1});
    }, 700);
    setTimeout(function () {
        $('.four_map .is').each(function () {
            $(this).css({
                transform: 'scale(1)',
                opacity: 1
            })
        })
    }, 1500);
}
function maxs4() {
    setTimeout(function () {
        $('.four_map0').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: '1'
        })
        $('.four_map8').css({
            transform: 'scale(1) rotateZ(360deg)',
            transition: ' 1.5s ease',
            opacity: '1'
        })
        $('#indexs4 .nametext').animate({left: '225px', opacity: 1});
    }, 700);
    setTimeout(function () {
        $('.four_map .is').each(function () {
            $(this).css({
                transform: 'scale(1.3)',
                opacity: 1
            })
        })
    }, 1500);
}//
//四屏显示
function min4() {
    //文案
    setTimeout(function () {
        $("#indexs4 .nametext").animate({left: '255px', opacity: 1});
    }, 500);
    setTimeout(function () {
        $(".four_map2").animate({width: '110px', height: '160px', left: '38px', top: '-37px', opacity: 1});
    }, 1500);
    setTimeout(function () {
        $(".four_map5").animate({width: '70px', height: '69px', left: '-65px', top: '10px', opacity: 1});
    }, 1600);
    setTimeout(function () {
        $(".four_map3").animate({width: '55px', height: '59px', left: '-15px', top: '-83px', opacity: 1});
    }, 1700);
    setTimeout(function () {
        $(".four_map1").animate({width: '57px', height: '62px', left: '125px', top: '-116px', opacity: 1})
    }, 1800);
    setTimeout(function () {
        $(".four_map4").animate({width: '48px', height: '55px', left: '183px', top: '-25px', opacity: 1});
    }, 1900);
}
function max4() {
    //文案
    setTimeout(function () {
        $("#indexs4 .nametext").animate({left: '225px', top: '-75px', opacity: 1});
    }, 500);
    $(".four_map0").css({left: '-158px', top: '-155px', opacity: 1})
    $(".four_map8").css({bottom: '-110px', left: '16px', opacity: 1})
    setTimeout(function () {
        $(".four_map1").animate({width: '42px', height: '62px', left: '145px', top: '-116px', opacity: 1})
    }, 1000);
    setTimeout(function () {
        $(".four_map2").animate({width: '108px', height: '163px', left: '41px', top: '3px', opacity: 1});
    }, 1100);
    setTimeout(function () {
        $(".four_map3").animate({width: '55px', height: '60px', left: '-30px', top: '-70px', opacity: 1});
    }, 1200);
    setTimeout(function () {
        $(".four_map4").animate({width: '50px', height: '54px', left: '235px', top: '10px', opacity: 1});
    }, 1300);
    setTimeout(function () {
        $(".four_map5").animate({width: '75px', height: '70px', left: '-85px', top: '65px', opacity: 1});
    }, 1400);
}

if (screenH > 800) {
    $('.column li a span span').on('mouseover', function () {
        $(this).css({transform: 'scale(0.8)', transition: ' 0.5s ease-out'});
    })
} else if (screenH < 800) {
    $('.column li a span span').on('mouseover', function () {
        $(this).css({transform: 'scale(1)', transition: ' 0.5s ease-out'});
    })
}
$('.column li a span').on('mouseout', function () {
    $(this).css({transform: '', transition: ' '});
})

