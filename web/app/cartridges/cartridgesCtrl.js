/**
 * Created by madina on 30.01.2017.
 */
application.controller('cartridgesCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', cartridgesCtrl]);

function cartridgesCtrl($scope, $rootScope, socket, $location, $routeParams) {
    $scope.data = [];
    $scope.searchTerm = "";

    function getData() {
        socket.emit('getcartridges',{}, function(err, data){
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
    getPrintTypes();
    getColors();
    getStatus();


    $scope.searchData = function(){
        socket.emit('searchcartridges',{searchTerm:$scope.searchTerm}, function(err,data){
            if(err)return console.error(err);
            $scope.data = data;
        });
    };

    $scope.addItem = function(){
        $location.path("/cartridges/add");
    };

    $scope.removeItem = function(id){
        if(confirm('Вы уверены что хотите удалить данного заказчика?')){
            socket.emit('deletecartridge', {id:id}, function(err, res){
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
        var look = _.find($scope.statuses, {value:id});
        return look?look.name:"";
    };
    $scope.showCartridgeCard = function(id){
        $location.path('/cartridges/show').search({id:id});
    }
}