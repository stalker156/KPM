/**
 * Created by madina on 05.02.2017.
 */

application.controller('report2Ctrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', report2Ctrl]);

function report2Ctrl($scope, $rootScope, socket, $location, $routeParams) {
    $scope.finishDate=new Date();
    $scope.finishDate.setMinutes(0);
    $scope.startDate=new Date(new Date().setMonth(new Date().getMonth() - 1));
    $scope.startDate.setMinutes(0);
    $.datetimepicker.setLocale('ru');
    $("#startDate").datetimepicker({
        value: $scope.startDate,
        step:60,
        dayOfWeekStart: 1,
        onChangeDateTime: function (current_time) {
            $scope.startDate=current_time;
            //console.log($scope.dateFrom);
        }
    });
    $("#finishDate").datetimepicker({
        value: $scope.finishDate,
        step:60,
        dayOfWeekStart: 1,
        onChangeDateTime: function (current_time) {
            $scope.finishDate=current_time;
            //console.log($scope.dateTo);
        }
    });
    
    function getCustomers(){
        socket.emit('getcustomers',{}, function(err, data){
            if(err)return console.error(err);
            $scope.customers = data;
        });

    }
    getCustomers();
}