application.controller('loginCtrl', ['$scope', '$rootScope', 'socket', '$location', '$routeParams', loginCtrl]);

function loginCtrl($scope, $rootScope, socket, $location, $routeParams) {

    $scope.vm = this;
    $scope.login = {
        userName: "",
        pwd: "",
        rememberMe: false
    };


    $scope.logIn = function () {
        socket.emit("login", $scope.login, function (err, data) {
            if (err) {
                $rootScope.user = null;
                return console.error(err);
            }
            if (data) {
                $.cookie("KPMAUTHORIZATIONTOKEN", data.token, {path: '/'});
                console.log("cookie", $.cookie("KPMAUTHORIZATIONTOKEN") );
                $rootScope.user = data.user;

                socket.connect(function() {
                    socket.emit('getcurrentmenu', {}, function(err, data) {
                        if (data)
                        {
                            $rootScope.menuDefinitions = data.menu;
                        }
                    });
                });
                window.location = $routeParams.url || "/#/main";
            }
        });

    };

    $scope.register = function () {
        $location.path('/login');
    };

}
