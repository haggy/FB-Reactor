/**
* Represent a reactor actions file
**/
var Base = require(__dirname + '/base');

var Action = module.exports = function(params) {
    Base.call(this, params);
    this.type = 'Action';
    this.fileExt = '.js';
}
Base.extend(Action);

Action.prototype._getFileData = function() {

    this._addReactActionHeaders();
    this.line("/**");
    this.line("* The actions file is where all the magic happens!");
    this.line("* Use the lib module to interact with the DB or API's.");
    this.line("* Don't forget to call dispatch() when you're done!");
    this.line("* this.dispatch() notifies your store that the action is complete.");
    this.line("*/", 2);
    this.line("module.exports = {");
    this.line("    /**");
    this.line("    * Put methods for data processing and other tasks below.");
    this.line("    */");
    this.line("    /**");
    this.line("    performAction: function(data) {");
    this.line("        // Call dispatch() when you're done");
    this.line("        this.dispatch(Constants.MY_EVENT, data);");
    this.line("    }");
    this.line("    */");
    this.line("};");
    

    return {};
};