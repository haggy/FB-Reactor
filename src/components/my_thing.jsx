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
