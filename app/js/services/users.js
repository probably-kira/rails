'use strict';

/* it is a factory because potentially here should be an ajax operations */
App.factory('$users', function() {
    var users = [{
                lastName: 'Cersei',
                firstName: 'Lannister',
                age: '35',
                email: 'cersei@westeros.com',
                created: '1288323623006',
                edited: '1288323623006',
                active: true,
                id: '11'
            },{
                lastName: 'Rob',
                firstName: 'Stark',
                age: '20',
                email: 'rob@westeros.com',
                created: '1288323623006',
                edited: '1288323623006',
                active: false,
                id: '22'
            },{
                lastName: 'John',
                firstName: 'Snow',
                age: '20',
                email: 'john@westeros.com',
                created: '1288323623006',
                edited: '1288323623006',
                active: true,
                id: '33'
            },{
                lastName: 'Catelyn',
                firstName: 'Stark',
                age: '40',
                email: 'cate@westeros.com',
                created: '1288323623006',
                edited: '1288323623006',
                active: true,
                id: '55'
            },{
                lastName: 'Daenerys',
                firstName: 'Targaryen',
                age: '14',
                email: 'daeny@westeros.com',
                created: '1288323623006',
                edited: '1288323623006',
                active: true,
                id: '66'
            },{
                lastName: 'Hodor',
                firstName: '-',
                age: '40',
                email: 'hodor@westeros.com',
                created: '1288323623006',
                edited: '1288323623006',
                active: true,
                id: '77'
            }
        ]
    var service = Emitter({
        get: function() {
            var self = this;

            //assume http get here
            setTimeout(function() {
                self.list = users;
                console.log('change triggered')
                self.trigger('change');
            }, 500);
        },
        connect: function(fn){
            this.on('change', fn);
        },
        drop: function(fn){
            this.off('change', fn);
        },
        list: [],
        getUser: function(id) {
            return _.where(this.list, {id: id}).pop();
        },
        update: function(id, userData, silent) {
            var self = this;
            if (!silent) {
                //ajax put request here;
                //assuming that we have url like /users/<id>
                setTimeout(function() {
                    var user = self.getUser(id),
                        list = _.without(self.list, user);
                    list.push(userData);
                    self.list = list;
                    self.trigger('change');
                }, 500);
            }
            this.trigger('change');
        },
        add: function(user) {
            var self = this;
            //assuming here will be an http post, which will take user as a data and will return updated data set
            setTimeout(function() {
                user.id = new Date().getTime();
                self.list.push(user);
                self.trigger('change');
            }, 500);
        }
    });

    return service;
});