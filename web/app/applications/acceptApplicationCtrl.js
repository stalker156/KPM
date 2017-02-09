/**
 * Created by madina on 02.02.2017.
 */
application.controller('acceptApplicationCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams','$timeout', acceptApplicationCtrl]);

function acceptApplicationCtrl($scope, $rootScope, socket, $location, $routeParams,$timeout) {
    var self = this;

    this.emptyModal = {
        name:null,
        stage:0

    };
    $scope.types = [
        {name:'Картридж', value:0, data:[] },
        {name:'Оборудование', value:1, data:[] }
    ];
    this.init = function(){

        $scope.modalItem = _.clone(self.emptyModal);
        $scope.modalItem.type = 0;

        $scope.selectedType = $scope.types[0];
    };

    self.init();

    getCartrides();
    getDevices();

    $scope.save = function(){
        socket.emit('addapplication', $scope.modalItem, function(err, data){
            if(err) {
                toastr.error('Ошибка');
                return console.error(err);
            }
            toastr.success('Сохранено');
            self.init();
            getApplications();
        });

    };

    $scope.setType = function(type){
        $scope.selectedType = _.clone(type);
        $scope.modalItem.type = type.value;

    }
    function getCartrides (){
        socket.emit('getcartridges',{}, function(err,data){
            if(err)return console.error(err);
            $scope.types[0].data = data;
        });

        socket.emit('getcartridgeservices',{}, function(err,data){
            if(err)return console.error(err);
            $scope.types[0].services = data;
        });
    }
    function getDevices (){
        socket.emit('getdevices',{}, function(err,data){
            if(err)return console.error(err);
            $scope.types[1].data = data;
        });

        socket.emit('getdeviceservices',{}, function(err,data){
            if(err)return console.error(err);
            $scope.types[1].services = data;
        });
    }

    function getApplications (){
        socket.emit('getapplicationsbystages', {stages:[0,1]}, function(err, data){
            if(err)return console.error(err);
            $scope.applications = data;
        });
    }
    getApplications();

    $scope.accept = function(index){
        var model = JSON.parse(angular.toJson($scope.applications[index]));
        socket.emit('acceptapplication', model, function(err, data){
            if(err) {
                toastr.error('Ошибка');
                return console.error(err);
            }
            toastr.success('Заявка принята');
            getApplications();
        });

    };

    $scope.getServiceNames = function(services){
        return _.map(services,function(service) {
            return service.name}
        ).join(", ");
    };
    $scope.searchData = function(){
        socket.emit('searchapplications',{searchTerm:$scope.searchTerm, stages:[0,1]}, function(err,data){
            if(err)return console.error(err);
            $scope.applications = data;
        });
    };

}