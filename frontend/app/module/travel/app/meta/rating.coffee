require '../../../../lib/widget/editor/rating/app'
#
#
#rt  =
#    guideName:
#        col:6
#
#    lb:
#        type: 'stype'
#        label: 'Please evaluate our services by marking according alternatives'
#
#    content:
#        type: 'textarea'
#        label:'Do you have any other comments or suggestion?'
#
#    _:
#        item: [
#            'firstName'
#            'lastName'
#            'email'
#            'guideName'
#            '_hr'
#            'lb'
#        ]
#
#for k in ro
#    rt[k] =
#        xtype: rating
#        attrs:
#            rateable:true
#
#rt._.item = rt._.item.concat ro
#rt._.item = rt._.item.concat ['_hr','content']
#
#meta.rating = rt

m.rating =
    prop: [
        _ep 'firstName'

        _ep 'lastName'

        _ep 'email'

        _ep 'guideName',
            col: 6

        m._tag 'hr'

        m._textarea 'content',
            label: 'Do you have any other comments or suggestion?'
    ]

ro = [
    'tourArrangement'
    'guideAttitude'
    'guideService'
    'guideCompetence'
    'vehicleCondition'
    'drivingSkill'
    'foodQuality'
    'overallEvaluation'
]

for k in ro
    m.rating.prop.push
        code: k
        xtype: 'raiting'
        attrs:
            rateable: true
