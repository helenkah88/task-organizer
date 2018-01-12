;(function() {

    angular.module('todoApp')
        .controller('TodoListCtrl', ['$scope', 'todoListService', '$routeParams', '$rootScope', '$location', 'toastr', function($scope, todoListService, $routeParams, $rootScope, $location, toastr) {

            $rootScope.$on('$routeChangeStart', function(evt) {
                if($scope.task.name) {
                    var answer = confirm('You have unsaved changes, are you sure you wish to leave the page?');
                    if(!answer) evt.preventDefault();
                    else {
                        $scope.task.name = '';
                    }
                }
            })
            $scope.list = {};
            $scope.done = false;
            $scope.showMore = false;
            $scope.task = {};

            todoListService.getList($routeParams.id).$promise
                .then(function(data) {
                    $scope.list = data;
                }).catch(function(e) {
                    console.log(e);
                });

            $scope.archieve = function() {
                $scope.list.archieved = true;
                $scope.saveChanges();
                $location.path('/archieve');
            }

            $scope.addMore = function() {
                $scope.showMore = !$scope.showMore;
            }

            $scope.addNew = function() {
                if(!$scope.task.name) return;
                todoListService.addItem($scope.list._id, $scope.task).$promise
                    .then(function(data) {
                        $scope.showMore = false;
                        $scope.list.items.push(data);
                        $scope.task.name = '';
                    }).catch(function(e) {
                        console.log(e);
                    });
            }

            $scope.saveChanges = function() {
                $scope.list.updated = new Date;
                todoListService.updateList($scope.list).$promise
                    .then(function() {
                        toastr.success('changes saved');
                    }).catch(function(e) {
                        console.log(e);
                    });
            };

            $scope.removeList = function() {
                todoListService.deleteList($scope.list).$promise
                    .then(function(data) {
                        toastr.success(`List ${$scope.list.title} has been removed`)
                        $location.path('/0/lists');
                    }).catch(function(e) {
                        console.log(e);
                    });
            }

            $scope.removeItem = function(item) {
                todoListService.deleteItem($scope.list._id, item).$promise
                    .then(function() {
                        $scope.list.items = $scope.list.items.filter(function(task) {
                            return item._id !== task._id;
                        });
                        console.log(`item ${item.name} deleted`);
                    }).catch(function(e) {
                        console.log(e);
                    })
            }
        }]);

}());