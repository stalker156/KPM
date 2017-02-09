/**
 * Created by madina on 30.01.2017.
 */
application.controller('customerCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', customerCtrl]);

function customerCtrl($scope, $rootScope, socket, $location, $routeParams) {
    $scope.data = [];
    $scope.searchTerm = "";

    function getData() {
        socket.emit('getcustomers',{}, function(err, data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    }
    getData();

    $scope.searchData = function(){
        socket.emit('searchcustomers',{searchTerm:$scope.searchTerm}, function(err,data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    };

    $scope.addItem = function(){
        $location.path("/dictionary/customer/edit");
    };

    $scope.removeItem = function(id){
        if(confirm('Вы уверены что хотите удалить данного заказчика?')){
            socket.emit('deletecustomer', {id:id}, function(err, res){
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
        $location.path("/dictionary/customer/edit").search({id:id})
    }

}