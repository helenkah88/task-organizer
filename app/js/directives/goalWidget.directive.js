;
(function() {

    angular.module('todoApp')
        .directive('goalWidget', function() {
            return {
                templateUrl: '/templates/goal-widget.html',
                scope: {
                    currentUser: '='
                },
                controller: function($scope, $resource, currentUserService) {

                    var resource = $resource('/api/:id/goal');

                    resource.get({ id: currentUserService.getUserId()}).$promise
                        .then(function(data) {
                            $scope.currentUser.goal = data.goal;
                        }).catch(function(e) {
                            console.log(e);
                        })

                    $scope.setGoal = function(goal) {
                        resource.save({ id: currentUserService.getUserId() }, { goal: goal }).$promise
                            .then(function() {
                                $scope.currentUser.goal = goal;
                            }).catch(function(e) {
                                console.log(e);
                            })
                    };

                    $scope.$on('notify', function(evt, data) {
                        resource.save({ id: currentUserService.getUserId() }, { goal: data }).$promise
                            .then(function() {
                                $scope.currentUser.goal = data;
                            }).catch(function(e) {
                                console.log(e);
                            })
                    })
                }
            }
        })

}());