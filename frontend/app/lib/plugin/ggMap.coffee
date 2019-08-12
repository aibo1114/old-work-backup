buildMarker = (latlng, map, str) ->
    mk = new google.maps.Marker
        position: latlng
        map: map
    if str
        infowindow = new google.maps.InfoWindow()
        infowindow.setContent str
        google.maps.event.addListener mk, "click", ->
            infowindow.open map, mk
    mk

cf._ggmap = ->
    cf._ggmr = true
    mo = cf._ggmo
#    func = ->
#    if @search
#        $(@mapDlg).find(".search-bar").show()
#        $(@mapDlg).find(@searchElem).keypress (event) ->
#            if event.which is 13
#                MapObj.codeAddress $(event.target).val(), (rrs) =>
#                    @map.setCenter rrs[0].geometry.location
#                    @marker.setMap null if @marker
#                    @marker = @addMarker(rrs[0].geometry.location, @map, rrs[0].formatted_address)
#                    @result = rrs
        #            else
        #                $(@mapDlg).find(".search-bar").hide()
        #                $(@mapDlg).find(@mapElem).height(@height)
        #                $(@mapDlg).find(@mapElem).width(@width)

    mo.center = new google.maps.LatLng(parseFloat(mo.lat), parseFloat(mo.lng))
    mo.minZoom = mo.zoom - 2
    mo.maxZoom = mo.zoom + 5
    mo.infoContent = @infoContent  if @infoContent

    map = new google.maps.Map($('#map-show')[0], mo)

    if @marks
        for d in @marks when d.lat
            @addMarker(d.lat, d.lng, map, d.text, null, null, true)

    if mo.selected
        @marker = buildMarker(new google.maps.LatLng(parseFloat(mo.lat), parseFloat(mo.lng)), map)
        google.maps.event.addListener map, "click", (e) =>
            @marker.setPosition(e.latLng)
            pt =
                lat: e.latLng.lat()
                lng: e.latLng.lng()
            fm = mo.form
            if mo.afterSelect
                mo.afterSelect(fm, pt)
            else
                fm.model.set 'geo', pt
                fm.$('[name="geo"]').val _.values(pt)


#            @marker = buildMarker(event.latLng, map, results[1].formatted_address)
#            mlu.codeLatLng event.latLng, (results) =>
#                @result = results
#                @marker = MapObj.buildMarker(event.latLng, map, results[1].formatted_address)

#    @callback @ if @callback
#    @
#
#    func.call cf._glmo


module.exports = _exv 'ggMap', 'tag',
    auto: true
    closeBtn: true
    head: true
    id: 'map-box'
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
        @ctn.height(@height || 450)
    callback: ->
        @mo.form = @form
        $.extend @mo, @opt
        cf._ggmo = @mo
        if cf._ggmr
            cf._ggmap()
        else
            cf.loadJS 'http://maps.google.com/maps/api/js?sensor=true&callback=cf._ggmap'
