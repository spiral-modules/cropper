# Image Cropper Widget
Module provides ability to crop user image on client side and send to backend as file stream over ajax call.

## Usage Example

At frontend (dark template required), simply add virtual tag to your form:

```html
<dark:use bundle="spiral:cropper-bundle"/>
...
<form.cropper label="Image Cropper" name="image" data-preview="#cropper-preview"/>
```
The code above will be transformed into html and will add required javascript. Result html:

```html
<label class="item-form item-file">
    <span class="item-label">Image Cropper</span>
    <input type="file" class="item-input js-sf-cropper" data-filename-selector=".sf-crop-filename" data-name="image"
           context="" data-preview="#cropper-preview">
    <span class="sf-crop-filename btn">Choose a file...</span>
</label>
```

Backend:
```php
public function uploadAction()
{
    $image = $this->input->file('image');
    //...
}
```

Cropper preview:

![cropper-preview](https://cloud.githubusercontent.com/assets/12486924/12550729/ad25ddd8-c376-11e5-80c8-bfba0eba4251.jpg)


## Options
* **wrapper-class** - pass a class to wrapper
* **label** - file-input label
* **label-class** - pass a class to file-input label
* **placeholder** - text to pass to filename-container
* **placeholder-class** - pass a class to filename-container
* **data-format** - how to send data: cropped or full size with coordinates to crop on server *Default: "cropped" Optional: "full"*
* **data-ajax-image** - preloading of image through ajax request *Default: "false" Optional: url of image to preload*
* **data-template** - pass custom html template of cropper
* **data-ajax-address** - request address for submitting (if there is no form) *Default: "false" Optional: request URL*
* **data-ratio** - locked aspect ratio *Default: false*
* **data-filename-selector** - node selector to place filename. If starts with space - global search of node (document) otherwise inside the node (if the node is input, then from parent node)
* **data-info** - what info to show *Default: [] Example: </b> data-info="ratio,origSize,croppedSize"*
* **data-preview** - selector of preview element *Default: ""*
* **data-save-btn-text** - save button text *Default: "Save"*
* **data-close-btn-text** - save button text *Default: "Close"*
* **data-custom-btn-class** - pass custom class to btns *Default: ""*
* **data-adjust** - selector of element which triggers crop-modal *Default: ""*  If starts with space - global search of node (document) otherwise inside the node (if the node is input, then from parent node)

## Installation

`composer require spiral/cropper`  
`spiral register spiral/cropper`

## Update
`composer update spiral/cropper`  
`spiral publish spiral/cropper`

## Local Development

### Installation

    npm install -g gulp
    npm install

### Building

    gulp build
    

## License

Copyright (c) 2016 Alex Chepura, Yauheni Yasinau and contributors. Released under an [MIT license](https://github.com/spiral-modules/image-cropper/blob/master/LICENSE).
