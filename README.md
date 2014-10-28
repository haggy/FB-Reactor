# FB Reactor for React JS
A simple, super fast scaffolding tool for Facebook's React JS framework. Within seconds you can create a full
React project structure with stubbed out component files.

## Install
Good old npm:

`npm install fbreactor`

## CLI Usage:

### Create new reactorfile
All configuration is driven off of __reactorfile.js__. This is kept in your project root directory and
specifies settings like the source root for React framework.

`fbreactor create reactorfile`

This creates a standard __reactorfile__ with your React source directory at `/src`.

`fbreactor create reactorfile --basedir /app`

Creates a reactorfile with `/app` as your Reactor root.

### Create React framework structure
Use create framework to build the initial structure for React components.

`fbreactor create framework`

If you are using a standard reactorfile, this will result in the following directories being created:

* __/src__
    * __/components__
    * __/stores__
    * __/actions__
    * __/libs__
    * __/mixins__

If you have specified something different for you React root then __src__ will be replaced with that.

### Creating new components
This is comething you'll be doing for the life of the project. Whenever you need a completely new
component in React, it requires creating many files and a ton of copy/paste/remove. Not anymore!

`fbreactor create component --name MyThing`

This will create a new Component, Store, Action, and Lib for your component called __MyThing__.

* __/src__
    * __/components__
        * my_thing.jsx
    * __/stores__
        * my_thing.jsx
    * __/actions__
        * my_thing.jsx
    * __/libs__
        * my_thing.js
    * __/mixins__

#### Generated component my_thing.jsx

```javascript
/** @jsx React.DOM */
var React = require('react'),
    Fluxxor = require('fluxxor'),
    FluxChildMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MyThingComponent = React.createClass({

    mixins: [FluxChildMixin, StoreWatchMixin("MyThingStore")],

    getInitialState: function() {
        return {};
    },

    getStateFromFlux: function() {
        return {
            MyThingStore: flux.store("MyThingStore").getState()
        };
    },

    render: function() {
        return (
            <div>Nothing here yet...</div>
        );
    }
});

module.exports = MyThingComponent;

```


