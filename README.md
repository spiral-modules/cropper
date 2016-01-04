# Image Cropper Widget
Module provides ability to crop user image on client side and send to backend as file stream over ajax call.

## Usage Example

At frontend (dark template required), simple add virtual tag to your form:

```html
<dark:use bundle="spiral:cropper-bundle"/>

<form.image label="Select Image:" name="image" aspect-ratio=1/>
```

Backend:
```php
public function uploadAction()
{
    $image = $this->input->file('image');
    //...
}
```

TODO: Add screenshots and GIFs
