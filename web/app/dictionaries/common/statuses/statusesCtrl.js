/**
 * Created by madina on 30.01.2017.
 */
application.controller('statusesCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', statusesCtrl]);

function statusesCtrl($scope, $rootScope, socket, $location, $routeParams) {
    $scope.data = [];
    $scope.searchTerm = "";

    function getData() {
        socket.emit('getstatuses',{}, function(err, data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    }
    getData();

    $scope.searchData = function(){
        socket.emit('searchstatuses',{searchTerm:$scope.searchTerm}, function(err,data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    };

    $scope.addItem = function(){
        $location.path("/dictionary/common/status/edit");
    };

    $scope.removeItem = function(id){
        if(confirm('Вы уверены что хотите удалить данного заказчика?')){
            socket.emit('deletestatus', {id:id}, function(err, res){
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
        $location.path("/dictionary/common/status/edit").search({id:id})
    }

}