input = require './input'

module.exports = input.extend
    className: 'wxImg'
    title: '选择图片'
    btnClass: 'choose'
    icon: 'camera'
    type: 'img'
    urls: []
    events:
        'click .btn': (e)->
            r = @
            wx.chooseImage
                count: if @multi then 9 else 1
                success: (res)->
                    if res.localIds.length
                        for it in res.localIds
                            wx.uploadImage
                                localId: it
                                isShowProgressTips: 1
                                success: (us)->
                                    img = it
                                    r.form.model.addHandler('after','wtFetcher')
                                    if r.collection
                                        r.collection.call r.ctx,
                                                type: r.type
                                                path: img
                                                wt: us.serverId
                                    else
                                        r.addImg(img)
                                    r._addArrayItem "_wt::#{r.type}::#{us.serverId}::#{$('body').data('wcode')}", r.multi
                    else
                        popMsg '上传失败', 'warning'


        'click .view': (e)->
            t = util.ct(e)
            urls = ($(im).attr 'src' for im in t.parent().children())
            wx.previewImage
                current: t.attr('src')
                urls: urls

        'press .view': (e)->
            return unless confirm('确定要删除图片吗？')
            t = util.ct(e)
            @_delArrayItem t.attr('src') + '.jpg'
            t.remove()

    addImg:(path)->
        @ctn.append "<div class='media'><img class='img-thumbnail' src='#{path}'/></div>"