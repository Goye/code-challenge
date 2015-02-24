Plarity API

[Overview](https://docs.google.com/a/rokk3rlabs.com/spreadsheets/d/1BdN73c7h_Nvkpf6Aarc84EcOOg-O8CWPche9AZTvHGY/edit#gid=1614137363)

[API](https://docs.google.com/a/rokk3rlabs.com/spreadsheets/d/1BdN73c7h_Nvkpf6Aarc84EcOOg-O8CWPche9AZTvHGY/edit#gid=1388506100)

[Design](https://www.dropbox.com/sh/5e6jxjok58pnrt4/AAC0WhYl-tEmFuEdxH37dzAya/Web/UI%20Design?dl=0)

[PSD](https://www.dropbox.com/sh/spk8fd7u52j89cq/AAAUu1XtkRwW7F4VMLexseuwa?dl=0)


## Included Awesomeness

These are all globals. No need to `npm install / require`.

`_` - [lodash](https://lodash.com/)

`async` - [async](https://github.com/caolan/async)

`log` - [captains-log](https://github.com/balderdashy/captains-log)

`req` - [request](https://github.com/mikeal/request)


## To Run Locally

````
git clone git@bitbucket.org/rokk3rlabs/plarity-api.git
npm install
bower install
gulp server
````

You need data for Plarity to function. While we would recommend just pointing at a server, instructions for installing the data can be found at `docs/data/import.md`

## Included Awesomeness

These are all globals. No need to `npm install / require`.

`_` - [lodash](https://lodash.com/)

`async` - [async](https://github.com/caolan/async)

`log` - [captains-log](https://github.com/balderdashy/captains-log)

`request` - [request](https://github.com/mikeal/request)

## Gulp Build System

Run `gulp` to see available commands.

Edit script or html file paths in `gulpfile.conf.js`.

Include `<!-- #insertVersion -->` in your html to insert the version from package.json. 

## Testing
Run tests with `gulp test` or `gulp watch`.

Or individually

`gulp test:api` `gulp test:unit` `gulp test:e2e`

## Knowledge Repository

Find all in project of the below (including brackets) to find out where the following are enabled...

[@test] - Should over Mocha on Karma [docs](docs/test.md)

## Stack Objectives

1. Deploy a Default Node.js Stack that is flexible and modular.
1. Reduce Build Time over development lifecycles of several projects.
1. Reduce Bugs in future builds.
1. Build API which can be used by both a Web & Mobile Application simultaneously.

## Authorization in r3l-node-stack

1. send post request to /login that should contain username/password in the body
1. the response should contain access token if username/passowrd are valid
1. add header.authorization = 'bearer ' + access_token to your next request
1. now you will be able to access to restricted resources like 'user/account' if you don't set the access token should get 401 error

## Stack Technologies

* **Sails.js** - Sails.js makes it easy to build custom, enterprise-grade Node.js apps. It is designed to mimic the MVC pattern of frameworks like Ruby on Rails, but with support for the requirements of modern apps: data-driven APIs with scalable, service-oriented architecture. It's especially good for building chat, realtime dashboards, or multiplayer games.
* **Sails Waterline** - Waterline is a brand new kind of storage and retrieval engine. It provides a uniform API for accessing stuff from different kinds of databases, protocols, and 3rd party APIs. That means you write the same code to get and store things like users, whether they live in Redis, mySQL, LDAP, MongoDB, or Postgres.
* **Passport** - Passport is authentication middleware for Node. It is designed to serve a singular purpose: authenticate requests. When writing modules, encapsulation is a virtue, so Passport delegates all other functionality to the application. This separation of concerns keeps code clean and maintainable, and makes Passport extremely easy to integrate into an application.
* **Oauth2-provider** -  OAuth2 servers (providers) that support server-side (code) and client-side (token) OAuth flows.
It's very customizable, so you can (and currently, must) take care of OAuth token storage and client lists. In the future, a Mongo or Redis backed abstraction will be provided so you don't need to care about any kind of storage at all.
* **Angular** - AngularJS is an open-source web application framework, maintained by Google and community, that assists with creating single-page applications, one-page web applications that only require HTML, CSS, and JavaScript on the client side.
* **Angular-UI-Router** - AngularUI Router is a routing framework for AngularJS, which allows you to organize the parts of your interface into a state machine. Unlike the $route service in the Angular ngRoute module, which is organized around URL routes, UI-Router is organized around states, which may optionally have routes, as well as other behavior, attached.
* **Angular-Resource** - A factory which creates a resource object that lets you interact with RESTful server-side data sources.
The returned resource object has action methods which provide high-level behaviors without the need to interact with the low level $http service.
Requires the ngResource module to be installed.
* **connect-ensure-login** This middleware ensures that a user is logged in. If a request is received that is unauthenticated, the request will be redirected to a login page. The URL will be saved in the session, so the user can be conveniently returned to the page that was originally requested.
* **passport-facebook** Passport strategy for authenticating with Facebook using the OAuth 2.0 API.
 This module lets you authenticate using Facebook in your Node.js applications. By plugging into Passport, Facebook authentication can be easily and unobtrusively integrated into any application or framework that supports Connect-style middleware, including Express.
* **passport-google-oauth** Passport strategies for authenticating with Google using OAuth 1.0a and OAuth 2.0.
This module lets you authenticate using Google in your Node.js applications. By plugging into Passport, Google authentication can be easily and unobtrusively integrated into any application or framework that supports Connect-style middleware, including Express.
* **passport-linkedin** Passport strategy for authenticating with LinkedIn using the OAuth 1.0a API.
This module lets you authenticate using LinkedIn in your Node.js applications. By plugging into Passport, LinkedIn authentication can be easily and unobtrusively integrated into any application or framework that supports Connect-style middleware, including Express.
* **passport-twitter** Passport strategy for authenticating with Twitter using the OAuth 1.0a API.
This module lets you authenticate using Twitter in your Node.js applications. By plugging into Passport, Twitter authentication can be easily and unobtrusively integrated into any application or framework that supports Connect-style middleware, including Express.

## Use Oauth 2 Provider from 3-party
the url should be like this

http://localhost:1337/oauth/authorize?client_id=1&redirect_uri=http://foo.com/&response_type=token

where:

* client_id is the application that you want to grant him access to your website

* redirect_uri will redirect to this url in the user accept on give the app access to his information

* response_type token to generate access token and send it with callback
Note: it's accept any username/password (need to work on sign up)

## Before You Start -- Remember

1. Document Your Code
1. Identify Reusable Code and Isolate it
1. Use a Standard/Best Practices for Node.js & AngularJS

==============
*R3L Node Stack* is a fullstack javascript framework - which simplifies and accelerates API platform development.

Questions, Concerns, Ideas or Anolomies, please direct to [@brian](brian@rokk3rlabs.com) or [@sean](sean@rokk3rlabs.com)