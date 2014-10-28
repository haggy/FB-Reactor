/**
* Creates files
**/
var fs2 = require('fs2');
var Q = require('q');
var CWD = process.cwd();

var FileHelper = module.exports = function(params) {
    this.params = params || {};

}

FileHelper.prototype.writeFile = function(file) {
    var data = null;
    if(typeof file.data === 'object') {
        data = JSON.stringify(file.data, null, (this.params.space || 2));
    } else {
        data = file.data;
    }

    var path = CWD + (file.path || '/');
    return fs2.writeFile(path + file.file_name, data, {
        encoding: this.params.encoding || 'utf8',
        intermediate: true
    });
};

FileHelper.prototype.readAsText = function(path) {
    return fs2.readFile(path, {
        encoding: this.params.encoding || 'utf8'
    });
};

FileHelper.prototype.makeDirs = function(dirs) {

    var pList = dirs.map(function(dir) {
        return fs2.mkdir(dir, {intermediate: true});
    });

    return Q.allSettled(pList);
};