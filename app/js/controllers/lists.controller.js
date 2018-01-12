;
(function() {

    angular.module('todoApp')
        .controller('ListsCtrl', ['$scope', 'listService', 'categoryService', 'todoListService', '$routeParams', '$location', 'currentUserService', 'toastr', function($scope, listService, categoryService, todoListService, $routeParams, $location, currentUserService, toastr) {

            $scope.list = {};
            $scope.list.items = [];
            $scope.items = {};
            $scope.category = {};
            $scope.categories = [];
            $scope.archieve = [];
            $scope.limit = 10;
            $scope.newCategory = false;
            $scope.listShowState = false;
            $scope.categoryOpts = false;
            $scope.showEdited = false;
            $scope.catAdded = false;
            $scope.categoryShowState = false;

            $scope.message = '';

            var userId = currentUserService.getUserId();

            $scope.listCopy = angular.copy($scope.list);

            categoryService.getAllCategories(userId).$promise
                .then(function(data) {
                    $scope.categories = data;
                }).catch(function(e) {
                    console.log(e);
                });

            listService.getArchieve(userId).$promise
                .then(function(data) {
                    if (data.length) {
                        $scope.archieve = data;
                    } else {
                        $scope.message = 'No lists found';
                    }
                })
                .catch(function(e) {
                    console.log(e);
                });

            $scope.showNewCategory = function() {
                $scope.categoryShowState = !$scope.categoryShowState;
            }

            $scope.showNewItem = function() {
                $scope.listShowState = !$scope.listShowState;
            }

            $scope.addItem = function() {
                if(!$scope.items.item) return;
                $scope.listCopy.items.push({ name: $scope.items.item });
                $scope.items.item = '';
            };

            $scope.createList = function() {
                if (!$scope.listCopy.items.length) return;

                if (!$scope.listCopy.title) {
                    $scope.listCopy.title = $scope.listCopy.items[0].name;
                }

                $scope.list = angular.copy($scope.listCopy);
                $scope.list.userId = userId;

                todoListService.createList($scope.list).$promise
                    .then(function(data) {
                        $location.path(`/list/${data._id}`);
                    }).catch(function(e) {
                        console.log(e);
                    })
            };

            $scope.removeList = function(list) {
                todoListService.deleteList(list).$promise
                    .then(function(data) {
                        toastr.success(`List ${list.title} has been removed`);
                        $location.path('/0/lists');
                    }).catch(function(e) {
                        console.log(e);
                    });
            }

            $scope.showNew = function() {
                $scope.categoryOpts = !$scope.categoryOpts;
            }

            $scope.createCategory = function() {
                if (!$scope.category.title) return;

                $scope.category.userId = userId;
                $scope.newCategory = true;
                $scope.categoryShowState = false;
                categoryService.createCategory($scope.category).$promise
                    .then(function(data) {
                        $scope.listCopy.categoryId = data._id;
                    }).catch(function(e) {
                        console.log(e);
                    });
            }

            $scope.activate = function(list) {
                list.archieved = false;
                list.updated = new Date;
                todoListService.updateList(list).$promise
                    .then(function(data) {
                        $scope.archieve = $scope.archieve.filter(function(item) {
                            return item._id !== data._id;
                        })
                        console.log(`updated`);
                    }).catch(function(e) {
                        console.log(e);
                    })
            }

            $scope.resetList = function() {
                $scope.listShowState = !$scope.listShowState;
                $scope.listCopy = angular.copy($scope.list);
            }

            if ($routeParams.id == '0') {
                listService.getAllLists(null, userId).$promise
                    .then(function(data) {
                        if (data.length) {
                            $scope.lists = data;
                        } else {
                            $scope.message = 'No lists found';
                        }
                    }).catch(function(e) {
                        console.log(e);
                    });
            } else {
                listService.getAllLists($routeParams.id, userId).$promise
                    .then(function(data) {
                        if (data.length) {
                            $scope.lists = data;
                        } else {
                            $scope.message = 'No lists found';
                        }
                    }).catch(function(e) {
                        console.log(e);
                    });
            }
        }]);

}());