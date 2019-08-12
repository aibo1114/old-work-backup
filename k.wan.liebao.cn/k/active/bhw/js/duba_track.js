$(function() {
    function a(a) {
        var b = "https://j.wan.liebao.cn/game/recent_invoked_by_frontend?v=2&limit=5&callback=?";
        $.ajax({
            type: "GET",
            url: b,
            dataType: "jsonp",
            jsonpCallback: "recent_play"
        })
    }
    window.recent_play = function(a) {
        var b, c;
        if (a && 1 == a.code && a.data.length >= 1) {
            window.location.search.toLowerCase();
            var d = a.data.length > 4 ? 4 : a.data.length,
            e = a.mygame.icon,
            f = a.mygame.text,
            g = a.mygame.url;
            f = f || "我的游戏",
            g = g || "http://wan.liebao.cn/?frm=dbdh-mygamex",
            e = "" == e ? "": '<img src="' + e + '" />';
            var h = "";
            h += '<div class="mg_bar">',
            h += "" + e + '<a href="' + g + '" target="_blank">' + f + '</a><i class="mg_btn"></i>',
            h += "</div>",
            h += '<div class="titInfo">您好：<a href="' + a.links.user.url + '" target="_blank">' + a.links.user.text + "</a></div>",
            h += '<div class="titInfo">积分：<a href="' + a.links.credit.url + '" target="_blank">' + a.links.credit.text + "</a></div>",
            h += '<div class="titInfoa"><a href="' + a.links.sign.url + '" class="orange" target="_blank">' + a.links.sign.text + '</a><a href="' + a.links.exchange.url + '" class="gray" target="_blank">' + a.links.exchange.text + "</a></div>",
            h += '<div class="titInfo"><a class="nocolor" href="' + a.links.login.url + '" target="_blank">' + a.links.login.text + "</a></div>",
            h += "<ul>";
            for (var i = 0; d > i; i++) h += '<li><a href="' + a.data[i].play_url + '" target="_blank"><img src="' + a.data[i].icon1 + '" /><strong>' + a.data[i].game_name + "</strong><i>" + a.data[i].server_name + "</i></a></li>";
            h += "</ul>";
            var j = document.createElement("div");
            j.id = "mygame",
            document.getElementsByTagName("body")[0].appendChild(j),
            document.getElementById("mygame").innerHTML = h,
            h = "<i>" + d + "</i>";
            var j = document.createElement("div");
            j.id = "mg_s_icon",
            document.getElementsByTagName("body")[0].appendChild(j),
            document.getElementById("mg_s_icon").innerHTML = h,
            bindGameEvent(),
            findDimensions(),
            $(window).resize(function(a) {
                findDimensions(b, 0)
            })
        }
    },
    window.bindGameEvent = function(a, b) {
        var c = $("#mygame").height();
        $(".mg_btn").click(function() {
            var d = $("#mygame"),
            e = $(".mg_btn"),
            f = e.attr("class");
            "mg_btn" == f ? ("zp" == $("#mg_s_icon").attr("class") ? (d.animate({
                height: "0",
                width: "0"
            },
            300), $("#mg_s_icon").show(300)) : d.animate({
                height: "30px",
                width: "118px"
            },
            300), e.addClass("mg_btn_show")) : (d.animate({
                height: c,
                width: "156px"
            },
            300), e.removeClass("mg_btn_show")),
            $("#mg_s_icon").children("i").hide()
        }),
        $("#mg_s_icon").click(function() {
            var b = $("#mygame");
            b.css("display", "block"),
            b.animate({
                height: c,
                width: "156px"
            },
            300),
            $(".mg_btn").removeClass("mg_btn_show"),
            $("#mg_s_icon").hide()
        })
    },
    window.findDimensions = function(a, b) {
        a ? ($("#mg_s_icon").css("display", "block"), $("#mg_s_icon").removeClass("zp"), $("#mygame").css("display", "none")) : ($("#mg_s_icon").css("display", "none"), $("#mygame").css("display", "block"), $("#mg_s_icon").addClass("zp"))
    },
    a()
});