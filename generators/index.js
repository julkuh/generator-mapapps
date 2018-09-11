'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
//var beautify = require('gulp-beautify');

module.exports = class extends Generator {

    initializing() { }

    prompting() {
        this.log(yosay(
            'Welcome to ' + chalk.yellow('generator-mapapps') + ' generator! Let\'s create some awesome ' + chalk.green('map.apps stuff')
        ));

        var prompts = [{
            type: 'list',
            name: 'subgenerator',
            message: 'Building an app or a bundle?',
            choices: ['bundle4x', 'bundle3x', 'app'],
            default: 'bundle4x'
        }];

        return this.prompt(prompts).then(function (answers) {
            this.answers = answers;
        }.bind(this));
    }


    configuring() {
        if (this.answers.subgenerator === 'app') {
            this.composeWith('mapapps:app');
        }
        if (this.answers.subgenerator === 'bundle4x') {
            this.composeWith('mapapps:bundle4x');
        }
        if (this.answers.subgenerator === 'bundle3x') {
            this.composeWith('mapapps:bundle3x');
        }
    }


    install() {
        // TODO: implement beautify of files with gulp here
        //        this.registerTransformStream(beautify({
        //            indentSize: 2
        //        }));
    }
};