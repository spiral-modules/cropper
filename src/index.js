"use strict";
import sf from 'sf';//resolved in webpack's "externals"
import Crop from './crop';

sf.instancesController.registerInstanceType(Crop,"js-sf-crop");
module.exports = Crop;   // ES6 default export will not expose us as global