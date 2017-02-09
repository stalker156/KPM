/**
 * Created by madina on 02.02.2017.
 */
application.controller('selectedUserCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', selectedUserCtrl]);
function selectedUserCtrl($scope, $rootScope, socket, $location, $routeParams) {
    var self = this;

    this.emptyModal = {
        name:null,
        userFullName:null,
        phoneNumber:null,
        roles:[]
    };

    if($routeParams.id){
        socket.emit('getuser', {id:$routeParams.id}, function(err, data){
            if(err)return console.error(err);
            $scope.modalItem = data;
            $scope.isUpdate = true;
        });
    }
    else $scope.modalItem = self.emptyModal;

    $scope.save = function(){
        if($scope.pwd !== $scope.modalItem.password)
            return toastr.error('Введенные пароли не совпадают');
        if(!$scope.modalItem.userName)
            return toastr.error('Введите логин');
        if(!$scope.modalItem.password)
            return toastr.error('Введите пароль');
        if(!$scope.isUpdate){
            socket.emit('adduser', $scope.modalItem, function(err, data){
                if(err) {
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Сохранено');
            });
        }
        else{
            socket.emit('updateuser', $scope.modalItem, function(err, data){
                if(err) {
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Сохранено');
            });
        }

    }


}