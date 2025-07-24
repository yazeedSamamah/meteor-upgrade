
Package.describe({
  name: 'yaz:angular-templates',
  summary: 'Compile angular templates into the template cache',
  version: '1.0.9',
  git: '',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: 'compileNGTemplate',
  use: [
    'yaz:static-html-compiler@1.1.4',
    'ecmascript'
  ],
  sources: [
    'plugin.js'
  ]
});

Package.onUse(function(api) {
  api.versionsFrom('3.3');
  api.use('angular:angular@1.5.3_1', 'client', { weak: true });
  api.addFiles('templates-handler.js', 'client');
});
