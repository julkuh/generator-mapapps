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
        this.option('coffee'); // This method adds support for a `--coffee` flag
    },


    prompting: function () {
        this.log(yosay(
            'Welcome to the ' + chalk.red('generator-mapapps') + ' generator! Let\'s create a map.apps ' + chalk.green('bundle')
        ));

        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'How shall your bundle be named?'
            }, {
                type: 'input',
                name: 'version',
                message: 'What\'s the initital Verison of your bundle?',
                default: '0.0.1'
            }, {
                type: 'input',
                name: 'description',
                message: 'Describe briefly what great stuff your bundle is going to do',
                default: 'Add description later'
            }, {
                type: 'confirm',
                name: 'i18n',
                message: 'Do you need i18n files?',
                default: true
            }
       ]).then(function (answers) {
            this.answers = answers;
        }.bind(this));
    },
    writing: function () {
        this._copyBundleFile('manifest.json');
        this._copyBundleFile('module.js');
        if (this.answers.i18n) {
            this._copyi18n();
        }
    },

    _copyBundleFile(filename) {
        var bundleDir = this.answers.name;

        if (this.answers.i18n) {
            //TODO: replace with ${bundleDescription}
        }

        this.fs.copyTpl(
            this.templatePath(filename),
            this.destinationPath(bundleDir + '/' + filename), {
                name: this.answers.name,
                version: this.answers.version,
                description: this.answers.description,
                i18n: this.answers.i18n
            }
        );
    },
    _copyi18n() {
        var bundleDir = this.answers.name;
        this.fs.copyTpl(
            this.templatePath('nls/bundle.js'),
            this.destinationPath(bundleDir + '/nls/bundle.js'), {
                name: this.answers.name,
                description: this.answers.description
            }
        );
        this.fs.copyTpl(
            this.templatePath('nls/de/bundle.js'),
            this.destinationPath(bundleDir + '/nls/de/bundle.js'), {
                name: this.answers.name,
                description: this.answers.description
            }
        );
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath(bundleDir + '/main.js'), {
                name: this.answers.name,
                description: this.answers.description
            }
        );
    }

    //    method1: function () {
    //        console.log('method 1 just ran');
    //    },
    //    method2: function () {
    //        console.log('method 2 just ran');
    //    }

});