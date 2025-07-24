Package.describe({
  name: 'yaz:angular-meteor-data',
  summary: 'Everything you need to use AngularJS in your Meteor app',
  version: '1.3.12',
  git: 'https://github.com/Urigo/angular-meteor.git'
});

Npm.depends({
  'angular-meteor': '1.3.12'
});

Package.onUse(function (api) {
  api.versionsFrom('3.3');

  // legacy
  api.use('session');
  api.use('ejson@1.0.7');
  api.use('check@1.0.6');
  api.use('diff-sequence');
  api.use('mongo-id');
  api.use('dburles:mongo-collection-instances', 'client'); // For getCollectionByName

  api.use('underscore');
  api.use('tracker');
  api.use('mongo');
  api.use('minimongo');
  api.use('observe-sequence');
  api.use('reactive-var');
  api.use('benjamine:jsondiffpatch@0.1.38_1');
  api.use('angular:angular@1.4.8', 'client');
  api.use('isobuild:compiler-plugin@1.0.0');

  api.addFiles([
    '.npm/package/node_modules/angular-meteor/dist/angular-meteor.js'
  ], 'client', {
    transpile: false
  });
});
