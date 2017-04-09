# todo touch

[![Greenkeeper badge](https://badges.greenkeeper.io/marcusasplund/hyperapp-todo.svg)](https://greenkeeper.io/)
[![GitHub issues](https://img.shields.io/github/issues/marcusasplund/hyperapp-todo.svg)](https://github.com/marcusasplund/hyperapp-todo/issues)
[![Build status](https://travis-ci.org/marcusasplund/hyperapp-todo.svg?branch=master)](https://travis-ci.org/marcusasplund/hyperapp-todo)
[![dependencies](https://david-dm.org/marcusasplund/hyperapp-todo.svg)](https://david-dm.org/marcusasplund/hyperapp-todo)

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[hyperapp.js](https://github.com/hyperapp/hyperapp) CRUD todo, test with [hyper-tap](https://github.com/rbiggs/hyper-tap) touch support

# [demo](https://pap.as/hyperapp/todotouch/)


## installation

````bash
    $ git clone https://github.com/marcusasplund/hyperapp-todo-simple.git

    $ cd hyperapp-todo-simple

    $ yarn OR $ npm install

    $ npm start
````

Open up application at http://localhost:4000/ in browser

## build a release

````bash
    $ npm run build

````
This will generate a release directory with your minified/rev'd assets.


## serve static

````bash
    $ npm run serve

````

This will use serve to statically serve your app from the release directory.

## Credits

The rollup and fly config is based on https://github.com/tzellman/hyperapp-boilerplate
