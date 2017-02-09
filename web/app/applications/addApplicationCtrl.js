/**
 * Created by madina on 02.02.2017.
 */
application.controller('addApplicationCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams','$timeout', addApplicationCtrl]);

function addApplicationCtrl($scope, $rootScope, socket, $location, $routeParams,$timeout) {
    var self = this;
    $scope.items = [];
    this.emptyModal = {
        services:[],
        facility:{}

    };
    $scope.types = [
        {value:0, name:'Картридж',  data:[] },
        {value:1, name:'Оборудование',  data:[] }
    ];
    this.init = function(){

        $scope.modalItem = JSON.parse(JSON.stringify(self.emptyModal));
        $scope.modalItem.type = 0;

        $scope.selectedType = $scope.types[0];
    };

    self.init();

    getCartrides();
    getDevices();

    $scope.save = function(){
        if(!$scope.items || !$scope.items.length)
            return toastr.error('Перечень пуст');
        var model = JSON.parse(angular.toJson({
            stage:0,
            items:$scope.items
        }));
        socket.emit('addapplication',model, function(err, data){
            if(err) {
                toastr.error('Ошибка');
                return console.error(err);
            }
            toastr.success('Сохранено');
            $scope.items = [];
            self.init();
        });

    };

    $scope.setType = function(type){
        self.init();

        $scope.selectedType = _.clone(type);
        $scope.modalItem.type = type.value;

    };
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
    //
    // $scope.getID = function(id, type){
    //     var look = _.find($scope.types[type].data, {_id:  id});
    //     return look?look.ID:"";
    // };
    // $scope.getModel = function(id, type){
    //     var look = _.find($scope.types[type].data, {_id:  id});
    //     return look?look.model:"";
    // };
    // $scope.getService = function(id, type){
    //     var look = _.find($scope.types[type].services, {_id: id});
    //     return look?look.name:"";
    // };

    $scope.getServiceNames = function(services){
        return _.map(services,function(service) {
            return service.name}
        ).join(", ");
    };

    $scope.addService = function(service){
        var look = _.find($scope.modalItem.services, {_id:service._id});
        if(look){
            $scope.modalItem.services = _.without($scope.modalItem.services, look);
        }
        else $scope.modalItem.services.push(service)

    };

    $scope.isServiceChecked = function(id){
        var look = _.find($scope.modalItem.services, {_id:id});
        return look?true:false;
    };

    $scope.printDivById = function(elem){
        var mywindow = window.open('', 'PRINT');


        // mywindow.document.write('<html><head></head><body >');
        mywindow.document.write(document.getElementById(elem).innerHTML);
        // mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

        return true;
    };
    $scope.printActs = function(){
        if(!$scope.items || !$scope.items.length)
            return toastr.error('Перечень пуст');

        var model = JSON.parse(angular.toJson({
            stage:0,
            items:$scope.items
        }));
        socket.emit('getreport1file',model, function(err, res){
            if(err){
                toastr.error('ошибка');
                console.error(err);
            }
            console.log(res);
            // $scope.linkToDownLoad = res;
            document.getElementById('my_iframe').src = res;

        });
    };

    $scope.addItem = function(){
        if(!$scope.modalItem.facility || !$scope.modalItem.facility._id)
            return toastr.error('Выберите ID картриджа/оборудования');

        if(!$scope.modalItem.services || !$scope.modalItem.services.length)
            return toastr.error('Выберите вид работ');

        $scope.items.push($scope.modalItem);
        self.init();
    };

    $scope.removeItem = function(index){
        $scope.items = _.without($scope.items, $scope.items[index]);
    }

}