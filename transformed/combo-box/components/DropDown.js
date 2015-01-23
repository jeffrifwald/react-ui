var DropDown = React.createClass({displayName: "DropDown",
    render: function() {
        var style = {
            display: this.props.visible ? 'block' : 'none'
        };

        return (
            React.createElement("div", {
            className: this.props.className, 
            style: style}, 
                this.renderOptions()
            )
        );
    },

    /**
     * @method renderOptions
     * Renders options for the dropdown.
     * @returns {Object[]} - An array of option components.
     */
    renderOptions: function() {
        return this.props.options.map(function(option, index) {
            var key = 'react-ui-combo-box-option-' + index;

            return (
                React.createElement("div", {
                className: this.getOptionClassName(option), 
                key: key, 
                onMouseDown: this.props.onOptionMouseDown.bind(null, option, index)}, 
                    this.props.renderOption(option)
                )
            );
        }, this);
    },

    /**
     * @method getOptionClassName
     * Gets a className for the option.
     * If the option is the selected option, include the selectedClassName.
     * @param {Object} option - The option for which to get a className.
     * @returns {String} - The option's className.
     */
    getOptionClassName: function(option) {
        if (this.props.valueProp && option[this.props.valueProp] === this.props.selected[this.props.valueProp]) {
            return this.props.optionClassName + ' ' + this.props.selectedClassName;
        }

        if (option === this.props.selected) {
            return this.props.optionClassName + ' ' + this.props.selectedClassName;
        }

        return this.props.optionClassName;
    }
});

module.exports = DropDown;
