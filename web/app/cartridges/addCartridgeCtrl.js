/**
 * Created by madina on 02.02.2017.
 */
application.controller('addCartridgeCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', addCartridgeCtrl]);

function addCartridgeCtrl($scope, $rootScope, socket, $location, $routeParams) {
    var self = this;

    this.emptyModal = {
        name:null
    };

    $scope.modalItem = self.emptyModal;

    $scope.save = function(){
        socket.emit('addcartridge', $scope.modalItem, function(err, data){
            if(err) {
                toastr.error('Ошибка');
                return console.error(err);
            }
            toastr.success('Сохранено');
            $location.path('/cartridges');
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
    function getDevices(){
        socket.emit('getdevices',{}, function(err, data){
            if(err)return console.error(err);
            $scope.devices = data;
        });

    }
    getPrintTypes();
    getColors();
    getStatus();
    getDevices();

    $scope.cancel = function(){
        $location.path('/cartridges');
    }
}