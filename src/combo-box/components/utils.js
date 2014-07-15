module.exports = {

    /**
     * @method getValue
     * Gets the value for the component's input.
     * @param {Object|String} option - The option for which to get a value.
     * @param {Object} props - The props with which to get a value.
     * @returns {String} - The value for the combo box.
     */
    getValue: function(option, props) {
        var display = props.displayProp ? option[props.displayProp] : option;
        return props.valueProp ? option[props.valueProp] : display;
    },

    /**
     * @method getDisplayValue
     * Gets the display value for the component's input.
     * @param {Object|String} option - The option for which to get a display value.
     * @param {Object} props - The props with which to get a display value.
     * @returns {String} - The display for the combo box.
     */
    getDisplayValue: function(option, props) {
        var value = props.valueProp ? option[props.valueProp] : option;
        return props.displayProp ? option[props.displayProp] : value;
    },

    /**
     * @method emptyFn
     * Default handler for all events.
     */
    emptyFn: function() {}
};
