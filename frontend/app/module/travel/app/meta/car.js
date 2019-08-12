// Generated by CoffeeScript 1.12.7
(function() {
  m.airport = {
    prop: [
      m._select('type', {
        attrs: {
          data: ['pickup', 'transfer']
        }
      }), _ep('price'), _ep('from'), _ep('to')
    ]
  };

  m.spot = {
    prop: [
      m._select('type', {
        attrs: {
          data: ['greatWall']
        }
      }), _ep('price'), _ep('from'), _ep('to')
    ]
  };

  m.car = {
    prop: [
      _ep('title'), _ep('note'), _ep('row'), m._number('guideFee'), m._radio('star', {
        attrs: {
          data: {
            1: 'YES',
            0: 'NO'
          },
          val: 1
        }
      }), m._itemTable('airport'), m._itemTable('spot'), m._pic('car')
    ]
  };

}).call(this);

//# sourceMappingURL=car.js.map