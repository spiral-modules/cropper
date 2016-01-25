# Image Cropper Widget - POST TRANSITION TESTS ARE NOT PERFORMED YET
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
    <input type="file" class="item-input js-sf-cropper" data-filenameselector=".sf-crop-filename" data-name="image"
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

## Local Development

### Installation

    npm install -g gulp
    npm install

### Building

    gulp build - compile and browserify
    

## License

Copyright (c) 2016 Alex Chepura, Yauheni Yasinau and contributors. Released under an [MIT license](https://github.com/spiral-modules/image-cropper/blob/master/LICENSE).
