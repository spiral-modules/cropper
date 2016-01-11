/*! Spiral Image Cropper Widget v0.4.0
 *  https://github.com/spiral-modules/image-cropper/
 *  Copyright (c) 2016, Alex Chepura, Yauheni Yasinau, spiralscout.com
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("sf"));
	else if(typeof define === 'function' && define.amd)
		define(["sf"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("sf")) : factory(root["sf"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _sf = __webpack_require__(2);
	
	var _sf2 = _interopRequireDefault(_sf);
	
	var _crop = __webpack_require__(3);
	
	var _crop2 = _interopRequireDefault(_crop);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(8); //resolved in webpack's "externals"
	
	_sf2.default.instancesController.registerInstanceType(_crop2.default, "js-sf-crop");
	module.exports = _crop2.default; // ES6 default export will not expose us as global

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _create = __webpack_require__(4);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _sf = __webpack_require__(2);
	
	var _sf2 = _interopRequireDefault(_sf);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//resolved in webpack's "externals"
	
	var externals = {
	    template: __webpack_require__(7)
	};
	var Crop = function Crop(sf, node, options) {
	    this._construct(sf, node, options);
	};
	
	/**
	 * @lends sf.Form.prototype
	 */
	Crop.prototype = (0, _create2.default)(_sf2.default.modules.core.BaseDOMConstructor.prototype);
	
	/**
	 * Name to register
	 * @type {string}
	 */
	Crop.prototype.name = "crop";
	
	Crop.prototype._construct = function (sf, node, options) {
	
	    this.init(sf, node, options); //call parent
	
	    this.options.template = this.options.template || externals.template;
	
	    var that = this,
	        noop = function noop() {},
	        parser = new DOMParser();
	
	    if (options) {
	        //if we pass options extend all options by passed options
	        this.options = sf.tools.extend(this.options, options);
	    }
	
	    if (typeof this.options.showInfo == "string") this.options.showInfo = this.options.showInfo.split(",");
	
	    if (this.options.aspectRatio) this.options.aspectRatio = parseFloat(this.options.aspectRatio); //just to be sure about number format, not string
	    if (typeof this.options.onFileProcessed != "function") this.options.onFileProcessed = noop;
	
	    //elements
	    this.els = {
	        node: node,
	        input: node.tagName === "INPUT" ? node : node.getElementsByClassName("sf-crop-input")[0],
	        modal: parser.parseFromString(this.options.template, "text/html").firstChild.lastChild.firstChild
	    };
	
	    if (this.options.previewSelector) {
	        this.els.preview = document.querySelector(this.options.previewSelector);
	    } else {
	        console.warn('Provide image-preview selector with data-previewSelector');
	    }
	    if (this.options.adjustSelector) {
	        this.els.adjust = document.querySelector(this.options.adjustSelector);
	    } else {
	        console.warn('Provide adjust-crop selector with data-adjustSelector');
	    }
	
	    if (!this.options.ajaximage && !this.els.input) {
	        console.warn('Provide file-input to use cropper or load image with ajax (with data-ajaximage attr)');
	    }
	    this.els.cropWrapper = this.els.modal.getElementsByClassName("sf-crop-wrapper")[0];
	    this.els.imageOriginal = this.els.modal.getElementsByClassName("sf-crop-image-original")[0];
	    this.els.cropElements = this.els.modal.getElementsByClassName("sf-crop-elements")[0];
	    this.els.cropSave = this.els.modal.getElementsByClassName("sf-crop-save")[0];
	    this.els.closePopup = this.els.modal.getElementsByClassName("sf-crop-close")[0];
	
	    this.els.cropInfo = {
	        ratio: this.els.modal.getElementsByClassName("sf-crop-ratio")[0],
	        croppedSize: this.els.modal.getElementsByClassName("sf-crop-cropped-size")[0],
	        origSize: this.els.modal.getElementsByClassName("sf-crop-orig-size")[0]
	    };
	
	    this.els.handlers = {
	        n: this.els.modal.getElementsByClassName("handler-N")[0],
	        ne: this.els.modal.getElementsByClassName("handler-NE")[0],
	        e: this.els.modal.getElementsByClassName("handler-E")[0],
	        se: this.els.modal.getElementsByClassName("handler-SE")[0],
	        s: this.els.modal.getElementsByClassName("handler-S")[0],
	        sw: this.els.modal.getElementsByClassName("handler-SW")[0],
	        w: this.els.modal.getElementsByClassName("handler-W")[0],
	        nw: this.els.modal.getElementsByClassName("handler-NW")[0],
	        current: null
	    };
	
	    this.els.dimmers = {
	        el: this.els.modal.getElementsByClassName("dimmers")[0],
	        n: this.els.modal.getElementsByClassName("dimmer-N")[0],
	        e: this.els.modal.getElementsByClassName("dimmer-E")[0],
	        s: this.els.modal.getElementsByClassName("dimmer-S")[0],
	        w: this.els.modal.getElementsByClassName("dimmer-W")[0]
	    };
	
	    this.els.form = this.els.input ? this.els.input.form : '';
	    this.form = sf.instancesController.getInstance("form", this.els.form);
	
	    this.reset();
	    this.addEventListeners();
	    this.attachData();
	
	    if (this.options.ajaximage) {
	        if (this.els.input && this.els.input !== this.els.node) this.els.input.parentNode.removeChild(this.els.input); //this check is for not to remove cropper's node and not to trigger die method
	        var xhr = new XMLHttpRequest();
	        xhr.onreadystatechange = function () {
	            if (this.readyState == 4 && this.status == 200) {
	                var img = new Image();
	                var url = window.URL || window.webkitURL;
	                if (this.response instanceof Blob) {
	                    img.src = url.createObjectURL(this.response);
	                    that.handleFileSelect(this.response);
	                    //that.els.adjust.style.display = 'inline-block';
	                } else {
	                        that.els.adjust.parentNode.removeChild(that.els.adjust);
	                    }
	            }
	        };
	        xhr.open('GET', that.options.ajaximage);
	        xhr.responseType = 'blob';
	        xhr.send();
	    }
	    //IE10 click to move doesn't work. looks like click goes through cropper to background picture =(
	    if (navigator.appVersion.indexOf("MSIE 10") != -1) this.els.cropElements.style.backgroundColor = "rgba(255,255,255,0.01";
	};
	
	/**
	 * @override
	 * @inheritDoc
	 * @enum {string}
	 */
	Crop.prototype.optionsToGrab = {
	    /**
	     *  How to send: cropped or full size with coordinates to crop on server <b>Default: "cropped"</b> <i>Optional: "full"</i>
	     */
	    "sendFormat": {
	        "value": "cropped",
	        "domAttr": "data-sendFormat"
	    },
	    /**
	     *  Preloading of image  <b>Default: "false"</b> <i>Optional: url of image to preload</i>
	     */
	    "ajaximage": {
	        "value": false,
	        "domAttr": "data-ajaximage"
	    },
	    "template": {
	        "domAttr": "data-template"
	    },
	    /**
	     *  Request address for submitting (if there is no form) <b>Default: "false"</b> <i>Optional: request URL</i>
	     */
	    "ajaxAddress": {
	        "value": false,
	        "domAttr": "data-ajaxAddress"
	    },
	    /**
	     *  Locked aspect ratio <b>Default: false</b>
	     */
	    "aspectRatio": {
	        "value": false,
	        "domAttr": "data-aspectRatio"
	    },
	    /**
	     *  What info to show <b>Default: []</b></br>
	     *  <b>Example: </b>data-showInfo="ratio,origSize,croppedSize"</br>
	     *  <b>Note: </b>done only ratio
	     */
	    "showInfo": {
	        "value": [],
	        "domAttr": "data-showInfo"
	    },
	    /**
	     *  ID of preview element <b>Default: ""</b>
	     */
	    "previewSelector": {
	        "value": "",
	        "domAttr": "data-previewSelector"
	    },
	    /**
	     *  Selector of element which twiggers crop-modal <b>Default: ""</b>
	     */
	    "adjustSelector": {
	        "value": "",
	        "domAttr": "data-adjustSelector"
	    },
	    /**
	     *  Name for formData <b>Default: "cropped"</b>
	     */
	    "name": {
	        "value": "cropped",
	        "domAttr": "data-name"
	    }
	};
	Crop.prototype.reset = function () {
	    //Coordinates and Variables
	    this.cnv = {
	        cursor: { x: 0, y: 0 },
	        crop: { x: 0, y: 0, x2: 0, y2: 0, w: 0, h: 0 },
	        toSave: { x: 0, y: 0, w: 0, h: 0 },
	        image: { w: 0, h: 0 },
	        old: {
	            cursor: { x: 0, y: 0 }
	        },
	        start: {
	            crop: { x: 0, y: 0, w: 0, h: 0 }
	        },
	        canvas: { w: 538, h: 0 },
	        orig: {},
	        preview: { w: 0, h: 0 },
	        scale: 1
	    };
	    this.setTop(0);
	    this.setLeft(0);
	    this.setWidth(0);
	    this.setHeight(0);
	
	    if (this.els.imageOriginal.lastChild) this.els.imageOriginal.removeChild(this.els.imageOriginal.lastChild);
	};
	/**
	 * Changes crop info if need.
	 * @param type {string}
	 * @param value {string|number}
	 */
	Crop.prototype.changeInfo = function (type, value) {
	    switch (type) {
	        case "ratio":
	            this.els.cropInfo.ratio.innerHTML = "Aspect ratio: " + value;
	            break;
	        case "croppedSize":
	            this.els.cropInfo.croppedSize.innerHTML = "Cropped size: " + value[0] + 'x' + value[1];
	            break;
	        case "origSize":
	            this.els.cropInfo.origSize.innerHTML = "Original size: " + value[0] + 'x' + value[1];
	            break;
	        default:
	            break;
	    }
	};
	/**
	 * Update cropping info.
	 */
	Crop.prototype.updateInfo = function () {
	    var that = this;
	    if (this.options.showInfo.length > 0) {
	        this.options.showInfo.forEach(function (info) {
	            if (info == "ratio") that.changeInfo("ratio", Math.round(that.cnv.crop.w / that.cnv.crop.h * 100) / 100);
	            if (info == "croppedSize") that.changeInfo("croppedSize", [Math.round(that.cnv.crop.w * that.cnv.scale), Math.round(that.cnv.crop.h * that.cnv.scale)]);
	        });
	    }
	};
	/**
	 * Shows modal with cropper
	 */
	Crop.prototype.showPopup = function () {
	    document.body.appendChild(this.els.modal);
	    this.addModalEventListeners();
	    this.removeEventListeners();
	};
	/**
	 * Hides modal with cropper
	 */
	Crop.prototype.hidePopup = function () {
	    this.els.modal.parentNode.removeChild(this.els.modal);
	    this.removeModalEventListeners();
	    this.addEventListeners();
	};
	
	/**
	 * Adds static events listeners.
	 */
	Crop.prototype.addEventListeners = function () {
	    var that = this;
	
	    this._inputChange = function (e) {
	        //IE9 doesn't support File API
	        var file = e.target.files[0];
	        if (!file.type.match(/image/)) {
	            alert("Please select an image.");
	            return;
	        }
	        that.handleFileSelect(file);
	        if (that.els.adjust) that.els.adjust.style.display = 'inline-block';
	    };
	
	    this._openCropper = function (e) {
	        if (that.img) {
	            if (that.readyToPrepare) that.prepare();
	            that.showPopup();
	        }
	    };
	
	    if (this.els.input) {
	        this.els.input.addEventListener('change', this._inputChange);
	    }
	    if (this.els.preview) {
	        this.els.preview.addEventListener('click', this._openCropper);
	    }
	    if (this.els.adjust) {
	        this.els.adjust.addEventListener('click', this._openCropper);
	    }
	};
	
	Crop.prototype.removeEventListeners = function () {
	    if (this.els.input) {
	        this.els.input.removeEventListener('change', this._inputChange);
	    }
	    if (this.els.preview) {
	        this.els.preview.removeEventListener('click', this._openCropper);
	    }
	    if (this.els.adjust) {
	        this.els.adjust.removeEventListener('click', this._openCropper);
	    }
	};
	
	/**
	 * Adds events listeners for modal.
	 */
	Crop.prototype.addModalEventListeners = function () {
	    var that = this;
	
	    this._cropSave = function () {
	        that.save();
	        that.hidePopup();
	    };
	
	    this._hidePopup = function () {
	        //this fn to save correct "this" and to be able to remove listener later
	        that.hidePopup();
	    };
	
	    this._cropWrapperMouseDown = function (e) {
	        that.onCropStart(e);
	        that.inCropping = true;
	    };
	
	    this._documentMouseMove = function (e) {
	        if (that.inCropping) {
	            e.preventDefault(); //prevent selecting background elements
	            that.onCrop(e);
	        }
	    };
	
	    this._cropWrapperMouseUp = function () {
	        that.onCropEnd();
	        that.inCropping = false;
	    };
	
	    this._documentMouseUp = function () {
	        that.onCropEnd();
	        that.inCropping = false;
	    };
	    this.els.closePopup.addEventListener("click", this._hidePopup);
	    this.els.cropSave.addEventListener("click", this._cropSave);
	    this.els.cropWrapper.addEventListener("mousedown", this._cropWrapperMouseDown);
	    this.els.cropWrapper.addEventListener("mouseup", this._cropWrapperMouseUp);
	    document.addEventListener("mousemove", this._documentMouseMove);
	    document.addEventListener("mouseup", this._documentMouseUp);
	};
	
	Crop.prototype.removeModalEventListeners = function () {
	    this.els.closePopup.removeEventListener("click", this._hidePopup);
	    this.els.cropSave.removeEventListener("click", this._cropSave);
	    this.els.cropWrapper.removeEventListener("mousedown", this._cropWrapperMouseDown);
	    this.els.cropWrapper.removeEventListener("mouseup", this._cropWrapperMouseUp);
	    document.removeEventListener("mousemove", this._documentMouseMove);
	    document.removeEventListener("mouseup", this._documentMouseUp);
	};
	
	/**
	 * Sets preview
	 * @param img
	 */
	Crop.prototype.setPreviewImage = function (img) {
	    var that = this;
	    if (that.els.preview) {
	        //        if (that.els.preview.lastChild) // Don't remember why was removing only last child
	        //            that.els.preview.removeChild(that.els.preview.lastChild);
	        while (that.els.preview.firstChild) {
	            that.els.preview.removeChild(that.els.preview.firstChild);
	        }
	        var newimg = img.cloneNode(true);
	        newimg.style.maxWidth = "100%";
	        that.els.preview.appendChild(newimg);
	    }
	};
	/**
	 * Reads file, selected by user
	 * @param file
	 */
	Crop.prototype.handleFileSelect = function (file) {
	    var that = this;
	    this.reader = new FileReader();
	    this.reset();
	    this.reader.onload = function (theFile) {
	        return function (e) {
	            that.file = {
	                file: theFile,
	                blob: theFile,
	                name: encodeURIComponent(theFile.name ? theFile.name : that.options.ajaximage.replace(/^.*[\\\/]/, '')),
	                base64: e.target.result
	            };
	            that.img = new Image();
	            that.img.src = that.file.base64;
	            that.img.onload = function () {
	                that.setPreviewImage(that.img);
	                that.cnv.preview.h = that.img.clientHeight;
	                that.cnv.preview.w = that.img.clientWidth;
	                that.cnv.orig.h = that.img.naturalHeight;
	                that.cnv.orig.w = that.img.naturalWidth;
	                that.cnv.orig.ratio = that.cnv.orig.w / that.cnv.orig.h;
	                if (that.cnv.orig.ratio < 1) that.cnv.canvas.w *= that.cnv.orig.ratio; // if image is too narrow -> correct canvas sizes not to exceed display sizes
	                that.cnv.scale = that.cnv.orig.w / that.cnv.canvas.w;
	                that.cnv.toSave.w = that.cnv.orig.w;
	                that.cnv.toSave.h = that.cnv.orig.h;
	
	                if (that.els.imageOriginal.lastChild) that.els.imageOriginal.removeChild(that.els.imageOriginal.lastChild);
	                that.readyToPrepare = true;
	                that.options.onFileProcessed();
	            };
	        };
	    }(file);
	
	    this.reader.readAsDataURL(file);
	};
	
	/**
	 * Prepares canvas, calculates coordinates
	 */
	Crop.prototype.prepare = function () {
	    var that = this;
	    var c = document.createElement("canvas");
	    c.width = that.cnv.canvas.w;
	    c.height = that.cnv.canvas.w / that.cnv.orig.ratio;
	    var ctx = c.getContext("2d");
	
	    function drawImageOnCanvas() {
	        //fix to NS_ERROR_NOT_AVAILABLE in firefox with ctx.drawImage
	        try {
	            ctx.drawImage(that.img, 0, 0, that.cnv.canvas.w, that.cnv.canvas.w / that.cnv.orig.ratio);
	        } catch (e) {
	            if (e.name == "NS_ERROR_NOT_AVAILABLE") {
	                setTimeout(drawImageOnCanvas, 0);
	            } else {
	                throw e;
	            }
	        }
	    }
	
	    drawImageOnCanvas();
	    that.els.imageOriginal.appendChild(c);
	    setTimeout(function () {
	        that.cnv.image.w = that.els.imageOriginal.lastChild.clientWidth;
	        that.cnv.image.h = that.els.imageOriginal.lastChild.clientHeight;
	        that.cnv.start.crop.w = that.cnv.image.w;
	        that.cnv.start.crop.h = that.cnv.image.h;
	        that.setWidth(that.cnv.image.w);
	        that.setHeight(that.cnv.image.h);
	        that.cnv.crop.x2 = that.cnv.image.w;
	        that.cnv.crop.y2 = that.cnv.image.h;
	
	        if (that.options.aspectRatio) {
	            if (that.cnv.orig.ratio > that.options.aspectRatio) {
	                var w = that.cnv.crop.w;
	                that.setWidth(Math.round(that.cnv.start.crop.h * that.options.aspectRatio));
	                that.cnv.start.crop.w = that.cnv.crop.w;
	                that.setLeft(Math.round((w - that.cnv.crop.w) / 2));
	                that.cnv.crop.x2 = that.cnv.crop.x + that.cnv.crop.w;
	            } else {
	                var h = that.cnv.crop.h;
	                that.setHeight(Math.round(that.cnv.start.crop.w / that.options.aspectRatio));
	                that.cnv.start.crop.h = that.cnv.crop.h;
	                that.setTop(Math.round((h - that.cnv.crop.h) / 2));
	                that.cnv.crop.y2 = that.cnv.crop.y + that.cnv.crop.h;
	            }
	
	            that.save();
	        }
	        that.updateInfo();
	        if (that.options.showInfo.indexOf("origSize") > -1) {
	            that.changeInfo("origSize", [that.cnv.orig.w, that.cnv.orig.h]); //no need to pass through updateInfo since it's static
	        }
	
	        that.readyToPrepare = false;
	    }, 50);
	};
	
	/**
	 * Processes crop start.
	 * @param {Event} e
	 */
	Crop.prototype.onCropStart = function (e) {
	    this.els.handlers.current = e.target;
	    this.cnv.offset = this.els.cropWrapper.getBoundingClientRect();
	    this.cnv.cursor.x = Math.round(e.clientX - this.cnv.offset.left);
	    this.cnv.cursor.y = Math.round(e.clientY - this.cnv.offset.top);
	    this.cnv.cursor.offsetX = e.offsetX === undefined ? Math.round(e.layerX) : Math.round(e.offsetX);
	    this.cnv.cursor.offsetY = e.offsetY === undefined ? Math.round(e.layerY) : Math.round(e.offsetY);
	};
	
	/**
	 * Processes cropping (mouse move)
	 * @param  {Event} e
	 */
	Crop.prototype.onCrop = function (e) {
	    if (!this.els.handlers.current) return;
	    this.cnv.cursor.x = Math.round(e.clientX - this.cnv.offset.left);
	    this.cnv.cursor.y = Math.round(e.clientY - this.cnv.offset.top);
	    switch (this.els.handlers.current) {
	        case this.els.handlers.n:
	            this.setN();
	            break;
	        case this.els.handlers.ne:
	            this.setNE();
	            break;
	        case this.els.handlers.e:
	            this.setE();
	            break;
	        case this.els.handlers.se:
	            this.setSE();
	            break;
	        case this.els.handlers.s:
	            this.setS();
	            break;
	        case this.els.handlers.sw:
	            this.setSW();
	            break;
	        case this.els.handlers.w:
	            this.setW();
	            break;
	        case this.els.handlers.nw:
	            this.setNW();
	            break;
	        case this.els.cropElements:
	            this.move();
	            break;
	    }
	    this.updateInfo();
	    //    this.setDimmers();
	};
	
	/**
	 * Process crop end.
	 */
	Crop.prototype.onCropEnd = function () {
	    this.els.handlers.current = null;
	};
	/**
	 * Sets left side of cropper
	 * @param x {number}
	 */
	Crop.prototype.setLeft = function (x) {
	    this.cnv.crop.x = x;
	    this.els.cropElements.style.left = x + "px";
	    this.els.dimmers.el.style.left = x + "px";
	};
	/**
	 * Sets top side of cropper
	 * @param y {number}
	 */
	Crop.prototype.setTop = function (y) {
	    this.cnv.crop.y = y;
	    this.els.cropElements.style.top = y + "px";
	    this.els.dimmers.el.style.top = y + "px";
	};
	/**
	 * Sets width of cropper
	 * @param w {number}
	 */
	Crop.prototype.setWidth = function (w) {
	    this.cnv.crop.w = w;
	    this.els.cropElements.style.width = w + "px";
	    this.els.dimmers.el.style.width = w + "px";
	};
	/**
	 * Sets height of cropper
	 * @param h {number}
	 */
	Crop.prototype.setHeight = function (h) {
	    this.cnv.crop.h = h;
	    this.els.cropElements.style.height = h + "px";
	    this.els.dimmers.el.style.height = h + "px";
	};
	
	/**
	 * Adjusts coordinates.
	 * @param {boolean|undefined} notDefaultSide
	 * @param {number} y
	 */
	Crop.prototype.adjustN = function (notDefaultSide, y) {
	    if (notDefaultSide) {
	        if ((this.cnv.crop.y2 - y) * this.options.aspectRatio <= this.cnv.crop.x2) {
	            this.setTop(y);
	            this.setHeight(this.cnv.crop.y2 - y);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.aspectRatio));
	            this.setLeft(this.cnv.crop.x2 - this.cnv.crop.w);
	        } else {
	            this.setLeft(0);
	            this.setWidth(this.cnv.crop.x2);
	            this.setTop(this.cnv.crop.y2 - Math.round(this.cnv.crop.w / this.options.aspectRatio));
	        }
	    } else {
	        if ((this.cnv.crop.y2 - y) * this.options.aspectRatio + this.cnv.crop.x <= this.cnv.image.w) {
	            this.setTop(y);
	            this.setHeight(this.cnv.crop.y2 - y);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.aspectRatio));
	            this.cnv.crop.x2 = this.cnv.crop.x + this.cnv.crop.w;
	        } else {
	            this.setWidth(this.cnv.image.w - this.cnv.crop.x);
	            this.setTop(this.cnv.crop.y2 - Math.round(this.cnv.crop.w / this.options.aspectRatio));
	            this.setHeight(this.cnv.crop.y2 - this.cnv.crop.y);
	            this.cnv.crop.x2 = this.cnv.image.w;
	        }
	    }
	};
	
	/**
	 * Sets top coordinates and border.
	 * @param {Boolean} [notDefaultSide]
	 */
	Crop.prototype.setN = function (notDefaultSide) {
	    if (this.options.aspectRatio) {
	        if (this.cnv.cursor.y > 0) {
	            if (this.cnv.cursor.y < this.cnv.crop.y2) {
	                this.adjustN(notDefaultSide, this.cnv.cursor.y);
	            } else {
	                this.setHeight(1);
	                this.setWidth(Math.round(this.cnv.crop.h * this.options.aspectRatio));
	                if (notDefaultSide) {
	                    this.setLeft(this.cnv.crop.x2 - 1);
	                } else {
	                    this.cnv.crop.x2 = this.cnv.crop.x + this.cnv.crop.w;
	                }
	                this.setTop(this.cnv.crop.y2 - 1);
	            }
	        } else {
	            this.adjustN(notDefaultSide, 0);
	        }
	    } else {
	        if (this.cnv.cursor.y > 0) {
	            if (this.cnv.cursor.y < this.cnv.crop.y2) {
	                this.setTop(this.cnv.cursor.y);
	                this.setHeight(this.cnv.crop.y2 - this.cnv.crop.y);
	            } else {
	                this.setTop(this.cnv.crop.y2 - 1);
	                this.setHeight(1);
	            }
	        } else {
	            this.setTop(0);
	            this.setHeight(this.cnv.crop.y2);
	        }
	    }
	};
	
	/**
	 * Adjusts coordinates.
	 * @param {boolean|undefined} notDefaultSide
	 * @param {number} y2
	 */
	Crop.prototype.adjustS = function (notDefaultSide, y2) {
	    if (notDefaultSide) {
	        if ((y2 - this.cnv.crop.y) * this.options.aspectRatio <= this.cnv.crop.x2) {
	            this.setHeight(y2 - this.cnv.crop.y);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.aspectRatio));
	            this.setLeft(this.cnv.crop.x2 - this.cnv.crop.w);
	            this.cnv.crop.y2 = y2;
	        } else {
	            this.setLeft(0);
	            this.setWidth(this.cnv.crop.x2);
	            this.setHeight(Math.round(this.cnv.crop.w / this.options.aspectRatio));
	            this.cnv.crop.y2 = this.cnv.crop.y + this.cnv.crop.h;
	        }
	    } else {
	        if ((y2 - this.cnv.crop.y) * this.options.aspectRatio + this.cnv.crop.x <= this.cnv.image.w) {
	            this.setHeight(y2 - this.cnv.crop.y);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.aspectRatio));
	            this.cnv.crop.y2 = y2;
	            this.cnv.crop.x2 = this.cnv.crop.x + this.cnv.crop.w;
	        } else {
	            this.setWidth(this.cnv.image.w - this.cnv.crop.x);
	            this.setHeight(Math.round(this.cnv.crop.w / this.options.aspectRatio));
	            this.cnv.crop.x2 = this.cnv.image.w;
	            this.cnv.crop.y2 = this.cnv.crop.y + this.cnv.crop.h;
	        }
	    }
	};
	
	/**
	 * Sets bottom coordinates and border.
	 * @param {Boolean} [notDefaultSide]
	 */
	Crop.prototype.setS = function (notDefaultSide) {
	    if (this.options.aspectRatio) {
	        if (this.cnv.cursor.y < this.cnv.image.h) {
	            if (this.cnv.cursor.y > this.cnv.crop.y) {
	                this.adjustS(notDefaultSide, this.cnv.cursor.y);
	            } else {
	                this.setHeight(1);
	                this.setWidth(Math.round(this.cnv.crop.h * this.options.aspectRatio));
	                if (notDefaultSide) {
	                    this.setLeft(this.cnv.crop.x2 - 1);
	                } else {
	                    this.cnv.crop.x2 = this.cnv.crop.x + this.cnv.crop.w;
	                }
	                this.cnv.crop.y2 = this.cnv.crop.y + 1;
	            }
	        } else {
	            this.adjustS(notDefaultSide, this.cnv.image.h);
	        }
	    } else {
	        if (this.cnv.cursor.y < this.cnv.image.h) {
	            if (this.cnv.cursor.y > this.cnv.crop.y) {
	                this.setHeight(this.cnv.cursor.y - this.cnv.crop.y);
	                this.cnv.crop.y2 = this.cnv.cursor.y;
	            } else {
	                this.setHeight(1);
	                this.cnv.crop.y2 = this.cnv.crop.y + 1;
	            }
	        } else {
	            this.setHeight(this.cnv.image.h - this.cnv.crop.y);
	            this.cnv.crop.y2 = this.cnv.image.h;
	        }
	    }
	};
	
	/**
	 * Adjusts coordinates.
	 * @param {boolean|undefined} notDefaultSide
	 * @param {number} x
	 */
	Crop.prototype.adjustW = function (notDefaultSide, x) {
	    if (notDefaultSide) {
	        if (this.cnv.crop.y2 - (this.cnv.crop.x2 - x) / this.options.aspectRatio >= 0) {
	            this.setLeft(x);
	            this.setWidth(this.cnv.crop.x2 - x);
	            this.setHeight(Math.round(this.cnv.crop.w / this.options.aspectRatio));
	            this.setTop(this.cnv.crop.y2 - this.cnv.crop.h);
	        } else {
	            this.setTop(0);
	            this.setHeight(this.cnv.crop.y2);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.aspectRatio));
	            this.setLeft(this.cnv.crop.x2 - this.cnv.crop.w);
	        }
	    } else {
	        if ((this.cnv.crop.x2 - x) / this.options.aspectRatio + this.cnv.crop.y <= this.cnv.image.h) {
	            this.setLeft(x);
	            this.setWidth(this.cnv.crop.x2 - x);
	            this.setHeight(Math.round(this.cnv.crop.w / this.options.aspectRatio));
	            this.cnv.crop.y2 = this.cnv.crop.y + this.cnv.crop.h;
	        } else {
	            this.setHeight(this.cnv.image.h - this.cnv.crop.y);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.aspectRatio));
	            this.setLeft(this.cnv.crop.x2 - this.cnv.crop.w);
	            this.cnv.crop.y2 = this.cnv.image.h;
	        }
	    }
	};
	
	/**
	 * Sets left coordinates and border.
	 * @param {Boolean} [notDefaultSide]
	 */
	Crop.prototype.setW = function (notDefaultSide) {
	    if (this.options.aspectRatio) {
	        if (this.cnv.cursor.x > 0) {
	            if (this.cnv.cursor.x < this.cnv.crop.x2) {
	                this.adjustW(notDefaultSide, this.cnv.cursor.x);
	            } else {
	                this.setWidth(1);
	                this.setHeight(Math.round(this.cnv.crop.w / this.options.aspectRatio));
	                if (notDefaultSide) {
	                    this.setTop(this.cnv.crop.y2 - 1);
	                } else {
	                    this.cnv.crop.y2 = this.cnv.crop.y + this.cnv.crop.h;
	                }
	            }
	        } else {
	            this.adjustW(notDefaultSide, 0);
	        }
	    } else {
	        if (this.cnv.cursor.x > 0) {
	            if (this.cnv.cursor.x < this.cnv.crop.x2) {
	                this.setLeft(this.cnv.cursor.x);
	                this.setWidth(this.cnv.crop.x2 - this.cnv.crop.x);
	            } else {
	                this.setLeft(this.cnv.crop.x2 - 1);
	                this.setWidth(1);
	            }
	        } else {
	            this.setLeft(0);
	            this.setWidth(this.cnv.crop.x2);
	        }
	    }
	};
	
	/**
	 * Adjusts coordinates.
	 * @param {boolean|undefined} notDefaultSide
	 * @param {number} x
	 */
	Crop.prototype.adjustE = function (notDefaultSide, x) {
	    if (notDefaultSide) {
	        if (this.cnv.crop.y2 - (x - this.cnv.crop.x) / this.options.aspectRatio >= 0) {
	            this.setWidth(x - this.cnv.crop.x);
	            this.setHeight(Math.round(this.cnv.crop.w / this.options.aspectRatio));
	            this.setTop(this.cnv.crop.y2 - this.cnv.crop.h);
	            this.cnv.crop.x2 = x;
	        } else {
	            this.setTop(0);
	            this.setHeight(this.cnv.crop.y2);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.aspectRatio));
	            this.cnv.crop.x2 = this.cnv.crop.x + this.cnv.crop.w;
	        }
	    } else {
	        if ((x - this.cnv.crop.x) / this.options.aspectRatio + this.cnv.crop.y <= this.cnv.image.h) {
	            this.setWidth(x - this.cnv.crop.x);
	            this.setHeight(Math.round(this.cnv.crop.w / this.options.aspectRatio));
	            this.cnv.crop.x2 = x;
	            this.cnv.crop.y2 = this.cnv.crop.y + this.cnv.crop.h;
	        } else {
	            this.setHeight(this.cnv.image.h - this.cnv.crop.y);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.aspectRatio));
	            this.cnv.crop.y2 = this.cnv.image.h;
	            this.cnv.crop.x2 = this.cnv.crop.x + this.cnv.crop.w;
	        }
	    }
	};
	
	/**
	 * Sets right coordinates and border.
	 * @param {Boolean} [notDefaultSide]
	 */
	Crop.prototype.setE = function (notDefaultSide) {
	    if (this.options.aspectRatio) {
	        if (this.cnv.cursor.x < this.cnv.image.w) {
	            if (this.cnv.cursor.x > this.cnv.crop.x) {
	                this.adjustE(notDefaultSide, this.cnv.cursor.x);
	            } else {
	                this.setWidth(1);
	                this.setHeight(Math.round(this.cnv.crop.w / this.options.aspectRatio));
	                if (notDefaultSide) {
	                    this.setTop(this.cnv.crop.y2 - 1);
	                } else {
	                    this.cnv.crop.y2 = this.cnv.crop.y + this.cnv.crop.h;
	                }
	                this.cnv.crop.x2 = this.cnv.crop.x + 1;
	            }
	        } else {
	            this.adjustE(notDefaultSide, this.cnv.image.w);
	        }
	    } else {
	        if (this.cnv.cursor.x < this.cnv.image.w) {
	            if (this.cnv.cursor.x > this.cnv.crop.x) {
	                this.setWidth(this.cnv.cursor.x - this.cnv.crop.x);
	                this.cnv.crop.x2 = this.cnv.cursor.x;
	            } else {
	                this.setWidth(1);
	                this.cnv.crop.x2 = this.cnv.crop.x + 1;
	            }
	        } else {
	            this.setWidth(this.cnv.image.w - this.cnv.crop.x);
	            this.cnv.crop.x2 = this.cnv.image.w;
	        }
	    }
	};
	
	/**
	 * Sets top-right corner.
	 */
	Crop.prototype.setNE = function () {
	    if (this.options.aspectRatio) {
	        if (Math.abs(this.cnv.cursor.x - this.cnv.crop.x2) > Math.abs(this.cnv.cursor.y - this.cnv.crop.y) && this.cnv.cursor.x <= this.cnv.crop.x2) {
	            this.setN();
	        } else {
	            this.cnv.cursor.y >= this.cnv.crop.y ? this.setE(true) : this.setN();
	        }
	    } else {
	        this.setN();
	        this.setE();
	    }
	};
	
	/**
	 * Sets bottom-right corner.
	 */
	Crop.prototype.setSE = function () {
	    if (this.options.aspectRatio) {
	        if (Math.abs(this.cnv.cursor.x - this.cnv.crop.x2) > Math.abs(this.cnv.cursor.y - this.cnv.crop.y - this.cnv.crop.h) && this.cnv.cursor.x <= this.cnv.crop.x2) {
	            this.setS();
	        } else {
	            this.cnv.cursor.y <= this.cnv.crop.y + this.cnv.crop.h ? this.setE() : this.setS();
	        }
	    } else {
	        this.setS();
	        this.setE();
	    }
	};
	
	/**
	 * Sets bottom-left corner.
	 */
	Crop.prototype.setSW = function () {
	    if (this.options.aspectRatio) {
	        if (Math.abs(this.cnv.cursor.x - this.cnv.crop.x) > Math.abs(this.cnv.cursor.y - this.cnv.crop.y - this.cnv.crop.h) && this.cnv.cursor.x >= this.cnv.crop.x) {
	            this.setS(true);
	        } else {
	            this.cnv.cursor.y <= this.cnv.crop.y + this.cnv.crop.h ? this.setW() : this.setS(true);
	        }
	    } else {
	        this.setS();
	        this.setW();
	    }
	};
	
	/**
	 * Sets top-left corner.
	 */
	Crop.prototype.setNW = function () {
	    if (this.options.aspectRatio) {
	        if (Math.abs(this.cnv.cursor.x - this.cnv.crop.x) > Math.abs(this.cnv.cursor.y - this.cnv.crop.y) && this.cnv.cursor.x >= this.cnv.crop.x) {
	            this.setN(true);
	        } else {
	            this.cnv.cursor.y >= this.cnv.crop.y ? this.setW(true) : this.setN(true);
	        }
	    } else {
	        this.setN();
	        this.setW();
	    }
	};
	
	/**
	 * Processes move crop selection.
	 */
	Crop.prototype.move = function () {
	    var left = this.cnv.cursor.x - this.cnv.cursor.offsetX;
	    var top = this.cnv.cursor.y - this.cnv.cursor.offsetY;
	    if (left > 0) {
	        if (left + this.cnv.crop.w < this.cnv.image.w) {
	            this.setLeft(left);
	        } else {
	            this.setLeft(this.cnv.image.w - this.cnv.crop.w);
	        }
	    } else {
	        this.setLeft(0);
	    }
	
	    if (top > 0) {
	        if (top + this.cnv.crop.h < this.cnv.image.h) {
	            this.setTop(top);
	        } else {
	            this.setTop(this.cnv.image.h - this.cnv.crop.h);
	        }
	    } else {
	        this.setTop(0);
	    }
	
	    this.cnv.crop.x2 = this.cnv.crop.x + this.cnv.crop.w;
	    this.cnv.crop.y2 = this.cnv.crop.y + this.cnv.crop.h;
	};
	
	/**
	 * Deprecated.
	 * Sets dimmers.
	 */
	Crop.prototype.setDimmers = function () {
	    this.els.dimmers.n.style.top = this.cnv.crop.y - 1000 + "px";
	    this.els.dimmers.n.style.left = this.cnv.crop.x + "px";
	    this.els.dimmers.n.style.width = this.cnv.crop.w + "px";
	
	    this.els.dimmers.e.style.left = this.cnv.crop.x2 + "px";
	
	    this.els.dimmers.s.style.top = this.cnv.crop.y2 + "px";
	    this.els.dimmers.s.style.left = this.cnv.crop.x + "px";
	    this.els.dimmers.s.style.width = this.cnv.crop.w + "px";
	
	    this.els.dimmers.w.style.left = this.cnv.crop.x - 1000 + "px";
	};
	
	/**
	 * Converts dataURI to Blob.
	 * http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
	 * @param dataURI
	 * @returns {Blob}
	 */
	Crop.prototype.dataURItoBlob = function (dataURI) {
	
	    var content = [],
	        byteString,
	        mimeString;
	
	    if (dataURI.split(',')[0].indexOf('base64') !== -1) {
	        byteString = atob(dataURI.split(',')[1]);
	    } else {
	        byteString = decodeURI(dataURI.split(',')[1]);
	    }
	
	    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	
	    for (var i = 0; i < byteString.length; i++) {
	        content[i] = byteString.charCodeAt(i);
	    }
	
	    return new Blob([new Uint8Array(content)], { type: mimeString });
	};
	
	/**
	 * Saves results to preview.
	 */
	Crop.prototype.save = function () {
	    'use strict';
	
	    var that = this;
	    var c = document.createElement("canvas"),
	        ctx = c.getContext("2d"),
	        img;
	    this.cnv.toSave = { //CoordinateS
	        w: Math.round(this.cnv.crop.w * this.cnv.scale),
	        h: Math.round(this.cnv.crop.h * this.cnv.scale),
	        x: Math.round(this.cnv.crop.x * this.cnv.scale),
	        y: Math.round(this.cnv.crop.y * this.cnv.scale)
	    };
	
	    c.width = this.cnv.toSave.w;
	    c.height = this.cnv.toSave.h;
	
	    function drawImageOnCanvas() {
	        //TODO refactor this piece. Almost the same as in prepare().
	        try {
	            ctx.drawImage(that.img, that.cnv.toSave.x, that.cnv.toSave.y, that.cnv.toSave.w, that.cnv.toSave.h, 0, 0, that.cnv.toSave.w, that.cnv.toSave.h);
	        } catch (e) {
	            if (e.name == "NS_ERROR_NOT_AVAILABLE") {
	                setTimeout(drawImageOnCanvas, 0);
	            } else {
	                throw e;
	            }
	        }
	    }
	
	    drawImageOnCanvas();
	    this.strDataURI = c.toDataURL("image/jpeg", 0.95);
	
	    img = new Image();
	    img.src = this.strDataURI;
	
	    this.setPreviewImage(img);
	    this.file.blob = this.dataURItoBlob(this.strDataURI);
	};
	
	/**
	 * Attaches data to formData
	 */
	Crop.prototype.attachData = function () {
	    var that = this;
	    if (this.form) {
	        if (this.options.sendFormat == "cropped") {
	            this.form.events.on("onBeforeSend", function (options) {
	                options.data.append(that.options.name, that.file.blob, that.file.name);
	            });
	        } else {
	
	            this.form.events.on("onBeforeSend", function (options) {
	                options.data.append(that.options.name, that.file.file, that.file.name);
	                options.data.append(that.options.name + "-cropData[cropWidth]", that.cnv.toSave.w);
	                options.data.append(that.options.name + "-cropData[cropHeight]", that.cnv.toSave.h);
	                options.data.append(that.options.name + "-cropData[cropX]", that.cnv.toSave.x);
	                options.data.append(that.options.name + "-cropData[cropY]", that.cnv.toSave.y);
	            });
	        }
	    }
	};
	
	Crop.prototype.die = function () {
	    this.removeEventListeners();
	    this.removeModalEventListeners();
	    delete this;
	};
	
	exports.default = Crop;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(6);
	module.exports = function create(P, D) {
	  return $.create(P, D);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	var $Object = Object;
	module.exports = {
	  create: $Object.create,
	  getProto: $Object.getPrototypeOf,
	  isEnum: {}.propertyIsEnumerable,
	  getDesc: $Object.getOwnPropertyDescriptor,
	  setDesc: $Object.defineProperty,
	  setDescs: $Object.defineProperties,
	  getKeys: $Object.keys,
	  getNames: $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each: [].forEach
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=\"sf-crop-modal modal crop\">\r\n    <div class=\"modal-header\">\r\n        <button class=\"close sf-crop-close\">×</button>\r\n        <div class=\"cropper-info\">\r\n            <div class=\"sf-crop-ratio\"></div>\r\n            <div class=\"sf-crop-orig-size\"></div>\r\n            <div class=\"sf-crop-cropped-size\"></div>\r\n        </div>\r\n    </div>\r\n        <div class=\"modal-body\">\r\n            <div class=\"crop-info\">\r\n                <span class=\"crop-ratio\"></span>\r\n            </div>\r\n            <div class=\"crop-container\">\r\n                <div class=\"sf-crop-image-original\"></div>\r\n                <div class=\"sf-crop-wrapper crop-wrapper\">\r\n                    <div class=\"dimmers-container\">\r\n                        <div class=\"dimmers\">\r\n                            <div class=\"dimmer dimmer-N\"></div>\r\n                            <div class=\"dimmer dimmer-E\"></div>\r\n                            <div class=\"dimmer dimmer-S\"></div>\r\n                            <div class=\"dimmer dimmer-W\"></div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"sf-crop-elements crop-elements\">\r\n                        <div class=\"handler handler-N\"></div>\r\n                        <div class=\"handler handler-NE\"></div>\r\n                        <div class=\"handler handler-E\"></div>\r\n                        <div class=\"handler handler-SE\"></div>\r\n                        <div class=\"handler handler-S\"></div>\r\n                        <div class=\"handler handler-SW\"></div>\r\n                        <div class=\"handler handler-W\"></div>\r\n                        <div class=\"handler handler-NW\"></div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n            <br>\r\n            <button type=\"button\" class=\"sf-crop-save btn-save\">Save changes</button>\r\n        </div>\r\n</div>\r\n";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?minimize!./../node_modules/less-loader/index.js!./crop.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?minimize!./../node_modules/less-loader/index.js!./crop.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports
	
	
	// module
	exports.push([module.id, ".modal.crop{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);padding:20px;background-color:#fff;box-shadow:0 0 3px #000;overflow:auto;width:auto;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.modal.crop .btn-save{display:block;margin:0 auto;padding:7px 22px;border-width:0;border-radius:2px;box-shadow:0 1px 2px rgba(0,0,0,.6);background-color:#468ebe;color:#ecf0f1;transition:background-color .3s}.modal.crop .btn-save:focus,.modal.crop .btn-save:hover{background-color:#2778ae}.modal.crop .crop-container{position:relative}.modal.crop .crop-container canvas{display:block}.modal.crop .image-original{font-size:50px}.modal.crop .crop-wrapper{position:absolute;top:0;bottom:0;left:0;right:0}.modal.crop .crop-wrapper .thumb{max-width:100%;max-height:100%}.modal.crop .crop-wrapper .thumb>img{max-width:100%;max-height:100%;position:relative;visibility:hidden;z-index:-1;width:100%;min-width:100%;margin-bottom:-4px}.modal.crop .crop-wrapper .transparent-image{max-width:100%;max-height:100%}.modal.crop .crop-wrapper .crop-elements{position:absolute;border:1px dashed #000;top:0;width:100%;height:100%;max-width:100%;max-height:100%;cursor:move}.modal.crop .crop-wrapper .dimmers-container{position:absolute;overflow:hidden;top:0;bottom:0;left:0;right:0}.modal.crop .crop-wrapper .dimmers{position:absolute}.modal.crop .crop-wrapper .dimmer{position:absolute;width:1000px;height:1000px;background-color:#000;opacity:.3}.modal.crop .crop-wrapper .dimmer.dimmer-N{bottom:100%;left:0}.modal.crop .crop-wrapper .dimmer.dimmer-E{left:100%;top:0}.modal.crop .crop-wrapper .dimmer.dimmer-S{top:100%;right:0}.modal.crop .crop-wrapper .dimmer.dimmer-W{bottom:0;right:100%}.modal.crop .crop-wrapper .handler{position:absolute;border:1px solid #333;width:10px;height:10px;background:#fff;opacity:.5}.modal.crop .crop-wrapper .handler.handler-N{top:0;left:50%;margin-top:-6px;margin-left:-6px;cursor:n-resize}.modal.crop .crop-wrapper .handler.handler-NE{top:0;right:0;margin-top:-6px;margin-right:-6px;cursor:ne-resize}.modal.crop .crop-wrapper .handler.handler-E{top:50%;right:0;margin-top:-6px;margin-right:-6px;cursor:e-resize}.modal.crop .crop-wrapper .handler.handler-SE{bottom:0;right:0;margin-bottom:-6px;margin-right:-6px;cursor:se-resize}.modal.crop .crop-wrapper .handler.handler-S{bottom:0;left:50%;margin-bottom:-6px;margin-left:-6px;cursor:s-resize}.modal.crop .crop-wrapper .handler.handler-SW{bottom:0;left:0;margin-bottom:-6px;margin-left:-6px;cursor:sw-resize}.modal.crop .crop-wrapper .handler.handler-W{top:50%;left:0;margin-top:-6px;margin-left:-6px;cursor:w-resize}.modal.crop .crop-wrapper .handler.handler-NW{top:0;left:0;margin-top:-6px;margin-left:-6px;cursor:nw-resize}.modal.crop .crop-save{width:100%}.modal.crop .change-orientation{position:relative;top:-15px}.modal.crop .modal-header{margin-bottom:20px}.modal.crop .modal-header .cropper-info{font-size:12px}.modal.crop .modal-header .close{position:absolute;background:transparent;padding:0;top:10px;right:15px;font-size:24px;border:none;opacity:.2;cursor:pointer}.modal.crop .modal-header .close:hover{opacity:1}", ""]);
	
	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;
//# sourceMappingURL=sf.crop.js.map