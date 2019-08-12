var header = document.createElement('div');
var footer = document.createElement('div');
var headerContent= require('./tpl/cm_plant_header.jade');
var footerContent= require('./tpl/cm_plant_footer.jade');

var baseStyle= require('./css/base.css')[0][1];

header.innerHTML =headerContent();
footer.innerHTML =footerContent();
header.setAttribute('id','cmPlantHeader');
footer.setAttribute('id','cmPlantFooter');


document.body.appendChild(header);
document.body.appendChild(footer);

createStyleSheet(baseStyle);

function createStyleSheet(styles) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';

    head.appendChild(style);

    if (style.styleSheet) { //for ie
        style.styleSheet.cssText = styles;
    } else {//for w3c
        style.appendChild(document.createTextNode(styles));
    }
}







// import tpl from './tpl/index.jade';