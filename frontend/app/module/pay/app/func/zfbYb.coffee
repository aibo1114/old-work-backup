submit = ->
    webgame_id = $('#g-select-btn').attr('data-gid')
    $('#form_webgame_id').val webgame_id
    webgame_name = $('#g-select-btn').text()
    $('#form_webgame_name').val webgame_name
    webgame_serverid = $('#s-select-btn').attr('data-sid')
    $('#form_webgame_serverid').val webgame_serverid
    webgame_servername = $('#s-select-btn').text()
    $('#form_webgame_servername').val webgame_servername
    platform_name = $('#nav .nav-li-a-select a').text()
    $('#form_platform_name').val platform_name
    platform_sub_id = $('input:radio[name=\'bank\']').val()
    $('#form_platform_sub_id').val platform_sub_id
    isChecked = $('#cost-custom').prop('checked')
    console.log(isChecked + '   1111');
    if isChecked
        costValue = $('#cost-custom-text').val()
        if costValue > 10 and costValue < 100000
            $('#form_pay_amount').val costValue
        else
            alert '111'
            return
    else
        pay_amount = $('input[name="cost"]:checked').val()
        console.log(pay_amount)
        $('#form_pay_amount').val pay_amount



module.exports =
    routes:
        'zfb': 'zfb'
        'yb': 'yb'

    zfb: ->
        new cf.view._tag
            parent: @ctn
            tmpl: 'zfb'
            data:
                title: '支付宝'
                bank: require '../data/zfbBank'
                money: require '../data/cashAmount'

#            $('#paybtn').on 'click', submit
            'click #paybtn': (e)->
                console.log('111')
                $.ajax
                    url: 'http://pay1.wan.liebao.cn/index.php/api/getRoleList?pp=kswl710553911&gid=1052&sid=1497&_=1467430323053'
#                        data:
#                            pp: userinfo.pp
#                            gid: gameinfo.g
#                            sid: gameinfo.s
                    dataType: 'jsonp'
                    cache: false
                    success: (json) ->
                        if json.code == 1
                            submit()
                            roles_data = json.data
                            roles_num = roles_data.length
                            roles = []
                            if roles_num == 1
# display up limit, 1 for temp
                                try
                                    roles.push decodeURIComponent(roles_data[0].actor_name)
                                catch e
# unexcept role name
                                    roles.push roles_data[0].actor_name
                            roles = roles.join(', ')
                            util.confirmBox 'charge_info', roles: roles
                        else
                            util.confirmBox 'empty_role'
                        return
        #                        complete: ->
        #                            $this.removeClass 'paybtn_disable'
        #                            return
        #                        error: ->
        $('#bank_ali-cost-300').prop 'checked', true
        $('#bank_ali-bank-8').prop 'checked', true

    yb: ->
        new cf.view._tag
            parent: @ctn
            tmpl: 'zfb'
            data:
                title: '支付宝'
                bank: require '../data/ybBank'
                money: require '../data/cashAmount'
            events:
                'click #paybtn': (e)->
                    gid = $('#g-select-btn').attr('data-gid')
                    sid = $('#s-select-btn').attr('data-sid')
                    pp = $('#form_passport_mainname').val()
                    console.log(gid);
                    console.log(sid);
                    $.ajax
                        url: 'http://pay1.wan.liebao.cn/index.php/api/getRoleList'
                        data:
                            pp: pp
                            gid: sid
                            sid: gid
#                        url:'http://pay1.wan.liebao.cn/index.php/api/getRoleList?pp=kswl710553911&gid=1052&sid=1497&_=1467692739700'
                        dataType: 'jsonp'
                        cache: false
                        success: (json) ->
                            if json.code == 1
                                submit()
                                roles_data = json.data
                                roles_num = roles_data.length
                                roles = []
                                if roles_num == 1
# display up limit, 1 for temp
                                    try
                                        roles.push decodeURIComponent(roles_data[0].actor_name)
                                    catch e
# unexcept role name
                                        roles.push roles_data[0].actor_name
                                roles = roles.join(', ')
                                util.confirmBox 'charge_info', roles: roles
                            else
                                util.confirmBox 'empty_role'
                            return


        $('#bank_ali-cost-300').prop 'checked', true
        $('#bank_ali-bank-CMBCHINA-NET-B2C').prop 'checked', true