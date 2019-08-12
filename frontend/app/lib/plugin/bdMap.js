// Generated by CoffeeScript 1.12.7
(function() {
  cf._bdmap = function() {
    var map, mo, point;
    cf._bdmr = true;
    mo = cf._bdmo;
    map = new BMap.Map("map-show");
    point = new BMap.Point(mo.lng, mo.lat);
    map.centerAndZoom(point, mo.zoom);
    map.enableScrollWheelZoom();
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.OverviewMapControl());
    mo.marker = new BMap.Marker(point);
    map.addOverlay(mo.marker);
    if (mo.selected) {
      return map.addEventListener("click", function(e) {
        map.removeOverlay(mo.marker);
        mo.marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
        if (mo.info) {
          mo.marker.addEventListener('mouseover', function(e) {
            return mo.marker.openInfoWindow(new BMap.InfoWindow(mo.info.content, {
              width: 250,
              height: 100,
              title: mo.info.title
            }));
          });
        }
        if (mo.afterSelect) {
          mo.afterSelect(mo.form, e.point);
        } else {
          mo.form.model.set('lat', e.point.lat);
          mo.form.model.set('lng', e.point.lng);
        }
        return map.addOverlay(mo.marker);
      });
    }
  };

  module.exports = _exv('bdMap', 'tag', {
    id: 'map-box',
    closeBtn: true,
    head: true,
    mo: {
      lng: 116.46,
      lat: 39.92,
      zoom: 12
    },
    className: 'showMap',
    afterDlgClose: function() {
      return cf._bdmo = null;
    },
    enhanceContent: function() {
      this.ctn = this.$('.modal-body');
      this.ctn.attr('id', 'map-show');
      return this.ctn.height(this.height || 400);
    },
    callback: function() {
      this.mo.form = this.form;
      $.extend(this.mo, this.opt);
      cf._bdmo = this.mo;
      if (cf._bdmr) {
        return cf._bdmap();
      } else {
        return cf.loadJS('http://api.map.baidu.com/api?v=1.5&ak=B14cdfddead90c04c3ba03f233102da2&callback=cf._bdmap');
      }
    }
  });

}).call(this);

//# sourceMappingURL=bdMap.js.map
