'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = class extends Generator{
    prompting() {
        this.log(yosay(
            'Welcome to the world-class ' + chalk.red('generator-mapapps') + ' generator! Let\'s create a map.apps ' + chalk.green('app')
        ));

        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'What should be the main folder for the app?',
            default: 'myapp'
    }];

        return this.prompt(prompts).then(function (answers) {
            this.answers = answers;
        }.bind(this));
    }

    writing() {
        this.fs.copy(
            this.templatePath('app.json'),
            this.destinationPath(this.answers.name + '/app.json')
        );
    }
};