var Collection = Meteor.Collection;

var capitalize = function (string) {
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
};

var runHooks = function (klass, hook, collection, args) {
  var self = this
    , hooks
    , callbacks;

  hooks = Meteor._ensure(klass, '_hooks', collection);
  callbacks = hooks[hook];

  // first arg might be the collection name
  if (typeof args[0] === 'string')
    args = args.slice(1);

  if (_.isArray(callbacks)) {
    _.each(callbacks, function (cb) {
      cb.apply(self, args);
    });
  }
};

var defineHookMethod = function (klass, name) {
  Collection.prototype[name] = function (fn) {
    var collectionName = this._name
      , hooks = Meteor._ensure(klass, '_hooks', collectionName)
      , callbacks;

    callbacks = hooks[name] = hooks[name] || [];
    callbacks.push(fn);
  };
};

var wrapMethod = function (klass, method) {
  var wrapped = klass.prototype[method];
  klass.prototype[method] = function (/* args */) {
    var ret
      , args = _.toArray(arguments)
      , collectionName = this._name || args[0];

    runHooks.call(this,
      klass,
      'before' + capitalize(method),
      collectionName,
      args
    );

    ret = wrapped.apply(this, arguments);

    runHooks.call(this,
      klass,
      'after' + capitalize(method),
      collectionName,
      args
    );

    return ret;
  };
};

var wrapMutatorMethods = function (klass) {
  _.each(['insert', 'update', 'remove'], function (method) {
    defineHookMethod(klass, 'before' + capitalize(method));
    defineHookMethod(klass, 'after' + capitalize(method));
    wrapMethod(klass, method);
  });
}

if (Meteor.isServer) {
  wrapMutatorMethods(MongoInternals.Connection);
}

if (Meteor.isClient) {
  wrapMutatorMethods(Collection);
}
