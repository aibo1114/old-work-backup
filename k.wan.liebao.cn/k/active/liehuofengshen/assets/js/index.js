if (ks_user != ' ' && ks_user.guest == 0) {
    $('.usercon').css({display: 'inline-block'})
    $('.user_register').css({display: 'none'})
    var passport = ks_user.passport;
    $('.username').text(passport);
} else if (ks_user == '' || ks_user.guest != 0) {
    $('.usercon').css({display: 'none'})
    $('.user_register').css({display: 'inline-block'})
}
;

//登录
$('.user_Login').on('click', function () {
    var Login_ = function () {
        return new SQ.LoginDialog({
            autoShow: !0,
            mask: !0
        })
    }
    Login_();
});

//收藏
$('.collects').on('click', function () {
    addfavorite();
})

$('.anchor ul li').on('click', function () {
    $('.anchor ul li').css({background: '#583329'})
    $(this).css({background: '#3F251E'})
})
