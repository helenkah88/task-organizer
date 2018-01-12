;(function() {

    angular.module('todoApp')
        .factory('addTokenService', ['currentUserService', '$q', function(currentUserService, $q) {

            function request(config) {
                var token = currentUserService.getToken('token');
                if(token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return $q.when(config);
            }

            return {
                request: request
            }
        }])

        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push('addTokenService');
        }])

}());