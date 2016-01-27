"use strict";

import sf from 'sf';//resolved in webpack's "externals"

var externals = {
    template: require("html!./template.html")
};
var Crop = function (sf, node, options) {
    this._construct(sf, node, options);
};

/**
 * @lends sf.Form.prototype
 */
Crop.prototype = Object.create(sf.modules.core.BaseDOMConstructor.prototype);

/**
 * Name to register
 * @type {string}
 */
Crop.prototype.name = "crop";

Crop.prototype._construct = function (sf, node, options) {

    this.init(sf, node, options);//call parent

    this.options.template = this.options.template || externals.template;

    var that = this,
        noop = function () {
        },
        parser = new DOMParser();

    if (options) {//if we pass options extend all options by passed options
        this.options = sf.tools.extend(this.options, options);
    }

    if (typeof this.options.info == "string")
        this.options.info = this.options.info.split(",");

    if (this.options.ratio)
        this.options.ratio = parseFloat(this.options.ratio);//just to be sure about number format, not string
    if (typeof this.options.onFileProcessed != "function")
        this.options.onFileProcessed = noop;

    //elements
    this.els = {
        node: node,
        input: node.tagName === "INPUT" ? node : node.getElementsByClassName("sf-crop-input")[0],
        modal: parser.parseFromString(this.options.template, "text/html").firstChild.lastChild.getElementsByClassName('sf-crop-modal')[0],
        backdrop: parser.parseFromString(this.options.template, "text/html").firstChild.lastChild.getElementsByClassName('sf-crop-backdrop')[0]
    };
    if (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) this.els.modal.classList.add('touch-device');

    if (this.options.fileNameSelector) {
        this.options.fileNameSelector.charAt(0) === " "
            ? this.els.filenameContainer = document.querySelector(this.options.fileNameSelector)
            : this.els.filenameContainer = (node.tagName === "INPUT" ? node.parentNode : node).querySelector(this.options.fileNameSelector);
    }

    if (this.options.preview) {this.els.preview = document.querySelector(this.options.preview);} else {
        console.warn('Cropper: no preview provided');
    }
    if (this.options.adjust) {
        this.els.adjust = this.options.adjust.charAt(0) === " "
            ? document.querySelector(this.options.adjust)
            : (node.tagName === "INPUT" ? node.parentNode : node).querySelector(this.options.adjust);
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
    if (navigator.appVersion.indexOf("MSIE 10") != -1)
        this.els.cropElements.style.backgroundColor = "rgba(255,255,255,0.01";
};


/**
 * @override
 * @inheritDoc
 * @enum {string}
 */
Crop.prototype.optionsToGrab  = {
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
        cursor: {x: 0, y: 0},
        crop: {x: 0, y: 0, x2: 0, y2: 0, w: 0, h: 0},
        toSave: {x: 0, y: 0, w: 0, h: 0},
        image: {w: 0, h: 0},
        old: {
            cursor: {x: 0, y: 0}
        },
        start: {
            crop: {x: 0, y: 0, w: 0, h: 0}
        },
        canvas: {w: 0, h: 0}, //calculates on file handling
        orig: {},
        preview: {w: 0, h: 0},
        scale: 1
    };
    this.setTop(0);
    this.setLeft(0);
    this.setWidth(0);
    this.setHeight(0);

    if (this.els.imageOriginal.lastChild)
        this.els.imageOriginal.removeChild(this.els.imageOriginal.lastChild);
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
            this.els.cropInfo.croppedSize.innerHTML = "Cropped size: " + value[0]+'x'+value[1];
            break;
        case "origSize":
            this.els.cropInfo.origSize.innerHTML = "Original size: " + value[0]+'x'+value[1];
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
            if (info == "ratio")
                that.changeInfo("ratio", Math.round(that.cnv.crop.w / that.cnv.crop.h * 100) / 100);
            if (info == "croppedSize")
                that.changeInfo("croppedSize", [Math.round(that.cnv.crop.w * that.cnv.scale), Math.round(that.cnv.crop.h * that.cnv.scale)]);
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
    setTimeout(function(){
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

    setTimeout(function(){
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

    this._inputChange = function(e){
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
            if (that.readyToPrepare)
                that.prepare();
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

    this._cropSave = function(){
        that.save();
        that.hidePopup();
    };

    this._hidePopup = function(){ //this fn to save correct "this" and to be able to remove listener later
        that.hidePopup();
    };

    this._cropWrapperMouseDown = function(e){
        that.onCropStart(e);
        that.inCropping = true;
    };

    this._documentMouseMove = function(e){
        if (that.inCropping) {
            e.preventDefault(); //prevent selecting background elements
            that.onCrop(e);
        }
    };

    this._cropWrapperMouseUp = function(){
        that.onCropEnd();
        that.inCropping = false;
    };

    this._documentMouseUp = function(){
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
    this.reader.onload = (function (theFile) {
        return function (e) {
            that.file = {
                file: theFile,
                blob: theFile,
                name: encodeURIComponent(theFile.name ? theFile.name : that.options.ajaximage.replace(/^.*[\\\/]/, '')),
                base64: e.target.result
            };
            if (that.els.filenameContainer) that.els.filenameContainer.innerText = that.file.name;
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
                if (that.cnv.orig.h < (window.innerHeight * screenFillIndex) && that.cnv.orig.w < (window.innerWidth * screenFillIndex)) {
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

                if (that.els.imageOriginal.lastChild)
                    that.els.imageOriginal.removeChild(that.els.imageOriginal.lastChild);
                that.readyToPrepare = true;
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

    function drawImageOnCanvas() {//fix to NS_ERROR_NOT_AVAILABLE in firefox with ctx.drawImage
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
    if (e.type === "touchstart")  e = e.touches[0];
    this.els.handlers.current = e.target;
    this.cnv.offset = this.els.cropWrapper.getBoundingClientRect();
    this.cnv.cursor.x = Math.round(e.clientX - this.cnv.offset.left);
    this.cnv.cursor.y = Math.round(e.clientY - this.cnv.offset.top);
    this.cnv.cursor.offsetX = e.offsetX === undefined ? (e.layerX ? Math.round(e.layerX) : e.pageX - e.target.getBoundingClientRect().left) : Math.round(e.offsetX);
    this.cnv.cursor.offsetY = e.offsetY === undefined ? (e.layerY ? Math.round(e.layerY) : e.pageY - e.target.getBoundingClientRect().top) : Math.round(e.offsetY);
};

/**
 * Processes cropping (mouse move)
 * @param  {Event} e
 */
Crop.prototype.onCrop = function (e) {
    if (!this.els.handlers.current) return;
    if (e.type === "touchmove")  e = e.touches[0];
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
            (this.cnv.cursor.y >= this.cnv.crop.y) ? this.setE(true) : this.setN();
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
            (this.cnv.cursor.y <= this.cnv.crop.y + this.cnv.crop.h) ? this.setE() : this.setS();
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
            (this.cnv.cursor.y <= this.cnv.crop.y + this.cnv.crop.h) ? this.setW() : this.setS(true);
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
            (this.cnv.cursor.y >= this.cnv.crop.y) ? this.setW(true) : this.setN(true);
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
        byteString = atob(dataURI.split(',')[1])
    } else {
        byteString = decodeURI(dataURI.split(',')[1])
    }

    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    for (var i = 0; i < byteString.length; i++) {
        content[i] = byteString.charCodeAt(i)
    }

    return new Blob([new Uint8Array(content)], {type: mimeString});
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
    this.cnv.toSave = {//CoordinateS
        w: Math.round(this.cnv.crop.w * this.cnv.scale),
        h: Math.round(this.cnv.crop.h * this.cnv.scale),
        x: Math.round(this.cnv.crop.x * this.cnv.scale),
        y: Math.round(this.cnv.crop.y * this.cnv.scale)
    };

    c.width = this.cnv.toSave.w;
    c.height = this.cnv.toSave.h;

    function drawImageOnCanvas() {//TODO refactor this piece. Almost the same as in prepare().
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

export { Crop as default };