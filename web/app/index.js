var application = angular
    .module('application', ['ngRoute'])
    .config(['$routeProvider', function (routeProvider) {
        routeProvider
            .otherwise({redirectTo: '/cartridges'})
            .when('/login', {templateUrl: "app/login/login.html"})
            .when('/applications', {templateUrl: "app/applications/addApplication.html"})
            .when('/applications/add', {templateUrl: "app/applications/addApplication.html"})
            .when('/applications/accept', {templateUrl: "app/applications/acceptApplication.html"})
            .when('/applications/close', {templateUrl: "app/applications/closeApplication.html"})
            .when('/cartridges', {templateUrl: "app/cartridges/cartridges.html"})
            .when('/cartridges/show', {templateUrl: "app/cartridges/cartridgeCard.html"})
            .when('/cartridges/add', {templateUrl: "app/cartridges/addCartridge.html"})
            .when('/devices', {templateUrl: "app/devices/devices.html"})
            .when('/devices/show', {templateUrl: "app/devices/deviceCard.html"})
            .when('/devices/add', {templateUrl: "app/devices/addDevice.html"})
            .when('/dictionary', {templateUrl: "app/dictionaries/customer/customer.html"})
            .when('/dictionary/customer', {templateUrl: "app/dictionaries/customer/customer.html"})
            .when('/dictionary/customer/edit', {templateUrl: "app/dictionaries/customer/selectedCustomer.html"})
            .when('/dictionary/user', {templateUrl: "app/dictionaries/users/user.html"})
            .when('/dictionary/user/edit', {templateUrl: "app/dictionaries/users/selectedUser.html"})
            .when('/dictionary/cartridgeService', {templateUrl: "app/dictionaries/cartridgeService/cartridgeService.html"})
            .when('/dictionary/cartridgeService/edit', {templateUrl: "app/dictionaries/cartridgeService/selectedCartridgeService.html"})
            .when('/dictionary/deviceService', {templateUrl: "app/dictionaries/deviceService/deviceService.html"})
            .when('/dictionary/deviceService/edit', {templateUrl: "app/dictionaries/deviceService/selectedDeviceService.html"})
            .when('/dictionary/common/status', {templateUrl: "app/dictionaries/common/statuses/statuses.html"})
            .when('/dictionary/common/status/edit', {templateUrl: "app/dictionaries/common/statuses/selectedStatus.html"})
            .when('/dictionary/common/color', {templateUrl: "app/dictionaries/common/colors/colors.html"})
            .when('/dictionary/common/color/edit', {templateUrl: "app/dictionaries/common/colors/selectedColor.html"})
            .when('/dictionary/common/printTypes', {templateUrl: "app/dictionaries/common/printTypes/prints.html"})
            .when('/dictionary/common/printTypes/edit', {templateUrl: "app/dictionaries/common/printTypes/selectedPrint.html"})
            .when('/dictionary/common/manufacture', {templateUrl: "app/dictionaries/common/manufactures/manufactures.html"})
            .when('/dictionary/common/manufacture/edit', {templateUrl: "app/dictionaries/common/manufactures/selectedManufacture.html"})
            .when('/dictionary/utilization', {templateUrl: "app/dictionaries/utilization/utilizations.html"})
            .when('/reports', {templateUrl: "app/reports/report1.html"})
        ;


    }])
    .factory('socket', function ($rootScope, $window, $location) {

        var self = this;
        self.redirectToLoginActive = false;
        this.toLogin = function () {
            if (!self.redirectToLoginActive) {
                var currentUrl = encodeURIComponent($location.absUrl());
                self.redirectToLoginActive = true;
                $window.location.href = '#/login?url=' + currentUrl;
            }
        };

        this.checkLogin = function (url) {
            var re = /(\/login)|(\/languages)|(\/register)|(\/loginNormal)/;
            if (url.match(re)) {
                return "";
            }
            var token = $.cookie("KPMAUTHORIZATIONTOKEN");

            //$cookies.get('ArndBooksAuthToken');
            if (token)
            {
                self.redirectToLoginActive = false;
                return token;
            }
        };



        this.socket;

        this.connect = function (done) {
            var args = arguments;
            //var token = this.checkLogin($location.absUrl());
            //self.socket = io.connect($rootScope.API_ADDRESS, {query: "token=" + self.checkLogin($location.absUrl())});
            if ($rootScope.API_ADDRESS) {
                // self.socket = io.connect($rootScope.API_ADDRESS, token ?  {query: "token="+ token} : {});
                self.socket = io.connect($rootScope.API_ADDRESS,{transports: ['websocket'], upgrade: false, query:{token:self.checkLogin($location.absUrl())}});

                self.socket.on('connect', function () {
                    self.socket.on('unauthorized', function () {
                        $.removeCookie("KPMAUTHORIZATIONTOKEN");
                        self.toLogin();
                    });
                    if (done) {
                        done.apply(args);
                    }
                    self.socket.on('token_expired', function() {
                        $.removeCookie("KPMAUTHORIZATIONTOKEN");
                    });
                });
            }
        }

        this.connect();


        return {
            on: function (eventName, callback) {
                self.socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(self.socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                if (self.socket && self.socket.connected) {
                    self.socket.emit(eventName, data, function () {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            if (callback) {
                                callback.apply(self.socket, args);
                            }
                        });
                    });
                } else {
                    self.connect(
                        function () {
                            self.socket.emit(eventName, data, function () {
                                var args = arguments;
                                $rootScope.$apply(function () {
                                    if (callback) {
                                        callback.apply(self.socket, args);
                                    }
                                });
                            });
                        }
                    );
                }
            },
            removeAllListeners: function (eventName) {
                self.socket.removeAllListeners(eventName);
            },
            connect: self.connect
        };
    }).controller('indexController', ['$scope', '$location', '$rootScope', '$http', 'socket','$window', indexController])
    .run(function ($rootScope, $http) {
            $rootScope.type = 0;
            $http.get('/config').success(function(result) {
                $rootScope.type =0;
                $rootScope.API_ADDRESS = result.api;
            }).error(function(err) {
                console.error(err);
                $rootScope.type = 0;
            });
        });

function indexController($scope, $location, $rootScope, $http, socket,$window) {
    $http.get('/config').success(function (result) {
        $rootScope.type = result.type;
        $rootScope.API_ADDRESS = result.api;

        socket.emit('getcurrentmenu', {}, function(err, data) {
            if (data)
            {
                $rootScope.menuDefinitions = data.menu;
                $rootScope.user = data.user;

                $rootScope.activeMenu = _.find($rootScope.menuDefinitions,{url: "/"+$location.url().split('/')[1]});

                if($rootScope.activeMenu && $rootScope.activeMenu.loadFirstChild && $rootScope.activeMenu.childs && $rootScope.activeMenu.childs.length){
                    $location.path($rootScope.activeMenu.childs[0].url);
                }
            }
        });

    }).error(function (err) {
        console.error(err);
        $rootScope.type = 0;
    });

    $scope.goTo = function (menuItem, isParent, isLastChild) {

        if(isParent && menuItem.childs && menuItem.childs.length){
            $rootScope.activeMenu = menuItem;
            $rootScope.secondaryActiveMenu = null;
        }
        else if(isParent){
            $rootScope.activeMenu = null;
            $rootScope.secondaryActiveMenu = null;
        }
        else if(menuItem.childs && menuItem.childs.length)
            $rootScope.secondaryActiveMenu = menuItem;
        else if(!isLastChild){
            $rootScope.secondaryActiveMenu = null;
        }
        if(menuItem.loadFirstChild && menuItem.childs && menuItem.childs[0]){
            $location.path(menuItem.childs[0].url);
        }
        else {
            $location.path(menuItem.url);
        }
        $(document).attr("title", "PrintPro | "+menuItem.name);

    };

    $scope.isActive = function (link, isParent) {
        if (link === $location.path() || (isParent && link === "/"+$location.url().split('/')[1])|| (link === "/"+$location.url().split('/')[1]+"/"+$location.url().split('/')[2]))
            return true;

    };

    $scope.logOut = function(){
        $scope.user = null;
        $scope.menuDefinitions = null;
        $.removeCookie("KPMAUTHORIZATIONTOKEN");
        location.reload();
    };


}

