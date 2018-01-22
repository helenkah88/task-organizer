;(function() {

    angular.module('todoApp')
        .controller('AuthCtrl', ['$scope', 'authService', 'currentUserService', '$location', function($scope, authService, currentUserService, $location) {

            $scope.user = {};
            $scope.currentUser = currentUserService;
            $scope.errorMsg = '';
            $scope.menuOpen = true;

            $scope.toggleMenu = function() {
                $scope.menuOpen = !$scope.menuOpen;
            }

            $scope.login = function(form) {
                if (!form.$valid) return;

                authService.login($scope.user).$promise
                    .then(function(result) {
                        if (result.user.username && result.user._id && result.user.token) {
                            currentUserService.setCurrentUser(result.user);
                            form.$setUntouched;
                            $scope.errorMsg = '';
                            $scope.user.username = $scope.user.password = '';
                        }
                    }).catch(function(e) {
                        $scope.errorMsg = e.data.msg;
                    })
            }

            $scope.logout = function() {
                currentUserService.remove();
                $scope.currentUser.goal = '';
                $location.path('/');
            }
        }])

}());