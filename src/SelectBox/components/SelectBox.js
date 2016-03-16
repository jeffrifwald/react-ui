import React from 'react';

import {
    BLUR_DELAY_MS,
    debounce,
    getClassName,
    KEY_CODES,
    noop
} from '../../utils';


class SelectBox extends React.Component {
    constructor(...args) {
        // Call the parent constructor
        super(...args);

        // Setup the initial state
        this.state = {
            highlightedIndex: -1,
            showDropDown: false,
            value: this.props.defaultValue,
            query: '',
            dropDownTop: null,
            dropDownPosition: 'bottom'
        };

        // Debounce the blur method
        this.delayBlur = debounce(
            this.onBlur.bind(this),
            BLUR_DELAY_MS
        );

        // Debounce the search delay method
        this.onSearchDelay = debounce(
            this.onSearchDelay.bind(this),
            this.props.delay
        );

        // Bind any listeners
        this.onClick = this.onClick.bind(this);
        this.onDropDownMouseDown = this.onDropDownMouseDown.bind(this);
        this.onDropDownMouseUp = this.onDropDownMouseUp.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSearchFocus = this.onSearchFocus.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
        this.canHideDropDown = true;
    }

    componentWillUnmount() {
        this.delayBlur.cancel();
        this.onSearchDelay.cancel();
    }

    /**
     * Called when the component will receive props. Determine if we need
     * to update the value or any additional internal state
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.hasOwnProperty('value') && nextProps.value !== this.state.value) {
            console.log('set value from props');
            //this.setValue(nextProps.value);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Determine if we should reposition
        let allowPositionChange = (this.state.showDropDown && this.state.showDropDown !== prevState.showDropDown);
        if (this.state.showDropDown) {
            this.positionDropDown(allowPositionChange);
        }
    }

    render() {
        const className = getClassName(
            'react-ui-select-box',
            this.props.className,
            this.state.showDropDown ? 'react-ui-select-box-open' : '',
            this.props.disabled ? 'react-ui-select-box-disabled' : ''
        );

        return (
            <div
            ref="el"
            className={className}
            onBlur={this.delayBlur}
            onClick={this.onClick}
            tabIndex={9999}>
                <div className="react-ui-select-box-inner">
                    {this.renderValue()}

                    <div className="react-ui-select-box-controls">
                        {this.renderClear()}
                        {this.renderTrigger()}
                    </div>
                </div>
                {this.renderDropDown()}
            </div>
        );
    }

    /**
     * Render the value element of the select box. This will
     * render the hidden input value as well as the value/placeholder
     * @returns {XML}
     */
    renderValue() {
        const className = getClassName(
            'react-ui-select-box-value',
            this.props.valueClassName,
            !this.hasValue() ? 'react-ui-select-box-placeholder' : ''
        );
        const value = (
            this.hasValue() ?
            this.state.value[this.props.valueProp] :
            this.state.value
        );

        return (
            <span className={className}>
                <input
                disabled={this.props.disabled}
                name={this.props.name}
                type="hidden"
                value={value} />
                {this.renderDisplay()}
            </span>
        );
    }

    /**
     * Render the display element. This could be the text value, or the search bar
     */
    renderDisplay() {
        let display = (
            this.hasValue() ?
            this.state.value[this.props.displayProp] :
            this.props.placeholder
        );

        // Get the search component
        let search = this.renderSearch();
        return search && this.state.showDropDown ? search : display;
    }

    /**
     * Render the drop down element. This will contain the options for the user to select from
     * @returns {*}
     */
    renderDropDown() {
        // Compute the class names for the drop down
        const className = getClassName(
            'react-ui-select-box-drop-down',
            this.props.dropDownClassName,
            `react-ui-select-box-drop-down-align-${this.props.dropDownAlign}`,
            this.state.showDropDown ? 'visible' : 'hidden'
        );

        // Compute the options class names
        const optionsClassName = getClassName(
            'react-ui-select-box-options',
            this.props.optionsClassName
        );

        // Compute any styles
        let dropDownStyle = {};
        if (!this.state.showDropDown) {
            Object.assign(dropDownStyle, {
                visibility: 'hidden',
                opacity: 0,
                width: 0,
                height: 0,
                overflow: 'hidden'
            });
        }
        if (this.state.dropDownTop) {
            dropDownStyle.top = this.state.dropDownTop;
        }

        // Return the rendered drop down
        return (
            <div
            ref="dropDown"
            style={dropDownStyle}
            className={className}
            onMouseDown={this.onDropDownMouseDown}
            onMouseUp={this.onDropDownMouseUp}>
                <div className={optionsClassName}>
                    {this.renderOptions()}
                </div>
            </div>
        );
    }

    /**
     * Render the clear button
     * @returns {*}
     */
    renderClear() {
        // Build the class names for the clear button
        const className = getClassName(
            'react-ui-select-box-clear',
            this.props.clearClassName
        );

        // Render the clear button
        return this.shouldShowClear() ? (
            <span
            ref="clear"
            className={className}
            onClick={this.onClearClick}>
            </span>
        ) : null;
    }

    /**
     * Render the trigger
     * @returns {*}
     */
    renderTrigger() {
        // Build the class names for the trigger button
        const className = getClassName(
            'react-ui-select-box-trigger',
            this.props.triggerClassName
        );

        return this.shouldShowTrigger() ? (
            <span className={className} />
        ) : null;
    }

    /**
     * Render the search box
     * @returns {*}
     */
    renderSearch() {
        const className = getClassName(
            'react-ui-select-box-search',
            this.props.searchClassName
        );
        const options = this.getOptions();
        const filteredOptions = this.filterOptions(options);

        return options.length >= this.props.searchThreshold ? (
            <div className={className}>
                <input
                autoFocus={true}
                onClick={this.onSearchFocus}
                onFocus={this.onSearchFocus}
                onChange={this.onSearch}
                onKeyDown={this.onSearchKeyDown.bind(this, filteredOptions)}
                value={this.state.query}
                ref="search"
                type="text" />
            </div>
        ) : null;
    }

    renderOptions() {
        return this.filterOptions().map((option, i) => {
            const className = getClassName(
                'react-ui-select-box-option',
                this.props.optionClassName,
                (
                    this.isOptionSelected(option) ?
                    'react-ui-select-box-option-selected' :
                    ''
                ),
                (
                    i === this.state.highlightedIndex ?
                    'react-ui-select-box-option-highlighted' :
                    ''
                )
            );

            return (
                <div
                className={className}
                key={i}
                onClick={this.onChange.bind(this, option)}>
                    {this.renderOption(option)}
                </div>
            );
        });
    }

    renderOption(option) {
        return (
            this.props.renderOption(option) ||
            option[this.props.displayProp]
        );
    }

    onChange(option, evt) {
        this.delayBlur.cancel();
        this.props.onChange(evt, option);
        this.setValue(option);
        console.log('on change');
        console.log(option);
    }

    onClearClick(evt) {
        evt.stopPropagation();
        this.props.onClearClick(evt);
        this.clear();
    }

    onClick(evt) {
        if (!this.props.disabled) {
            this.props.onClick(evt, this.state.showDropDown);

            if (this.state.showDropDown) {
                this.hideDropDown();
            } else {
                this.showDropDown();
            }
        }
    }

    onDropDownMouseDown() {
        this.canHideDropDown = false;
    }

    onDropDownMouseUp() {
        this.canHideDropDown = true;
    }

    onBlur() {
        if (this.canHideDropDown) {
            this.hideDropDown();
        }
    }

    /**
     * Event listener for when the search value is changed
     */
    onSearch() {
        this.setQuery(this.refs.search.value.toLowerCase());
    }

    /**
     * A delayed method that will call the props onSearch in a buffered manner
     */
    onSearchDelay() {
        this.props.onSearch(this.state.query);
    }

    onSearchFocus(event) {
        event.target.value = this.state.query;

        // Stop the propagation
        event.stopPropagation();

        // Cancel the delayed blur
        this.delayBlur.cancel();
    }

    onSearchKeyDown(options, evt) {
        if (evt.keyCode === KEY_CODES.ENTER && this.state.highlightedIndex > -1) {
            this.onChange(
                options[this.state.highlightedIndex],
                evt
            );
        } else if (evt.keyCode === KEY_CODES.ARROW_DOWN) {
            this.highlightIndex(this.state.highlightedIndex + 1, options);
        } else if (evt.keyCode === KEY_CODES.ARROW_UP) {
            this.highlightIndex(this.state.highlightedIndex - 1, options);
        }
    }

    /**
     * Determine if we have a value other than null and undefined
     */
    hasValue() {
        return (
            this.state.value !== null &&
            this.state.value !== undefined &&
            this.state.value !== '' &&
            this.state.value[this.props.valueProp] !== null &&
            this.state.value[this.props.valueProp] !== undefined
        );
    }

    /**
     * Set the value
     * @param value
     */
    setValue(value) {
        // Hide the drop down, update the highlighted index and set the value
        this.setState({
            highlightedIndex: -1,
            showDropDown: false,
            value: value
        });
    }

    /**
     * Set the query value
     * @param query
     */
    setQuery(query) {
        // Sets the query value
        this.setState({
            query: query
        },() => {
            this.onSearchDelay();
        });
    }

    /**
     * Determine if we should show the clear button
     */
    shouldShowClear() {
        return (
            this.props.showClear &&
            this.hasValue() &&
            !this.props.disabled
        );
    }

    /**
     * Determine if we should show the trigger button
     */
    shouldShowTrigger() {
        return !this.shouldShowClear();
    }

    getOptions() {
        return this.props.options || (
            this.props.children && this.props.children.length !== undefined ?
            this.props.children : [this.props.children]
        ).filter(
            (child) => child && child.type === 'option'
        ).map((child) => ({
            [this.props.displayProp]: child.props.children,
            [this.props.valueProp]: child.props.value || child.props.children
        }));
    }

    filterOptions(options) {
        const filteredOptions = options || this.getOptions();

        return this.state.query ? filteredOptions.filter(
            option => option[this.props.displayProp].toLowerCase().indexOf(
                this.state.query
            ) >= 0
        ) : filteredOptions;
    }

    isOptionSelected(option) {
        const value = this.state.value;

        return !!(
            option &&
            value &&
            option[this.props.valueProp] === value[this.props.valueProp] &&
            option[this.props.displayProp] === value[this.props.displayProp]
        );
    }

    highlightIndex(index, options) {
        let highlightedIndex = index;

        if (highlightedIndex >= options.length) {
            highlightedIndex = options.length - 1;
        }

        if (highlightedIndex < 0) {
            highlightedIndex = 0;
        }

        this.setState({highlightedIndex: highlightedIndex});
    }

    /**
     * Clear the selection
     */
    clear() {
        // Cancel the blur
        this.delayBlur.cancel();

        // Update the value
        this.setValue(undefined);

        // Clear the query
        this.clearQuery();
    }

    /**
     * Clear the query param
     */
    clearQuery() {
        this.setQuery('');
    }

    /**
     * Hide the drop down component
     */
    hideDropDown() {
        this.setState({
            showDropDown: false
        });
    }

    /**
     * Show the drop down component
     */
    showDropDown() {
        this.setState({
            showDropDown: true,
            dropDownTop: null,
            dropDownPosition: 'bottom'
        });
    }

    getViewportDimensions() {
        let w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0];

        return {
            width: w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height: w.innerHeight || documentElement.clientHeight|| body.clientHeight
        }
    }

    positionDropDown(allowPositionChange=false) {
        // Get the dimensions of the main element
        let elDimensions = this.refs.el.getBoundingClientRect();

        // Get the dimensions of the drop down
        let dropDownDimensions = this.refs.dropDown.getBoundingClientRect();

        // Get the viewport dimensions
        let viewportDimensions = this.getViewportDimensions();

        // Check if we have bottom overflow
        let bottomOverflow = dropDownDimensions.bottom > viewportDimensions.height;

        // Compute how much room we have on the top
        let topSpace = elDimensions.top;

        // Compute how much room we have on the bottom
        let bottomSpace = viewportDimensions.height - elDimensions.bottom;

        // Check if we do not have enough room on the bottom, but we do on the top
        // If we do update the drop down position to be at the top
        if (
            allowPositionChange &&
            bottomOverflow &&
            bottomSpace < dropDownDimensions.height &&
            topSpace >= dropDownDimensions.height
        ) {
            this.setState({
                dropDownTop: -(dropDownDimensions.height),
                dropDownPosition: 'top'
            });
        }

        // If we are not allowing a position change and the position is top, reposition
        if (!allowPositionChange && this.state.dropDownPosition === 'top') {
            let top = -(dropDownDimensions.height);
            if (top !== this.state.dropDownTop) {
                this.setState({
                    dropDownTop: -(dropDownDimensions.height)
                });
            }
        }
    }
}

SelectBox.propTypes = {
    /**
     * The additional class name to use for the component
     */
    className: React.PropTypes.string,

    /**
     * The class name to use for the clear button
     */
    clearClassName: React.PropTypes.string,

    /**
     * The property to use for the display
     */
    displayProp: React.PropTypes.string,

    /**
     * The class name to add to the drop down element
     */
    dropDownClassName: React.PropTypes.string,

    /**
     * Where to position the drop down relative to the input box
     * @default left
     */
    dropDownAlign: React.PropTypes.oneOf(['left', 'right']),

    /**
     * The name of the html input field
     */
    name: React.PropTypes.string,

    /**
     * Callback method that is triggered when the value changes
     */
    onChange: React.PropTypes.func,

    /**
     * Callback method that is triggered when the clear button is clicked
     */
    onClearClick: React.PropTypes.func,

    /**
     * Callback method when an item is clicked
     */
    onClick: React.PropTypes.func,

    /**
     * The options to display in the drop down
     */
    options: React.PropTypes.array,

    /**
     * Additional class name to add to each option
     */
    optionClassName: React.PropTypes.string,

    /**
     * Additional class name to add to the options container element
     */
    optionsClassName: React.PropTypes.string,

    /**
     * Method used to render and return an option node
     */
    renderOption: React.PropTypes.func,

    /**
     * Placeholder text for when the input field is empty
     */
    placeholder: React.PropTypes.string,

    /**
     * How many characters must be typed before a search occurs
     */
    searchThreshold: React.PropTypes.number,

    /**
     * True to show the clean button
     */
    showClear: React.PropTypes.bool,

    /**
     * Additional class name to add onto the value container element
     */
    valueClassName: React.PropTypes.string,

    /**
     * The property to use for the value
     */
    valueProp: React.PropTypes.string
};

SelectBox.defaultProps = {
    delay: 400,
    disabled: false,
    displayProp: 'display',
    dropDownAlign: 'left',
    onChange: noop,
    onClearClick: noop,
    onClick: noop,
    onSearch: noop,
    placeholder: '',
    remote: false,
    renderOption: noop,
    searchThreshold: 5,
    showClear: true,
    valueProp: 'value'
};

export default SelectBox;
