/**
 * Created by madina on 30.01.2017.
 */
application.controller('utilizationCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', utilizationCtrl]);

function utilizationCtrl($scope, $rootScope, socket, $location, $routeParams) {
    $scope.data = [];
    $scope.searchTerm = "";

    function getData() {
        socket.emit('getutilizations',{}, function(err, data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    }
    getData();

    $scope.searchData = function(){
        socket.emit('getutilizations',{searchTerm:$scope.searchTerm}, function(err,data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    };

}