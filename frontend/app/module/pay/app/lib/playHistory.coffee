module.exports = ->
    $.ajax
        url: 'http://i.wan.liebao.cn/user/i?callback=jQuery1830021265525493104898_1467615901249&_=1467615901340'
        dataType: 'jsonp'
        cache: false
        success: (res) ->
            if res.code == 1
                console.log(res.data)
                pp = res.data.passport
                uid = res.data.uid
                userdata = res.data
                $('#form_passport_mainname').val res.data.passport
                $('#form_passport_mainname').attr 'uid', res.data.uid
                $.ajax
                    url: 'http://pay1.wan.liebao.cn/index.php/interface/gameapi/getPlayHistory/'
                    data:
                        pp: pp
                        uid: uid
                        webgame_id: 0
                        type: 'w'
                    dataType: 'jsonp'
                    cache: false
                    success: (res) ->
                        if res.code == 1
                            $('#gbox-history-subbox').html cf.rtp 'historyGame',
                                items: res.data
                        else
                            alert res.info