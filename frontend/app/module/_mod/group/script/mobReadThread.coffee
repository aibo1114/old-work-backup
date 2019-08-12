module.exports = (ctx, req, rsp)->
    qu = req.query
    code = ctx.c.code
    moodTag: (cb)->
        dao.find code, 'moodTag',{},{}, (res)->
            cb null, res

#    wt: (cb)->
#        dao.get code, 'pubAccount', code: 'PETSNS',(res)->
#            cb null, res
            
    pd: (cb)->
        dao.get code, 'thread', _id: qu.tid, (thread)->
            unless thread
                cb null, -1
                return
            dao.get code, 'group', _id: thread.group._id, (group)->
                unless group
                    cb null, -1
                    return
                dao.get code, 'groupMember', _id: qu.gmid, (uInfo)->
                    unless uInfo
                        cb null, -1
                        return
                    cd = thread.dateCreated
                    _.extend ctx, thread,
                        intro: _.compact [uInfo.industry, uInfo.jobTitle, uInfo.company]
                        statement: uInfo.statement
                        hasEdit: false
                        task: group.task.findBy('subData.code', thread.form.code)
                        hasBack: false
                        group: group
                        hasAdv: true
                        hasQrcode: true
                        hasComment: true
                        title: if thread.title
                            util.adjustText thread.title, 20
                        else
                            "#{thread.user.username}的分享"
                        subTitle: cd.pattern('MM月dd日') + " 第#{(-new Date(group.startedDate).minusTime(cd)) + 1}天"
                    cb()