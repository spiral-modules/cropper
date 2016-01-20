<extends:spiral:element/>

<block:resources>
    <resource:script href="resources/scripts/spiral/sf.js"/>
    <resource:script href="resources/scripts/spiral/sf.crop.js"/>
</block:resources>

<block:body>
    <label class="item-form ${wrapper-class}" node:attributes="prefix:wrapper">
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
            <input type="file" class="item-input js-sf-cropper" data-name="${name|data-name}" node:attributes>
        </block:input-body>
    </label>
</block:body>