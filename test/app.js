'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-mapapps:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: 'mytestapp'})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'mytestapp/app.json'
    ]);
  });
});
