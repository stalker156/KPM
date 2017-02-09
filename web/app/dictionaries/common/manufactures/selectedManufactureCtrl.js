/**
 * Created by madina on 02.02.2017.
 */
application.controller('selectedManufactureCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', selectedManufactureCtrl]);
function selectedManufactureCtrl($scope, $rootScope, socket, $location, $routeParams) {
    var self = this;

    this.emptyModal = {
        name:null
    };

    if($routeParams.id){
        socket.emit('getmanufacture', {id:$routeParams.id}, function(err, data){
            if(err)return console.error(err);
            $scope.modalItem = data;
            $scope.isUpdate = true;
        });
    }
    else $scope.modalItem = self.emptyModal;

    $scope.save = function(){
        if(!$scope.isUpdate){
            socket.emit('addmanufacture', $scope.modalItem, function(err, data){
                if(err) {
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Сохранено');
            });
        }
        else{
            socket.emit('updatemanufacture', $scope.modalItem, function(err, data){
                if(err) {
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Сохранено');
            });
        }

    }


}