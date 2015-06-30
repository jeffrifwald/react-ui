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
            value: undefined
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
            this.state.value.display :
            this.props.placeholder
        );
        const value = (
            this.state.value ?
            this.state.value.value :
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
        if (this.props.children.length < this.props.searchThreshold) {
            return null;
        }

        const className = getClassName(
            'react-ui-select-box-search',
            this.props.searchClassName
        );

        return (
            <div className={className}>
                <input
                onClick={this.onSearchClick}
                onChange={this.delaySearch}
                ref="search"
                type="text" />
            </div>
        );
    }

    renderOptions() {
        const className = getClassName(
            'react-ui-select-box-option',
            this.props.optionClassName
        );
        const options = this.getOptions();

        return this.getOptions().map((option, i) => (
            <div
            className={className}
            key={i}
            onClick={this.onChange.bind(this, option)}>
                {option.display}
            </div>
        ));
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

    onClick() {
        this.props.onClick(this.state.showDropDown);

        if (this.state.showDropDown) {
            this.hideDropDown();
        } else {
            this.showDropDown();
        }
    }

    onDropDownClick(evt) {
        this.props.onDropDownClick(evt);
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

        this.setState({query});
    }

    onSearchClick(evt) {
        evt.stopPropagation();
        this.delayBlur.cancel();
    }

    getOptions() {
        const options = (this.props.children || []).filter(
            (child) => child.type === 'option'
        ).map((child) => ({
            display: child.props.children,
            value: child.props.value || child.props.children
        }));

        return this.state.query ? options.filter(
            option => option.display.toLowerCase().includes(this.state.query)
        ) : options;
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
    dropDownClassName: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onClearClick: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onDropDownClick: React.PropTypes.func,
    optionClassName: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    searchThreshold: React.PropTypes.number,
    valueClassName: React.PropTypes.string
};

SelectBox.defaultProps = {
    onChange: noop,
    onClearClick: noop,
    onClick: noop,
    onDropDownClick: noop,
    placeholder: '',
    searchThreshold: 5
};

export default SelectBox;
