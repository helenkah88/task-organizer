;(function() {

    angular.module('todoApp')
        .factory('checkAuth', ['$q', 'currentUserService', '$location', function($q, currentUserService, $location) {

            function redirect(rejection) {
                if(rejection.status === 401) {
                    currentUserService.remove();
                    $location.path('/');
                }
                return $q.reject(rejection);
            }

            return {
                responseError: redirect
            }
        }])
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push('checkAuth');
        }])

}());