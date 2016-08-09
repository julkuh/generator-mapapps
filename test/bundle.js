'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-mapapps:bundle', function () {
    before(function () {
        return helpers.run(path.join(__dirname, '../generators/bundle'))
            .withPrompts({
                name: 'mytestbundle'
            })
            .toPromise();
    });

    it('creates files', function () {
        assert.file([
      'mytestbundle/manifest.json'
    ]);
    });
});