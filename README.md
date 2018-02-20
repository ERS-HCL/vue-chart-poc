# Charts

This application is created to understand and develop chart components using dynamic data from rest API.
This application covers how to create promise based Rest Client and use it inside different types of chart components which require dynamic data at runtime.
This application also covers all types of chart components which are as below.

* Bar Chart
* Line Chart
* Pie Chart
* Bubble Chart
* Polar Chart
* Radar Chart
* Doughnut Chart
* Scatter Chart
* Mixed Chart

# Features
* Node JS, VueJs, Vue-chartjs, Vue-router
* axios - for create promised based client interface
* classnames - simple javascript utility for conditionally joining classNames together.
* autoprefixer - Write your CSS rules without vendor prefixes (in fact, forget about them entirely):
* Karma, Mocha, chai, sinon - for unit test  
* eslint - is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. In many ways, it is similar to JSLint and JSHint with a few exceptions.
* webpack - for bundle js, css and assets.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
## Dependencies
Webpack (v2.3) is a bundler, which combines the various JavaScript, CSS, HTML (and other) files and makes them ready to be handled by the client.

Babel (v6.22) is a compiler for ECMAScript 6 to ECMAScript 5. These are different JavaScript standards and currently browsers are not able to understand all of ECMAScript 6 and so it needs to be converted.

## Testing Dependencies
Karma (v1.4) is a test runner, which spawns a web server with your project's application code inside and executes tests against it.
Mocha (v3.2) is a testing framework for JavaScript.
Chai (v4.1) is an assertion library which can be used with Mocha.


```
## Note: 
Application using Dummy data having *.json files to represent charts as dynamic style. use your one API link with the required json data format response.

Change base url from http-common.js file.

```
```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
```
### Demo

    [https://nostalgic-northcutt-0522ad.netlify.com](https://nostalgic-northcutt-0522ad.netlify.com)


### License
MIT