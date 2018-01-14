;(function() {

    angular.module('todoApp')
        .filter('duration', function() {

            return function(items, duration) {
                if(!items) return '';
                var durationTime;
                duration = Number(duration);
                switch(duration) {
                    case 1:
                        durationTime = 7 * 24 * 60 * 60 * 1000;
                        break;
                    case 2:
                        durationTime = 4 * 7 * 24 * 60 * 60 * 1000;
                        break;
                    default:
                        durationTime = Date.now();
                }
                return items.filter(function(item) {
                    var diff = new Date - new Date(item.updated);
                    return diff < durationTime;
                });
            }
        })

}());