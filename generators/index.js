'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
//var beautify = require('gulp-beautify');

module.exports = yeoman.Base.extend({

    initializing: function () {},

    prompting: function () {
        this.log(yosay(
            'Welcome to ' + chalk.yellow('generator-mapapps') + ' generator! Let\'s create some awesome ' + chalk.green('map.apps stuff')
        ));

        var prompts = [{
            type: 'list',
            name: 'subgenerator',
            message: 'Building an app or a bundle?',
            choices: ['app', 'bundle'],
            default: 'bundle'
            }];

        return this.prompt(prompts).then(function (answers) {
            this.answers = answers;
        }.bind(this));
    },


    configuring: function () {
        if (this.answers.subgenerator === 'app') {
            this.composeWith('mapapps:app');
        }
        if (this.answers.subgenerator === 'bundle') {
            this.composeWith('mapapps:bundle');
        }
    },


    install: function () {
        // TODO: implement beautify of files with gulp here
        //        this.registerTransformStream(beautify({
        //            indentSize: 2
        //        }));
    }
});