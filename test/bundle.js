'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-mapapps:bundle', function () {
before(function () {
    return helpers.run(path.join(__dirname, '../generators/bundle'))
        .withPrompts({
            name: 'myTestBundle',
            skipI18n: true
        })
        .toPromise();
});

it('creates files', function () {
    assert.file([
                        'myTestBundle/manifest.json',
                        'myTestBundle/MyFirstComponent.js'
                ]);
});
});

//TODO: Implement TestSuite

//describe('generator-mapapps:bundle', function () {
//    before(function () {
//        return helpers.run(path.join(__dirname, '../generators/bundle'))
//            .withPrompts({
//                name: 'myTestBundle',
//                skipI18n: false,
//                componentName: 'myTestComponent'
//            })
//            .toPromise();
//    });
//
//    it('creates files', function () {
//        assert.file([
//            'myTestBundle/manifest.json',
//            'myTestBundle/module.json',
//            'myTestBundle/main.json',
//            'myTestBundle/myTestComponent.js',
//            'myTestBundle/nls/bundle.js'
//            'myTestBundle/nls/de/bundle.js',
//
//    ]);
//    });

});