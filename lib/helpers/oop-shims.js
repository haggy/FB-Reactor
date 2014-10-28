/**
 * the oop_shims module provides functions to assist with standard OOP constructs such as extending classes.
 */


module.exports = {
    /**
     * Extends a super class with then given sub class
     * @param subClass
     * @param superClass
     */
    extend: function(subClass, superClass) {
        var F = function () {};
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
    }
};
