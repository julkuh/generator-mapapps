'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
    prompting: function () {
        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'What should be the main folder for the app?',
            default: 'myapp'
    }];

        return this.prompt(prompts).then(function (answers) {
            this.answers = answers;
        }.bind(this));
    },

    writing: function () {
        this.fs.copy(
            this.templatePath('app.json'),
            this.destinationPath(this.answers.name + '/app.json')
        );
    }
});