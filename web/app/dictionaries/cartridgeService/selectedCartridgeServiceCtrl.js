/**
 * Created by madina on 02.02.2017.
 */
application.controller('selectedCartridgeServiceCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', selectedCartridgeServiceCtrl]);
function selectedCartridgeServiceCtrl($scope, $rootScope, socket, $location, $routeParams) {
    var self = this;

    this.emptyModal = {
        name:null
    };

    if($routeParams.id){
        socket.emit('getcartridgeservice', {id:$routeParams.id}, function(err, data){
            if(err)return console.error(err);
            $scope.modalItem = data;
            $scope.isUpdate = true;
        });
    }
    else $scope.modalItem = self.emptyModal;

    $scope.save = function(){
        if(!$scope.isUpdate){
            socket.emit('addcartridgeservice', $scope.modalItem, function(err, data){
                if(err) {
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Сохранено');
            });
        }
        else{
            socket.emit('updatecartridgeservice', $scope.modalItem, function(err, data){
                if(err) {
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Сохранено');
            });
        }

    }


}