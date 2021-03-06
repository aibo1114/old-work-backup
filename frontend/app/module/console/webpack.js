// Generated by CoffeeScript 1.12.7
(function() {
  var packModule;

  packModule = function(path, dir, name, lang) {
    var mods;
    mods = packDir(path, 'app,app/mods');
    if (name) {
      mods[name] = [path + "../" + name + "/app/meta/admin"];
      mods[lang] = [path + "../" + name + "/i18n/console_" + lang];
    }
    return mods;
  };

  module.exports = {
    outPut: function(path, m) {
      return path + "public/res/upload/" + m + "/lib/console";
    },
    entry: function(path, lib, bower, name, lang) {
      if (name) {
        return packModule(path, 'app,app/mods', name, lang);
      } else {
        return {
          main: [path + 'app/main'],
          zh: [path + 'i18n/common_zh'],
          common: [path + 'app/common'],
          site: [path + 'app/mods/site'],
          userRole: [path + 'app/mods/userRole'],
          data: [path + 'app/mods/data']
        };
      }
    }
  };

}).call(this);

//# sourceMappingURL=webpack.js.map
