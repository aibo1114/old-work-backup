require '../../../console/app/meta/common'

require '../../../console/app/meta/head'
require '../../../../lib/meta/content'
require '../../../../lib/meta/post'
require '../../../../lib/meta/cat'
require '../../../../lib/meta/link'
require '../../../../lib/meta/venue'
require '../../../../lib/meta/activity'


require './common'
require './course'
require './inquiry'
require './order'
require './qa'
require './dancer'

cf.__importedMeta = [
    'user'
    'content'
    'post'
    'activity'
    'partner'
    'group'
]

$.extend cf.opt.entity,
    headRefEntity: ['post', 'content', 'course','activity','dancer']
    headRefChannel: ['index','indexShow']


