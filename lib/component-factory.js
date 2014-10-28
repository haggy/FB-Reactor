/**
* Factory for creating components
**/
var FileHelper = require(__dirname + '/helpers/file-helper');
var ReactorFile = require(__dirname + '/file-types/reactor');
var ReactorComponent = require(__dirname + '/file-types/component');
var ReactorStore = require(__dirname + '/file-types/store');
var ReactorAction = require(__dirname + '/file-types/action');
var ReactorLib = require(__dirname + '/file-types/lib');
var Config = require(__dirname + '/config');
var colors = require('colors');
var Q = require('q');
var CWD = process.cwd();

module.exports = {

    createReactorfile: function(params) {
        return new ReactorFile(params).generate();
    },

    createFramework: function() {
        var helper = new FileHelper();
        var def = Q.defer();

        new Config().getInstance()
            .then(function(config) {
                var dirs = [
                    CWD + '/' + config.component_root,
                    CWD + '/' + config.action_root,
                    CWD + '/' + config.store_root,
                    CWD + '/' + config.mixin_root,
                    CWD + '/' + config.lib_root
                ];
                return helper.makeDirs(dirs);
            })
            .then(def.resolve)
            .catch(def.reject);

        return def.promise;
    },

    createFullComponent: function(params) {
        var pList = [];
        pList.push(new ReactorComponent(params).generate());
        pList.push(new ReactorStore(params).generate());
        pList.push(new ReactorAction(params).generate());
        pList.push(new ReactorLib(params).generate());

        return Q.allSettled(pList);
    }
};
