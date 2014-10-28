/**
* Represent a reactor store file
**/
var Base = require(__dirname + '/base');

var Store = module.exports = function(params) {
    Base.call(this, params);
    this.type = 'Store';
    this.fileExt = '.js';
}
Base.extend(Store);

Store.prototype._getFileData = function() {

    this._addReactStoreHeaders();
    this.line("var " + this._getName() + " = Fluxxor.createStore({", 2)
    this.line("    initialize: function () {")
    this.line("        // Initialize your base data");
    this.line("        this.store_data = {};", 2);
    this.line("        /* Don't forget to assign event handlers! */");
    this.line("        /**");
    this.line("        this.bindActions(");
    this.line("            Constants.MY_EVENT, this.onMyEvent");
    this.line("        );");
    this.line("        */");
    this.line("    },", 2);
    this.line("    getState: function() {");
    this.line("        return {");
    this.line("            /* Return state */");
    this.line("        };");
    this.line("    }", 2);
    this.line("    /**");
    this.line("    * Put your handlers below");
    this.line("    * These are called when an action uses the dispatch() method");
    this.line("    onMyEvent: function(data) {");
    this.line("        // Handle state changes and call emit() when done");
    this.line("        this.emit('change');");
    this.line("    }");
    this.line("    */");
    this.line("});", 2);
    this.line("module.exports = " + this._getName() + ";");

    return {};
};
