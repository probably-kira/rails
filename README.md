## How to install Rails

* `git clone git@github.com:probably-kira/rails.git` to clone the **rails** repository
* `cd rails`
* `sudo npm install` to install node & bower packages

or if you have **Brunch** installed run:

*`brunch new git@github.com:probably-kira/rails.git rails`
* `cd rails`
* `sudo npm install` to install node & bower packages

### Running the app during development

* `npm start` to serve using **Brunch**

Then navigate your browser to [http://localhost:3333](http://localhost:3333)
If you use your own server, you can use the development script :

* `npm run-script dev`

### Running the app in production

* `npm run-script prod` to minify javascript and css files for production deployment

Please be aware of the caveats regarding Angular JS and minification, take a look at [Dependency Injection](http://docs.angularjs.org/guide/di) for information.

### Running unit tests

* `npm test` to run unit tests with [karma](http://karma-runner.github.io)
* Open the browser you would like to test to [http://localhost:3334](http://localhost:3334)
