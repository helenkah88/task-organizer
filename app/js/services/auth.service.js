;(function() {

    angular.module('todoApp')
        .factory('authService', ['$resource', function($resource) {

            var resource = $resource('/login');

            function login(user) {
                return resource.save(user);
            }

            return {
                login: login
            }
        }])

}());