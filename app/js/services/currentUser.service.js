;(function() {

    angular.module('todoApp')
        .factory('currentUserService', ['$window', function($window) {

            var store = $window.localStorage;

            function setCurrentUser(user) {
                store.setItem('user', user.username);
                store.setItem('userId', user._id);
                store.setItem('token', user.token);
            }

            function getToken() {
                return store.getItem('token');
            }

            function getUser() {
                return store.getItem('user');
            }

            function getUserId() {
                return store.getItem('userId');
            }

            function remove() {
                store.removeItem('token');
                store.removeItem('user');
                store.removeItem('userId');
            }

            return {
                setCurrentUser: setCurrentUser,
                getToken: getToken,
                getUser: getUser,
                getUserId: getUserId,
                remove: remove
            }
        }])

}());