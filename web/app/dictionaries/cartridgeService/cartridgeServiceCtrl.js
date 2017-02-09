/**
 * Created by madina on 30.01.2017.
 */
application.controller('cartridgeServiceCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', cartridgeServiceCtrl]);

function cartridgeServiceCtrl($scope, $rootScope, socket, $location, $routeParams) {
    $scope.data = [];
    $scope.searchTerm = "";

    function getData() {
        socket.emit('getcartridgeservices',{}, function(err, data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    }
    getData();

    $scope.searchData = function(){
        socket.emit('searchcartridgeservices',{searchTerm:$scope.searchTerm}, function(err,data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    };

    $scope.addItem = function(){
        $location.path("/dictionary/cartridgeService/edit");
    };

    $scope.removeItem = function(id){
        if(confirm('Вы уверены что хотите удалить данную услугу?')){
            socket.emit('deletecartridgeservice', {id:id}, function(err, res){
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
        $location.path("/dictionary/cartridgeService/edit").search({id:id})
    }

}