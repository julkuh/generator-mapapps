'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({


    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        yeoman.Base.apply(this, arguments);

        // Next, add your custom code
        //this.option('coffee'); // This method adds support for a `--coffee` flag
    },


    prompting: function () {
        this.log(yosay(
            'Welcome to the ' + chalk.red('generator-mapapps') + ' generator! Let\'s create a map.apps ' + chalk.green('bundle')
        ));

        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'How shall the bundle be named?',
                default: 'mybundle'
            },
            /*{
                type: 'input',
                name: 'version',
                message: 'What\'s the initital Verison of your bundle?',
                default: '0.0.1'
            } */
            {
                type: 'input',
                name: 'description',
                message: 'Describe briefly what great stuff this bundle is going to do',
                default: 'Add description later'
            }, {
                type: 'confirm',
                name: 'skipI18n',
                message: 'Skip creation of i18n?',
                default: false
            }, {
                type: 'input',
                name: 'componentName',
                message: 'Give a name for a first Bundle Component.',
                default: 'MyFirstComponent'
            }
            // TODO:
            /*
            ,{
                type: 'confirm',
                name: 'widgetCreation',
                message: 'Does your bundle need a UI? If YES, let's create a Widget, Window and ToggleTool. If NO, an empty Component and its JS File is created.',
                default: no
            },{
                type: 'confirm',
                name: 'createConfigBundle',
                message: 'Do you want to create a config?',
                default: no                
            }
            */

       ]).then(function (answers) {
            this.answers = answers;
        }.bind(this));
    },
    writing: function () {
        this.manifest = {}
        this.manifest.components = '';
        this.module = {
            define: ''
        };

        this.component = {
            name: this.answers.componentName
        };

        //convert whitespaces in bundle name to "-" to use it as bundle-id and folder name.
        this.bundeleID = this.answers.name.replace(/\s/g, "-");
        this.bundleFolder = this.bundeleID;

        this._createComponentInManifest(this.component.name);

        // with i18n
        if (!this.answers.skipI18n) {
            this.manifest.bundleLocalization = '\n';
            this.manifest.bundlename = '${bundleName}';
            this.manifest.description = '${bundleDescription}';

            this.module.define = '"."';

            this._copyFile('main.js', {});
            this._copyFile('main.js', {
                defineString: "dojo/i18n!./nls/bundle"
            });
            this._copyFile('nls/bundle.js', {
                name: this.answers.name,
                description: this.answers.description
            });
            this._copyFile('nls/de/bundle.js', {
                name: this.answers.name,
                description: this.answers.description
            });
        }

        // without i18n
        else {
            this.manifest.bundleLocalization = '"Bundle-Localization": [],\n\t"Bundle-Main": "",';
            this.manifest.bundlename = this.answers.name;
            this.manifest.description = this.answers.description;

            this.module.define = '"."';
        }

        // manifest.json
        this._copyFile('manifest.json', {
            id: this.bundeleID,
            name: this.manifest.bundlename,
            version: '0.0.1',
            description: this.manifest.description,
            bundleLocalization: this.manifest.bundleLocalization,
            components: this.manifest.components
        });

        // module.js
        this.module.define += ',\n\t"./' + this.component.name + '"';
        this._copyFile('module.js', {
            moduleDefine: this.module.define
        });

        //componentname.js
        this.fs.copyTpl(
            this.templatePath('ComponentName.js'),
            this.destinationPath(this.bundleFolder + '/' + this.component.name + ".js"), {}
        );
    },

    _copyFile(filename, replacements) {
        this.fs.copyTpl(
            this.templatePath(filename),
            this.destinationPath(this.bundleFolder + '/' + filename), replacements
        );
    },

    _createComponentInManifest(name) {
        var componentToAdd = {
            "name": name
        };
        this.manifest.components = '[{\n\t\t"name": "' + name + '"\n\t}]';
    }

    //    method1: function () {
    //        console.log('method 1 just ran');
    //    },
    //    method2: function () {
    //        console.log('method 2 just ran');
    //    }


});
