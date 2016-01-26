<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Image Crop example</title>
    <link rel="stylesheet" href="sf.css"/>
    <script src="sf.min.js"></script>
    <script src="../resources/scripts/spiral/sf.crop.js"></script>
    <style>
        form {
            -webkit-flex: 1 1 auto;
            flex: 1 1 auto;
        }
        .crop-preview {
            max-width: 400px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
<h1>Crop example</h1>
<div style="margin-bottom: 20px; display: flex;">
    <form class="js-sf-form" action="action.php">
        <h1>Minimal crop demo with custom template</h1>
        <input type="file" data-name="test1" class="js-sf-cropper" data-preview="#crop-preview-2" data-template='<?=include('customTemplate.html');?>'/>
        <div id="crop-preview-2" class="crop-preview"></div>
        <input type="submit" value="Submit form"/>
    </form>

    <form class="js-sf-form" action="action.php">
        <h1>Crop demo with different settings</h1>
        <input type="file" data-name="test2" class="js-sf-cropper" data-info="ratio,croppedSize,origSize"  data-adjust=" .crop-adjust"
               data-preview=".crop-preview-1" data-ajax-image="image.jpg"/>
        <div class="crop-preview-1 crop-preview"></div>
        <input type="submit" value="Submit form"/>
    </form>

    <form class="js-sf-form" action="action.php">
        <h1>Custom filename container</h1>
        <input type="file" data-filename-selector=".filename" data-name="test3" class="js-sf-cropper"  data-adjust=".crop-adjust2"
               data-preview=".crop-preview-2" data-ajax-image="image.jpg"/>
        <div class="crop-preview-2 crop-preview"></div>
        <input type="submit" value="Submit form"/>
        <br>
        <br>
        <span class="crop-adjust2"><b>Adjust cropping</b></span><br><br>
        <span>Here goes filename:</span>
        <b><span class="filename"></span></b>
    </form>
</div>
<span class="crop-adjust"><b>Adjust central cropping (out of the node)</b></span>
</body>
</html>