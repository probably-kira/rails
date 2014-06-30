App.controller('usersCtrl', ['$scope', '$users', '$normalizer', 'Pagination',  function($scope, $users, $normalizer, Pagination) {
	$scope.users = $users;
    $scope.newUser = {}
    $scope.newUserMode = false;
    $scope.disableOtherUsers = false;
    $scope.order = ['lastName', 'firstName', 'age', 'email', 'created', 'edited', 'active'];
    $scope.normalizer = $normalizer;
    $scope.backup = {};


    //get the initial data
    $users.on('change', function(data) {
        if (!$scope.$$phase) $scope.$apply();
        //we need to reinit pagination every time when we update the data
        initPagination();
    });
    $users.get();



    //existing user operations
    $scope.edit = function(user) {
        $scope.disableOtherUsers = true;
        $scope.backup = angular.copy(user);
        user.inEditMode = true;
    };
    $scope.save = function(id, user) {
        delete user.inEditMode;
        user.edited = new Date();
        $scope.users.update(id, user);
        $scope.disableOtherUsers = false;
    };
    $scope.reset = function(user) {
        delete user.inEditMode;
        angular.extend(user, $scope.backup);
        $scope.disableOtherUsers = false;
        $scope.backup = {};
    };
    $scope.toggleActive = function(user) {
        user.active = !user.active;
    };



    //new user operations
    $scope.addUser = function() {
        $scope.newUserMode = true;
        $scope.disableOtherUsers = true;
    };
    $scope.saveNew = function(user) {
        //assuming that new-created users are active by default
        if (!user.lastName) {
            //kind of validation
            alert('please provide the last name!');
            return false;
        }
        user.created = new Date();
        user.edited = new Date();
        user.active = true;
        $users.add(user);
        $scope.resetNew();
    };
    $scope.resetNew = function() {
        $scope.newUser = {};
        $scope.newUserMode = false;
        $scope.disableOtherUsers = false;
    };



    //calculate pagination
    function initPagination() {
        $scope.pagination = Pagination.getNew(4);
        $scope.pagination.numPages = Math.ceil($scope.users.list.length / $scope.pagination.perPage);
        if (!$scope.$$phase) $scope.$apply();
    }
}]);