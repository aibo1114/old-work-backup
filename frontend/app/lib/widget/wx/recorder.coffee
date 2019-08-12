require './recorder.less'
ip = require './input'

module.exports = ip.extend
    title: '按住录音'
    btnClass: 'record'
    icon: 'bullhorn'
    checkToRecord:->
        true
    events:
        'click .repeatRec': (e)->
            wx.playVoice
                localId: @vid || util.ct(e).attr('vid')

        'click .saveRec': (e)->
            r = @
            m = r.form.model
            wx.uploadVoice
                localId: @vid
                success: (res)->
                    unless m.get 'refFile'
                        m.set 'refFile', {}
                    rf = m.get 'refFile'
                    kk = "_wt::audio::#{res.serverId}::#{$('body').data('wcode')}"
                    if rf.audio
                        rf.audio.push kk
                    else
                        rf.audio = [kk]
                    m.addHandler('after','wtFetcher')
                    r.dlg.closeDlg()
#            unless m.get 'refFile'
#                m.set 'refFile', {}
#            rf = m.get 'refFile'
#            rf.audio = "xx::audio::#{111}::#{222}"
#            r.dlg.closeDlg()
#            @$('.recordBox').fadeOut().remove()

#        'press .record': (e)->
        'press .record': (e)->
            if !@checkToRecord()
                e.preventDefault()
                e.stopPropagation()
                return

#            if @vid
#                popMsg('刚才的语音将会被替代。')
            s = 60
            rdb = $("<div class='rdBox'><p><strong>录音中...</strong></p><strong class='cd'>#{s}</strong></div>")
            cd = rdb.find('.cd')
            t = util.ct(e)
            t.children('span').hide()
            t.append "<strong>开始录音...</strong>"
            @ctn.append rdb
            r = @
            cpt = (res)->
                rdb.remove()
                t.find('strong').remove()
                t.find('span').show()
                unless r.vid
                    r.afterRecoded()
                r.vid = res.localId
            wx.startRecord()
            wx.onVoiceRecordEnd
                complete: cpt
            e = setInterval ->
                s--
                cd.text(s)
                if s is 0
                    clearInterval(e)
            ,1000
            act = (e)->
                e.preventDefault()
                wx.stopRecord
                    success: cpt
                t[0].removeEventListener 'touchend', act, false
            t[0].addEventListener 'touchend', act, false

    afterRecoded:->
        @ctn.append cf.rtp require './recorderTmpl.jade'
