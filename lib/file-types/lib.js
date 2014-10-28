/**
* Represent a reactor lib file
**/
var Base = require(__dirname + '/base');

var Lib = module.exports = function(params) {
    Base.call(this, params);
    this.type = 'Lib';
    this.fileExt = '.js';
}
Base.extend(Lib);

Lib.prototype._getFileData = function() {

    this._addReactLibHeaders();
    this.line("/**");
    this.line("* The libs file is where you do things like interact with a DB or API.");
    this.line("*/", 2);
    this.line("module.exports = {", 2);
    this.line("    /**");
    this.line("    * Put methods for API interactions and data processing below.");
    this.line("    */", 2);
    this.line("};");
    

    return {};
};