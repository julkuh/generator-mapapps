'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = class extends Generator {

    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'componentName',
                message: 'How shall the new component be named?',
                default: 'MyComponent'
            }, {
                type: 'confirm',
                name: 'skipInternTests',
                message: 'Skip creation of intern tests? Keep testing your Code! ;)',
                default: false
            }
        ]).then(function (answers) {
            this.answers = answers;
        }.bind(this));
    }

    writing() {
        // details about file-wrtiting api @ https://github.com/sboudrias/mem-fs-editor
        let componentName = this.answers.componentName;
        //create componentname.js file
        this.fs.copyTpl(
            this.templatePath('empty-component.js'),
            this.destinationPath('./' + componentName + ".js"), {componentName}
        );
        //add import in module.js
        this.fs.append('./module.js', 'import "./'+ componentName + '";');

        //add manifest.json entry
        this._updateManifest(componentName)

        if(!this.answers.skipInternTests){
            this.fs.copyTpl(
                this.templatePath('tests/ComponentTestFile.js'),
                this.destinationPath('./tests/' + componentName + ".js"), {componentName}
            );
            this.fs.append('./tests/intern-all.js', 'import "./'+ componentName + '";');
        }
    }

    _updateManifest(componentName){
        let manifest = this.fs.readJSON('./manifest.json');
        let componentToAdd = {
            "name": componentName,
            "properties":{}
        };
        if (manifest.components){
            manifest.components.push(componentToAdd);
        } else 
            manifest.components= [componentToAdd];
        this.fs.writeJSON('./manifest.json', manifest);
    }

};
