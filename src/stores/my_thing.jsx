/** @jsx React.DOM */
var Fluxxor = require('fluxxor'),
    Constants = require(__dirname + '/../constants'),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MyThingStore = Fluxxor.createStore({

    initialize: function () {
        // Initialize your base data
        this.store_data = {};

        /* Don't forget to assign event handlers! */
        /**
        this.bindActions(
            Constants.MY_EVENT, this.onMyEvent
        );
        */
    },

    getState: function() {
        return {
            /* Return state */
        };
    }

    /**
    * Put your handlers below
    * These are called when an action uses the dispatch() method
    onMyEvent: function(data) {
        // Handle state changes and call emit() when done
        this.emit('change');
    }
    */
});

module.exports = MyThingStore;
