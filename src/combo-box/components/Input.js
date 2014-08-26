/** @jsx React.DOM */

var utils = require('./utils');

var TAB_KEY_CODE = 9;

var Input = React.createClass({

    getInitialState: function() {
        return {
            value: ''
        };
    },

    render: function() {
        var value = this.props.renderProps ? this.props.value : this.state.value;

        return (
            <input
            className={this.props.className}
            disabled={this.props.disabled}
            onBlur={this.props.onBlur}
            onChange={this.onChange}
            onClick={this.props.onClick}
            placeholder={this.props.placeholder}
            readOnly={this.props.readOnly}
            type="textbox"
            value={utils.getDisplayValue(value, this.props)} />
        );
    },

    /**
     * @method onChange
     * Buffers input based on the given filterDelay.
     * Calls the input's onInput method at the buffered rate.
     * @param {Object} evt - The event object.
     */
    onChange: function(evt) {
        var value = evt.target.value; //snapshot the value
        var options = this.props.options; //snapshot the options
        var filteredOptions;

        clearTimeout(this.inputTimeout); //always clear the timeout

        if (evt.keyCode !== TAB_KEY_CODE) {
            this.props.handleInputProps();
            filteredOptions = this.handleInput(value, options);
            this.inputTimeout = setTimeout(
                this.props.onInput.bind(null, value, filteredOptions),
                this.props.filterDelay
            );

        }
    },

    /**
     * @method handleInput
     * Handles input for the given value and options.
     * Filters the options based on user input.
     * @param {String} value - The string typed into the textbox.
     * @param {Object[]} options - The options to filter.
     */
    handleInput: function(value, options) {
        this.setState({value: value});

        if (value !== '') { //only filter options if there is a value
            return options.filter(function(option) {
                return utils.getDisplayValue(
                    option,
                    this.props
                ).toString().toLowerCase().indexOf(value.toLowerCase()) !== -1;
            }, this);
        }

        return options;
    }
});

module.exports = Input;
