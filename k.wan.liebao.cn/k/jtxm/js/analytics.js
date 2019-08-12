/**
 * @fileOverview analytics
 * @author LongZhou
 * @version 1.0.1
 */
var WebApp = WebApp || {};

/**
 * @namespace
 */
WebApp.analytics = (function() {
    /**
     * @private
     * @description init event
     */ 
    var initEvent = function() {
        // default trace method
        // trace a tag
        $(document).delegate('.__trace__[data-trace]', 'click', function(evt) {
            var params = $(this).attr('data-trace')
                                .split(',');
            trace.apply(window, params);
        });
    };
    
    /**
     * @scope WebApp.analytics
     */
    return {
        /**
         * @description init namespace 
         */ 
        init: function() {
            initEvent();
        },
        /**
         * @description manual trace 
         */ 
        trace: function() {
            trace.apply(window, arguments);
        }
    };
}());

$(document).ready(function() {
    WebApp.analytics.init();
});
