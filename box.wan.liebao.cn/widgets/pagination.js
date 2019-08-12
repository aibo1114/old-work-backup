wgs.filter('offset', function() {
    return function(input, start) {
        start = parseInt(start, 10);
        return input.slice(start); };
});
wgs.directive('pagination',function(){
    return {
        restrict:'EA',
        scope:{
            items:'=',
            perPage:'=',
            currentPage:'='
        },
        controller:['$scope',function($scope){
            $scope.prevPage = function() {
                if ($scope.currentPage > 0) $scope.currentPage--;
            };
            $scope.prevPageDisabled = function() {
                return $scope.currentPage === 0 ? "disabled-pagination" : "";
            };
            $scope.pageCount = function() {
                if($scope.items){
                    return Math.ceil($scope.items.length/$scope.perPage)-1
                }else{
                    return 0
                }

            };
            $scope.range = function() {
                var arr=[],lst=$scope.pageCount();

                for (var i=0;i<=lst;i++){
                    arr.push(i);
                }
                return arr;
            };
            $scope.setPage=function(n){
                $scope.currentPage=n;
            };
            $scope.nextPage = function() {
                if ($scope.currentPage < $scope.pageCount()) $scope.currentPage++;
            };
            $scope.nextPageDisabled = function() {
                return $scope.currentPage === $scope.pageCount() ? "disabled-pagination" : "";
            };
        }],
        templateUrl:'widgets/tpl/pagination.html'
    }
});