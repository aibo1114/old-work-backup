require './app'

module.exports = _exv 'consoleMenu', 'topMenu',
    initMenu:[]
    preLogin: ->
        @ctn.empty()
    parent: '#ubb'
    className: 'nav navbar-nav col-xs-12'
    afterLogin: ()->
        @setMenu user.setMenu(@home, @funcMenu)