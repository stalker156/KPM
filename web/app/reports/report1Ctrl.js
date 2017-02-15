/**
 * Created by madina on 05.02.2017.
 */

application.controller('report1Ctrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', report1Ctrl]);

function report1Ctrl($scope, $rootScope, socket, $location, $routeParams) {
    var self = this;
    $scope.items = [];
    this.searchOptions = {
        type:null,
        model:null,
        id:null

    };
    $scope.types = [
        {value:0, name:'Картридж',  data:[] },
        {value:1, name:'Оборудование',  data:[] }
    ];
    this.init = function(){

        $scope.searchOptions = JSON.parse(JSON.stringify(self.searchOptions));
        $scope.searchOptions.type = 0;
    };

    self.init();

    $scope.getData = function(){
        socket.emit('getcartridgesanddevices',{type:$scope.searchOptions, model:$scope.searchOptions.model, id:$scope.searchOptions.id}, function(err, result){
            if(err)return console.error(err);
            $scope.data = result
        });
    }
}