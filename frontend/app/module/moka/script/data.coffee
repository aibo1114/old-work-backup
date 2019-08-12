r = (file)->
    require "./data/#{file}"
module.exports =
    data:
        'community:name': r 'community'
        'role:title': r 'role'
        'content:title': r 'content'
        'forumType:title': r 'forumType'
        'post:title': r 'post'
        'head:channel':r 'head'
        'course:title': r 'course'
        'forumPost:title' : r 'forumPost'
        'forumCat:title' : r 'forumCat'
        'user:username': r 'user'
        'cat:title': r 'cat'
        'lang:key': r 'lang'
    member: [
        "#{code},admin"
        "u#{code},user"
    ]