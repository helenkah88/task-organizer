;(function() {

    var app = angular.module('todoApp', ['ngRoute', 'ngResource', 'ngMessages', 'ngAnimate', 'toastr']);

    app.config(['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '/templates/main.html'
            })
            .when('/manager', {
                controller: 'ManagerCtrl',
                templateUrl: '/templates/manager.html'
            })
            .when('/categories', {
                controller: 'CategoriesCtrl',
                templateUrl: '/templates/categories.html',
                resolve: {
                    a: function($q, $location, currentUserService) {
                        var defer = $q.defer();
                        if(currentUserService.getToken('token')) {
                            defer.resolve();
                        } else {
                            $location.path('/');
                            defer.reject();
                        }
                        return defer.promise;
                    }
                }
            })
            .when('/categories/new-category', {
                controller: 'CategoriesCtrl',
                templateUrl: '/templates/categories-add.html'
            })
            .when('/:id/lists', {
                controller: 'ListsCtrl',
                templateUrl: '/templates/lists.html',
                resolve: {
                    a: function($q, $location, currentUserService) {
                        var defer = $q.defer();
                        if(currentUserService.getToken('token')) {
                            defer.resolve();
                        } else {
                            $location.path('/');
                            defer.reject();
                        }
                        return defer.promise;
                    }
                }
            })
            .when('/archieve', {
                controller: 'ListsCtrl',
                templateUrl: '/templates/lists-archieve.html',
                resolve: {
                    a: function($q, $location, currentUserService) {
                        var defer = $q.defer();
                        if(currentUserService.getToken('token')) {
                            defer.resolve();
                        } else {
                            $location.path('/');
                            defer.reject();
                        }
                        return defer.promise;
                    }
                }
            })
            .when('/lists/new-list', {
                controller: 'ListsCtrl',
                templateUrl: '/templates/lists-add.html',
                resolve: {
                    a: function($q, $location, currentUserService) {
                        var defer = $q.defer();
                        if(currentUserService.getToken('token')) {
                            defer.resolve();
                        } else {
                            $location.path('/');
                            defer.reject();
                        }
                        return defer.promise;
                    }
                }
            })
            .when('/list/:id', {
                controller: 'TodoListCtrl',
                templateUrl: '/templates/todolist.html',
                resolve: {
                    a: function($q, $location, currentUserService) {
                        var defer = $q.defer();
                        if(currentUserService.getToken('token')) {
                            defer.resolve();
                        } else {
                            $location.path('/');
                            defer.reject();
                        }
                        return defer.promise;
                    }
                }
            })
            .otherwise('/')

    }]);

}());