/**
* Base file type for all files
**/
var extendClass = require(__dirname + '/../helpers/oop-shims').extend;
var FileHelper = require(__dirname + '/../helpers/file-helper');
var Q = require('q');
var Config = require(__dirname + '/../config');

// Some basic prototype overrides
String.prototype.toUnderscore = function(){
    return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
};
String.prototype.toCamel = function(){
    return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};

var BaseFile = module.exports = function(params) {
    this.params = params || {};
    this.fileExt = this.params.file_ext || '';
    this.type = this.params.type || '';
    // contains the source for the file
    this.source = '';
    // If false, the config is not loaded
    this.mockConfig = (typeof this.params.load_config === 'undefined' ? false : this.params.load_config);

    if(!this.params.file_name) {
        // the underscore method will turn something like
        // MyThing into _my_thing so we just need to cut off
        // the first char if it is an underscore
        var fname = this.params.name.toUnderscore();
        if(fname.charAt(0) === '_') {
            fname = fname.substring(1, fname.length);
        }
        this.params.file_name = fname;
    }
};

/**
* Returns a string with a newline
**/
BaseFile.prototype.line = function(str, newlines) {
    newlines = newlines || 1;
    this.source += (str || '');
    for(var i = 0; i < newlines; i++) {
        this.source += '\n';
    }
};

/**
* Generates the file
**/
BaseFile.prototype.generate = function() {
    var def = Q.defer();

    new Config(this.loadConfig).getInstance()
        .then(function setupFileData(config) {

            var file = this._getFileData();
            // Check for defaults and populate from params
            if(typeof file.path === 'undefined') {
                file.path = config[this.type.toLowerCase() + '_root'] + '/';
            }
            if(!file.file_name) {
                file.file_name = this.params.file_name + this.fileExt;  
            }
            if(!file.data) {
                file.data = this.source;
            }
            // Add type to module name
            file.name = this._getName();

            return new FileHelper().writeFile(file);
        }.bind(this))
        .then(function done() {
            def.resolve();
        }.bind(this))
        .catch(function(err) {
            console.log(err);
            def.reject(err);
        });
    

    return def.promise;
};

/**
* Adds the standard required headers for a react component file
**/
BaseFile.prototype._addReactComponentHeaders = function() {
    this.line("/** @jsx React.DOM */");
    this.line("var React = require('react'),");
    this.line("    Fluxxor = require('fluxxor'),");
    this.line("    FluxChildMixin = Fluxxor.FluxMixin(React),");
    this.line("    StoreWatchMixin = Fluxxor.StoreWatchMixin;", 2);
};

/**
* Adds the standard required headers for a react store file
**/
BaseFile.prototype._addReactStoreHeaders = function() {
    this.line("/** @jsx React.DOM */");
    this.line("var Fluxxor = require('fluxxor'),");
    this.line("    Constants = require(__dirname + '/../constants'),");
    this.line("    StoreWatchMixin = Fluxxor.StoreWatchMixin;", 2);
};

/**
* Adds the standard required headers for a react action file
**/
BaseFile.prototype._addReactActionHeaders = function() {
    this.line("var Constants = require(__dirname + '/../constants'),");
    this.line("    " + this.params.name + "Lib = require('./../libs/" + this.params.file_name + "');", 2);
};

/**
* Adds the standard required headers for a react lib file
**/
BaseFile.prototype._addReactLibHeaders = function() {
    // Nothing here atm...
};

/**
* Returns the proper name based on the name and type
**/
BaseFile.prototype._getName = function() {
    return this.params.name + this.type;
};

BaseFile.extend = function(Child) {
    extendClass(Child, BaseFile);
}

