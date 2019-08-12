
module.exports = cf.view.slide = cf.view.tag.extend
#    tmpl: 'slideItem'
    parent: null
    index: 0
    className: 'carousel slide'
    auto: true
    slideOpt:
        interval: 5000
    events:
        'drag .carousel-inner': 'slideIt'
        'flick .carousel-inner': 'slideIt'

    slideIt: (e)->
        if 'horizontal' == e.orientation
            if @sliding
                return true
            if 1 == e.direction
                @$el.carousel('prev')
            else
                @$el.carousel('next')
            e.preventDefault()
            e.stopPropagation()
        return true

    preRender: ->
        id = util.randomChar 4
        if @indicator
            len = @$('.item').length
            if len < 2
                len = false

        @$el.attr 'id', id

        @$el.append cf.rtp require('./slideBtn.jade'),
            controller: @controller
            indicator: len
            _sid: id

        @$('.carousel-indicators').children(":eq(#{@index})").addClass('active')
        @$('.carousel-inner').children(":eq(#{@index})").addClass('active')

        @$el.carousel(@slideOpt)

        @$el.on 'slide.bs.carousel', =>
            @sliding = true

        @$el.on 'slid.bs.carousel', =>
            @sliding = false

