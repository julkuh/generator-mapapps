'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = class extends Generator {

    prompting() {
        this.log(yosay(
            'Welcome to the ' + chalk.red('generator-mapapps') + ' generator! Let\'s create a map.apps ' + chalk.green('bundle')
        ));

        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'How shall the bundle be named?',
                default: 'mybundle'
            }, {
                type: 'input',
                name: 'description',
                message: 'Describe briefly what great stuff this bundle is going to do',
                default: 'Add description later'
            }, {
                type: 'input',
                name: 'componentName',
                message: 'Give a name for a first Bundle Component.',
                default: 'MyFirstComponent'
            }, {
                type: 'confirm',
                name: 'skipInternTests',
                message: 'Skip creation of intern tests? If NO, test suite can be started just after bundle is created. Keep testing your Code! ;)',
                default: false

            }
        ]).then(function (answers) {
            this.answers = answers;
        }.bind(this));
    }

    writing() {
        this.manifest = {
            components:[]
        }
        this.module = {
            define: ''
        };

        this.component = {
            name: this.answers.componentName
        };

        //convert whitespaces in bundle name to "-" to use it as bundle-id and folder name.
        this.bundeleID = this.answers.name.replace(/\s/g, "-");
        this.bundleFolder = this.bundeleID;

        this._createComponentInManifest(`${this.component.name}Factory`);

        //componentname.js
        this.manifest.layoutWidgets = {
            "widgetRole": this.component.name,
            "window": {
                "title": "${ui.windowTitle}",
                "dockTool": `${this.component.name}ToggleTool`,
                "marginBox": {
                    "w": 350,
                    "h": 355
                }
            }
        };
        this._createToggleTool();
        this.fs.copyTpl(
            this.templatePath('ComponentNameFactory.js'),
            this.destinationPath(`${this.bundleFolder}/${this.component.name}Factory.js`), {
                componentName: this.component.name
            }
        );
        this.fs.copyTpl(
            this.templatePath('ComponentName.vue'),
            this.destinationPath(`${this.bundleFolder}/${this.component.name}.vue`), {
                componentName: this.component.name
            }
        );

        this._copyFile('main.js', {});
        this._copyFile('nls/bundle.js', {
            name: this.answers.name,
            description: this.answers.description
        });
        this._copyFile('nls/de/bundle.js', {
            name: this.answers.name,
            description: this.answers.description
        });
        

        // manifest.json
        this._copyFile('manifest.json', {
            id: this.bundeleID,
            name: this.manifest.bundlename,
            version: '0.0.1',
            components: JSON.stringify(this.manifest.components),
            layoutWidgets: JSON.stringify(this.manifest.layoutWidgets)
        });

        // module.js
        this._copyFile('module.js', {
            componentName: this.answers.componentName
        });

        //create intern tests
        if (!this.answers.skipInternTests) {
            var name = this.answers.componentName;
            this._copyFile('tests/intern-all.js', {
                name: name
            });

            this.fs.copyTpl(
                this.templatePath('tests/ComponentTestFile.js'),
                this.destinationPath(`${this.bundleFolder}/tests/${name}.js`), {
                    name: name
                }
            );
        };
    }

    _copyFile(filename, replacements) {
        this.fs.copyTpl(
            this.templatePath(filename),
            this.destinationPath(`${this.bundleFolder}/${filename}`), replacements
        );
    }

    _createComponentInManifest(name) {
        var componentToAdd = {
            "name": name
        };
        componentToAdd.provides = "dijit.Widget";
        componentToAdd.instanceFactory = true;
        componentToAdd.properties = {
            "widgetRole": this.component.name
        };
        this.manifest.components.push(componentToAdd);
    }
    _createToggleTool() {
        var toolName = `${this.component.name}ToggleTool`;

        var tool = {
            "name": toolName,
            "impl": "ct/tools/Tool",
            "provides": ["ct.tools.Tool"],
            "propertiesConstructor": true,
            "properties": {
                "toolRole": "toolset",
                "id": toolName,
                "iconClass": "icon-heart",
                "title": "${ui.toolTitle}",
                "togglable": true
            }
        };
        this.manifest.components.push(tool);
    }
};
