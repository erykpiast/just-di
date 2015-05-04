## just-di

The simplest dependency injector for Node.js and browsers.

### Installation

```

$ npm install just-di

```

### Example

```javascript

import DI from 'just-di';

let di = new DI();

di
  .define('dep1', function() {
    return 'I am dep1!';
  })
  .define('someValue', 'just a value');
  .define('undefined', void 0)
  .define('undefined', 'overriden');

di.use(function(dep1, someValue, undefined) {
  assert.isFunction(dep1);
  assert.equal(dep1(), 'I am dep1!');
  
  assert.equal(someValue, 'someValue');
  assert.equal(undefined, 'overriden');
});

di.dispose();

di.define('whatever', 'anything'); // Error: instance was disposed and is no longer usable!

```