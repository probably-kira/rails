'use strict';
describe("controllers", function() {
	beforeEach(module("app"));

	describe("usersCtrl:", function() {
        it('Turn existing user into edit mode', inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            var ctrl = $controller('usersCtrl', {$scope: scope});
            var user = {};

            scope.edit(user);
            expect(scope.disableOtherUsers).toBe(true);
            expect(user.inEditMode).toBe(true);
        }));

        it('Save existing modified user', inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            var ctrl = $controller('usersCtrl', {$scope: scope});
            var user = {
                edited: 1404139940617,
                id: 33,
                inEditMode: true
            };

            scope.save(user.id, user);
            expect(user.edited).not.toEqual(1404139940617);
            expect(user.edited > 1404139940617).toBe(true);
            expect(scope.disableOtherUsers).toBe(false);
            expect(user.inEditMode).not.toBe(true);
        }));

        it('Reset unsaved modified user', inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            var ctrl = $controller('usersCtrl', {$scope: scope});
            var user = {
                edited: 1404139940617,
                id: 33,
                lastName: 'Lannister',
                inEditMode: true
            };

            scope.backup = {
                edited: 1404139940617,
                id: 33,
                lastName: 'Stark'
            };

            scope.reset(user);
            expect(user.lastName).toEqual('Stark');
            expect(user.inEditMode).not.toBe(true);
        }));

        it('Toggle user\'s activity', inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            var ctrl = $controller('usersCtrl', {$scope: scope});
            var user = {
                edited: 1404139940617,
                id: 33,
                lastName: 'Lannister',
                inEditMode: true,
                active: true
            };

            scope.toggleActive(user);
            expect(user.active).toBe(false);
        }));

        it('Setup new user\'s mode', inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            var ctrl = $controller('usersCtrl', {$scope: scope});

            scope.addUser();
            expect(scope.newUserMode).toBe(true);
            expect(scope.disableOtherUsers).toBe(true);
        }));


        it('Save new valid user', inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            var ctrl = $controller('usersCtrl', {$scope: scope});
            var user = {
                lastName: 'Stark'
            };
            scope.saveNew(user);

            expect(user.created).toBeDefined();
            expect(user.edited).toBeDefined();
            expect(user.active).toBe(true);
        }));

        it('Save new invalid user', inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            var ctrl = $controller('usersCtrl', {$scope: scope});
            var user = {};

            scope.saveNew(user);

            expect(user.created).not.toBeDefined();
            expect(user.edited).not.toBeDefined();
            expect(user.active).not.toBe(true);
        }));

        it('Reset new unsaved user', inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            var ctrl = $controller('usersCtrl', {$scope: scope});
            scope.newUser = {
                lastName: 'Lannister'
            };

            scope.resetNew();

            expect(scope.newUser).toEqual({});
            expect(scope.newUserMode).toBe(false);
            expect(scope.disableOtherUsers).toBe(false);
        }));

	});
});