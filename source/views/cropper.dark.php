<extends:spiral:element/>

<block:resources>
    <resource:script href="resources/scripts/spiral/sf.js"/>
    <resource:script href="resources/scripts/spiral/sf.crop.min.js"/>
</block:resources>

<block:body>
    <?/* data-message-placeholder="${name}" is there to show errors messages, as input doesn't have attribute name*/?>
    <label class="item-form item-file ${wrapper-class}" data-message-placeholder="${name}" node:attributes="prefix:wrapper">
        <?php #compiled
        //Receiving label content as evaluator variable
        $this->evaluatorVariable('label', '${label}');
        if (!empty($label) && $label != "''") {
            ?>
            <block:input-label>
                <span class="${label-class} item-label" node:attributes="prefix:label">${label}</span>
            </block:input-label>
            <?php #compiled
        }
        ?>
        <block:input-body>
            <input type="file" class="item-input js-sf-cropper"
                   data-filename-selector=".sf-crop-filename" data-name="${name}" node:attributes>
            <span class="sf-crop-filename btn ${placeholder-class}">${placeholder|Choose a file...}</span>
        </block:input-body>
    </label>
</block:body>