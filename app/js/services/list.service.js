;
(function() {

    angular.module('todoApp')
        .factory('listService', ['$resource', function($resource) {

            var resource = $resource('/api/:user_id/:catId/lists/:archieve/:listId', { catId: '@id', listId: '@id' });

            function getAllLists(id, userId) {
                if (id) {
                    return resource.query({ user_id: userId, catId: id });
                } else {
                    return resource.query({user_id: userId});
                }
            }

            function getArchieve(userId) {
                return resource.query({archieve: 'archieve', user_id: userId});
            }

            return {
                getAllLists: getAllLists,
                getArchieve: getArchieve,
            }

        }]);

}());