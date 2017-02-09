/**
 * Created by madina on 30.01.2017.
 */
application.controller('deviceCardCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', deviceCardCtrl]);

function deviceCardCtrl($scope, $rootScope, socket, $location, $routeParams) {

    if($routeParams.id){
        socket.emit('getdevice', {id:$routeParams.id}, function(err, data){
            if(err)return console.error(err);
            $scope.modalItem = data;
            getApplicationByItemId($scope.modalItem._id);
        });
    }
    else toastr.error('Выберите оборудование');
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
    getPrintTypes();
    getColors();
    getStatus();

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
    $scope.removeItem = function(id){
        if(confirm('Вы уверены что хотите отправить на утилизацию данное оборудование?')){
            socket.emit('deletedevice', {id:id}, function(err, res){
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
        socket.emit('getdeviceservices',{}, function(err,data){
            if(err)return console.error(err);
            $scope.services = data;
        });
    }
    getServices();

    $scope.getServiceId = function(id){
        var look = _.find($scope.services,{_id:id});
        return look?look.name:null
    }
    $scope.getServiceNames = function(app){
        var look = _.find(app.items, function(item){
            return item.facility && item.facility._id === $scope.modalItem._id
        });
        return _.map(look.services,function(service) {
            return service.name}
        ).join(", ");
    };
}