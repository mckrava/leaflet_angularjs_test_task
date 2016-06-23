
app.controller("mainCoordinatesTreeCtrl", function ($scope, $rootScope) {

    /**
     * Receiving data from hoveredCoordsCtrl
     * @param event {object}
     * @param args {object} removed item from Removed map's markers list.
     */
    $scope.$on("recoveryCoordsItem", function (event, args) {
        $scope.insert_coords_item_into_list(args.message);
    });

    /**
     * Remove selected item(s) or the lowest level item(s) with coordinates
     * data from list and send coordinates to leafletMapCtrl
     * controller for setting markers.
     * @param branch {object} selected list item.
     */
    $scope.render_markers = function (branch) {


        if (branch.data != undefined) {
            //Send and remove list item(s) when it hasn't children but has
            // coordinates data.

            // Make style of selected item with coordinates data as "Unselected".
            branch.selected = false;

            var copy_branch = {};
            // Send necessary list item with coordinates data to
            // leafletMapCtrl controller
            $rootScope.$broadcast("setSelectedCoords", {
                message: angular.extend(copy_branch, branch)
            });
            $scope._remove_coords_item(branch);
        } else {
            //Send and remove list item(s) when it has children but hasn't
            // coordinates data.

            var temp_selected_items = [];
            for (var child_ind in branch.children) {
                if (branch.children[child_ind].data != undefined) {
                    // When necessary item(s) is second level item(s).
                    var copy_branch = {};
                    // Send necessary list item with coordinates data to
                    // leafletMapCtrl controller
                    $rootScope.$broadcast("setSelectedCoords", {
                        message: angular.
                            extend(copy_branch, branch.children[child_ind])
                    });
                    temp_selected_items.push(branch.children[child_ind]);
                } else {
                    // When necessary item(s) is third level item(s).
                    for (var sub_child_ind in branch.children[child_ind].children) {

                        var copy_branch = {};
                        // Send necessary list item with coordinates data to
                        // leafletMapCtrl controller
                        $rootScope.$broadcast("setSelectedCoords", {
                            message: angular.
                            extend(copy_branch, branch.children[child_ind].
                                children[sub_child_ind])
                        });
                        temp_selected_items.push(branch.children[child_ind].
                                                        children[sub_child_ind]);
                    }
                    angular.forEach(temp_selected_items, function (val, key) {
                        $scope._remove_coords_item(val);
                    })
                }
            }
            angular.forEach(temp_selected_items, function (val, key) {
                $scope._remove_coords_item(val);
            })
        }
    };

    /**
     * Remove necessary list item from list object ($scope.coords_tree).
     * @param branch {object} necessary list item for removing.
     */
    $scope._remove_coords_item = function (branch) {

        if (branch.parent_uid === undefined) {
            // If first level branch has coordinates data and
            // doesn't have parents

            angular.forEach($scope.coords_tree, function (val, key) {
                if (val.uid === branch.uid) {
                    $scope.coords_tree.splice(key, 1);
                }
            })
        } else {
            // Check first level branches for presence of the selected
            // item with coordinates data on it.
            angular.forEach($scope.coords_tree, function (first_level_br, f_l_key) {
                if (first_level_br.uid == branch.parent_uid) {
                    angular.forEach(first_level_br.children,
                        function (second_l_child, s_l_key) {
                        if (second_l_child.uid == branch.uid) {
                            first_level_br.children.splice(s_l_key, 1)
                        }
                    })
                } else {
                    // Check second level branches for presence of the
                    // selected item with coordinates data on it.
                    angular.forEach(first_level_br.
                        children, function (second_l_child, s_l_key) {
                        if (second_l_child.uid == branch.parent_uid) {
                            angular.forEach(second_l_child.children,
                                function (third_l_child, t_l_key) {
                                if (third_l_child.uid == branch.uid) {
                                    second_l_child.children.splice(t_l_key, 1);
                                }
                            })
                        }
                    })
                }
            });
        }
    };

    /**
     * Initialize data for list with coordinates.
     * @type {Array}
     */
    $scope.coords_tree = [
        {
            label: 'First Branch',
            onSelect: $scope.render_markers,
            children: [{
                label: 'First Branch - SecondLevel 1',
                onSelect: $scope.render_markers,
                children: [
                    {
                        label: 'First Branch - Third level 1.1',
                        onSelect: $scope.render_markers,
                        classes: ["text-color-red"],
                        data: {
                            lat: '7.951933',
                            lng: '98.338088',
                            position: '1'
                        }
                    },
                    {
                        label: 'First Branch - Third level 1.2',
                        onSelect: $scope.render_markers,
                        classes: ["text-color-red"],
                        data: {
                            lat: '7.952817',
                            lng: '98.287983',
                            position: '2'
                        }
                    }]
            }]
        },
        {
            label: 'Second Branch',
            onSelect: $scope.render_markers,
            children: [{
                label: 'Second Branch - SecondLevel 1',
                onSelect: $scope.render_markers,
                children: [
                    {
                        label: 'Second Branch - Third level 1.1',
                        onSelect: $scope.render_markers,
                        classes: ["text-color-red"],
                        data: {
                            lat: '7.895009',
                            lng: '98.342915',
                            position: '1'
                        }
                    },
                    {
                        label: 'Second Branch - Third level 1.2',
                        onSelect: $scope.render_markers,
                        classes: ["text-color-red"],
                        data: {
                            lat: '7.89739',
                            lng: '98.38377',
                            position: '2'
                        }
                    }]
            },
                {
                    label: 'Second Branch - SecondLevel 2',
                    onSelect: $scope.render_markers,
                    children: [
                        {
                            label: 'Second Branch - Third level 2.1',
                            onSelect: $scope.render_markers,
                            classes: ["text-color-red"],
                            data: {
                                lat: '7.858961',
                                lng: '98.370724',
                                position: '1'
                            }
                        },
                        {
                            label: 'Second Branch - Third level 2.2',
                            onSelect: $scope.render_markers,
                            classes: ["text-color-red"],
                            data: {
                                lat: '7.82733',
                                lng: '98.388233',
                                position: '2'
                            }
                        }]
                }
            ]
        },
        {
            label: 'Third Branch',
            onSelect: $scope.render_markers,
            classes: ["text-color-red"],
            data: {
                lat: '7.771546',
                lng: '98.3218',
                position: '3'
            }
        },
        {
            label: 'Fourth Branch',
            onSelect: $scope.render_markers,
            children: [{
                label: 'Fourth Branch - Second level 1',
                onSelect: $scope.render_markers,
                classes: ["text-color-red"],
                data: {
                    lat: '7.829371',
                    lng: '98.297081',
                    position: '1'
                }
            },
                {
                    label: 'Fourth Branch - Second level 2',
                    onSelect: $scope.render_markers,
                    classes: ["text-color-red"],
                    data: {
                        lat: '7.785153',
                        lng: '98.368492',
                        position: '2'
                    }
                }
            ]
        }
    ];

    /**
     * Insert items from Removed map's markers list to the main left list.
     * @param item {object} removed item from Removed map's markers list.
     */
    $scope.insert_coords_item_into_list = function (item){

        if (item.parent_uid === undefined) {
            $scope.coords_tree.splice(parseInt(item.data.position - 1), 0, item);
            item.selected = false;

        } else {
            angular.forEach($scope.coords_tree, function(first_l, f_l_key) {
                if (first_l.uid == item.parent_uid) {
                    first_l.children.splice(item.data.position - 1, 0, item);
                } else {
                    angular.forEach(first_l.children, function(second_l, s_l_key) {
                        if (second_l.uid == item.parent_uid) {
                            second_l.children.
                            splice(item.data.position - 1, 0, item);
                        }
                    });
                }
            });
        }
    };
});
