/**
* Represent a reactor file
**/
var Base = require(__dirname + '/base');

var Component = module.exports = function(params) {
    Base.call(this, params);
    this.type = 'Component';
    this.fileExt = '.jsx';
}
Base.extend(Component);

Component.prototype._getFileData = function() {

    var compName = this._getName();
    var storeName = this.params.name + 'Store';

    this._addReactComponentHeaders();
    this.line('var ' + compName + ' = React.createClass({', 2);
    this.line('    mixins: [FluxChildMixin, StoreWatchMixin("' + storeName + '")],', 2);
    this.line("    getInitialState: function() {");
    this.line("        return {};");
    this.line("    },", 2);
    this.line("    getStateFromFlux: function() {");
    this.line("        return {");
    this.line("            " + storeName + ': flux.store("'+ storeName + '").getState()');
    this.line("        };");
    this.line("    },", 2);
    this.line('    render: function() {');
    this.line('        return (');
    this.line('            <div>Nothing here yet...</div>');
    this.line('        );');
    this.line('    }');
    this.line('});', 2);
    this.line('module.exports = ' + compName + ';');

    return {};
};

