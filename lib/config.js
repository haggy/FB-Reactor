var FileHelper = require(__dirname + '/helpers/file-helper');
var CWD = process.cwd();
var Q = require('q');

var Config = module.exports = function(mockConfig) {
    if(!mockConfig) {
        this.initPromise = new FileHelper().readAsText(CWD + '/reactorfile.js');

        this.initPromise
            .then(function(data) {
                this.config = JSON.parse(data);
            }.bind(this))
            .catch(function(err) {
                var msg = 'Ah crap! We encountered a problem.\n' +
                            'Did you forget to create a reactorfile?\n' +
                            'If so, run: react-or create reactorfile\n\n' +
                            'If the file is there, we spit the error out below. Let us know about it!\n\n';
                console.log(msg.red);
                throw err;
            });
    } else {
        // Jock mock up a config if it's not necessary
        var def = Q.defer();
        def.resolve({});
        this.initPromise = def.promise;
    }
};

Config.prototype.whenReady = function() {
    return this.initPromise;
};

Config.prototype.getInstance = function() {
    var def = Q.defer();
    this.whenReady()
        .then(function() {
            def.resolve(this.config);
        }.bind(this));
    return def.promise;
};