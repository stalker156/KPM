/**
 * Created by madina on 02.02.2017.
 */
application.controller('addDeviceCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', addDeviceCtrl]);

function addDeviceCtrl($scope, $rootScope, socket, $location, $routeParams) {
    var self = this;

    this.emptyModal = {
        name:null
    };

    $scope.modalItem = self.emptyModal;

    $scope.save = function(){
        socket.emit('adddevice', $scope.modalItem, function(err, data){
            if(err) {
                toastr.error('Ошибка');
                return console.error(err);
            }
            toastr.success('Сохранено');
        });

    }

    function getCustomers(){
        socket.emit('getcustomers',{}, function(err, data){
            if(err)return console.error(err);
            $scope.customers = data;
        });

    }
    getCustomers();

    function getPrintTypes(){
        socket.emit('getprints',{}, function(err, data){
            if(err)return console.error(err);
            $scope.printTypes = data;
        });
    }
    function getColors(){
        socket.emit('getcolors',{}, function(err, data){
            if(err)return console.error(err);
            $scope.colors = data;
        });

    }
    function getStatus(){
        socket.emit('getstatuses',{}, function(err, data){
            if(err)return console.error(err);
            $scope.statuses = data;
        });

    }
    function getManufactures(){
        socket.emit('getmanufactures',{}, function(err, data){
            if(err)return console.error(err);
            $scope.manufactures = data;
        });

    }
    function getCartridges(){
        socket.emit('getcartridges',{}, function(err, data){
            if(err)return console.error(err);
            $scope.cartridges = data;
        });

    }
    getPrintTypes();
    getColors();
    getStatus();
    getManufactures();
    getCartridges();

    $scope.cancel = function(){
        $location.path('/devices');
    }
}