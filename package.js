Package.describe({
  summary: 'Client and server mutator hooks for collections'
});

Package.on_use(function (api) {
  api.use([
    'mongo-livedata',
    'minimongo',
    'underscore'
  ], ['client', 'server']);

  api.add_files('collection-hooks.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use([
    'collection-hooks', 
    'tinytest',
    'test-helpers'
  ], ['client', 'server']);

  api.add_files('collection-hooks-tests.js', ['client', 'server']);
});
