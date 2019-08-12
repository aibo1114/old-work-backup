r = (file)->
    require "./data/#{file}"

module.exports =

    community:
        code: code
        name: '暖暖'
        resPath: if app.env then '/res' else 'http://ns.activity.liebao.cn'
        url: if app.env then 't.nn.com' else 'nn.activity.liebao.cn'

    data:
#        'role:title': r 'role'
        'meta:code': r 'meta'

    member: [
        "#{code},admin"
    ]