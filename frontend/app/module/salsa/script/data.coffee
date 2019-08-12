r = (file)->
    require "./data/#{file}"
module.exports = 
    data:
        'community:name': r 'community'
        'role:title': r 'role'
        'lang:key': r 'lang'
        'content:title': r 'content'
        'post:title': r 'post'
        'cat:code': r 'cat'

    member: [
        "#{code},admin"
        "u#{code},user"
    ]
