/**
 * Created by madina on 02.02.2017.
 */
application.controller('selectedPrintCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', selectedPrintCtrl]);
function selectedPrintCtrl($scope, $rootScope, socket, $location, $routeParams) {
    var self = this;

    this.emptyModal = {
        name:null
    };

    if($routeParams.id){
        socket.emit('getprint', {id:$routeParams.id}, function(err, data){
            if(err)return console.error(err);
            $scope.modalItem = data;
            $scope.isUpdate = true;
        });
    }
    else $scope.modalItem = self.emptyModal;

    $scope.save = function(){
        if(!$scope.isUpdate){
            socket.emit('addprint', $scope.modalItem, function(err, data){
                if(err) {
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Сохранено');
            });
        }
        else{
            socket.emit('updateprint', $scope.modalItem, function(err, data){
                if(err) {
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Сохранено');
            });
        }

    }


}