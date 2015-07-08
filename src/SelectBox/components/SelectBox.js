import React from 'react';

import {
    BLUR_DELAY_MS,
    debounce,
    getClassName,
    noop
} from '../../utils';


class SelectBox extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            showDropDown: false,
            value: this.props.defaultValue
        };
        this.delayBlur = debounce(
            this.onBlur.bind(this),
            BLUR_DELAY_MS
        );
        this.delaySearch = debounce(
            this.onSearch.bind(this),
            this.props.delay
        );
        this.onClick = this.onClick.bind(this);
        this.onDropDownClick = this.onDropDownClick.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
    }

    render() {
        const className = getClassName(
            'react-ui-select-box',
            this.props.className,
            this.state.showDropDown ? 'react-ui-select-box-open' : ''
        );

        return (
            <div
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

    renderValue() {
        const className = getClassName(
            'react-ui-select-box-value',
            this.props.valueClassName,
            !this.state.value ? 'react-ui-select-box-placeholder' : ''
        );
        const display = (
            this.state.value ?
            this.state.value[this.props.displayProp] :
            this.props.placeholder
        );
        const value = (
            this.state.value ?
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

                {display}
            </span>
        );
    }

    renderDropDown() {
        if (!this.state.showDropDown) {
            return null;
        }

        const className = getClassName(
            'react-ui-select-box-drop-down',
            this.props.dropDownClassName
        );

        return (
            <div
            className={className}
            onDropDownClick={this.onDropDownClick}>
                {this.renderSearch()}
                {this.renderOptions()}
            </div>
        );
    }

    renderClear() {
        const className = getClassName(
            'react-ui-select-box-clear',
            this.props.clearClassName
        );

        return this.state.value ? (
            <span
            className={className}
            onClick={this.onClearClick}>
            </span>
        ) : null;
    }

    renderTrigger() {
        const className = getClassName(
            'react-ui-select-box-trigger',
            this.props.triggerClassName
        );

        return (<span className={className}></span>);
    }

    renderSearch() {
        const options = this.props.options || (
            this.props.children && this.props.children.length !== undefined ?
            this.props.children : [this.props.children]
        );
        const className = getClassName(
            'react-ui-select-box-search',
            this.props.searchClassName
        );

        return options.length >= this.props.searchThreshold ? (
            <div className={className}>
                <input
                onClick={this.onSearchClick}
                onChange={this.delaySearch}
                ref="search"
                type="text" />
            </div>
        ) : null;
    }

    renderOptions() {
        return this.getOptions().map((option, i) => {
            const className = getClassName(
                'react-ui-select-box-option',
                this.props.optionClassName,
                (
                    this.isOptionSelected(option) ?
                    'react-ui-select-box-option-selected' :
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
        this.props.onChange(evt, option);

        this.setState({value: option});
    }

    onClearClick(evt) {
        evt.stopPropagation();
        this.props.onClearClick(evt);
        this.clear();
    }

    onClick(evt) {
        this.props.onClick(evt, this.state.showDropDown);

        if (this.state.showDropDown) {
            this.hideDropDown();
        } else {
            this.showDropDown();
        }
    }

    onDropDownClick() {
        this.delayBlur.cancel();
    }

    onBlur() {
        this.hideDropDown();
        this.clearQuery();
    }

    onSearch() {
        const query = React.findDOMNode(
            this.refs.search
        ).value.toLowerCase();

        this.props.onSearch(query);
        this.setState({query});
    }

    onSearchClick(evt) {
        evt.stopPropagation();
        this.delayBlur.cancel();
    }

    getOptions() {
        let options = this.props.options || (
            this.props.children && this.props.children.length !== undefined ?
            this.props.children : [this.props.children]
        ).filter(
            (child) => child && child.type === 'option'
        ).map((child) => ({
            [this.props.displayProp]: child.props.children,
            [this.props.valueProp]: child.props.value || child.props.children
        }));

        return this.state.query ? options.filter(
            option => option[this.props.displayProp].toLowerCase().includes(
                this.state.query
            )
        ) : options;
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

    clear() {
        this.setState({value: undefined});
    }

    clearQuery() {
        this.setState({query: ''});
    }

    hideDropDown() {
        this.setState({showDropDown: false});
    }

    showDropDown() {
        this.setState({showDropDown: true});
    }
}

SelectBox.propTypes = {
    className: React.PropTypes.string,
    clearClassName: React.PropTypes.string,
    displayProp: React.PropTypes.string,
    dropDownClassName: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onClearClick: React.PropTypes.func,
    onClick: React.PropTypes.func,
    options: React.PropTypes.array,
    optionClassName: React.PropTypes.string,
    renderOption: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    searchThreshold: React.PropTypes.number,
    valueClassName: React.PropTypes.string,
    valueProp: React.PropTypes.string
};

SelectBox.defaultProps = {
    displayProp: 'display',
    onChange: noop,
    onClearClick: noop,
    onClick: noop,
    onSearch: noop,
    placeholder: '',
    remote: false,
    renderOption: noop,
    searchThreshold: 5,
    valueProp: 'value'
};

export default SelectBox;
