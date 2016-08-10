'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({

    constructor: function () {
        yeoman.Base.apply(this, arguments);
    },

    prompting: function () {
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
            , {
                type: 'confirm',
                name: 'createWidget',
                message: 'Does your bundle need a UI? If YES, let\'s create a Widget, Window and ToggleTool. If NO, an empty Component and its JS File is created.',
                default: true
            }
            // TODO:
            /*,{
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
            //this.manifest.components = '';
        this.manifest.components = [];
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

        //componentname.js
        if (this.answers.createWidget) {
            this.manifest.layoutWidgets = {
                "widgetRole": this.component.name,
                "window": {
                    "title": this.answers.skipI18n ? "Put a window title here" : "${ui.windowTitle}",
                    "dockTool": this.component.name + "ToggleTool",
                    "marginBox": {
                        "w": 330,
                        "h": 210
                    }
                }
            };
            this._createToggleTool();
            this.fs.copyTpl(
                this.templatePath('ComponentNameWithUi.js'),
                this.destinationPath(this.bundleFolder + '/' + this.component.name + ".js"), {
                    componentName: this.component.name
                }
            );
            this.fs.copyTpl(
                this.templatePath('templates/widgetTemplate.html'),
                this.destinationPath(this.bundleFolder + '/templates/' + this.component.name + "UI.html"), {}
            )
        } else {
            this.manifest.layoutWidgets = "";
            this.fs.copyTpl(
                this.templatePath('ComponentName.js'),
                this.destinationPath(this.bundleFolder + '/' + this.component.name + ".js"), {}
            );
        }
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
            components: JSON.stringify(this.manifest.components),
            layoutWidgets: JSON.stringify(this.manifest.layoutWidgets)
        });

        // module.js
        this.module.define += ',\n\t"./' + this.component.name + '"';
        this._copyFile('module.js', {
            moduleDefine: this.module.define
        });
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
        if (this.answers.createWidget) {
            componentToAdd.provides = ["dijit.Widget"];
            componentToAdd.properties = {
                "widgetRole": this.component.name
            }
        }
        //this.manifest.components = '[{\n\t\t"name": "' + name + '"\n\t}]';
        this.manifest.components.push(componentToAdd);
    },
    _createToggleTool() {
        var toolName = this.component.name + "ToggleTool";
        var tool = {
            "name": toolName,
            "impl": "ct/tools/Tool",
            "provides": ["ct.tools.Tool"],
            "propertiesConstructor": true,
            "properties": {
                "toolRole": "toolset",
                "id": toolName,
                "iconClass": "icon-heart",
                "title": this.answers.skipI18n ? "Put a tool title here" : "${ui.toolTitle}",
                "togglable": true
            }
        };
        this.manifest.components.push(tool);
    }
});