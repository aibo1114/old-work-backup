require './style/main.css'
require '../../../lib/main'

require './js/tab'
require './js/jquery.slideBox'

window.cf =
    tp: {}
    rtp: (tmpl, opt = {}) ->
        if _.isString tmpl
            unless cf.tp[tmpl]
                try
                    cf.tp[tmpl] = cf.loadTmpl(tmpl)
                catch
                    cf.tp[tmpl] = cf.loadLibTmpl(tmpl)

            tmpl = cf.tp[tmpl]

        tmpl $.extend opt, cf.tp.opt

cf.loadTmpl = (name) ->
    require "./tmpl/#{name}.jade"
cf.loadLibTmpl = (name) ->
    require "../../../lib/tmpl/#{name}.jade"
############################################################

localUrl = 'http://10.60.82.117:8096'
getHuntList = ->
    $.ajax
        url: localUrl + '/hunt/1/getMainPageData'
        type: 'GET'
        dataType: 'jsonp'
        crossDomain: true
        success: (res) ->
            $('.lb-listing').append cf.rtp 'liebaoRecord',
                items: res.info

getHuntList()
getPrizeList = ->
    $.ajax
        url: localUrl + '/hunt/1/get12OpenedUser'
        type: 'GET'
        dataType: 'jsonp'
        crossDomain: true
        success: (res) ->
            if res.data.length == 0
                $('.lb-zhongjiang').hide()
            else
                $('#zhongjianglist').append cf.rtp 'prizeList',
                    data: res.data
    setTimeout (->
        $('#zhongjianglist').slideBox
            direction: 'top'
            duration: 0.3
            easing: 'linear'
            delay: 5
            startIndex: 1
            width: 710
            height: 88
    ), 1000
getPrizeList()

##立即猎宝(支付流程)

#$('.lb-listing').delegate '.lb-immediatelyLiebao', 'click', ->
##var uid=ks_user.uid;
#    console.log(uid);
#    uid ='123'
#    console.log(uid);
#    pid = $(this).attr('pid')
#    tid = $(this).attr('tid')
#    buy = $(this).prev().find('input').val()
#    console.log pid + ' ' + tid + '========' + buy
#    if uid == undefined
#        helper.userLogin()
#    else
#        $.ajax
#            url: localUrl + '/hunt/1/getUserPrepareBuy?uid=' + uid + '&pid=' + pid + '&tid=' + tid + '&buy=' + buy
#            type: 'GET'
#            dataType: 'jsonp'
#            crossDomain: true
#            success: (res) ->
#                if res.ret == '1'
#                    $('.lb-mark').show()
#                    $('.lb-payInfo').show()
#                    $('.lb-jiesuan tbody').html cf.rtp 'statement'
##                    html = '<tr>' + '<td class="lb-goodsPay"><img src="images/zhanwei3.png">' + '<div>' + ' <h3>' + res.data.title + '</h3>' + '<h5>总需' + res.data.join_count + '人次参与，还剩' + res.data.join_remain + '人次</h5>' + '</div>' + '</td>' + '<td>' + res.data.price + '</td>' + '<td class="operation"><em class="op-plus">-</em>' + '<input type="text" value="' + res.data.my_join_count + '"> <em class="op-add">+</em>' + '</td>' + '<td>' + res.data.cost + '</td>' + '</tr>'
##                    $('.lb-jiesuan tbody').html html
##                    $('.lb-payconut span').html '<em>￥' + res.data.cost + '</em>'
##
#                    #支付
#                    $('.lb-jiesuan .lb-gotopay').on 'click', ->
#                        `var buy`
#                        buy = $('.operation input').val()
#                        console.log buy
#                        #确认订单接口
#                        $.ajax
#                            url: localUrl + '/hunt/1/getUserConfirmPay?uid=' + uid + '&pid=' + pid + '&tid=' + tid + '&buy=' + buy
#                            type: 'GET'
#                            dataType: 'jsonp'
#                            crossDomain: true
#                            success: (res) ->
#                                `var html`
#                                if res.ret == '1'
#                                    html = '<tr>' + '<td>' + res.data.title + '</td>' + '<td>' + res.data.period + '</td>' + '<td>' + res.data.price + '</td>' + '<td>' + res.data.unit_price + '</td>' + '<td>' + res.data.my_join_count + '</td>' + '<td>' + res.data.join_prd_num + '</td>' + '<td>' + res.data.cost + '</td>' + '</tr>'
#                                    $('.lb-zhifu tbody').html html
#                                    $('.lb-payconut span').html '<em>￥' + res.data.cost + '</em>'
#                                    $('.lb-jiesuan').hide()
#                                    $('.lb-zhifu').show()
#                                else
#                                    alert res.msg
#                               # return
#                        #是否有钱
#                        isHaveMoney()
#                        #return
#                else
#                    alert res.msg
#return
#return
#ti = require './mod/timer'
#ti(1)
getMoreover = ->
    $.ajax
        url: localUrl + '/hunt/1/getMoreOpenedInfo'
        type: 'GET'
        dataType: 'jsonp'
        crossDomain: true
        success: (res) ->
            $('.lbm-newList').append cf.rtp 'lotterying',
                items: res.data

#getMoreover()
getMore = ->
    $.ajax
        url: localUrl + '/hunt/1/getTodayOpeningInfo'
        type: 'GET'
        dataType: 'jsonp'
        crossDomain: true
        success: (res) ->
            $('.lbm-newList').append cf.rtp 'isTheLottery',
                items: res.data
        setTimeout getMoreover(), 50

getMore()

#中奖记录

gethuntPrize = (uid, page) ->
    $.ajax
        url: localUrl + '/hunt/1/getUserWinInfo?uid=' + uid + '&page=' + page
        type: 'GET'
        dataType: 'jsonp'
        crossDomain: true
        success: (res) ->
            if res.data != ''
                $('.lb-hunt').html cf.rtp 'statement',
                    items:res.datd
                $('.lb-zhongjiangList').html html
                $('.lb-zhongjiangList').attr 'total', res.totalPage
            else
                $('.lb-table').hide()
                $('.lb-table').next().hide()
                $('.lb-weizhongjiang').show()
            return
    return

###*
# Created by Administrator on 2016/5/11.
###

#localUrl = 'http://10.60.82.117:8096'
#onUrl = 'http://10.60.82.117:8096'
#helper = {}
#ks_user = helper.data
##alert(helper.data);
#
#gethunt = (uid, page) ->
#    $.ajax
#        url: localUrl + '/hunt/1/getUserHuntInfo?uid=' + uid + '&page=' + page
#        type: 'GET'
#        dataType: 'jsonp'
#        crossDomain: true
#        success: (res) ->
## console.log(res);
## console.log(res.data.length);
#            if res.data != ''
#                html = ''
#                i = 0
#                while i < res.data.length
##if(res.data[i].status=='3'){
#                    html += '<tr class="bdbt">' + '<td class="lb-goodsshare"><img src="images/zhanwei3.png">'
#                    if res.data[i].status == '3'
#                        html += '<div class="lb-overdiv">' + '<h3>' + res.data[i].title + '</h3>' + '<h4>获得者：<em>' + res.data[i].winner_nickname + '</em>  (本期参与 <span>' + res.data[i].hunt_num + '</span>人次)</h4>' + '<h5>幸运代码：<em>' + res.data[i].win_num + '</em></h5>' + '<h6>揭晓时间：' + res.data[i].otime + '</h6>' + '</div>' + '</td>' + '<td>' + res.data[i].period_id + '</td>' + '<td>' + res.data[i].hunt_num + '</td>' + '<td >已揭晓</td>' + '</tr>'
#                    else
#                        html += '<div>' + '<h3>' + res.data[i].title + '</h3>' + '<h5>揭晓时间：' + res.data[i].otime + '</h5>' + '<h6>敬请期待</h6>' + '</div>' + '</td>' + '<td>' + res.data[i].period_id + '</td>' + '<td>' + res.data[i].hunt_num + '</td>' + '<td class="lb-waiting">待揭晓</td>' + '</tr>'
#                    i++
#                $('.lb-hunt').html html
#                $('.lb-hunt').attr 'total', res.totalPage
#            else
#                $('.lb-molb-tab').hide()
#                $('.lb-molb-tab').next().hide()
#                $('.lb-molb').show()
#            return
#    return
#
##中奖记录
#
#gethuntPrize = (uid, page) ->
#    $.ajax
#        url: localUrl + '/hunt/1/getUserWinInfo?uid=' + uid + '&page=' + page
#        type: 'GET'
#        dataType: 'jsonp'
#        crossDomain: true
#        success: (res) ->
## console.log(res);
## console.log(res.data.length);
#            if res.data != ''
#                html = ''
#                i = 0
#                while i < res.data.length
#                    html += '<tr class="bdbt">' + '<td class="lb-goodsshare"><img src="images/zhanwei3.png">' + '<div class="lb-overdiv">' + '<h3>' + res.data[i].title + '</h3>' + '<h4>(本期参与 <span>' + res.data[i].hunt_num + '</span>人次)</h4>' + '<h5>幸运代码：<em>' + res.data[i].win_num + '</em></h5>' + '<h6>揭晓时间：' + res.data[i].otime + '</h6>' + '</div>' + '</td>' + '<td>' + res.data[i].period_id + '</td>'
#                    if res.data[i].is_get == '0'
#                        html += '<td class="lb-tapget" get_type="' + res.data[i].get_type + '" tid="' + res.data[i].treasure_id + '" pid="' + res.data[i].period_id + '">领取奖品</td>'
#                    else if res.data[i].is_get == '1'
#                        if res.data[i].get_type == '0'
#                            html += '<td class="lb-gettel"><h6>手机号：' + res.data[i].phone + '</h6><span>已领取</span></td>'
#                        else if res.data[i].get_type == '1'
#                            html += '<td class="lb-gettel"><h6>游戏名称：' + res.data[i].game_name + '</h6><h6>服务器名称：' + res.data[i].server_name + '</h6><h6>角色名称：' + res.data[i].role_name + '</h6><h6>元宝：' + res.data[i].role_name + '</h6><span>已领取</span></td>'
#                    html += '</tr>'
#                    i++
#                $('.lb-zhongjiangList').html html
#                $('.lb-zhongjiangList').attr 'total', res.totalPage
#            else
#                $('.lb-table').hide()
#                $('.lb-table').next().hide()
#                $('.lb-weizhongjiang').show()
#            return
#    return
#
##首页猎宝记录
#
#
##获取中奖信息
#
#getPrizeList = ->
#    $.ajax
#        url: localUrl + '/hunt/1/get12OpenedUser'
#        type: 'GET'
#        dataType: 'jsonp'
#        crossDomain: true
#        success: (res) ->
##console.log(JSON.stringify(res)+'============');
##console.log(res.data.length+'============');
#            if res.data.length == 0
#                $('.lb-zhongjiang').hide()
#            else
#                html = ''
#                i = 0
#                while i < res.data.length
#                    html += '<li class="active">'
#                    j = 0
#                    while j < res.data[i].length
#                        html += '<div class="lb-zhonglist"><img src="images/zhanwei1.png">' + '<div class="lb-zhonglist-right"><span>' + res.data[i][j].winner_nickname + '</span><span class="flrspan">' + res.data[i][j].otime + '</span>' + '<h5><b>' + res.data[i][j].hunt_num + '</b>人次  猎得 ' + res.data[i][j].title + '</h5>' + '<h5>总需：' + res.data[i][j].join_count + '人次</h5>' + '</div>' + '</div>'
#                        j++
#                    html += '</li>'
#                    i++
#                $('.items').prepend html
#            return
#    setTimeout (->
#        $('#zhongjianglist').slideBox
#            direction: 'top'
#            duration: 0.3
#            easing: 'linear'
#            delay: 5
#            startIndex: 1
#            width: 710
#            height: 88
#        return
#    ), 1000
#    return
#
##第二页<span class="time lbm-f">0</span><span class="time">0</span><span class="commer">:</span><span class="time">0</span><span class="time">0</span><span class="commer">:</span><span class="time">0</span><span class="time">0</span>
#
#getMore = ->
#    $.ajax
#        url: localUrl + '/hunt/1/getTodayOpeningInfo'
#        type: 'GET'
#        dataType: 'jsonp'
#        crossDomain: true
#        success: (res) ->
#            `var i`
#            # console.log(res.data.length);
#            html = ''
#            timeArr = undefined
#            wait = []
#
#            time = (wait) ->
#                if wait == 0
#                    wait = wait
#                else
#                    wait--
#                    timeArr = formatSeconds(wait)
#                    tstr = '<b class="time lbm-f">' + timeArr[0] + '</b><b class="time">' + timeArr[1] + '</b><b class="commer">:</b><b class="time">' + timeArr[3] + '</b><b class="time">' + timeArr[4] + '</b><b class="commer">:</b><b class="time">' + timeArr[6] + '</b><b class="time">' + timeArr[7] + '</b>'
#                    $('.sec-contdown' + i).html tstr
#                    setTimeout (->
#                        time wait
#                        return
#                    ), 1000
#                    return timeArr
#                return
#
#            i = 0
#            while i < res.data.length
#                wait.push res.data[i].rest_second
#                html += '<li>' + '<div class="lbm-listing-del">' + '<div class="lbm-img"><img src="images/chongzika.png"></div>' + '<div class="lbm-listdel">' + '<h2>' + res.data[i].title + '</h2>' + '<h3>总需：' + res.data[i].join_count + '人次</h3>' + '<h4>期号：' + res.data[i].id + '</h4>' + '</div>' + '<div class="clear"></div>' + '</div>' + '<div class="lbm-overtime">' + '<p id="retroclockbox1">揭晓倒计时<span class="sec-contdown' + i + '" time="' + res.data[i].rest_second + '"></span></p>'
#                #<b class="time lbm-f">'+timeArr[0]+'</b><span class="time">'+timeArr[1]+'</span><b class="commer">:</b><b class="time">'+timeArr[3]+'</b><b class="time">'+timeArr[4]+'</b><b class="commer">:</b><b class="time">'+timeArr[6]+'</b><b class="time">'+timeArr[7]+'</b>
#                '</div>' + '<div class="clear"></div>' + '</li>'
#                i++
#            $('.lbm-listing-ing').prepend html
#            #for(var i=0;i<res.data.length;i++){
#            console.log wait
#            #      var wait=$('.sec-contdown'+i).attr('time');
#            console.log wait
#            i = 0
#            while i < wait.length
#                time wait[i]
#                #time(wait[i+1]);
#                wait++
#            # time(wait1);
#            return
#    return
#
#getMoreover = ->
#    $.ajax
#        url: localUrl + '/hunt/1/getMoreOpenedInfo'
#        type: 'GET'
#        dataType: 'jsonp'
#        crossDomain: true
#        success: (res) ->
## console.log(res.data.length);
#            html = ''
#            i = 0
#            while i < res.data.length
#                html += '<li>' + '<div class="lbm-listing-del">' + '<div class="lbm-img"><img src="images/chongzika.png"></div>' + '<div class="lbm-listdel">' + '<h2>' + res.data[i].title + '</h2>' + '<h3>总需：<em>' + res.data[i].join_count + '</em>人次</h3>' + '<h4>期号：' + res.data[i].id + '</h4>' + '</div>' + '<div class="clear"></div>' + '</div>' + '<div class="lbm-lastLottery">' + '<p class="lb-firstLine">' + '<span class="lb-first">恭喜 <b>' + res.data[i].winner_nickname + '</b> 获得了本期商品</span><span class="lb-sed">本期参与：<span>' + res.data[i].hunt_num + '</span>人次</span>' + '</p>' + '<p class="lb-sendLine"><span class="lb-first">揭晓时间：' + res.data[i].otime + '</span><span class="lb-sed">幸运号码：<span>' + res.data[i].win_num + '</span></span></p>' + '</div>' + '</li>'
#                i++
#            $('.lbm-listing-ing').prepend html
#            return
#    setTimeout getMore(), 5
#    return
#
##倒计时
#
#formatSeconds = (value) ->
#    `var result`
#    theTime = parseInt(value)
#    # 秒
#    theTime1 = 0
#    # 分
#    theTime2 = 0
#    # 小时
#    if theTime > 60
#        theTime1 = parseInt(theTime / 60)
#        theTime = parseInt(theTime % 60)
#        if theTime1 > 60
#            theTime2 = parseInt(theTime1 / 60)
#            theTime1 = parseInt(theTime1 % 60)
#    if theTime < 10
#        result = '0' + parseInt(theTime) + ''
#    else
#        result = '' + parseInt(theTime) + ''
#    if theTime1 > 0
#        if theTime1 < 10
#            result = '0' + parseInt(theTime1) + ':' + result
#        else
#            result = +parseInt(theTime1) + ':' + result
##result = ""+parseInt(theTime1)+":"+result;
#    else
#        result = '0' + '0' + ':' + result
#    if theTime2 > 0
#        if theTime2 < 10
#            result = '0' + parseInt(theTime2) + ':' + result
#        else
#            result = +parseInt(theTime2) + ':' + result
#    else
#        result = '0' + '0' + ':' + result
#    #console.log(result.split(''));
#    result.split ''
#
##是否中奖信息提示
#
#isPrize = ->
#   # console.log ks_user.uid
#    ks_user.uid='123'
#    if ks_user.uid != '' and ks_user.uid != undefined
#        $.ajax
#            url: 'http://hunt.wan.liebao.cn/hunt/1/sessionSave'
#            type: 'GET'
#            dataType: 'jsonp'
#            crossDomain: true
#            success: (res) ->
#                console.log res
#                if res.ret == '1'
#                    $.ajax
#                        url: 'http://hunt.wan.liebao.cn/hunt/1/getUserWinState'
#                        type: 'GET'
#                        dataType: 'jsonp'
#                        crossDomain: true
#                        success: (res) ->
#                            console.log res
#                            if res.ret == '1'
#                                $('.lb-congratulationsPrize').show()
#                                $('.lb-mark').show()
#                            return
#                return
#    return
#
##首页正在开奖
#
#getBeingRevealed = ->
#    $.ajax
#        url: localUrl + '/hunt/1/getOpeningPeriod'
#        type: 'GET'
#        dataType: 'jsonp'
#        crossDomain: true
#        success: (res) ->
#
#            time = (wait) ->
#                if wait == 0
#                    wait = wait
#                else
#                    wait--
#                    timeArr = formatSeconds(wait)
#                    tstr = '<b class="time lbm-f">' + timeArr[0] + '</b><b class="time">' + timeArr[1] + '</b><b class="commer">:</b><b class="time">' + timeArr[3] + '</b><b class="time">' + timeArr[4] + '</b><b class="commer">:</b><b class="time">' + timeArr[6] + '</b><b class="time">' + timeArr[7] + '</b>'
#                    $('.lb-countDown').html tstr
#                    setTimeout (->
#                        time wait
#                        return
#                    ), 1000
#                    return timeArr
#                return
#
#            console.log res.data
#            wait = res.data.rest_second
#            time wait
#            html = ''
#            html = '<li>' + '<div class="lb-listing-del">' + '<div class="lb-img"><img src="images/zhanwei.png">' + '<div class="clear"></div>' + '</div>' + '<div class="flr lb-rwid">' + '<h2>' + res.data.title + '</h2>' + '<h3>' + res.data.desc + '</h3>' + '<div class="lb-listing-zongxu"><span class="lb-comspan">总需' + res.data.join_count + '人次</span><span class="lb-comspan flr">100%</span></div>' + '<div class="lb-wanchen">' + '<div class="ingDiv"></div><span class="lb-comspan">剩余 0 人次</span>' + '<div class="clear"></div></div>' + '<p class="lb-qihao">期号：' + res.data.pid + '<span>（每满总需人次，即抽取1人获得该商品）</span></p>' + '<p class="lb-ing">正在揭晓</p>' + '<div class="clear"></div>' + '</div>' + '<div class="clear"></div>' + '<div class="lb-overtime">' + '<p>揭晓倒计时<span class="magspan">期号：' + res.data.pid + '</span><span class="lb-countDown"><b class="time">0</b><b class="time">0</b><b class="commer">:</b><b class="time">0</b><b class="time">0</b><b class="commer">:</b><b class="time">0</b><b class="time">0</b></span></p>' + '</div>' + '</li>'
#            $('.lb-listing-ing').prepend html
#            return
#    return
#
#isHaveMoney = ->
#    $.ajax
#        url: 'http://pay1.wan.liebao.cn/index.php/platform/balance'
#        type: 'GET'
#        dataType: 'jsonp'
#        crossDomain: true
#        success: (res) ->
#            console.log res
#            if res.ret == '1'
#                $('.lb-fangshi').html '支付方式: 平台币（' + res.data.balance + '）'
#                if res.data.balance == '0'
#                    $('.lb-error').show()
#                    $('.lb-zhifu .lb-gotopay ').addClass 'bgcc'
#            else
#                alert res.msg
#            return
#    return
#
#isHasHunt = ->
#    lilen = $('.lbm-listing-ing').find('li').length
#    if lilen == '0'
#        $('.lbm-listing-ing').html '<h1>活动正在火热进行中，尽情期待！</h1>'
#    return
#
#helper.data = ks_user
## $('.lg-icon').text(ks_user.nickname);
## $('.lg-icon').addClass('bdn');
#
#helper.userLogin = ->
#    data = @data
#    if !data or data.length == 0
#        Login.show()
#    else
#        $('.lg-icon').text ks_user.nickname
#        $('.lg-icon').addClass 'bdn'
#    return
#
##helper.userLogin();
#
#helper.userLogin1 = ->
#    data = @data
#    if !data or data.length == 0
##Login.show();
#    else
#        $('.lg-icon').text ks_user.nickname
#        $('.lg-icon').addClass 'bdn'
#    return
#
#helper.userLogin1()
##uid = ks_user.uid
#uid = 123
#$ ->
#    $('#normaltab').tabso
#        cntSelect: '#normalcon'
#        tabEvent: 'mouseover'
#        tabStyle: 'normal'
#    return
#$('.lg-icon').on 'click', ->
#    helper.userLogin()
#    return
#$('.lg-me').hover (->
#    $('.lg-inner').show()
#    return
#), ->
#    $('.lg-inner').hide()
#    return
#$('.lb-game em').on 'click', ->
#    $(this).parent().hide()
#    $('.lb-doublemark').hide()
#    return
#$('.lb-tel em').on 'click', ->
#    $(this).parent().hide()
#    $('.lb-doublemark').hide()
#    return
#$('.lb-back').on 'click', ->
#    $('.lb-jilv').hide()
#    $('.lb-mark').hide()
#    return
#$('.lb-backtop').on 'click', ->
#    $('.lb-jilv').hide()
#    $('.lb-mark').hide()
#    return
##lb-congratulationsPrizelb-return
#$('.lb-congratulationsPrize span').on 'click', ->
#    $(this).parent().hide()
#    $('.lb-mark').hide()
#    return
#$('.lb-return').on 'click', ->
##helper.userLogin();
#    $('.lb-payInfo').hide()
#    $('.lb-mark').hide()
#    return
#$('.liebaojilv').on 'click', ->
#
#    helper.userLogin = ->
#        data = @data
#        if !data or data.length == 0
#            Login.show()
#        else
#            gethuntPrize uid, '1'
#            gethunt uid, '1'
#            $('.lb-mark').show()
#            $('.lb-jilv').show()
#            $('#normaltab').find('li').eq('0').addClass('current').siblings().removeClass 'current'
#            $('#normalcon').find('.sublist').eq('0').css('display', 'block').siblings().css 'display', 'none'
#        return
#
#    helper.userLogin()
#    return
#$('.zhongjiangjilu').on 'click', ->
#    helper.userLogin = ->
#        `var uid`
#        data = @data
#        if !data or data.length == 0
#            Login.show()
#        else
#            uid = ks_user.uid
#            gethuntPrize uid, '1'
#            gethunt uid, '1'
#            $('.lb-mark').show()
#            $('.lb-jilv').show()
#            $('#normaltab').find('li').eq('1').addClass('current').siblings().removeClass 'current'
#            $('#normalcon').find('.sublist').eq('1').css('display', 'block').siblings().css 'display', 'none'
#        return
#
#    helper.userLogin()
#    return
#$('.lb-plus').on 'click', ->
#    console.log '333'
#    inVal = parseInt($(this).next('input').val())
#    console.log inVal
#    if inVal > 1
#        sum = inVal - 1
#        $(this).next('input').val sum
#    return
#$('.lb-add').on 'click', ->
#    console.log '333'
#    inVal = parseInt($(this).prev('input').val())
#    console.log inVal
#    sum = inVal + 1
#    $(this).prev('input').val sum
#    return
#$('.op-plus').on 'click', ->
##console.log("333");
#    inVal = parseInt($(this).next('input').val())
#    # console.log(inVal);
#    if inVal > 1
#        sum = inVal - 1
#        $(this).next('input').val sum
#        $(this).parent().next().text sum
#        $('.lb-payconut span').html '<em>￥' + sum + '</em>'
#    return
#$('.op-add').on 'click', ->
#    console.log '333'
#    inVal = parseInt($(this).prev('input').val())
#    console.log inVal
#    sum = inVal + 1
#    $(this).prev('input').val sum
#    $(this).parent().next().text sum
#    $('.lb-payconut span').html '<em>￥' + sum + '</em>'
#    return
#$('.lb-congratulationsPrize span').on 'click', ->
#    $('.lb-congratulationsPrize').hide()
#    $('.lb-mark').hide()
#    return
##分页
##中奖纪录
#$('.next-prize').on 'click', ->
#    pageCurren = parseInt($(this).prev().text())
#    total = $('.lb-zhongjiangList').attr('total')
#    if pageCurren < total
#        page = pageCurren + 1
#        $(this).prev().text page
#        # gethuntPrize('123',page);
#        gethuntPrize uid, page
#    return
#$('.pre-prize').on 'click', ->
#    pageCurren = parseInt($(this).next().text())
#    if pageCurren > 1
#        page = pageCurren - 1
#        $(this).next().text page
#        gethuntPrize uid, page
#    return
#$('.last-prize').on 'click', ->
#    pageCurren = parseInt($(this).prev().prev().text())
#    # var page=pageCurren-1;
#    page = $('.lb-zhongjiangList').attr('total')
#    if pageCurren <= page
#        $(this).prev().prev().text page
#        gethuntPrize uid, page
#    return
##猎宝记录 分页
## var uid=ks_user.uid;
#$('.lb-n-hunt').on 'click', ->
#    pageCurren = parseInt($(this).prev().text())
#    total = $('.lb-hunt').attr('total')
#    if pageCurren < total
#        page = pageCurren + 1
#        $(this).prev().text page
#        gethunt uid, page
#    #gethunt('123',page);
#    return
#$('.lb-pre-hunt').on 'click', ->
##var uid=ks_user.uid;
#    pageCurren = parseInt($(this).next().text())
#    if pageCurren > 1
#        page = pageCurren - 1
#        $(this).next().text page
#        gethunt uid, page
#    #gethunt('123',page);
#    return
#$('.lb-l-hunt').on 'click', ->
#    pageCurren = parseInt($(this).prev().prev().text())
#    # var page=pageCurren-1;
#    page = $('.lb-hunt').attr('total')
#    if pageCurren <= page
#        $(this).prev().prev().text page
#        #gethunt('123',page);
#        gethunt uid, page
#    return
##显示提交信息
#$('.lb-tapget').on 'click', (e) ->
##var uid=ks_user.uid;
##var uid='123';
#    get_type = $(this).attr('get_type')
#    pid = $(this).attr('pid')
#    tid = $(this).attr('tid')
#    $('.lb-doublemark').show()
#    target = e.target or e.srcElement
#    if get_type == '0'
#        $('.lb-tel').show()
#        #提交电话号码
#        $('.lb-tel-sub').on 'click', ->
#            phone = $('.phone').val()
#            $.ajax
#                url: localUrl + '/hunt/1/cmtWinUserInfo?uid=' + uid + '&pid=' + pid + '&tid=' + tid + '&get_type=' + get_type + '&phone=' + phone
#                type: 'GET'
#                dataType: 'jsonp'
#                crossDomain: true
#                success: (res) ->
#                    if res.ret == '1'
#                        $('.lb-tel').hide()
#                        $('.lb-doublemark').hide()
#                        $(target).removeClass 'lb-tapget'
#                        $(target).addClass 'lb-gettel'
#                        $(target).html '<h6>手机号：' + res.data.phone + '</h6><span>已领取</span>'
#                    else
#                        alert res.msg
#                    return
#            return
#    else if get_type == '1'
#        $('.lb-game').show()
#        $('.lb-tel-sub').on 'click', ->
#            gname = $('.gameName').val()
#            sname = $('.lb-service').val()
#            rname = $('.lb-roleNme').val()
#            $.ajax
#                url: localUrl + '/hunt/1/cmtWinUserInfo?uid=' + uid + '&pid=' + pid + '&tid=' + tid + '&get_type=' + get_type + '&sname=' + sname + '&gname=' + gname + '&rname=' + rname
#                type: 'GET'
#                dataType: 'jsonp'
#                crossDomain: true
#                success: (res) ->
#                    if res.ret == '1'
#                        console.log res.data
#                        $('.lb-game').hide()
#                        $('.lb-doublemark').hide()
#                        $(target).html '<h6>游戏名称：' + res.data.game_name + '</h6><h6>服务器名称：' + res.data.server_name + '</h6><h6>角色名称：' + res.data.role_name + '</h6><h6>元宝：' + res.data.num + '</h6><span>已领取</span>'
#                        $(target).removeClass 'lb-tapget'
#                        $(target).addClass 'lb-gettel'
#                    else
#                        alert res.msg
#                    return
#            return
#    return
##立即猎宝(支付流程)
#$('.lb-immediatelyLiebao').on 'click', ->
##var uid=ks_user.uid;
##console.log(uid);
#    pid = $(this).attr('pid')
#    tid = $(this).attr('tid')
#    buy = $(this).prev().find('input').val()
#    console.log pid + ' ' + tid + '========' + buy
#    if uid == undefined
#        helper.userLogin()
#    else
#        $.ajax
#            url: localUrl + '/hunt/1/getUserPrepareBuy?uid=' + uid + '&pid=' + pid + '&tid=' + tid + '&buy=' + buy
#            type: 'GET'
#            dataType: 'jsonp'
#            crossDomain: true
#            success: (res) ->
#                if res.ret == '1'
#                    html = '<tr>' + '<td class="lb-goodsPay"><img src="images/zhanwei3.png">' + '<div>' + ' <h3>' + res.data.title + '</h3>' + '<h5>总需' + res.data.join_count + '人次参与，还剩' + res.data.join_remain + '人次</h5>' + '</div>' + '</td>' + '<td>' + res.data.price + '</td>' + '<td class="operation"><em class="op-plus">-</em>' + '<input type="text" value="' + res.data.my_join_count + '"> <em class="op-add">+</em>' + '</td>' + '<td>' + res.data.cost + '</td>' + '</tr>'
#                    $('.lb-jiesuan tbody').html html
#                    $('.lb-payconut span').html '<em>￥' + res.data.cost + '</em>'
#                    $('.lb-mark').show()
#                    $('.lb-payInfo').show()
#                    #支付
#                    $('.lb-jiesuan .lb-gotopay').on 'click', ->
#                        `var buy`
#                        buy = $('.operation input').val()
#                        console.log buy
#                        #确认订单接口
#                        $.ajax
#                            url: localUrl + '/hunt/1/getUserConfirmPay?uid=' + uid + '&pid=' + pid + '&tid=' + tid + '&buy=' + buy
#                            type: 'GET'
#                            dataType: 'jsonp'
#                            crossDomain: true
#                            success: (res) ->
#                                `var html`
#                                if res.ret == '1'
#                                    html = '<tr>' + '<td>' + res.data.title + '</td>' + '<td>' + res.data.period + '</td>' + '<td>' + res.data.price + '</td>' + '<td>' + res.data.unit_price + '</td>' + '<td>' + res.data.my_join_count + '</td>' + '<td>' + res.data.join_prd_num + '</td>' + '<td>' + res.data.cost + '</td>' + '</tr>'
#                                    $('.lb-zhifu tbody').html html
#                                    $('.lb-payconut span').html '<em>￥' + res.data.cost + '</em>'
#                                    $('.lb-jiesuan').hide()
#                                    $('.lb-zhifu').show()
#                                else
#                                    alert res.msg
#                                return
#                        #是否有钱
#                        isHaveMoney()
#                        return
#                else
#                    alert res.msg
#                return
#    return
## $('.lb-jiesuan .lb-gotopay').on('click',function(){
##     $('.lb-jiesuan').hide();
##     $('.lb-zhifu').show();
## })
##返回清单
#$('.goback').on 'click', ->
#    $('.lb-jiesuan').show()
#    $('.lb-zhifu').hide()
#    return
#$('.lb-error').on 'click', ->
#    $(this).html '显示余额>>'
#    $(this).addClass 'getMoney'
#    $(this).removeClass 'lb-error'
#    $(this).next().removeClass 'bgcc'
#    return
#
#
#$('.getMoney').on 'click', ->
#
#    $.ajax
#        url: 'http://pay1.wan.liebao.cn/index.php/platform/balance'
#        type: 'GET'
#        dataType: 'jsonp'
#        crossDomain: true
#        success: (res) ->
#            if res.ret == '1'
#                $('.lb-fangshi').html '支付方式: 平台币（' + res.data.balance + '）'
#                if res.data.balance == '0'
## $('.lb-error').show();
#                    $(this).html '<a href="http://wan.liebao.cn/pay/" target="_blank">  余额不足，点击充值&gt;&gt;</a>'
#                    $(this).removeClass 'lb-error'
#                    $(this).addClass 'getMoney'
#                    $('.lb-zhifu .lb-gotopay ').addClass 'bgcc'
#            else
#                alert res.msg
#
#
#
##getOurMoney();
##function getOurMoney(){
##getHuntList()
#getPrizeList()
#isPrize()
#getBeingRevealed()
#getMoreover()
#isHasHunt()