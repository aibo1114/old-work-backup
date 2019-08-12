require './wtShare.less'

$('body').on 'click', '.wtShare', ->
#    path = tu.resPath(cf.community,'images/share.png')
    path = "#{cf.rPath}/img/share.png"
    pic = $("<div class='shareCv'><img src='#{path}'></div>")
    pic.click ->
        pic.remove()
    $(this).append pic