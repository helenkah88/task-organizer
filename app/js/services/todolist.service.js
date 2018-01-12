;(function() {

    angular.module('todoApp')
        .factory('todoListService', ['$resource', function($resource) {

            var resource = $resource('/api/:catId/lists/:listId/:itemId', { listId: '@_id'}, {update: {method: 'PUT'}});

            function getList(id) {
                return resource.get({listId: id});
            }

            function createList(list) {
                return resource.save(list);
            }

            function updateList(list) {
                return resource.update(list);
            }

            function deleteList(list) {
                return resource.remove({listId: list._id});
            }

            function addItem(id, item) {
                return resource.save({listId: id}, item);
            }

            function deleteItem(id, item) {
                return resource.remove({listId: id, itemId: item._id});
            }

            return {
                getList: getList,
                createList: createList,
                updateList: updateList,
                deleteList: deleteList,
                addItem: addItem,
                deleteItem:deleteItem
            }
            
        }]);

}());