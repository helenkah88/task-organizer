;(function() {

    angular.module('todoApp')
        .directive('todoItem', function() {
            return {
                templateUrl: '/templates/todo-item.html',
                scope: {
                    item: '=',
                    notify: '&'
                },
                controller: function($scope) {

                    $scope.checkState = $scope.item.done;

                    $scope.changeState = function() {
                        $scope.checkState = !$scope.checkState;
                        $scope.item.done = !$scope.item.done;
                    };

                    $scope.removeItem = function() {
                        $scope.notify();
                    }
                }
            }
        })

}());