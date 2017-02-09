/**
 * Created by madina on 30.01.2017.
 */
application.controller('deviceServiceCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', deviceServiceCtrl]);

function deviceServiceCtrl($scope, $rootScope, socket, $location, $routeParams) {
    $scope.data = [];
    $scope.searchTerm = "";

    function getData() {
        socket.emit('getdeviceservices',{}, function(err, data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    }
    getData();

    $scope.searchData = function(){
        socket.emit('searchdeviceservices',{searchTerm:$scope.searchTerm}, function(err,data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    };

    $scope.addItem = function(){
        $location.path("/dictionary/deviceService/edit");
    };

    $scope.removeItem = function(id){
        if(confirm('Вы уверены что хотите удалить данную услугу?')){
            socket.emit('deletedeviceservice', {id:id}, function(err, res){
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
        $location.path("/dictionary/deviceService/edit").search({id:id})
    }

}