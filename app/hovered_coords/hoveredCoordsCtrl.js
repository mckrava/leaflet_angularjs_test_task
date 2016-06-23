
app.controller("hoveredCoordsCtrl", function ($scope, $rootScope) {

    /**
     * List of removed markers from map.
     * @type {Array}
     */
    $scope.removed_map_markers = [];

    /**
     * Receiving data from leafletMapCtrl
     * @param event {object}
     * @param args {object} removed marker from map.
     */
    $scope.$on("removeMapMarker", function (event, args) {
        $scope.$apply(function(){
            $scope.removed_map_markers.push(args.message);
        });
    });


    /**
     * Send selected list items to mainCoordinatesTreeCtrl controller and remove
     * it from current list.
     * @param item_uid {number} uid of selected item on Removed map's 
     * markers list.
     */
    $scope.recreateCoordsItem = function (item_uid) {

        angular.forEach($scope.removed_map_markers, function(val, key){
            if (val.uid == item_uid) {
                $rootScope.$broadcast("recoveryCoordsItem", {
                    message: $scope.removed_map_markers[key]
                });
                $scope.removed_map_markers.splice(key, 1);
            }
        });
    };

});
