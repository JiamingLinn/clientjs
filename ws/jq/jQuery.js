/**
 * Created by Administrator on 2015/11/15.
 */
(function( global, factory ){
    //支持模块化
    if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if( !w.document ) {
                    throw new Error("jquery的运行需要window和document环境支持");
                }
                return factory( w );
            }
    } else {
        factory( global );
    }

}(typeof window !== "undefined" ? window : this, function( window ) {

    var deletedIds = [],
        slice = deletedIds.slice,
        concat = deletedIds.concat,
        push = deletedIds.push,
        indexOf = deletedIds.indexOf,
        class2type = {},
        toString = class2type.toString,
        hasown = class2type.hasOwnProperty,
        support = {},
        version = "myjq";

    var jQuery = function(selector, context){
        return new jQuery.fn.init(selector, context);
    }

    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return [].slice.call( this );
        },
        get: function( num ) {
            return num != null ? 
                ( num < 0 ? this[this.length + num] : this[num] ) :
                [].slice.call( this );
        },
        pushStack: function( elems ) {
            var ret = jQuery.merge( this.constructor(), elems );
            ret.preObject = this;
            ret.context = this.context;
            return ret;
        },
        each: function( callback, args ) {
            return jQuery.each( this, callback, args );
        },
        map: function() {},
        slice: function() {},
        first: function() {},
        last: function() {},
        eq: function() {},
        end: function() {}
    }

    //extend
    jQuery.extend = jQuery.fn.extend = function() {
        var options, src, copy,
            target = arguments[0] || {},
            name,
            i = 1,
            length = arguments.length;
        if(length == i) {
            target = this;
            i--;
        }
        for(; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    copy = options[name];
                    target[name] = copy;
                }
            }
        }
        return target;
    }
    //core
    jQuery.fn.extend({
       get: function( num ) {
           return num == null ?
               Array.prototype.slice.call(this):
               (num < 0 ? this[num+this.length] : this[num]);
       }
    });

    var rootjQuery,
        document = window.document,
        rquickExpr = /^(?:\s*())/

    return jQuery;
}));
console.dir(module.exports.extend);