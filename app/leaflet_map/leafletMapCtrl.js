
app.controller("leafletMapCtrl", function ($scope, $rootScope, mapConfig) {

    /**
     * Already rendered markers on map.
     * @type {Array}
     */
    $scope.rendered_markers = [];

    // Initialize the map
    $scope.map = L.map('map').
        setView([mapConfig.center_lan, mapConfig.center_tng], mapConfig.zoom);
    // Create custom configurations for map marker
    var myIcon = L.icon({
        iconUrl: mapConfig.iconUrl,
        iconSize: mapConfig.iconSize
    });
    // Load a tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo($scope.map);

    /**
     * Receiving data from mainCoordinatesTreeCtrl
     * @param event {object}
     * @param args {object} selected main list item with coordinates data.
     */
    $scope.$on("setSelectedCoords", function (event, args) {
        var current_marker = L.
            marker([args.message.data.lat, args.message.data.lng], {icon: myIcon}).
            addTo($scope.map);

        // Insert item object into unique position of rendered markers list.
        $scope.rendered_markers[current_marker._leaflet_id] = args.message;

        current_marker.on('mouseover', function (event) {

            $rootScope.$broadcast("removeMapMarker", {
                message: $scope.rendered_markers[this._leaflet_id]
            });
            $scope.map.removeLayer(this);
        });
    });
});
