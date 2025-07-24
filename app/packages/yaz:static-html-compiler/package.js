Package.describe({
  name: 'yaz:static-html-compiler',
  version: '1.1.4',
  summary: 'Meteor 3.3 compatible static HTML compiler for Angular templates',
  git: '',
  documentation: null
});

Npm.depends({
  cheerio: '1.0.0-rc.12',
  'html-minifier-terser': '7.0.0',
  domutils: '3.0.1',
  domhandler: '5.0.3',
  entities: '4.5.0',
  'css-select': '5.1.0'
});

Package.registerBuildPlugin({
  name: 'compileNGTemplate',
  use: [],
  sources: [
    'build/src/index.js' // this should be the compiled output of your TS source
  ],
  npmDependencies: {}
});