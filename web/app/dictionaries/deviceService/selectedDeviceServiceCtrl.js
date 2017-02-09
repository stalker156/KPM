/**
 * Created by madina on 02.02.2017.
 */
application.controller('selectedDeviceServiceCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', selectedDeviceServiceCtrl]);
function selectedDeviceServiceCtrl($scope, $rootScope, socket, $location, $routeParams) {
    var self = this;

    this.emptyModal = {
        name:null
    };

    if($routeParams.id){
        socket.emit('getdeviceservice', {id:$routeParams.id}, function(err, data){
            if(err)return console.error(err);
            $scope.modalItem = data;
            $scope.isUpdate = true;
        });
    }
    else $scope.modalItem = self.emptyModal;

    $scope.save = function(){
        if(!$scope.isUpdate){
            socket.emit('adddeviceservice', $scope.modalItem, function(err, data){
                if(err) {
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Сохранено');
            });
        }
        else{
            socket.emit('updatedeviceservice', $scope.modalItem, function(err, data){
                if(err) {
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Сохранено');
            });
        }

    }


}