var path = require('path');

exports.config = {
	// See docs at https://github.com/brunch/brunch/blob/master/docs/config.md
	modules: {
		definition: false,
		wrapper: false
	},
	paths: {
		"public": 'public',
		"watched": ['app', 'vendor', 'bower_components']
	},
	files: {
		javascripts: {
			joinTo: {
				'js/app.js': /^app/,
				'js/vendor.js': function(path) {
					path = path.replace(/\\/g, '/');
					switch(path) {
						case 'bower_components/modernizr/modernizr.js':

						// lodash
						case 'bower_components/lodash/dist/lodash.js':

                        //custom libs
                        case 'bower_components/emitter.js/emitter.js':

						// angular
						case 'bower_components/angular/angular.js':
						case 'bower_components/angular-resource/angular-resource.js':
						case 'bower_components/angular-sanitize/angular-sanitize.js':
						case 'bower_components/angular-ui-router/release/angular-ui-router.js':
						case 'bower_components/ng-simplePagination/simplePagination.js':
						case 'bower_components/ocModal/ocModal.js':

						// bootstrap
						case 'bower_components/sass-boostrap3/dist/js/bootstrap.js':
							return true;
						default:
							return false;
					}
				},
				'test/scenarios.js': /^test(\/|\\)e2e/
			},
			order: {
				before: [
					'bower_components/respond/respond.src.js',
					'bower_components/console-polyfill/index.js',

					// angular
					'bower_components/angular/angular.js',

					// bootstrap
					'bower_components/bootstrap/dist/js/bootstrap.js'
				]
			}
		},
		stylesheets: {
			joinTo: {
				'css/app.css': /^app/
			}
		}
	},

	server: {
		path: 'jst-server.js'
	},

	conventions: {
		assets: /app(\\|\/)assets(\\|\/)/
	},

	sourceMaps: true
};