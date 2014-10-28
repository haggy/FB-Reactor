/**
* Represent a reactor file
**/
var Base = require(__dirname + '/base');

var ReactorFile = module.exports = function(params) {
    params = params || {};
    params.file_name = 'reactorfile.js';
    params.mock_config = true;
    Base.call(this, params);
    
}
Base.extend(ReactorFile);

ReactorFile.prototype._getFileData = function() {
    var defaultRoot = this.params.app_root || '/src';
    return {
        path: '',
        file_name: this.params.file_name,
        data: {
            app_root: defaultRoot,
            component_root: defaultRoot + (this.params.component_root || '/components'),
            action_root: defaultRoot + (this.params.action_root || '/actions'),
            store_root: defaultRoot + (this.params.store_root || '/stores'),
            mixin_root: defaultRoot + (this.params.mixin_root || '/mixins'),
            lib_root: defaultRoot + (this.params.lib_root || '/libs')
        }
    };
};

