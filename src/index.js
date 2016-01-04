import Crop from './crop';


//https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
//(function (factory) {
//    if (typeof define === 'function' && define.amd) {
//        // AMD. Register as an anonymous module.
//        define(['sf'], factory);
//    } else if (typeof module === 'object' && module.exports) {
//        // Node/CommonJS
//        module.exports = function( root, sf ) {
//            if ( sf === undefined ) {
//                // require('jQuery') returns a factory that requires window to
//                // build a jQuery instance, we normalize how we use modules
//                // that require this pattern but the window provided is a noop
//                // if it's defined (how jquery works)
//                if ( typeof window !== 'undefined' ) {
//                    sf = require('sf');
//                }
//                else {
//                    sf = require('sf')(root);
//                }
//            }
//            factory(sf);
//            return sf;
//        };
//    } else {
//        // Browser globals
//        factory(sf);
//    }
//}(function (sf) {
//    sf.instancesController.registerInstanceType(Crop,"js-sf-crop");
//    //$.fn.jqueryPlugin = function () { return true; };
//}));

sf.instancesController.registerInstanceType(Crop,"js-sf-crop");
module.exports = Crop;   // ES6 default export will not expose us as global