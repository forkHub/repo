{
    "type": "b_graphics2",
        "message0": "Graphics: %1 width %2 height %3",
            "args0": [
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "width",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "height",
                    "check": "Number"
                }
            ],
                "inputsInline": true,
                    "previousStatement": null,
                        "nextStatement": null,
                            "colour": 230,
                                "tooltip": "Setup Graphics",
                                    "helpUrl": ""
}

javascript.javascriptGenerator.forBlock['b_graphics2'
] = function (block, generator) {
    var value_width = generator.valueToCode(block, 'width', javascript.Order.ATOMIC);
    var value_height = generator.valueToCode(block, 'height', javascript.Order.ATOMIC);
    // TODO: Assemble javascript into code variable.
    var code = '...\n';
    return code;
};