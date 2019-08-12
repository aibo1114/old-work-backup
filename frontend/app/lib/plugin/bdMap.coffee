cf._bdmap = ->
    cf._bdmr = true
    mo = cf._bdmo
    map = new BMap.Map("map-show")
    point = new BMap.Point(mo.lng, mo.lat); #//定位
    map.centerAndZoom(point, mo.zoom)
    map.enableScrollWheelZoom()
    map.addControl(new BMap.NavigationControl())
    map.addControl(new BMap.OverviewMapControl())
    mo.marker = new BMap.Marker(point)
    map.addOverlay(mo.marker)

    if mo.selected
        map.addEventListener "click", (e)->
            map.removeOverlay(mo.marker);
            mo.marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat))
            if mo.info
                mo.marker.addEventListener 'mouseover', (e)->
                    mo.marker.openInfoWindow new BMap.InfoWindow(mo.info.content,
                        {width: 250, height: 100, title: mo.info.title})
            if mo.afterSelect
                mo.afterSelect(mo.form, e.point)
            else
                mo.form.model.set 'lat', e.point.lat
                mo.form.model.set 'lng', e.point.lng
            map.addOverlay(mo.marker)

module.exports = _exv 'bdMap','tag',
    id: 'map-box'
    closeBtn: true
    head: true
    mo:
        lng: 116.46
        lat: 39.92
        zoom: 12
    className: 'showMap'
    afterDlgClose: ->
        cf._bdmo = null
    enhanceContent: ->
        @ctn = @$('.modal-body')
        @ctn.attr 'id', 'map-show'
        @ctn.height(@height || 400)
    callback: ->
        @mo.form = @form
        $.extend @mo, @opt
        cf._bdmo = @mo
        if cf._bdmr
            cf._bdmap()
        else
            cf.loadJS 'http://api.map.baidu.com/api?v=1.5&ak=B14cdfddead90c04c3ba03f233102da2&callback=cf._bdmap'
