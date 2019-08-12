// Generated by CoffeeScript 1.12.7
(function() {
  require('./style.sass');

  module.exports = function($container) {
    var container, currentPage, stateHistory;
    container = $container;
    currentPage = void 0;
    stateHistory = [];
    this.remove = function(p) {
      stateHistory.remove(p.attr('id'));
      return p.remove();
    };
    this.reset = function() {
      stateHistory = [];
      return currentPage = void 0;
    };
    this.slideLastPage = function(id) {
      var i, idx, it, len, ref, rr;
      idx = _.indexOf(stateHistory, id);
      ref = stateHistory.splice(idx + 1, stateHistory.length - 2 - idx);
      for (i = 0, len = ref.length; i < len; i++) {
        it = ref[i];
        rr = $('#' + it);
        rr.children().data('_item')._close();
        rr.remove();
      }
      return this.slidePage();
    };
    this.slidePage = function(page) {
      var l, state;
      if (typeof cf.onPageSlide === "function") {
        cf.onPageSlide();
      }
      l = stateHistory.length;
      if (!page) {
        page = container.children().eq(l - 2);
      }
      if (page) {
        state = page.attr('id');
      }
      if (l === 0) {
        currentPage = container.children().first();
        currentPage.addClass('page center');
        stateHistory.push(currentPage.attr('id'));
        stateHistory.push(state);
        return this.slidePageFrom(page, 'right');
      } else if (state === stateHistory[l - 2]) {
        this.slidePageFrom(page, 'left');
        stateHistory.pop();
        if (stateHistory.length === 1) {
          return stateHistory.pop();
        }
      } else {
        stateHistory.push(state);
        currentPage = container.children().last();
        return this.slidePageFrom(page, 'right');
      }
    };
    this.slidePageFrom = function(page, from) {
      page.attr('class', 'page ' + from);
      container.append(page);
      currentPage.one('webkitTransitionEnd', function(e) {
        var hash, pr, t;
        t = util.ct(e);
        if (t.hasClass('right')) {
          pr = container.children().last();
          if (t.attr('cache')) {
            app.cache.append(t);
          } else {
            app.cleanPage(t);
            t.remove();
          }
          if (pr.length && (hash = pr.attr('hash'))) {
            cf.r(hash, false);
          }
        }
        return typeof cf.onEndSlide === "function" ? cf.onEndSlide(stateHistory, currentPage) : void 0;
      });
      container[0].offsetWidth;
      currentPage.attr('class', 'page transition ' + (from === 'left' ? 'right' : 'left'));
      page.attr('class', 'page transition center');
      return currentPage = page;
    };
    return this;
  };

}).call(this);

//# sourceMappingURL=pSlider.js.map