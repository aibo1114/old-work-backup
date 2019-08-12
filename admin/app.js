import './lib/exserv';
import './lib/exdrct';
import './lib/tpick';
import './lib/list';
import './lib/item';
import './lib/pagination';

export default angular.module('app',[
    'ngRoute',
    'exsrv',
    'exdrct',
    'tpick',
    'list',
    'item',
    'pagination'
]);