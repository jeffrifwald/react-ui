var DropDown = require('./DropDown');
var Input = require('./Input');
var Trigger = require('./Trigger');
var utils = require('./utils');

/**
 * @class ComboBox
 * A mixed input and drop down selector component.
 */
var ComboBox = React.createClass({displayName: 'ComboBox',
    propTypes: {

        /** @prop {String} baseClassName - The base className of the combo box. */
        baseClassName: React.PropTypes.string,

        /** @prop {String} className - The additional className of the combo box. */
        className: React.PropTypes.string,

        /** @prop {String|Object} defaultValue - The default value for the combo box. */
        defaultValue: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.number,
            React.PropTypes.string
        ]),

        /** @prop {Boolean} disabled - True disable the input and trigger. */
        disabled: React.PropTypes.bool,

        /** @prop {String} disabledClassName - The className of the combo box when disabled. */
        disabledClassName: React.PropTypes.string,

        /** @prop {String} displayProp - The property for accessing the display values. */
        displayProp: React.PropTypes.string,

        /** @prop {String} dropDownClassName - The className of the combo box's drop down. */
        dropDownClassName: React.PropTypes.string,

        /** @prop {Number} editable - False if the combo box's input should be readonly. */
        editable: React.PropTypes.bool,

        /** @prop {Number} filterDelay - The time in millseconds to wait before filtering the options. */
        filterDelay: React.PropTypes.number,

        /** @prop {String} inputClassName - The className of the combo box's input. */
        inputClassName: React.PropTypes.string,

        /** @prop {String} label - The label for the combo box. */
        label: React.PropTypes.string,

        /** @prop {String} labelClassName - The className of the combo box's label */
        labelClassName: React.PropTypes.string,

        /** @prop {String} - The name of the combo box's input. */
        name: React.PropTypes.string,

        /** @prop {Function} onInput - The method called when the input is typed into. */
        onInput: React.PropTypes.func,

        /** @prop {Function} onInputClick - The method called when the input is clicked. */
        onInputClick: React.PropTypes.func,

        /** @prop {Function} onOptionMouseDown - The method called right before an option is clicked. */
        onOptionMouseDown: React.PropTypes.func,

        /** @prop {Function} onTriggerClick - The method called when the trigger is clicked. */
        onTriggerClick: React.PropTypes.func,

        /** @prop {String} optionClassName - The className of the combo box's options. */
        optionClassName: React.PropTypes.string,

        /** @prop {Object[]} options - An array of option objects for the combo box. */
        options: React.PropTypes.array,

        /** @prop {String} placeholder - A placeholder for the input. */
        placeholder: React.PropTypes.string,

        /** @prop {Function} renderOption - The method called to render options. */
        renderOption: React.PropTypes.func,

        /** @prop {String} selectedClassName - The className of the combo box's selected option. */
        selectedClassName: React.PropTypes.string,

        /** @prop {Boolean} - True to let the combo box handle its own options. */
        statefulOptions: React.PropTypes.bool,

        /** @prop {String} triggerClassName - The className of the grid's rows. */
        triggerClassName: React.PropTypes.string,

        /** @prop {String} valueProp - The property for accessing the values. */
        valueProp: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            baseClassName: 'react-ui-combo-box',
            className: '',
            disabled: false,
            disabledClassName: 'react-ui-combo-box-disabled',
            dropDownClassName: 'react-ui-combo-box-drop-down',
            editable: true,
            filterDelay: 200,
            inputWrapClassName: 'react-ui-combo-box-input-wrap',
            inputClassName: 'react-ui-combo-box-input',
            label: '',
            labelClassName: 'react-ui-combo-box-label',
            onInput: utils.emptyFn,
            onInputClick: utils.emptyFn,
            onOptionMouseDown: utils.emptyFn,
            onTriggerClick: utils.emptyFn,
            openClassName: 'react-ui-combo-box-open',
            optionClassName: 'react-ui-combo-box-option',
            options: [],
            selectedClassName: 'react-ui-combo-box-selected',
            statefulOptions: true,
            triggerClassName: 'react-ui-combo-box-trigger'
        };
    },

    getInitialState: function() {
        return {
            dropDownVisible: false,
            dropDownOptions: this.props.options,
            renderProps: true,
            value: this.props.defaultValue
        };
    },

    render: function() {
        var renderOption = this.props.renderOption || this.renderOption;

        return (
            React.createElement("div", {className: this.getClassName()}, 
                React.createElement("label", {className: this.props.labelClassName}, this.props.label), 

                React.createElement("div", {className: this.props.inputWrapClassName}, 
                    React.createElement(Input, {
                    className: this.props.inputClassName, 
                    disabled: this.props.disabled, 
                    displayProp: this.props.displayProp, 
                    filterDelay: this.props.filterDelay, 
                    handleInputProps: this.handleInputProps, 
                    onBlur: this.onBlur, 
                    onClick: this.onInputClick, 
                    onInput: this.onInput, 
                    options: this.props.options, 
                    placeholder: this.props.placeholder, 
                    readOnly: !this.props.editable || this.props.disabled, 
                    ref: "textInput", 
                    renderProps: this.state.renderProps, 
                    value: this.state.value, 
                    valueProp: this.props.valueProp}), 

                    React.createElement("input", {
                    disabled: this.props.disabled, 
                    name: this.props.name, 
                    type: "hidden", 
                    value: utils.getValue(this.state.value, this.props)}), 

                    React.createElement(Trigger, {
                    className: this.props.triggerClassName, 
                    onBlur: this.onBlur, 
                    onClick: this.onTriggerClick, 
                    ref: "trigger"}), 

                    React.createElement(DropDown, {
                    className: this.props.dropDownClassName, 
                    displayProp: this.props.displayProp, 
                    onOptionMouseDown: this.onOptionMouseDown, 
                    optionClassName: this.props.optionClassName, 
                    options: this.getDropDownOptions(), 
                    ref: "dropDown", 
                    renderOption: renderOption, 
                    selected: this.state.value, 
                    selectedClassName: this.props.selectedClassName, 
                    valueProp: this.props.valueProp, 
                    visible: !this.props.disabled && this.state.dropDownVisible})
                )
            )
        );
    },

    /**
     * @method renderOption
     * The default renderer for drop down options.
     * @param {Object|String} option - The option to render.
     * @returns {Object} - The option component.
     */
    renderOption: function(option) {
        return (React.createElement("span", null, utils.getDisplayValue(option, this.props)));
    },

    /**
     * @method getClassName
     * Gets a className for the combo box.
     * Picks either the className or disabledClassName.
     * @returns {String} - The className for the combo box.
     */
    getClassName: function() {
        var classNames = {};
        classNames[this.props.baseClassName] = true;
        classNames[this.props.className] = this.props.className ? true : false;
        classNames[this.props.disabledClassName] = this.props.disabled ? true : false;
        classNames[this.props.openClassName] = this.state.dropDownVisible ? true : false;

        return utils.className(classNames);
    },

    /**
     * @methos getDropDownOptions
     * Gets options for the drop down.
     * Gets either the stateful options or property passed options.
     * @returns {Object[]|String[]} - An array of options.
     */
    getDropDownOptions: function() {
        return this.props.statefulOptions ? this.state.dropDownOptions : this.props.options;
    },

    /**
     * @method handleInputProps
     * Tells the input to use state or props for rendering.
     * Gets reset when an option is clicked.
     */
    handleInputProps: function() {
        this.setState({
            renderProps: false
        });
    },

    /**
     * @method onInput
     * Handler called when the input is typed into.
     * Filters items in the dropdown.
     * Shows the drop down.
     */
    onInput: function(value, options) {
        this.props.onInput.call(this, value, options);

        this.setState({
            value: value,
            dropDownOptions: options,
            dropDownVisible: true
        });
    },

    /**
     * @method onBlur
     * Closes the drop down if not an option.
     */
    onBlur: function() {
        this.setState({
            dropDownVisible: false
        });
    },

    /**
     * @method onOptionMouseDown
     * Handler called when an option is selected.
     * Sets the combo box's value, hides the drop down, and resets the options.
     * @param {Object} option - The selected option.
     */
    onOptionMouseDown: function(option) {
        this.props.onOptionMouseDown.call(this, option);

        this.setState({
            dropDownOptions: this.props.options,
            dropDownVisible: false,
            renderProps: true,
            value: option
        });
    },

    /**
     * @method onInputClick
     * Handler called when the input is clicked.
     * If the input is editable, does nothing.
     * If the input is not editable, behaves similar to the trigger.
     */
    onInputClick: function(evt) {
         if (!this.props.disabled && !this.props.editable) {
            this.props.onInputClick.call(this, evt);
            this.setState({
                dropDownVisible: !this.state.dropDownVisible
            });
        }
    },

    /**
     * @method onTriggerClick
     * Handler called when the trigger element is clicked.
     * Toggles the visibility of the drop down.
     */
    onTriggerClick: function(evt) {
        evt.preventDefault(); //prevent accidential form submitting

        if (!this.props.disabled) {
            this.props.onTriggerClick.call(this, evt);
            this.setState({
                dropDownVisible: !this.state.dropDownVisible
            });
        }
    },

    /**
     * @method clearValue
     * Clears the value of the combo box.
     */
    clearValue: function() {
        this.setState({
            dropDownVisible: false,
            dropDownOptions: this.props.options,
            renderProps: true,
            value: ''
        });
    },

    /**
     * @method getValue
     * Gets the current value of the combo box.
     */
    getValue: function() {
        return this.state.value;
    }
});

module.exports = ComboBox;
