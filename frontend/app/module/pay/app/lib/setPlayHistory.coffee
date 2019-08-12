module.exports = ->
    $.ajax
        url: 'http://pay1.wan.liebao.cn/index.php/interface/gameapi/getPlayHistory/'
        data:
            pp: ''
            uid: ''
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

    #所有游戏
    $.ajax
        url: 'http://pay1.wan.liebao.cn/index.php/interface/gameapi/apiAllGame?webgame_id=0&op_supplier_id=0&type=w&_=1467088951951'
        dataType: 'jsonp'
        cache: false
        success: (res) ->
            if res.code == 1
                $('.overview').html cf.rtp 'overview',
                    items: res.data
            else
                alert res.info