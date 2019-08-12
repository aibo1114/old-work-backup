wgs.directive('allGames',['$rootScope','displayGamesFilter','dictionary',function($rootScope,displayGamesFilter,dictionary){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$on('gamesReady',function(){
                var displayGames=displayGamesFilter($rootScope.kw,$rootScope.allGames);
                $rootScope.serResult=false;

                if(displayGames){
                    scope.displayGames=displayGames;
                    $rootScope.serResult=true;
                    $rootScope.kw='';
                }else{
                    scope.displayGames=$rootScope.allGames;
                    $rootScope.serResult=false;
                }
            });

            scope.$on('sKw',function(e,kw){
                var displayGames=displayGamesFilter(kw,$rootScope.allGames);
                if(displayGames){
                    scope.displayGames=displayGames;
                    $rootScope.serResult=true;
                }else{
                    scope.displayGames=$rootScope.allGames;
                    $rootScope.serResult=false;
                }
            });
            scope.$on('mKw',function(e,kw){
                var displayGames=displayGamesFilter(kw,$rootScope.allGames);
                if(displayGames){
                    scope.displayGames=displayGames;
                }else{
                    scope.displayGames=$rootScope.allGames;
                }
            });
        },
        templateUrl:'widgets/tpl/allGameFram.html'
    }
}]);