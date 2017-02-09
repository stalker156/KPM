/**
 * Created by madina on 02.02.2017.
 */
application.controller('selectedCustomerCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', selectedCustomerCtrl]);
function selectedCustomerCtrl($scope, $rootScope, socket, $location, $routeParams) {
    var self = this;

    this.emptyModal = {
        name:null,
        fullName:null,
        address:null,
        phoneNumber:null
    };

    if($routeParams.id){
        socket.emit('getcustomer', {id:$routeParams.id}, function(err, data){
            if(err)return console.error(err);
            $scope.modalItem = data;
            $scope.isUpdate = true;
        });
    }
    else $scope.modalItem = self.emptyModal;

    $scope.save = function(){
        if(!$scope.isUpdate){
            socket.emit('addcustomer', $scope.modalItem, function(err, data){
                if(err) {
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Сохранено');
            });
        }
        else{
            socket.emit('updatecustomer', $scope.modalItem, function(err, data){
                if(err) {
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Сохранено');
            });
        }

    }


}