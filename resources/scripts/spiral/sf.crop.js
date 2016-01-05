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
	
	_sf2.default.instancesController.registerInstanceType(_crop2.default, "js-sf-crop"); //resolved in webpack's "externals"
	
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
	
	    var that = this,
	        noop = function noop() {};
	
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
	        preview: document.getElementById(this.options.previewID),
	        input: node.getElementsByClassName("js-sf-crop-input")[0],
	        modal: node.getElementsByClassName("modal")[0],
	        previewInternal: node.getElementsByClassName("js-sf-crop-preview-internal")[0],
	        adjust: node.getElementsByClassName("js-sf-crop-preview-adjust")[0],
	        cropWrapper: node.getElementsByClassName("crop-wrapper")[0],
	        imageOriginal: node.getElementsByClassName("image-original")[0],
	        cropElements: node.getElementsByClassName("crop-elements")[0],
	        cropSave: node.getElementsByClassName("crop-save")[0]
	    };
	
	    this.els.cropInfo = {
	        ratio: node.getElementsByClassName("crop-ratio")[0]
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
	
	    this.els.form = this.els.input.querySelector("input").form;
	    this.form = sf.instancesController.getInstance("form", this.els.form);
	
	    this.reset();
	    this.addEventListeners();
	
	    if (this.options.ajaximage) {
	        this.els.input.remove();
	        var xhr = new XMLHttpRequest();
	        xhr.onreadystatechange = function () {
	            if (this.readyState == 4 && this.status == 200) {
	                var img = new Image();
	                var url = window.URL || window.webkitURL;
	                img.src = url.createObjectURL(this.response);
	                that.handleFileSelect(this.response);
	                that.els.adjust.style.display = 'inline-block';
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
	Crop.prototype.attributesToGrab = {
	    /**
	     *  How to send: cropped or full size with coordinates to crop on server <b>Default: "cropped"</b> <i>Optional: "full"</i>
	     */
	    "data-sendFormat": {
	        "value": "cropped",
	        "key": "sendFormat"
	    },
	    /**
	     *  Preloading of image  <b>Default: "false"</b> <i>Optional: url of image to preload</i>
	     */
	    "data-ajaximage": {
	        "value": false,
	        "key": "ajaximage"
	    },
	    /**
	     *  Request address for submitting (if there is no form) <b>Default: "false"</b> <i>Optional: request URL</i>
	     */
	    "data-ajaxAddress": {
	        "value": false,
	        "key": "ajaxAddress"
	    },
	    /**
	     *  Locked aspect ratio <b>Default: false</b>
	     */
	    "data-aspectRatio": {
	        "value": false,
	        "key": "aspectRatio"
	    },
	    /**
	     *  What info to show <b>Default: []</b></br>
	     *  <b>Example: </b>data-showInfo="ratio,origSize,croppedSIze"</br>
	     *  <b>Note: </b>done only ratio
	     */
	    "data-showInfo": {
	        "value": [],
	        "key": "showInfo"
	    },
	    /**
	     *  ID of preview element <b>Default: ""</b>
	     */
	    "data-previewID": {
	        "value": "",
	        "key": "previewID"
	    },
	    /**
	     *  Name for formData <b>Default: "cropped"</b>
	     */
	    "data-name": {
	        "value": "cropped",
	        "key": "name"
	    }
	};
	Crop.prototype.reset = function () {
	    //Coordinates aNd Variables
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
	        default:
	            break;
	    }
	};
	/**
	 * Shows modal with cropper
	 */
	Crop.prototype.showPopup = function () {
	    if ($) $(this.els.modal).modal('show');
	};
	/**
	 * Hides modal with cropper
	 */
	Crop.prototype.hidePopup = function () {
	    if ($) $(this.els.modal).modal('hide');
	};
	
	/**
	 * Adds events listeners.
	 */
	Crop.prototype.addEventListeners = function () {
	    var that = this;
	
	    this.els.input.addEventListener('change', function (e) {
	        //IE9 doesn't support File API
	        var file = e.target.files[0];
	        if (!file.type.match(/image/)) {
	            alert("Please select an image.");
	            return;
	        }
	        that.handleFileSelect(file);
	        that.els.adjust.style.display = 'inline-block';
	    }, false);
	
	    if (this.els.preview) {
	        this.els.preview.addEventListener('click', function () {
	            if (that.readyToPrepare) that.prepare();
	            that.showPopup();
	        }, false);
	    } else {
	        this.els.adjust.addEventListener('mouseenter', function () {
	            that.els.previewInternal.parentNode.style.display = 'block';
	        }, false);
	
	        this.els.adjust.addEventListener('mouseleave', function () {
	            that.els.previewInternal.parentNode.style.display = 'none';
	        }, false);
	    }
	
	    this.els.adjust.addEventListener('click', function () {
	        if (that.readyToPrepare) that.prepare();
	        that.showPopup();
	    }, false);
	
	    //this.els.cropSave.addEventListener("click", function () {
	    //    that.save();
	    //    that.hidePopup();
	    //});
	
	    this.els.cropWrapper.addEventListener("mousedown", function (e) {
	        that.onCropStart(e);
	        that.inCropping = true;
	    });
	    document.addEventListener("mousemove", function (e) {
	        if (that.inCropping) {
	            e.preventDefault(); //prevent selecting background elements
	            that.onCrop(e);
	        }
	    });
	    this.els.cropWrapper.addEventListener("mouseup", function () {
	        that.onCropEnd();
	        that.inCropping = false;
	    });
	    document.addEventListener("mouseup", function () {
	        that.onCropEnd();
	        that.inCropping = false;
	    });
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
	    if (that.els.previewInternal) {
	        if (that.els.previewInternal.lastChild) that.els.previewInternal.removeChild(that.els.previewInternal.lastChild);
	        that.els.previewInternal.appendChild(img);
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
	    this.reader.onload = (function (theFile) {
	        return function (e) {
	            that.file = {
	                file: theFile,
	                blob: theFile,
	                name: encodeURIComponent(theFile.name),
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
	                that.cnv.scale = that.cnv.orig.w / that.cnv.canvas.w;
	                that.cnv.toSave.w = that.cnv.orig.w;
	                that.cnv.toSave.h = that.cnv.orig.h;
	                that.attachData();
	
	                if (that.els.imageOriginal.lastChild) that.els.imageOriginal.removeChild(that.els.imageOriginal.lastChild);
	                that.readyToPrepare = true;
	                //if (that.options.aspectRatio) {
	                //that.prepare();
	                //that.showPopup();
	                //}
	                that.options.onFileProcessed();
	            };
	        };
	    })(file);
	
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
	
	            if (that.options.showInfo.length > 0) {
	                that.options.showInfo.forEach(function (info) {
	                    if (info == "ratio") {
	                        that.changeInfo("ratio", that.options.aspectRatio);
	                    }
	                });
	            }
	
	            that.save();
	        }
	
	        //        that.setDimmers();
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
	            this.form.events.registerAction("beforeSubmit", function (options) {
	                options.data.append(that.options.name, that.file.blob, that.file.name);
	            });
	        } else {
	            this.form.events.registerAction("beforeSubmit", function (options) {
	                options.data.append(that.options.name, that.file.file);
	                options.data.append("cropWidth", that.cnv.toSave.w);
	                options.data.append("cropHeight", that.cnv.toSave.h);
	                options.data.append("cropX", that.cnv.toSave.x);
	                options.data.append("cropY", that.cnv.toSave.y);
	            });
	        }
	    }
	};
	
	Crop.prototype.die = function () {
	    console.error("TODO DIE"); //TODO DIE
	};
	
	exports.default = Crop;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 6 */
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=sf.crop.js.map