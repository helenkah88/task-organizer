;(function() {

    angular.module('todoApp')
        .directive('goalNotifier', function() {
            return {
                require: '^ngModel',
                scope: {
                    model: '='
                },
                controller: function($scope, $rootScope) {
                    $rootScope.$broadcast('notify', $scope.model);
                }
            }
        })

}());