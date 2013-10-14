# Collection Hooks

Provides before and after hooks for collections on the client and the server.

## Installation

Clone the repository into your local packages directory. Make sure you've set
the `PACKAGE_DIRS` environment variable to point to this directory so meteor can
find it.

```
> git clone git@github.com:EventedMind/meteor-collection-hooks collection-hooks
```

Then add the package just like you would any other Meteor package.

```
> meteor add collection-hooks
```

## Use

```javascript
Items = new Meteor.Collection('items');

Items.beforeInsert(function (doc) {
  // runs on client and server
});

Items.afterInsert(function (doc) {
  // runs on client and server
});

Items.beforeUpdate(function (selector, mutator) {
  // runs on client and server
});

Items.afterUpdate(function (selector, mutator) {
  // runs on client and server
});

Items.beforeRemove(function (selector) {
  // runs on client and server
});

Items.afterRemove(function (selector) {
  // runs on client and server
});
```
