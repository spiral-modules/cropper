"use strict";
import sf from 'sf';//resolved in webpack's "externals"
import Crop from './crop';

require("style!css?minimize!less!./crop.less");

sf.instancesController.registerInstanceType(Crop,"js-sf-cropper");
module.exports = Crop;   // ES6 default export will not expose us as global