App.controller('usersCtrl', ['$scope', '$users', 'Pagination',  function($scope, $users, Pagination) {
	$scope.users = $users;

    $scope.order = ['lastName', 'firstName', 'age', 'email', 'created', 'edited', 'active'];
    $scope.normalizer = {
        lastName: {
            placeholder: 'Enter a last name',
            header: 'Last name'
        },
        firstName: {
            placeholder: 'Enter a first name',
            header: 'First name'
        },
        age: {
            placeholder: 'Age',
            header: 'Age'
        },
        email: {
            placeholder: 'emal@yourdomain.com',
            header: 'Email'
        },
        created: {
            header: 'Created'
        },
        edited: {
            header: 'Last edited'
        },
        active: {
            header: 'Active'
        }
    };


    $users.on('change', function() {
        if (!$scope.$$phase) $scope.$apply();

        //we need to reinit pagination every time whaen we update the data
        initPagination();
    });
    $users.get();


    var backup = {};
    $scope.edit = function(id) {
        var user = $users.getUser(id);
        backup = angular.copy(user);
        user.inEditMode = true;
    };

    function updateUserList(id, userData, silent) {
        $scope.users.update(id, userData, silent);
        backup = {};
    };

    $scope.save = function(id, user) {
        delete user.inEditMode;
        user.edited = new Date();
        updateUserList(id, user);
    };

    $scope.reset = function(id, user) {
        delete user.inEditMode;
        updateUserList(id, backup, true);
    };

    $scope.newUser = {}
    $scope.newUserMode = false;
    $scope.addUser = function() {
        $scope.newUserMode = true;
    };

    $scope.saveNew = function(user) {
        //assuming that new-created users are active by default
        if (!user.lastName) {
            //kind of validation
            alert('please provide the last name!');
            return;
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
    };

    $scope.toggleActive = function(user) {
        user.active = !user.active;
    };

    //sorting
    $scope.sortParams = {
        field: 'lastName',
        desc: false
    };
    $scope.sort = function(field) {
        var sortParams = $scope.sortParams;
        if (sortParams.field === field) {
            sortParams.desc = !sortParams.desc;
        } else {
            sortParams.field = field;
            sortParams.desc = false;
        }
    }

    function initPagination() {
        $scope.pagination = Pagination.getNew(4);
        $scope.pagination.numPages = Math.ceil($scope.users.list.length / $scope.pagination.perPage);
        if (!$scope.$$phase) $scope.$apply();
    }
}]);