// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = {
    mod: [
      {
        cls: 'head',
        view: 'slide',
        tmpl: 'headSlide',
        viewOpt: {
          controller: false,
          indicator: 4
        },
        slideOpt: {
          interval: 4000
        },
        url: 'http://api.h5game.ksmobile.com/1/news/get_news_lm?tid=lbt'
      }, {
        title: '我的游戏',
        cls: 'my',
        view: 'slide',
        tmpl: 'recSlide',
        viewOpt: {
          controller: true,
          indicator: false,
          className: 'carousel slide'
        },
        slideOpt: {
          interval: false
        },
        url: 'http://api.h5game.ksmobile.com/1/user/mygame',
        handleData: function(d) {
          var rs;
          rs = [];
          while (d.length > 4) {
            rs.push(d.splice(0, 4));
          }
          if (d.length) {
            rs.push(d);
          }
          return rs;
        }
      }, {
        title: '今日推荐',
        cls: 'today',
        view: 'slide',
        tmpl: 'recSlide',
        viewOpt: {
          controller: true,
          indicator: false,
          className: 'carousel slide'
        },
        slideOpt: {
          interval: false
        },
        url: 'http://api.h5game.ksmobile.com/1/game/get_game_lm?tid=jrtj',
        handleData: function(d) {
          var rs;
          rs = [];
          while (d.length > 4) {
            rs.push(d.splice(0, 4));
          }
          if (d.length) {
            rs.push(d);
          }
          return rs;
        }
      }, {
        cls: 'middle',
        url: 'http://api.h5game.ksmobile.com/1/news/get_news_lm?tid=ggt1',
        tmpl: 'img'
      }, {
        title: '热门排行',
        subTitle: "更多游戏",
        cls: 'rank',
        url: 'http://api.h5game.ksmobile.com/1/game/get_game_lm?tid=rmph',
        tmpl: 'slat'
      }, {
        cls: 'foot',
        url: 'http://api.h5game.ksmobile.com/1/news/get_news_lm?tid=ggt2',
        tmpl: 'img'
      }, {
        title: '热门最爱',
        subTitle: "更多游戏",
        cls: 'favor',
        tmpl: 'round',
        url: 'http://api.h5game.ksmobile.com/1/game/get_game_lm?tid=rmyx'
      }
    ],
    foot: [
      {
        title: '关于我们',
        href: util.navUrl('aboutUs')
      }
    ]
  };

}).call(this);

//# sourceMappingURL=cfg.js.map
