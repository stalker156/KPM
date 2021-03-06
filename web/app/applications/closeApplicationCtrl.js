/**
 * Created by madina on 02.02.2017.
 */
application.controller('closeApplicationCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams','$timeout','$window', closeApplicationCtrl]);

function closeApplicationCtrl($scope, $rootScope, socket, $location, $routeParams,$timeout,$window) {
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

        $scope.modalItem = JSON.parse(JSON.stringify(self.emptyModal));
        $scope.modalItem.type = 0;

        $scope.selectedType = $scope.types[0];
    };

    self.init();

    getCartrides();
    getDevices();

    $scope.dataToSearch = {
        searchTerm:null
    };
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
        self.init();
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
        socket.emit('getapplicationsbystages', {stages:[1,2]}, function(err, data){
            if(err)return console.error(err);
            $scope.applications = data;
        });
    }
    getApplications();

    $scope.showModal = function(index){
        $scope.modalItem = JSON.parse(JSON.stringify($scope.selectedApplication.items[index]));
        $scope.modalItem.doneServices = JSON.parse(JSON.stringify($scope.modalItem.services));
        $scope.selectedType = $scope.types[$scope.modalItem.type]
    };

    $scope.getServiceNames = function(services){
        return _.map(services,function(service) {
            return service.name}
        ).join(", ");
    };
    $scope.closeApplication = function(){
        if(_.some($scope.selectedApplication.items, function(item){
                return !item.doneServices || !item.doneServices.length
            }))
            return toastr.error('Выберите выполненные работы');
        socket.emit('closeapplication', JSON.parse(angular.toJson($scope.selectedApplication)), function(err, data){
            if(err) {
                toastr.error('Ошибка');
                return console.error(err);
            }
            toastr.success('Заявка закрыта');
            $scope.selectedApplication = null;
            getApplications();
        });

    }
    $scope.addService = function(service){
        var look = _.find($scope.modalItem.doneServices, {_id:service._id});
        if(look){
            $scope.modalItem.doneServices = _.without($scope.modalItem.doneServices, look);
        }
        else $scope.modalItem.doneServices.push(service)

    };

    $scope.isServiceChecked = function(id){
        var look = _.find($scope.modalItem.doneServices, {_id:id});
        return look?true:false;
    };

    $scope.searchData = function(){
        socket.emit('searchapplications',{searchTerm:$scope.dataToSearch.searchTerm, stages:[1,2]}, function(err,data){
            if(err)return console.error(err);
            $scope.applications = data;
        });
    };

    $scope.selectApp = function(index){
        $scope.selectedApplication = JSON.parse(JSON.stringify($scope.applications[index]));
        // $scope.selectedApplication = $scope.applications[index];


    };
    $scope.changeItem = function(){
        for(var i = 0; i<$scope.selectedApplication.items.length;i++){

            if(_.isEqual($scope.selectedApplication.items[i].facility,$scope.modalItem.facility) && $scope.selectedApplication.items[i].comment === $scope.modalItem.comment ){
                $scope.selectedApplication.items[i] = JSON.parse(JSON.stringify($scope.modalItem));
            }
        }
        $('#myModal').modal('hide')
    }

    $scope.printActs = function(){
        $window.location.href = $rootScope.API_ADDRESS+'/api/downloadFile2?model='+JSON.stringify($scope.selectedApplication);
    };
}