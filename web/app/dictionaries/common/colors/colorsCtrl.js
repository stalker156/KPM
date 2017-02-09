/**
 * Created by madina on 30.01.2017.
 */
application.controller('colorsCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', colorsCtrl]);

function colorsCtrl($scope, $rootScope, socket, $location, $routeParams) {
    $scope.data = [];
    $scope.searchTerm = "";

    function getData() {
        socket.emit('getcolors',{}, function(err, data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    }
    getData();

    $scope.searchData = function(){
        socket.emit('searchcolors',{searchTerm:$scope.searchTerm}, function(err,data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    };

    $scope.addItem = function(){
        $location.path("/dictionary/common/color/edit");
    };

    $scope.removeItem = function(id){
        if(confirm('Вы уверены что хотите удалить данного заказчика?')){
            socket.emit('deletecolor', {id:id}, function(err, res){
                if(err){
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Удалено');
                $scope.searchData();
            });
        }
    };

    $scope.editItem = function(id){
        $location.path("/dictionary/common/color/edit").search({id:id})
    }

}