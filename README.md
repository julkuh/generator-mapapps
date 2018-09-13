## generator-mapapps [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A generator for con terra GmbH [map.apps](https://github.com/conterra/mapapps-4-developers). With it, the scaffolding of new bundles will be easy.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-mapapps using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-mapapps
```
## Usage
With

```bash
yo mapapps
```
you can launch the generator. It provides a selection wheather you want to create an app or a bundle.

To skip the selection and start with the sub-generator directly, simplay type ```yo mapapps:app``` to generate an app or ```yo mapapps:bundle``` to generate a bundle.

## Ideas for further Versions
  * adding of additional components after initital scaffolding
  * adding a live-configuration widget
 
## Release Note
### 1.1.0
 * Allow selection of sub-generator (bundle4x, bundle3x or app3x) through CLI
### 1.0.0
 * Allow creation of [map.apps 4.x style Bundles](https://developernetwork.conterra.de/de/blog/mapapps-4-f%C3%BCr-entwickler-javascript-sprachlevel-und-buildprozess) (ES2015+ and simplified manifest.json keys)
### 0.0.9
  * Creation of test folder inside the bundle so that intern tests are prepared and wait to be filled by a brave developper

## License

Apache-2.0 © [Julian Kuhlmann]()

[npm-image]: https://badge.fury.io/js/generator-mapapps.svg
[npm-url]: https://npmjs.org/package/generator-mapapps
[travis-image]: https://travis-ci.org/julkuh/generator-mapapps.svg?branch=master
[travis-url]: https://travis-ci.org/julkuh/generator-mapapps
[daviddm-image]: https://david-dm.org/julkuh/generator-mapapps.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/julkuh/generator-mapapps
[coveralls-image]: https://coveralls.io/repos/julkuh/generator-mapapps/badge.svg
[coveralls-url]: https://coveralls.io/r/julkuh/generator-mapapps
