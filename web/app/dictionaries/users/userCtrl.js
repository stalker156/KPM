/**
 * Created by madina on 30.01.2017.
 */
application.controller('userCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', userCtrl]);

function userCtrl($scope, $rootScope, socket, $location, $routeParams) {
    $scope.data = [];
    $scope.searchTerm = "";

    function getData() {
        socket.emit('getusers',{}, function(err, data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    }
    getData();


    $scope.addItem = function(){
        $location.path("/dictionary/user/edit");
    };

    $scope.removeItem = function(id){
        if(confirm('Вы уверены что хотите удалить данного пользователя?')){
            socket.emit('deleteuser', {id:id}, function(err, res){
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
        $location.path("/dictionary/user/edit").search({id:id})
    }

}