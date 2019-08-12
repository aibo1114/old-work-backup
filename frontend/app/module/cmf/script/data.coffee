r = (file)->
    require "./data/#{file}"
module.exports = 
    data:
        'community:name': r 'community'
        'role:title': r 'role'
        'lang:key': r 'lang'
        'content:title': r 'content'
        'post:title': r 'post'
        'pubAccount:code': r 'pubAccount'
        'cat:code': r 'cat'
        'moodTag:code': r 'moodTag'
    member: [
        "#{code},admin"
        "u#{code},user"
    ]

