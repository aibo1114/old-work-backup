wgs.directive('dialog',[function(){
    return {
        restrict:'A',
        link:function(scope,element,attrs){},
        controller:['$scope','$rootScope','$sce',function($scope,$rootScope,$sce){
            $rootScope.hasDialog=false;
            $scope.ui={
                tip:false,
                text:false,
                content:false
            };
            $scope.dStyle={};
            $scope.tipStyle={};
            $scope.setSize=function(opt){
                var w=opt.w || 600,
                    h=opt.h || 400,
                    btn=opt.btn || '',
                    tipCls=opt.tipCls || '',
                    ml;
                ml=Math.round(w/2);
                tipMt=Math.round((h-18-85)/2); //30+55

                $scope.dStyle['width']=w+'px';
                $scope.dStyle['height']=h+'px';
                $scope.dStyle['margin-left']='-'+ml+'px';
                $scope.tipStyle['margin-top']=tipMt+'px';
                $scope.ui.btn=btn;
                $scope.ui.tipCls=tipCls;
            };
            $scope.init=function(opt){
                $scope.icon=opt.icon;
                $scope.title=opt.title;
                $scope.text=opt.text;
                $scope.ui.ft=opt.ft;
                $scope.setSize(opt);
            };
            $scope.initContent=function(obj){
                $scope.content=$sce.trustAsHtml(obj.content);
                $scope.ui.copycode=obj.copycode || false;
                $scope.icon=obj.icon;
                $scope.title=obj.title;
                $scope.ui.ft=obj.ft;
                $scope.setSize(obj);
            };
            $scope.show=function (t,parm) {
                t=='content' ? $scope.initContent(parm) : $scope.init(parm);
                $scope.ui.tip=false;$scope.ui.text=false;$scope.ui.content=false;
                $scope.ui[t]=true;
                $scope.t=t;
                $rootScope.hasDialog=true;
            };
            $scope.close=function(){
                $scope.ui[$scope.t]=false;
                $scope.cb();
            };
            $scope.cb=function(){
                $rootScope.hasDialog=false;
                $rootScope.$broadcast('tipClose');
            };

            $scope.copycode=function(code){
                // console.log(code);
                if(window.clipboardData) window.clipboardData.setData("text" , code);
                $scope.close();
            };

            $scope.$on('dialog',function(e,t,opt){
                $scope.show(t,opt);
            });
        }],
        templateUrl:'widgets/tpl/dialog.html'
    }
}]);