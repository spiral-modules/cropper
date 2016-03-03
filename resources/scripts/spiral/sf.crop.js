/*!
 * Spiral Image Cropper Widget v0.1.0
 * https://github.com/spiral-modules/image-cropper/
 * Copyright (c) 2016, Alex Chepura, Yauheni Yasinau, spiralscout.com
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
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	"use strict";
	
	var _sf = __webpack_require__(1);
	
	var _sf2 = _interopRequireDefault(_sf);
	
	var _crop = __webpack_require__(2);
	
	var _crop2 = _interopRequireDefault(_crop);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(21); //resolved in webpack's "externals"
	
	_sf2.default.instancesController.registerInstanceType(_crop2.default, "js-sf-cropper");
	module.exports = _crop2.default; // ES6 default export will not expose us as global

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _assign = __webpack_require__(3);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _create = __webpack_require__(18);
	
	var _create2 = _interopRequireDefault(_create);
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _sf = __webpack_require__(1);
	
	var _sf2 = _interopRequireDefault(_sf);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//resolved in webpack's "externals"
	
	var externals = {
	    template: __webpack_require__(20)
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
	        this.options = (0, _assign2.default)(this.options, options);
	    }
	
	    if (typeof this.options.info == "string") this.options.info = this.options.info.split(",");
	
	    if (this.options.ratio) this.options.ratio = parseFloat(this.options.ratio); //just to be sure about number format, not string
	    if (typeof this.options.onFileProcessed != "function") this.options.onFileProcessed = noop;
	
	    //elements
	    this.els = {
	        node: node,
	        input: node.tagName === "INPUT" ? node : node.getElementsByClassName("sf-crop-input")[0],
	        modal: parser.parseFromString(this.options.template, "text/html").firstChild.lastChild.getElementsByClassName('sf-crop-modal')[0],
	        backdrop: parser.parseFromString(this.options.template, "text/html").firstChild.lastChild.getElementsByClassName('sf-crop-backdrop')[0]
	    };
	    if ('ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) this.els.modal.classList.add('touch-device');
	
	    if (this.options.fileNameSelector) {
	        this.options.fileNameSelector.charAt(0) === " " ? this.els.filenameContainer = document.querySelector(this.options.fileNameSelector) : this.els.filenameContainer = (node.tagName === "INPUT" ? node.parentNode : node).querySelector(this.options.fileNameSelector);
	    }
	
	    if (this.options.preview) {
	        this.els.preview = document.querySelector(this.options.preview);
	    } else {
	        console.warn('Cropper: no preview provided');
	    }
	    if (this.options.adjust) {
	        this.els.adjust = this.options.adjust.charAt(0) === " " ? document.querySelector(this.options.adjust) : (node.tagName === "INPUT" ? node.parentNode : node).querySelector(this.options.adjust);
	    }
	
	    if (!this.options.ajaximage && !this.els.input) {
	        console.warn('Provide file-input to use cropper or load image with ajax (with data-ajaximage attr)');
	    }
	    this.els.cropWrapper = this.els.modal.getElementsByClassName("sf-crop-wrapper")[0];
	    this.els.imageOriginal = this.els.modal.getElementsByClassName("sf-crop-image-original")[0];
	    this.els.cropElements = this.els.modal.getElementsByClassName("sf-crop-elements")[0];
	    this.els.cropSave = this.els.modal.getElementsByClassName("sf-crop-save")[0];
	    if (this.els.cropSave) {
	        this.els.cropSave.innerHTML = this.options.saveBtnText;
	        this.options.customBtnClass ? this.els.cropSave.classList.add(this.options.customBtnClass) : '';
	    }
	    this.els.closePopup = this.els.modal.getElementsByClassName("sf-crop-close")[0];
	    if (this.els.closePopup) {
	        this.els.closePopup.innerHTML = this.options.closeBtnText;
	        this.options.customBtnClass ? this.els.closePopup.classList.add(this.options.customBtnClass) : '';
	    }
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
	    format: {
	        value: "cropped",
	        domAttr: "data-format"
	    },
	    /**
	     *  Preloading of image  <b>Default: "false"</b> <i>Optional: url of image to preload</i>
	     */
	    ajaximage: {
	        value: false,
	        domAttr: "data-ajax-image"
	    },
	    /**
	     *  Pass custom html template
	     */
	    template: {
	        domAttr: "data-template"
	    },
	    /**
	     *  Request address for submitting (if there is no form) <b>Default: "false"</b> <i>Optional: request URL</i>
	     */
	    ajaxAddress: {
	        value: false,
	        domAttr: "data-ajax-address"
	    },
	    /**
	     *  Locked aspect ratio <b>Default: false</b>
	     */
	    ratio: {
	        value: false,
	        domAttr: "data-ratio"
	    },
	    /**
	     *  Node selector to place filename. If starts with space - global search of node (document) otherwise inside the node (if the node is input, then from parent node)
	     */
	    fileNameSelector: {
	        domAttr: "data-filename-selector"
	    },
	    /**
	     *  What info to show <b>Default: []</b></br>
	     *  <b>Example: </b>data-info="ratio,origSize,croppedSize"</br>
	     */
	    info: {
	        value: [],
	        domAttr: "data-info"
	    },
	    /**
	     *  Selector of preview element <b>Default: ""</b>
	     */
	    preview: {
	        value: "",
	        domAttr: "data-preview"
	    },
	    /**
	     *  Save button text <b>Default: "Save"</b>
	     */
	    saveBtnText: {
	        value: "Save",
	        domAttr: "data-save-btn-text"
	    },
	    /**
	     *  Save button text <b>Default: "Close"</b>
	     */
	    closeBtnText: {
	        value: "Close",
	        domAttr: "data-close-btn-text"
	    },
	    /**
	     *  Pass custom class to btns <b>Default: ""</b>
	     */
	    customBtnClass: {
	        domAttr: "data-custom-btn-class"
	    },
	    /**
	     *  Selector of element which triggers crop-modal <b>Default: ""</b>  If starts with space - global search of node (document) otherwise inside the node (if the node is input, then from parent node)
	     */
	    adjust: {
	        value: "",
	        domAttr: "data-adjust"
	    },
	    /**
	     *  Name for formData <b>Default: "cropped"</b>
	     */
	    name: {
	        value: "cropped",
	        domAttr: "data-name"
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
	        canvas: { w: 0, h: 0 }, //calculates on file handling
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
	    if (this.options.info.length > 0) {
	        this.options.info.forEach(function (info) {
	            if (info == "ratio") that.changeInfo("ratio", Math.round(that.cnv.crop.w / that.cnv.crop.h * 100) / 100);
	            if (info == "croppedSize") that.changeInfo("croppedSize", [Math.round(that.cnv.crop.w * that.cnv.scale), Math.round(that.cnv.crop.h * that.cnv.scale)]);
	        });
	    }
	};
	/**
	 * Shows modal with cropper
	 */
	Crop.prototype.showPopup = function () {
	    var that = this;
	    document.body.appendChild(this.els.modal);
	    document.body.appendChild(this.els.backdrop);
	    setTimeout(function () {
	        that.els.modal.classList.add('visible');
	        that.els.backdrop.classList.add('visible');
	    }, 0);
	    this.addModalEventListeners();
	    this.removeEventListeners();
	};
	/**
	 * Hides modal with cropper
	 */
	Crop.prototype.hidePopup = function () {
	    var that = this;
	    this.els.modal.classList.remove('visible');
	    this.els.backdrop.classList.remove('visible');
	
	    setTimeout(function () {
	        that.els.modal.parentNode.removeChild(that.els.modal);
	        that.els.backdrop.parentNode.removeChild(that.els.backdrop);
	    }, 300);
	
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
	    this.els.backdrop.addEventListener("click", this._hidePopup);
	    this.els.cropSave.addEventListener("click", this._cropSave);
	    this.els.cropWrapper.addEventListener("mousedown", this._cropWrapperMouseDown);
	    this.els.cropWrapper.addEventListener("touchstart", this._cropWrapperMouseDown);
	    this.els.cropWrapper.addEventListener("mouseup", this._cropWrapperMouseUp);
	    this.els.cropWrapper.addEventListener("touchend", this._cropWrapperMouseUp);
	    document.addEventListener("mousemove", this._documentMouseMove);
	    document.addEventListener("touchmove", this._documentMouseMove);
	    document.addEventListener("mouseup", this._documentMouseUp);
	    document.addEventListener("touchend", this._documentMouseUp);
	};
	
	Crop.prototype.removeModalEventListeners = function () {
	    this.els.closePopup.removeEventListener("click", this._hidePopup);
	    this.els.backdrop.removeEventListener("click", this._hidePopup);
	    this.els.cropSave.removeEventListener("click", this._cropSave);
	    this.els.cropWrapper.removeEventListener("mousedown", this._cropWrapperMouseDown);
	    this.els.cropWrapper.removeEventListener("touchstart", this._cropWrapperMouseDown);
	    this.els.cropWrapper.removeEventListener("mouseup", this._cropWrapperMouseUp);
	    this.els.cropWrapper.removeEventListener("touchend", this._cropWrapperMouseUp);
	    document.removeEventListener("mousemove", this._documentMouseMove);
	    document.removeEventListener("touchmove", this._documentMouseMove);
	    document.removeEventListener("mouseup", this._documentMouseUp);
	    document.removeEventListener("touchend", this._documentMouseUp);
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
	            if (that.els.filenameContainer) that.els.filenameContainer.innerHTML = that.file.name;
	            that.img = new Image();
	            that.img.src = that.file.base64;
	            that.img.onload = function () {
	                that.setPreviewImage(that.img);
	                that.cnv.preview.h = that.img.clientHeight;
	                that.cnv.preview.w = that.img.clientWidth;
	                that.cnv.orig.h = that.img.naturalHeight;
	                that.cnv.orig.w = that.img.naturalWidth;
	                that.cnv.orig.ratio = that.cnv.orig.w / that.cnv.orig.h;
	
	                var screenFillIndex = 0.7; //max coefficient of viewport to be filled with image
	                if (that.cnv.orig.h < window.innerHeight * screenFillIndex && that.cnv.orig.w < window.innerWidth * screenFillIndex) {
	                    that.cnv.canvas.w = that.cnv.orig.w; //if image is less than viewport * coeff.
	                } else {
	                        //calculate width of canvas to suit the screen best way
	                        if (that.cnv.orig.ratio > window.innerWidth / window.innerHeight) {
	                            that.cnv.canvas.w = window.innerWidth * screenFillIndex;
	                        } else {
	                            that.cnv.canvas.w = Math.floor(that.cnv.orig.w * window.innerHeight / that.cnv.orig.h) * screenFillIndex;
	                        }
	                    }
	
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
	
	        if (that.options.ratio) {
	            if (that.cnv.orig.ratio > that.options.ratio) {
	                var w = that.cnv.crop.w;
	                that.setWidth(Math.round(that.cnv.start.crop.h * that.options.ratio));
	                that.cnv.start.crop.w = that.cnv.crop.w;
	                that.setLeft(Math.round((w - that.cnv.crop.w) / 2));
	                that.cnv.crop.x2 = that.cnv.crop.x + that.cnv.crop.w;
	            } else {
	                var h = that.cnv.crop.h;
	                that.setHeight(Math.round(that.cnv.start.crop.w / that.options.ratio));
	                that.cnv.start.crop.h = that.cnv.crop.h;
	                that.setTop(Math.round((h - that.cnv.crop.h) / 2));
	                that.cnv.crop.y2 = that.cnv.crop.y + that.cnv.crop.h;
	            }
	
	            that.save();
	        }
	        that.updateInfo();
	        if (that.options.info.indexOf("origSize") > -1) {
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
	    if (e.type === "touchstart") e = e.touches[0];
	    this.els.handlers.current = e.target;
	    this.cnv.offset = this.els.cropWrapper.getBoundingClientRect();
	    this.cnv.cursor.x = Math.round(e.clientX - this.cnv.offset.left);
	    this.cnv.cursor.y = Math.round(e.clientY - this.cnv.offset.top);
	    this.cnv.cursor.offsetX = e.offsetX === undefined ? e.layerX ? Math.round(e.layerX) : e.pageX - e.target.getBoundingClientRect().left : Math.round(e.offsetX);
	    this.cnv.cursor.offsetY = e.offsetY === undefined ? e.layerY ? Math.round(e.layerY) : e.pageY - e.target.getBoundingClientRect().top : Math.round(e.offsetY);
	};
	
	/**
	 * Processes cropping (mouse move)
	 * @param  {Event} e
	 */
	Crop.prototype.onCrop = function (e) {
	    if (!this.els.handlers.current) return;
	    if (e.type === "touchmove") e = e.touches[0];
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
	        if ((this.cnv.crop.y2 - y) * this.options.ratio <= this.cnv.crop.x2) {
	            this.setTop(y);
	            this.setHeight(this.cnv.crop.y2 - y);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.ratio));
	            this.setLeft(this.cnv.crop.x2 - this.cnv.crop.w);
	        } else {
	            this.setLeft(0);
	            this.setWidth(this.cnv.crop.x2);
	            this.setTop(this.cnv.crop.y2 - Math.round(this.cnv.crop.w / this.options.ratio));
	        }
	    } else {
	        if ((this.cnv.crop.y2 - y) * this.options.ratio + this.cnv.crop.x <= this.cnv.image.w) {
	            this.setTop(y);
	            this.setHeight(this.cnv.crop.y2 - y);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.ratio));
	            this.cnv.crop.x2 = this.cnv.crop.x + this.cnv.crop.w;
	        } else {
	            this.setWidth(this.cnv.image.w - this.cnv.crop.x);
	            this.setTop(this.cnv.crop.y2 - Math.round(this.cnv.crop.w / this.options.ratio));
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
	    if (this.options.ratio) {
	        if (this.cnv.cursor.y > 0) {
	            if (this.cnv.cursor.y < this.cnv.crop.y2) {
	                this.adjustN(notDefaultSide, this.cnv.cursor.y);
	            } else {
	                this.setHeight(1);
	                this.setWidth(Math.round(this.cnv.crop.h * this.options.ratio));
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
	        if ((y2 - this.cnv.crop.y) * this.options.ratio <= this.cnv.crop.x2) {
	            this.setHeight(y2 - this.cnv.crop.y);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.ratio));
	            this.setLeft(this.cnv.crop.x2 - this.cnv.crop.w);
	            this.cnv.crop.y2 = y2;
	        } else {
	            this.setLeft(0);
	            this.setWidth(this.cnv.crop.x2);
	            this.setHeight(Math.round(this.cnv.crop.w / this.options.ratio));
	            this.cnv.crop.y2 = this.cnv.crop.y + this.cnv.crop.h;
	        }
	    } else {
	        if ((y2 - this.cnv.crop.y) * this.options.ratio + this.cnv.crop.x <= this.cnv.image.w) {
	            this.setHeight(y2 - this.cnv.crop.y);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.ratio));
	            this.cnv.crop.y2 = y2;
	            this.cnv.crop.x2 = this.cnv.crop.x + this.cnv.crop.w;
	        } else {
	            this.setWidth(this.cnv.image.w - this.cnv.crop.x);
	            this.setHeight(Math.round(this.cnv.crop.w / this.options.ratio));
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
	    if (this.options.ratio) {
	        if (this.cnv.cursor.y < this.cnv.image.h) {
	            if (this.cnv.cursor.y > this.cnv.crop.y) {
	                this.adjustS(notDefaultSide, this.cnv.cursor.y);
	            } else {
	                this.setHeight(1);
	                this.setWidth(Math.round(this.cnv.crop.h * this.options.ratio));
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
	        if (this.cnv.crop.y2 - (this.cnv.crop.x2 - x) / this.options.ratio >= 0) {
	            this.setLeft(x);
	            this.setWidth(this.cnv.crop.x2 - x);
	            this.setHeight(Math.round(this.cnv.crop.w / this.options.ratio));
	            this.setTop(this.cnv.crop.y2 - this.cnv.crop.h);
	        } else {
	            this.setTop(0);
	            this.setHeight(this.cnv.crop.y2);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.ratio));
	            this.setLeft(this.cnv.crop.x2 - this.cnv.crop.w);
	        }
	    } else {
	        if ((this.cnv.crop.x2 - x) / this.options.ratio + this.cnv.crop.y <= this.cnv.image.h) {
	            this.setLeft(x);
	            this.setWidth(this.cnv.crop.x2 - x);
	            this.setHeight(Math.round(this.cnv.crop.w / this.options.ratio));
	            this.cnv.crop.y2 = this.cnv.crop.y + this.cnv.crop.h;
	        } else {
	            this.setHeight(this.cnv.image.h - this.cnv.crop.y);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.ratio));
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
	    if (this.options.ratio) {
	        if (this.cnv.cursor.x > 0) {
	            if (this.cnv.cursor.x < this.cnv.crop.x2) {
	                this.adjustW(notDefaultSide, this.cnv.cursor.x);
	            } else {
	                this.setWidth(1);
	                this.setHeight(Math.round(this.cnv.crop.w / this.options.ratio));
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
	        if (this.cnv.crop.y2 - (x - this.cnv.crop.x) / this.options.ratio >= 0) {
	            this.setWidth(x - this.cnv.crop.x);
	            this.setHeight(Math.round(this.cnv.crop.w / this.options.ratio));
	            this.setTop(this.cnv.crop.y2 - this.cnv.crop.h);
	            this.cnv.crop.x2 = x;
	        } else {
	            this.setTop(0);
	            this.setHeight(this.cnv.crop.y2);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.ratio));
	            this.cnv.crop.x2 = this.cnv.crop.x + this.cnv.crop.w;
	        }
	    } else {
	        if ((x - this.cnv.crop.x) / this.options.ratio + this.cnv.crop.y <= this.cnv.image.h) {
	            this.setWidth(x - this.cnv.crop.x);
	            this.setHeight(Math.round(this.cnv.crop.w / this.options.ratio));
	            this.cnv.crop.x2 = x;
	            this.cnv.crop.y2 = this.cnv.crop.y + this.cnv.crop.h;
	        } else {
	            this.setHeight(this.cnv.image.h - this.cnv.crop.y);
	            this.setWidth(Math.round(this.cnv.crop.h * this.options.ratio));
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
	    if (this.options.ratio) {
	        if (this.cnv.cursor.x < this.cnv.image.w) {
	            if (this.cnv.cursor.x > this.cnv.crop.x) {
	                this.adjustE(notDefaultSide, this.cnv.cursor.x);
	            } else {
	                this.setWidth(1);
	                this.setHeight(Math.round(this.cnv.crop.w / this.options.ratio));
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
	    if (this.options.ratio) {
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
	    if (this.options.ratio) {
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
	    if (this.options.ratio) {
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
	    if (this.options.ratio) {
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
	    if (!this.form) return;
	
	    if (this.options.format == "cropped") {
	        this.form.events.on("beforeSend", function (options) {
	            if (!that.file) return;
	            options.data.append(that.options.name, that.file.blob, that.file.name);
	        });
	    } else {
	        this.form.events.on("beforeSend", function (options) {
	            if (!that.file) return;
	            options.data.append(that.options.name, that.file.file, that.file.name);
	            options.data.append(that.options.name + "-cropData[cropWidth]", that.cnv.toSave.w);
	            options.data.append(that.options.name + "-cropData[cropHeight]", that.cnv.toSave.h);
	            options.data.append(that.options.name + "-cropData[cropX]", that.cnv.toSave.x);
	            options.data.append(that.options.name + "-cropData[cropY]", that.cnv.toSave.y);
	        });
	    }
	};
	
	Crop.prototype.die = function () {
	    this.removeEventListeners();
	    this.removeModalEventListeners();
	    delete this;
	};
	
	exports.default = Crop;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	module.exports = __webpack_require__(8).Object.assign;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(6);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(11)});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , ctx       = __webpack_require__(9)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(10);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(12)
	  , toObject = __webpack_require__(13)
	  , IObject  = __webpack_require__(15);
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(17)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 12 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(14);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(16);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(19), __esModule: true };

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(12);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<div class=sf-crop-modal><div class=sf-crop-modal-body><div class=sf-crop-container><div class=sf-crop-image-original></div><div class=sf-crop-wrapper><div class=sf-crop-dimmers-container><div class=dimmers><div class=\"dimmer dimmer-n\"></div><div class=\"dimmer dimmer-e\"></div><div class=\"dimmer dimmer-s\"></div><div class=\"dimmer dimmer-w\"></div></div></div><div class=sf-crop-elements><div class=\"handler handler-n\"></div><div class=\"handler handler-ne\"></div><div class=\"handler handler-e\"></div><div class=\"handler handler-se\"></div><div class=\"handler handler-s\"></div><div class=\"handler handler-sw\"></div><div class=\"handler handler-w\"></div><div class=\"handler handler-nw\"></div></div></div></div></div><div class=sf-crop-modal-header><div class=sf-crop-cropper-info><div class=sf-crop-ratio></div><div class=sf-crop-orig-size></div><div class=sf-crop-cropped-size></div></div></div><div class=sf-crop-modal-footer><button class=\"sf-crop-close btn\"></button> <button type=button class=\"btn sf-crop-save\"></button></div></div><div class=sf-crop-backdrop></div>";

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(22);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(24)(content, {});
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(23)();
	// imports
	
	
	// module
	exports.push([module.id, ".sf-crop-modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);padding:20px;background-color:#fff;overflow:auto;z-index:1000;width:auto;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;opacity:0;transition:opacity .3s ease;box-shadow:0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)}.sf-crop-modal.touch-device .handler:before{content:'';width:30px;height:30px;display:block;left:50%;top:50%;position:relative;transform:translate(-50%,-50%)}.sf-crop-modal.visible{opacity:1;z-index:1001}.sf-crop-modal .sf-crop-modal-footer{padding-top:20px;text-align:right}.sf-crop-modal .btn{display:inline-block;margin:0 0 0 10px;border-width:0;border-radius:2px;box-shadow:0 0 1px rgba(0,0,0,.2);color:#4a4a4a;background:#fff;outline:none}.sf-crop-modal .btn:focus,.sf-crop-modal .btn:hover{background-color:#efefef}.sf-crop-modal .btn.sf-crop-save{box-shadow:0 0 1px rgba(0,0,0,.6)}.sf-crop-modal .btn.sf-crop-close{color:#8a8a8a}.sf-crop-modal .sf-crop-container{position:relative}.sf-crop-modal .sf-crop-container canvas{display:block}.sf-crop-modal .sf-crop-wrapper{position:absolute;top:0;bottom:0;left:0;right:0}.sf-crop-modal .sf-crop-wrapper .sf-crop-elements{position:absolute;border:1px dashed #000;top:0;width:100%;height:100%;max-width:100%;max-height:100%;cursor:move}.sf-crop-modal .sf-crop-wrapper .sf-crop-dimmers-container{position:absolute;overflow:hidden;top:0;bottom:0;left:0;right:0}.sf-crop-modal .sf-crop-wrapper .dimmers{position:absolute}.sf-crop-modal .sf-crop-wrapper .dimmer{position:absolute;width:1000px;height:1000px;background-color:#000;opacity:.3}.sf-crop-modal .sf-crop-wrapper .dimmer.dimmer-n{bottom:100%;left:0}.sf-crop-modal .sf-crop-wrapper .dimmer.dimmer-e{left:100%;top:0}.sf-crop-modal .sf-crop-wrapper .dimmer.dimmer-s{top:100%;right:0}.sf-crop-modal .sf-crop-wrapper .dimmer.dimmer-w{bottom:0;right:100%}.sf-crop-modal .sf-crop-wrapper .handler{position:absolute;border:1px solid #333;width:10px;height:10px;background:#fff;opacity:.5}.sf-crop-modal .sf-crop-wrapper .handler.handler-n{top:0;left:50%;margin-top:-6px;margin-left:-6px;cursor:n-resize}.sf-crop-modal .sf-crop-wrapper .handler.handler-ne{top:0;right:0;margin-top:-6px;margin-right:-6px;cursor:ne-resize}.sf-crop-modal .sf-crop-wrapper .handler.handler-e{top:50%;right:0;margin-top:-6px;margin-right:-6px;cursor:e-resize}.sf-crop-modal .sf-crop-wrapper .handler.handler-se{bottom:0;right:0;margin-bottom:-6px;margin-right:-6px;cursor:se-resize}.sf-crop-modal .sf-crop-wrapper .handler.handler-s{bottom:0;left:50%;margin-bottom:-6px;margin-left:-6px;cursor:s-resize}.sf-crop-modal .sf-crop-wrapper .handler.handler-sw{bottom:0;left:0;margin-bottom:-6px;margin-left:-6px;cursor:sw-resize}.sf-crop-modal .sf-crop-wrapper .handler.handler-w{top:50%;left:0;margin-top:-6px;margin-left:-6px;cursor:w-resize}.sf-crop-modal .sf-crop-wrapper .handler.handler-nw{top:0;left:0;margin-top:-6px;margin-left:-6px;cursor:nw-resize}.sf-crop-modal .sf-crop-modal-header .sf-crop-cropper-info{font-size:12px}.sf-crop-modal .sf-crop-modal-header .sf-crop-close{position:absolute;background:transparent;padding:0;top:10px;right:15px;font-size:24px;border:none;opacity:.2;cursor:pointer}.sf-crop-modal .sf-crop-modal-header .sf-crop-close:hover{opacity:1}.sf-crop-backdrop{top:0;left:0;position:fixed;background-color:#000;width:100vw;height:100vh;opacity:0;transition:opacity .3s ease}.sf-crop-backdrop.visible{opacity:.4;z-index:1000}", ""]);
	
	// exports


/***/ },
/* 23 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 24 */
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