/**
 * Created by madina on 30.01.2017.
 */
application.controller('devicesCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', devicesCtrl]);

function devicesCtrl($scope, $rootScope, socket, $location, $routeParams) {
    $scope.data = [];
    $scope.searchTerm = "";

    function getData() {
        socket.emit('getdevices',{}, function(err, data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    }
    getData();

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
    getPrintTypes();
    getColors();
    getStatus();
    getManufactures();


    $scope.searchData = function(){
        socket.emit('searchdevices',{searchTerm:$scope.searchTerm}, function(err,data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    };

    $scope.addItem = function(){
        $location.path("/devices/add");
    };

    $scope.removeItem = function(id){
        if(confirm('Вы уверены что хотите удалить данного заказчика?')){
            socket.emit('deletedevice', {id:id}, function(err, res){
                if(err){
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Удалено');
                $scope.searchData();
            });
        }
    };
    $scope.getCustomer = function(id){
        var look = _.find($scope.customers, {_id:id});
        return look?look.name:"";
    };
    $scope.getPrintType = function(id){
        var look = _.find($scope.printTypes, {_id:id});
        return look?look.name:"";
    };
    $scope.getColor = function(id){
        var look = _.find($scope.colors, {_id:id});
        return look?look.name:"";
    };
    $scope.getStatus = function(id){
        var look = _.find($scope.statuses, {_id:id});
        return look?look.name:"";
    };
    $scope.getManufacture= function(id){
        var look = _.find($scope.manufactures, {_id:id});
        return look?look.name:"";
    }
    $scope.showDeviceCard = function(id){
        $location.path('/devices/show').search({id:id});
    }
}