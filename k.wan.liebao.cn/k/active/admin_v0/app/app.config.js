//adminApp.config(['$locationProvider','$routeProvider','$stateProvider',function($locationProvider,$routeProvider,$stateProvider){
adminApp.config(['$locationProvider','$routeProvider',function($locationProvider,$routeProvider){
    $locationProvider.hashPrefix('!');
    $routeProvider.
        when('/',{
            template:'<provider-list></provider-list>'
        })
        .when('/providers',{
            template:'<provider-list></provider-list>'
        })
        .when('/actives',{
            template:'<active-list></active-list>'
        })
        .when('/orders',{
            template:'<order-list></order-list>'
        })
        .when('/statistics',{
            template:'<s-list></s-list>'
        })
        .when('/provider/new',{
            template:'<provider-add></provider-add>'
        })
        .when('/provider/:pId',{
            template:'<provider-edit></provider-edit>'
        })
        .when('/active/new',{
            template:'<active-add></active-add>'
        })
        .when('/active/:aId',{
            template:'<active-edit></active-edit>'
        })
        .otherwise('/');
}]);














//$urlRouterProvider.when('/','<provider-list></provider-list>');
//var providers={
//    name:'providers',
//    url:'/providers',
//    component:'providerList'
//};
//var actives={
//    name:'actives',
//    url:'/actives',
//    template:'active-list'
//};
//$stateProvider.
//    state(providers)
//    .state(actives);


//state('home', {
//    url: '/',
//    abstract: true,
//    views: {
//        main: 'providerList'
//    }
//})
//state('home',{
//    url:'/',
//    component:'providerList'
//});


//name:'home',
//url:'/test',
//template:'<provider-list></provider-list>'
//views:{
//    '':{
//        template:'<left-navigation></left-navigation>'
//        //component:'leftNavigation'
//    },
//    'main':{
//        template:'<provider-list></provider-list>'
//        //component:'providerList'
//    }
//}