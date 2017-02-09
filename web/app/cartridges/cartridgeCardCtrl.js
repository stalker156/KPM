/**
 * Created by madina on 30.01.2017.
 */
application.controller('cartridgeCardCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', cartridgeCardCtrl]);

function cartridgeCardCtrl($scope, $rootScope, socket, $location, $routeParams) {

    if($routeParams.id){
        socket.emit('getcartridge', {id:$routeParams.id}, function(err, data){
            if(err)return console.error(err);
            $scope.modalItem = data;
            getApplicationByItemId($scope.modalItem._id);
        });
    }
    else toastr.error('Выберите картридж');
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

    $scope.getCustomer = function(id){
        var look = _.find($scope.customers, {_id:id});
        return look?look.name:"";
    };
    $scope.getDevice = function(id){
        var look = _.find($scope.devices, {_id:id});
        return look?look.model:"";
    };
    $scope.getPrintType = function(id){
        var look = _.find($scope.printTypes, {_id:id});
        return look?look.name:"";
    };
    $scope.getColor = function(id){
        var look = _.find($scope.colors, {_id:id});
        return look?look.name:"";
    };
    $scope.removeItem = function(id){
        if(confirm('Вы уверены что хотите отправить на утилизацию данный картридж?')){
            socket.emit('deletecartridge', {id:id}, function(err, res){
                if(err){
                    toastr.error('Ошибка');
                    return console.error(err);
                }
                toastr.success('Отправлено на утилизацию');
            });
        }
    };

    function getApplicationByItemId (id){
        socket.emit('getapplicationsbyitemid', {id:id}, function(err, res){
            if(err)return console.error(err);
            $scope.applications = res;
        });

    }
    function getServices(){
        socket.emit('getcartridgeservices',{}, function(err,data){
            if(err)return console.error(err);
            $scope.services = data;
        });
    }
    getServices();

    $scope.getServiceId = function(id){
        var look = _.find($scope.services,{_id:id});
        return look?look.name:null
    };
    $scope.getServiceNames = function(app){
        var look = _.find(app.items, function(item){
            return item.facility && item.facility._id === $scope.modalItem._id
        });
        return _.map(look.services,function(service) {
            return service.name}
        ).join(", ");
    };
    $scope.getComment = function(app){
        var look = _.find(app.items, function(item){
            return item.facility && item.facility._id === $scope.modalItem._id
        });
        return look.comment
    };
}