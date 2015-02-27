(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
global.ReactUI = {
    AjaxForm: require('./transformed/ajax-form/components/AjaxForm'),
    CheckBox: require('./transformed/check-box/components/CheckBox'),
    ComboBox: require('./transformed/combo-box/components/ComboBox'),
    DatePicker: require('./transformed/date-picker/components/DatePicker'),
    FileInput: require('./transformed/file-input/components/FileInput'),
    Grid: require('./transformed/grid/components/Grid')
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./transformed/ajax-form/components/AjaxForm":2,"./transformed/check-box/components/CheckBox":4,"./transformed/combo-box/components/ComboBox":6,"./transformed/date-picker/components/DatePicker":13,"./transformed/file-input/components/FileInput":17,"./transformed/grid/components/Grid":19}],2:[function(require,module,exports){
var utils = require('./utils');

/**
 * @class AjaxForm
 * A form component that attempts to submit its contents with an asynchronous POST request.
 * Falls back to synchronously submitting the form in older browsers.
 */
var AjaxForm = React.createClass({displayName: "AjaxForm",
    propTypes: {
        /** @prop {String} className - The className of the form. */
        className: React.PropTypes.string,

        /** @prop {Function} onResponse - The method to call when a response is available. */
        onResponse: React.PropTypes.func,

        /** @prop {Function} onBeforeSubmit - The method to call before the form is submitted. */
        onBeforeSubmit: React.PropTypes.func,

        /** @prop {String} url - The url for sending the request. */
        url: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            className: 'react-ui-ajax-form',
            onResponse: utils.emptyFn,
            onBeforeSubmit: utils.emptyFn,
            url: ''
        };
    },

    render: function() {
        return (
            React.createElement("form", {
            action: this.props.url, 
            className: this.props.className, 
            method: "POST", 
            onSubmit: this.onSubmit}, 
                this.props.children
            )
        );
    },

    /**
     * @method onSubmit
     * Prevents form submission and decides how to handle the form.
     * Submits the form via ajax with FormData or posts to an iframe.
     * @param {Object} evt - The submit event.
     */
    onSubmit: function(evt) {
        evt.preventDefault(); //do not submit the form yet

        this.submit();
    },

    /**
     * @method submit
     * Programmatic way to submit the form
     * Submits the form via ajax with FormData or posts to an iframe.
     */
    submit: function() {
        this.props.onBeforeSubmit();
        utils.handleForm(this.getDOMNode(), this.props.onResponse);
    }
});

module.exports = AjaxForm;

},{"./utils":3}],3:[function(require,module,exports){
/**
 * @method doFormData
 * Submits the form with the FormData object.
 * Calls the callback on request load and error.
 * @param {Object} form - The form to submit.
 * @param {Function} - The callback called when the request loads or errors.
 */
function doFormData(form, callback) {
    var formData = new window.FormData(form);
    var request = new window.XMLHttpRequest();

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            callback(undefined, request);
        } else {
            callback(new Error('AjaxForm: StatusError'), request);
        }
    };

    request.onerror = function() {
        callback(new Error('AjaxForm: Network Error'), request);
    };

    request.open('POST', form.action, true);
    request.send(formData);
}

module.exports = {

    /**
     * @method emptyFn
     * Default handler for all events.
     */
    emptyFn: function() {},

    /**
     * @method handleForm
     * Uses either FormData or a hidden iframe to submit the form.
     * @param {Object} component - The form component to handle.
     */
    handleForm: function(form, callback) {
        if (window.FormData) { //use ajax
            doFormData(form, callback);
        } else { //fallback to simply submit the form
            form.submit();
        }
    }
};

},{}],4:[function(require,module,exports){
/**
 * @class CheckBox
 * A check box component that can easily be styled.
 */
var CheckBox = React.createClass({displayName: "CheckBox",
    propTypes: {

        /** @prop {String} className - The class name of the component. */
        className: React.PropTypes.string,

        /** @prop {String} inputClassName - The class name of the component's input. */
        inputClassName: React.PropTypes.string,

        /** @prop {String} label - The label for the component. */
        label: React.PropTypes.string,

        /** @prop {String} labelClassName - The class name of the label. */
        labelClassName: React.PropTypes.string,

        /** @prop {String} className - The name of the input. */
        name: React.PropTypes.string
    },

    getInitialState: function() {
        return {
            checked: this.props.checked || false
        };
    },

    render: function() {
        var inputId = 'react-ui-check-box-' + this.props.name;

        return (
           React.createElement("div", {className: this.props.className}, 
                React.createElement("input", {
                checked: this.state.checked, 
                className: this.props.inputClassName, 
                disabled: !this.props.disabled, 
                id: inputId, 
                onChange: this.onChange, 
                type: "checkbox"}), 

                React.createElement("label", {htmlFor: inputId}, React.createElement("span", null)), 
                React.createElement("label", {className: this.props.labelClassName}, this.props.label), 

                React.createElement("input", {name: this.props.name, type: "hidden", value: this.state.checked})
            )
        );
    },

    /**
     * @method onChange
     * Toggles the value of the input for the check box.
     */
    onChange: function() {
        this.setState({
            checked: !this.state.checked
        });
    }
});

module.exports = CheckBox;

},{}],5:[function(require,module,exports){
var ClearButton = React.createClass({displayName: "ClearButton",
    render: function() {
        return this.props.showClearButton ? (
            React.createElement("button", {
            className: this.props.className, 
            onClick: this.props.onClick, 
            type: "button"}
            )
        ) : null;
    }
});

module.exports = ClearButton;

},{}],6:[function(require,module,exports){
var ClearButton = require('./ClearButton');
var DropDown = require('./DropDown');
var Input = require('./Input');
var Trigger = require('./Trigger');
var utils = require('./utils');

/**
 * @class ComboBox
 * A mixed input and drop down selector component.
 */
var ComboBox = React.createClass({displayName: "ComboBox",
    propTypes: {

        /** @prop {Boolean} autoCloseDropDown - True to close the drop down automatically. */
        autoCloseDropDown: React.PropTypes.bool,

        /** @prop {String} baseClassName - The base className of the combo box. */
        baseClassName: React.PropTypes.string,

        /** @prop {String} className - The additional className of the combo box. */
        className: React.PropTypes.string,

        /** @prop {String} triggerClassName - The className of the cleart button. */
        clearButtonClassName: React.PropTypes.string,

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

        /** @prop {Function} onEnterPress - The method called when the enter key is pressed. */
        onEnterPress: React.PropTypes.func,

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

        /** @prop {Boolean} - True to show a clear button. */
        showClearButton: React.PropTypes.bool,

        /** @prop {String} selectedClassName - The className of the combo box's selected option. */
        selectedClassName: React.PropTypes.string,

        /** @prop {Boolean} - True to let the combo box handle its own options. */
        statefulOptions: React.PropTypes.bool,

        /** @prop {String} triggerClassName - The className of the trigger button. */
        triggerClassName: React.PropTypes.string,

        /** @prop {String} valueProp - The property for accessing the values. */
        valueProp: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            autoCloseDropDown: true,
            baseClassName: 'react-ui-combo-box',
            className: '',
            disabled: false,
            disabledClassName: 'react-ui-combo-box-disabled',
            dropDownClassName: 'react-ui-combo-box-drop-down',
            clearButtonClassName: 'react-ui-combo-box-clear',
            editable: true,
            filterDelay: 200,
            inputWrapClassName: 'react-ui-combo-box-input-wrap',
            inputClassName: 'react-ui-combo-box-input',
            label: '',
            labelClassName: 'react-ui-combo-box-label',
            onEnterPress: utils.emptyFn,
            onInput: utils.emptyFn,
            onInputClick: utils.emptyFn,
            onOptionMouseDown: utils.emptyFn,
            onTriggerClick: utils.emptyFn,
            openClassName: 'react-ui-combo-box-open',
            optionClassName: 'react-ui-combo-box-option',
            options: [],
            showClearButton: false,
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
            value: this.props.defaultValue,
            index: -1
        };
    },

    render: function() {
        var renderOption = this.props.renderOption || this.renderOption;
        var label = this.props.label ? (
            React.createElement("label", {className: this.props.labelClassName}, this.props.label)
        ) : null;

        return (
            React.createElement("div", {className: this.getClassName()}, 
                label, 

                React.createElement("div", {className: this.props.inputWrapClassName}, 
                    React.createElement(Input, {
                    className: this.props.inputClassName, 
                    disabled: this.props.disabled, 
                    displayProp: this.props.displayProp, 
                    filterDelay: this.props.filterDelay, 
                    handleInputProps: this.handleInputProps, 
                    onBlur: this.onBlur, 
                    onClick: this.onInputClick, 
                    onArrowDownPress: this.onArrowDownPress, 
                    onArrowUpPress: this.onArrowUpPress, 
                    onEnterPress: this.onEnterPress, 
                    onInput: this.onInput, 
                    options: this.props.options, 
                    placeholder: this.props.placeholder, 
                    readOnly: !this.props.editable || this.props.disabled, 
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
                    onClick: this.onTriggerClick}), 

                    React.createElement(ClearButton, {
                    className: this.props.clearButtonClassName, 
                    onClick: this.clearValue, 
                    showClearButton: this.props.showClearButton}), 

                    React.createElement(DropDown, {
                    className: this.props.dropDownClassName, 
                    displayProp: this.props.displayProp, 
                    onOptionMouseDown: this.onOptionMouseDown, 
                    optionClassName: this.props.optionClassName, 
                    options: this.getDropDownOptions(), 
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
            dropDownVisible: true,
            index: -1
        });
    },

    /**
     * @method onBlur
     * Closes the drop down if not an option.
     */
    onBlur: function() {
        this.setState({dropDownVisible: this.maybeDropDownVisible()});
    },

    /**
     * @method onOptionMouseDown
     * Handler called when an option is selected.
     * Sets the combo box's value, hides the drop down, and resets the options.
     * @param {Object} option - The selected option.
     * @param {Object} index - The selected index.
     */
    onOptionMouseDown: function(option, index, evt) {
        this.props.onOptionMouseDown.call(this, option, evt);

        this.setState({
            dropDownOptions: this.props.options,
            dropDownVisible: this.maybeDropDownVisible(),
            renderProps: true,
            value: option,
            index: index
        });
    },

    /**
     * @method onArrowDownPress
     * Handler called when the down arrow is pressed.
     */
    onArrowDownPress: function(evt) {
        var index = Math.min(this.state.index + 1, this.props.options.length - 1);
        var value = this.props.options[index];

        if (evt.target.value) {
            this.setState({
                dropDownVisible: true,
                index: index,
                renderProps: true,
                value: value
            });
        }
    },

    /**
     * @method onArrowUpPress
     * Handler called when the up arrow is pressed.
     */
    onArrowUpPress: function(evt) {
        var index = Math.max(this.state.index - 1, 0);
        var value = this.props.options[index];

        if (evt.target.value) {
            this.setState({
                dropDownVisible: true,
                index: index,
                renderProps: true,
                value: value
            });
        }
    },

    /**
     * @method onEnterPress
     * Handler called when enter is pressed.
     */
    onEnterPress: function(evt) {
        var value = this.getValue();

        evt.preventDefault();

        if (value) {
            this.props.onEnterPress(value);
            this.setState({dropDownVisible: this.maybeDropDownVisible()});
        }
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
            value: '',
            index: -1
        });
    },

    /**
     * @method maybeDropDownVisible
     * Returns the drop visible state baed on the autoCloseDropDown prop
     */
    maybeDropDownVisible: function() {
        return this.props.autoCloseDropDown ? false : this.state.dropDownVisible;
    },

    /**
     * @method closeDropDown
     * Closes the drop down.
     */
    closeDropDown: function() {
        this.setState({dropDownVisible: false});
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

},{"./ClearButton":5,"./DropDown":7,"./Input":8,"./Trigger":9,"./utils":10}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
var utils = require('./utils');


var ENTER_KEY_CODE = 13;
var TAB_KEY_CODE = 9;
var ARROW_DOWN_KEY_CODE = 40;
var ARROW_UP_KEY_CODE = 38;

var Input = React.createClass({displayName: "Input",

    getInitialState: function() {
        return {
            value: ''
        };
    },

    render: function() {
        var value = this.props.renderProps ? utils.getDisplayValue(
            this.props.value, this.props
        ) : this.state.value;

        return (
            React.createElement("input", {
            className: this.props.className, 
            disabled: this.props.disabled, 
            onBlur: this.props.onBlur, 
            onChange: this.onChange, 
            onClick: this.props.onClick, 
            onKeyDown: this.onKeyDown, 
            placeholder: this.props.placeholder, 
            readOnly: this.props.readOnly, 
            type: "textbox", 
            value: value})
        );
    },

    /**
     * @method onKeyDown
     * Handles pressing special keys.
     * @param {Object} evt - The event object.
     */
    onKeyDown: function(evt) {
        if (evt.keyCode === ARROW_DOWN_KEY_CODE) {
            this.props.onArrowDownPress(evt);
        } else if (evt.keyCode === ARROW_UP_KEY_CODE) {
            this.props.onArrowUpPress(evt);
        } else if(evt.keyCode === ENTER_KEY_CODE) {
            this.props.onEnterPress(evt);
        }
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

        if (evt.keyCode === TAB_KEY_CODE) {
            return;
        }

        this.props.handleInputProps();
        filteredOptions = this.handleInput(value, options);
        this.inputTimeout = setTimeout(
            this.props.onInput.bind(null, value, filteredOptions),
            this.props.filterDelay
        );
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
                var displayValue = utils.getDisplayValue(option, this.props);

                if (!displayValue) {
                    return false;
                }

                return displayValue.toString().toLowerCase().indexOf(value.toLowerCase()) !== -1;
            }, this);
        }

        return options;
    }
});

module.exports = Input;

},{"./utils":10}],9:[function(require,module,exports){
var Trigger = React.createClass({displayName: "Trigger",
    render: function() {
        return (
            React.createElement("button", {
            className: this.props.className, 
            onBlur: this.props.onBlur, 
            onClick: this.props.onClick, 
            type: "button"}
            )
        );
    }
});

module.exports = Trigger;

},{}],10:[function(require,module,exports){
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
    emptyFn: function() {},

    /**
     * @method className
     * Creates a list of class names based on the given arguments.
     * @params * args - An object or class name arguments.
     * @returns {String} - The class names.
     */
    className: function() {
        var args = Array.prototype.slice.call(arguments);
        return (typeof args[0] === 'object' ? Object.keys(args[0]).filter(function(k) {
            return args[0][k];
        }) : args).join(' ');
    }
};

},{}],11:[function(require,module,exports){
var DateCell = require('./DateCell');

var Calendar = React.createClass({displayName: "Calendar",
    render: function() {
        if (!this.props.visible) {
            return null;
        }

        return (
             React.createElement("table", {className: this.props.className}, 
                this.renderHeader(), 
                React.createElement("tr", null, this.renderDayNames()), 
                this.renderRows()
            )
        );
    },

    renderHeader: function() {
        var monthName = this.props.monthNames[this.props.date.getMonth()];
        var header = monthName + ' ' + this.props.date.getFullYear();

        return (
            React.createElement("tr", {className: this.props.headerClassName}, 
                React.createElement("td", {
                className: this.props.prevClassName, 
                onClick: this.props.onPrevClick}, 
                    this.props.prevChar
                ), 

                React.createElement("td", {className: this.props.monthClassName, colSpan: "5"}, header), 

                React.createElement("td", {
                className: this.props.nextClassName, 
                onClick: this.props.onNextClick}, 
                    this.props.nextChar
                )
            )
        );
    },

    renderDayNames: function() {
        return this.props.dayNames.map(function(name, i) {
            return (React.createElement("th", {key: i}, name.slice(0, 1)));
        }, this);
    },

    renderDays: function(days) {
        return days.map(function(day, i) {
            return (
                React.createElement(DateCell, {
                className: this.props.dateClassName, 
                date: this.props.date, 
                disabledDates: this.props.disabledDates, 
                isDateDisabled: this.props.isDateDisabled, 
                key: i, 
                maxValue: this.props.maxValue, 
                minValue: this.props.minValue, 
                onMouseDown: this.props.onDateMouseDown, 
                selected: this.props.selected, 
                value: day})
            );
        }, this);
    },

    renderRows: function() {
        var rows = [];
        var row, start, end;

        while (rows.length < 6) {
            start = rows.length * 7;
            end = rows.length * 7 + 7;
            row = this.renderDays(this.props.days.slice(start, end));
            rows.push(
                React.createElement("tr", {className: this.props.rowClassName, key: rows.length}, 
                    row
                )
            );
        }

        return rows;
    }
});

module.exports = Calendar;

},{"./DateCell":12}],12:[function(require,module,exports){
var utils = require('./utils');

var DateCell = React.createClass({displayName: "DateCell",
    render: function() {
        return (
            React.createElement("td", {
            className: this.getClassName(), 
            onMouseDown: this.onMouseDown}, 
                this.props.value.getDate()
            )
        );
    },

    /**
     * @method onMouseDown
     * If selectable, calls the given onMouseDown method.
     */
    onMouseDown: function() {
        if (this.isSelectable()) {
            this.props.onMouseDown(this.props.value);
        }
    },

    /**
     * @method getClassNames
     * Gets a class name for the cell.
     * Examines current, selected, selectable, and same month criteria.
     * @returns {String} - The constructed class name.
     */
    getClassName: function() {
        var className = this.props.className;

        if (!this.isSelectable()) {
            return  className + ' disabled';
        }

        if (this.props.date.getMonth() !== this.props.value.getMonth()) {
            className += ' other-month';
        }

        if (this.isSelected()) {
            return className + ' selected-date';
        }

        if (this.isCurrent()) {
            return className + ' current-date';
        }

        return className;
    },

    /**
     * @method isSelectable
     * Determines if the cell should be selectable.
     * Calls the isDateDisabled method, compares to given disabled dates.
     * Compares against max and min dates.
     * @returns {Boolean} - True if the date is selectable.
     */
    isSelectable: function() {
        var curr = this.props.value;
        var max = this.props.maxValue;
        var min = this.props.minValue;

        if (this.props.isDateDisabled(curr)) {
            return false;
        }

        if (utils.isDisabledDate(this.props.value, this.props.disabledDates)) {
            return false;
        }

        if (max && curr > max) {
            return false;
        }

        if (min && curr < min) {
            return false;
        }

        return true;
    },

    /**
     * @method isCurrent
     * Determines if the cell is the current date.
     * @returns {Boolean} - True if the cell contains the current date.
     */
    isCurrent: function() {
        return utils.sameDate(this.props.value, new Date());
    },

    /**
     * @method isSelected
     * Determines if the cell is selected.
     * @returns {Boolean} - True if the cell is selected.
     */
    isSelected: function() {
        return this.props.selected && utils.sameDate(this.props.value, this.props.selected) ? true : false;
    }
});

module.exports = DateCell;

},{"./utils":16}],13:[function(require,module,exports){
var Calendar = require('./Calendar');
var Input = require('./Input');
var Trigger = require('./Trigger');
var utils = require('./utils');

var DatePicker = React.createClass({displayName: "DatePicker",
    propTypes: {
        /** @prop {String} className - The className of the date picker. */
        className: React.PropTypes.string,
        /** @prop {Function} onDateMouseDown - The method called right before a date is clicked. */
        onDateMouseDown: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            calendarClassName: 'react-ui-date-picker-calendar',
            className: 'react-ui-date-picker',
            dateClassName: 'react-ui-date-picker-date',
            dayNames: [
                'Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'
            ],
            disabledClassName: 'react-ui-date-picker-disabled',
            disabledDates: [],
            displayFormat: 'm/d/Y',
            headerClassName: 'react-ui-date-picker-header',
            inputClassName: 'react-ui-date-picker-input',
            isDateDisabled: function() {},
            labelClassName: 'react-ui-date-picker-label',
            maxValue: null,
            minValue: null,
            monthClassName: 'react-ui-date-picker-month',
            monthNames: [
                'January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'
            ],
            nextChar: '\u00bb',
            nextClassName: 'react-ui-date-picker-next',
            onDateMouseDown: utils.emptyFn,
            prevChar: '\u00ab',
            prevClassName: 'react-ui-date-picker-prev',
            rowClassName: 'react-ui-date-picker-row',
            showTrigger: true,
            triggerClassName: 'react-ui-date-picker-trigger',
            triggerText: '',
            value: null,
            valueFormat: 'm/d/Y'
        };
    },

    getInitialState: function() {
        var date = utils.cleanDate(this.props.value || new Date());
        var selected = this.props.value ? utils.cleanDate(this.props.value) : null;
        var display = selected ? utils.format(selected, this.props.displayFormat) : null;
        var formatted = selected ? utils.format(selected, this.props.valueFormat) : null;

        return {
            calendarVisible: false,
            date: date,
            days: utils.getDays(date),
            display: display,
            formatted: formatted,
            selected: selected
        };
    },

    render: function() {
        return (
            React.createElement("div", {className: this.getClassName()}, 
                React.createElement("label", {className: this.props.labelClassName}, this.props.label), 

                React.createElement(Input, {
                className: this.props.inputClassName, 
                onClick: this.onInputClick, 
                placeholder: this.props.placeholder, 
                value: this.state.display}), 

                React.createElement(Trigger, {
                className: this.props.triggerClassName, 
                onClick: this.onInputClick, 
                showTrigger: this.props.showTrigger, 
                triggerText: this.props.triggerText}), 

                React.createElement("input", {
                disabled: this.props.disabled, 
                name: this.props.name, 
                type: "hidden", 
                value: this.state.formatted}), 

                React.createElement(Calendar, {
                className: this.props.calendarClassName, 
                date: this.state.date, 
                dateClassName: this.props.dateClassName, 
                dayNames: this.props.dayNames, 
                days: this.state.days, 
                disabledDates: this.props.disabledDates, 
                headerClassName: this.props.headerClassName, 
                isDateDisabled: this.props.isDateDisabled, 
                maxValue: this.props.maxValue, 
                minValue: this.props.minValue, 
                monthNames: this.props.monthNames, 
                nextChar: this.props.nextChar, 
                nextClassName: this.props.nextClassName, 
                onDateMouseDown: this.onDateMouseDown, 
                onNextClick: this.onNextClick, 
                onPrevClick: this.onPrevClick, 
                prevChar: this.props.prevChar, 
                prevClassName: this.props.prevClassName, 
                selected: this.state.selected, 
                visible: this.state.calendarVisible})

            )
        );
    },

    getClassName: function() {
        if (this.props.disabled) {
            return this.props.className + ' ' + this.props.disabledClassName;
        }

        return this.props.className;
    },

    onDateMouseDown: function(date) {
        this.props.onDateMouseDown(date);

        this.setState({
            calendarVisible: false,
            date: date,
            days: utils.getDays(date),
            display: utils.format(date, this.props.displayFormat),
            formatted: utils.format(date, this.props.valueFormat),
            selected: date
        });
    },

    onInputClick: function() {
        if (!this.props.disabled) {
            this.setState({calendarVisible: !this.state.calendarVisible});
        }
    },

    onNextClick: function() {
        var date = new Date(this.state.date);

        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        this.setState({date: date, days: utils.getDays(date)});
    },

    onPrevClick: function() {
        var date = new Date(this.state.date);
        var days;

        date.setDate(1);
        date.setMonth(date.getMonth() - 1);
        days = utils.getDays(date);
        this.setState({date: date, days: days});
    }
});

module.exports = DatePicker;

},{"./Calendar":11,"./Input":14,"./Trigger":15,"./utils":16}],14:[function(require,module,exports){
var Input = React.createClass({displayName: "Input",
    render: function() {
        return (
            React.createElement("input", {
            className: this.props.className, 
            onClick: this.props.onClick, 
            placeholder: this.props.placeholder, 
            readOnly: true, 
            type: "textbox", 
            value: this.props.value})
        );
    }
});

module.exports = Input;

},{}],15:[function(require,module,exports){
var Trigger = React.createClass({displayName: "Trigger",
    render: function() {
        if (!this.props.showTrigger) {
            return null;
        }

        return (
            React.createElement("button", {
            className: this.props.className, 
            onClick: this.props.onClick, 
            type: "button"}, 
                this.props.triggerText
            )
        );
    }
});

module.exports = Trigger;

},{}],16:[function(require,module,exports){
var utils = {
    formatMap: {
        /**
         * @method d
         * Gets the padded day of the month.
         * @returns {String}
         */
        d: function(date) {
            return this.padZero(date.getDate());
        },

        /**
         * @method j
         * Gets the day of the month.
         * @returns {Number}
         */
        j: function(date) {
            return date.getDate();
        },

        /**
         * @method m
         * Gets the padded month.
         * @returns {String}
         */
        m: function(date) {
            return this.padZero(date.getMonth() + 1);
        },

        /**
         * @method m
         * Gets the month.
         * @returns {Number}
         */
        n: function(date) {
            return date.getMonth() + 1;
        },

        /**
         * @method w
         * Gets the day of the week.
         * @returns {Number}
         */
        w: function(date) {
            return date.getDay();
        },

        /**
         * @method Y
         * Gets the full year.
         * @returns {Number}
         */
        Y: function(date) {
            return date.getFullYear();
        },

        /**
         * @method y
         * Gets the last 2 digits of the year.
         * @returns {Number}
         */
        y: function(date) {
            return date.getFullYear().toString().slice(2);
        },

        /**
         * @method U
         * Gets the Unix timestamp.
         * @returns {Number}
         */
        U: function(date) {
            return parseInt(date.getTime() / 1000, 10);
        }
    },

    addDays: function(date, days) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
    },

    cleanDate: function(date) {
        var clean = new Date(date);

        clean.setHours(0);
        clean.setMinutes(0);
        clean.setSeconds(0);
        clean.setMilliseconds(0);

        return clean;
    },

    escapeFormat: function(date, a, b) {
        if (a.indexOf('\\') !== -1) {
            return a.slice(1);
        }

        return b + this.formatMap[a.slice(a.length - 1)].call(this, date);
    },

    format: function(date, format) {
        return format.replace(/([^\u2166]?)[djmnwyYU]/g, this.escapeFormat.bind(this, date));
    },

    padZero: function(value) {
        return value > 9 ? value : '0' + value;
    },

    getDays: function(date) {
        var firstDay = this.getFirstDay(date);
        var lastDay = this.addDays(firstDay, 41);
        var currentDay = firstDay;
        var days = [];

        while (currentDay.getTime() <= lastDay.getTime()) {
            days.push(currentDay);
            currentDay = this.addDays(currentDay, 1);
        }

        return days;
    },

    getFirstDay: function(date) {
        var firstDate = new Date(date);

        firstDate.setDate(1);
        firstDate = this.addDays(firstDate, firstDate.getDay() * -1);

        return firstDate;
    },

    sameDate: function(a, b) {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    },

    isDisabledDate: function(date, disabledDates) {
        return disabledDates.filter(function(disabledDate) {
            return this.sameDate(disabledDate, date);
        }, this).length ? true : false;
    },

    /**
     * @method emptyFn
     * Default handler for all events.
     */
    emptyFn: function() {}
};

module.exports = utils;

},{}],17:[function(require,module,exports){
var emptyFn = function() {};

var FileInput = React.createClass({displayName: "FileInput",
    propTypes: {

        /** @prop {String} chooseButtonClassName - The className of the choose button. */
        chooseButtonClassName: React.PropTypes.string,

        /** @prop {String} chooseButtonText - The text of the choose button. */
        chooseButtonText: React.PropTypes.string,

        /** @prop {String} className - The className of the file input. */
        className: React.PropTypes.string,

        /** @prop {String} clearButtonClassName - The className of the clear button. */
        clearButtonClassName: React.PropTypes.string,

        /** @prop {String} clearButtonText - The text of the clear button. */
        clearButtonText: React.PropTypes.string,

        /** @prop {String} fileNameClassName - The class name of the file name input. */
        fileNameClassName: React.PropTypes.string,

        /** @prop {String} name - The name of the input. */
        name: React.PropTypes.string,

        /** @prop {Function} onChooseClick - The method to call when the choose button is clicked. */
        onChooseClick: React.PropTypes.func,

        /** @prop {Function} onClearClick - The method to call when the clear button is clicked. */
        onClearClick: React.PropTypes.func,

        /** @prop {Function} onFileChange - The method to call when the file input changes. */
        onFileChange: React.PropTypes.func,

        /** @prop {String} placeholder - The placeholder text for the file input */
        placeholder: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            chooseButtonClassName: 'react-ui-file-input-choose',
            chooseButtonText: 'Choose File',
            className: 'react-ui-file-input',
            clearButtonClassName: 'react-ui-file-input-clear',
            clearButtonText: 'Clear File',
            disabled: false,
            fileNameClassName: 'react-ui-file-input-file-name',
            onChooseClick: emptyFn,
            onClearClick: emptyFn,
            onFileChange: emptyFn
        };
    },

    getInitialState: function() {
        return {
            inputKey: 0,
            inputValue: ''
        };
    },

    render: function() {
        return (
            React.createElement("div", {className: this.props.className}, 
                this.renderHiddenInput(), 

                React.createElement("button", {
                className: this.props.chooseButtonClassName, 
                disabled: this.props.disabled, 
                onClick: this.onChooseClick, 
                type: "button"}, this.props.chooseButtonText), 

                React.createElement("button", {
                className: this.props.clearButtonClassName, 
                disabled: this.props.disabled, 
                onClick: this.onClearClick, 
                type: "button"}, this.props.clearButtonText), 

                React.createElement("input", {
                className: this.props.fileNameClassName, 
                disabled: this.props.disabled, 
                placeholder: this.props.placeholder, 
                readOnly: true, 
                type: "textbox", 
                value: this.state.inputValue})
            )
        );
    },

    /**
     * @method renderHiddenInput
     * Renders a hidden input to contain the file uploader.
     */
    renderHiddenInput: function() {
        var hiddenStyle = {display: 'none'};
        var key = 'hidden-input-' + this.state.inputKey;

        return (
            React.createElement("input", {
            key: key, 
            name: this.props.name, 
            onChange: this.onFileChange, 
            ref: "fileInput", 
            style: hiddenStyle, 
            type: "file"})
        );
    },

    /**
     * @method onChooseClick
     * Opens the file selection dialog by programmatically clicking the file input.
     * @param {Object} evt - The click event.
     */
    onChooseClick: function(evt) {
        evt.preventDefault();
        this.refs.fileInput.getDOMNode().click();
        this.props.onChooseClick(evt);
    },

    /**
     * @method onClearClick
     * Clears the file input increasing the id on the input key.
     * Clears the file name by emptying the input value.
     * @param {Object} evt - The click event.
     */
    onClearClick: function(evt) {
        evt.preventDefault();
        this.setState({
            inputKey: this.state.inputKey + 1,
            inputValue: ''
        });
        this.props.onClearClick(evt);
    },

    /**
     * @method onFileChange
     * Sets the input value to the file name when a file is chosen.
     * @param {Object} evt - The click event.
     */
    onFileChange: function(evt) {
        this.setState({
            inputValue: evt.target.value.split('\\').pop()
        });
        this.props.onFileChange(evt);
    }
});

module.exports = FileInput;

},{}],18:[function(require,module,exports){
/**
 * @class Cell
 * Renders a cell for the grid.
 */
var Cell = React.createClass({displayName: "Cell",
    render: function() {
        return (
            React.createElement("td", {
            className: this.props.className, 
            onClick: this.onClick}, 
                this.getData()
            )
        );
    },

    /**
     * @method getData
     * Gets data for a given record and column.
     * Attemps to use the column.render method, then falls back to column.dataProp.
     * @returns {*} - The render method result or record data.
     */
    getData: function() {
        var column = this.props.column;
        var record = this.props.record;

        if (typeof column.render === 'function') {
            return column.render(record);
        }

        return record[column.dataProp];
    },

    /**
     * @method onClick
     * Calls the click handler when the cell is clicked.
     */
    onClick: function(evt) {
        this.props.onClick(
            this.props.record,
            this.props.column,
            this.props.rowIndex,
            this.props.columnIndex,
            evt
        );
    }
});

module.exports = Cell;

},{}],19:[function(require,module,exports){
var Header = require('./Header');
var Row = require('./Row');

/** @method emptyFn - Default handler for all events */
var emptyFn = function() {};

/**
 * @class Grid
 * A grid for rendering data.
 */
var Grid = React.createClass({displayName: "Grid",
    propTypes: {

        /** @prop {*[]} data - An array of data for the grid. */
        data: React.PropTypes.array.isRequired,

        /** @prop {Object[]} columns - An array of column objects for the grid. */
        columns: React.PropTypes.array.isRequired,

        /** @prop {String} cellClassName - The className of the grid's cells. */
        cellClassName: React.PropTypes.string,

        /** @prop {String} clickedHeaderClassName - The className appended to the last clicked grid header. */
        clickedHeaderClassName: React.PropTypes.string,

        /** @prop {String} gridClassName - The className of the grid. */
        gridClassName: React.PropTypes.string,

        /** @prop {String} headerClassName - The className of the grid's headers. */
        headerClassName: React.PropTypes.string,

        /** @prop {Function} onHeaderClick - The method called when a grid header is clicked. */
        onHeaderClick: React.PropTypes.func,

        /** @prop {Function} onCellClick - The method called when a grid cell is clicked. */
        onCellClick: React.PropTypes.func,

        /** @prop {String} rowClassName - The className of the grid's rows. */
        rowClassName: React.PropTypes.string,

        /** @prop {String} loadingMaskClassName - The className of the grid's loading mask. */
        loadingMaskClassName: React.PropTypes.string,

        /** @prop {Boolean} showLoading - True to show a loading mask. */
        showLoadingMask: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            cellClassName: 'react-ui-grid-cell',
            clickedHeaderClassName: 'react-ui-grid-header-clicked',
            gridClassName: 'react-ui-grid',
            headerClassName: 'react-ui-grid-header',
            loadingMaskClassName: 'react-ui-grid-loading-mask',
            onHeaderClick: emptyFn,
            onCellClick: emptyFn,
            rowClassName: 'react-ui-grid-row',
            showLoadingMask: false
        };
    },

    getInitialState: function() {
        return {
            clickedIndex: -1
        };
    },

    render: function() {
        return (
            React.createElement("div", {className: "react-ui-grid-wrapper"}, 
                this.renderLoadingMask(), 

                React.createElement("table", {className: this.props.gridClassName}, 
                    React.createElement("thead", null, 
                        React.createElement("tr", {className: this.props.rowClassName}, 
                            this.renderHeaders()
                        )
                    ), 
                    React.createElement("tbody", null, 
                        this.renderRows()
                    )
                )
            )
        );
    },

    /**
     * @renderHeaders
     * Gets an array of header components for the grid.
     * @returns {Object[]} - An array of Header components.
     */
    renderHeaders: function() {
        return this.props.columns.map(function(column, columnIndex) {
            return (
                React.createElement(Header, {
                className: this.props.headerClassName, 
                clickedClassName: this.props.clickedHeaderClassName, 
                clickedIndex: this.state.clickedIndex, 
                column: column, 
                columnIndex: columnIndex, 
                columns: this.props.columns, 
                key: columnIndex, 
                onClick: this.onHeaderClick})
            );
        }, this);
    },

    /**
     * @renderLoadingMask
     * Renders the loading mask if updating.
     * @returns {Object} - An loading mask component.
     */
    renderLoadingMask: function() {
        return this.props.showLoadingMask ? (
            React.createElement("div", {className: this.props.loadingMaskClassName}
            )
        ) : null;
    },

    /**
     * @renderRows
     * Gets an array of row components for the grid.
     * @returns {Object[]} - An array of Row components.
     */
    renderRows: function() {
        return this.props.data.map(function(record, rowIndex) {
            return (
                React.createElement(Row, {
                className: this.props.rowClassName, 
                cellClassName: this.props.cellClassName, 
                columns: this.props.columns, 
                key: rowIndex, 
                record: record, 
                onCellClick: this.props.onCellClick, 
                rowIndex: rowIndex})
            );
        }, this);
    },

    /**
     * @method onHeaderClick
     * Saves the index of the last clicked header as component state.
     * Calls the onHeaderClick handler.
     * @param {Object} column - The clicked column.
     * @param {Number} columnIndex - The index of the clicked column.
     * @param {Boolean} reverse - True if the header has been clicked an odd number of times.
     */
    onHeaderClick: function(column, columnIndex, reverse) {
        this.setState({clickedIndex: columnIndex});
        this.props.onHeaderClick(column, columnIndex, reverse);
    }
});

module.exports = Grid;

},{"./Header":20,"./Row":21}],20:[function(require,module,exports){
/**
 * @class Header
 * Renders a header for the grid.
 */
var Header = React.createClass({displayName: "Header",
    getInitialState: function() {
        return {
            numClicks: 0
        };
    },

    render: function() {
        return (
            React.createElement("th", {className: this.getClassName(), onClick: this.onClick}, 
                this.props.column.name
            )
        );
    },

    /**
     * @method getClassName
     * Gets the class name based on if this column is the most currently clicked.
     */
    getClassName: function() {
        var className = this.props.className;

        if (this.props.clickedIndex === this.props.columnIndex) {
            className += ' ' + this.props.clickedClassName;

            if (this.state.numClicks > 0 && this.state.numClicks % 2 === 0) {
                className += '-reverse';
            }
        }

        return className;
    },

    /**
     * @method onClick
     * Calls the onClick handler passed from the Grid.
     * Sets the reverse state of the header.
     */
    onClick: function() {
        if (this.props.column.ignoreHeaderClick) {
            return;
        }

        this.props.onClick(
            this.props.column,
            this.props.columnIndex,
            this.state.numClicks % 2 !== 0
        );
        this.setState({numClicks: this.state.numClicks + 1});
    }
});

module.exports = Header;

},{}],21:[function(require,module,exports){
var Cell = require('./Cell');

/**
 * @class Row
 * Renders a row of cells for the grid.
 */
var Row = React.createClass({displayName: "Row",
    render: function() {
        return (
            React.createElement("tr", {className: this.props.className}, 
                this.renderCell()
            )
        );
    },

    /**
     * @renderCell
     * Gets an array of cell components for the row.
     * @returns {Object[]} - An array of Cell components.
     */
    renderCell: function() {
        return this.props.columns.map(function(column, columnIndex) {
            return (
                React.createElement(Cell, {
                className: this.props.cellClassName, 
                column: column, 
                columns: this.props.columns, 
                columnIndex: columnIndex, 
                onClick: this.props.onCellClick, 
                key: columnIndex, 
                record: this.props.record, 
                rowIndex: this.props.rowIndex})
            );
        }, this);
    }
});

module.exports = Row;

},{"./Cell":18}]},{},[1]);