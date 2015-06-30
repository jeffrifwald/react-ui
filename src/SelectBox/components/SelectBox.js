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

        this.state = {showDropDown: false};
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
                {this.renderValue()}
                {this.renderDropDown()}
                {this.renderTrigger()}
            </div>
        );
    }

    renderValue() {
        const className = getClassName(
            'react-ui-select-box-value',
            this.props.valueClassName
        );
        const value = (
            this.state.value !== undefined ?
            this.state.value :
            this.props.placeholder
        );

        return (
            <span className={className}>
                {value}
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
                Search Box
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
            <div className={className} key={i}>
                {option}
            </div>
        ));
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
    }

    onSearch() {
        const query = React.findDOMNode(this.refs.search).value;

        this.setState({query});
    }

    getOptions() {
        return (this.props.children || []).filter(
            (child) => child.type === 'option'
        ).map((child) => ({
            name: child.props.children,
            value: child.props.value || child.props.children
        }));
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
    displayProp: React.PropTypes.string,
    dropDownClassName: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onClick: React.PropTypes.onClick,
    onDropDownClick: React.PropTypes.func,
    optionClassName: React.PropTypes.string,
    searchThreshold: React.PropTypes.number,
    valueClassName: React.PropTypes.string,
    valueProp: React.PropTypes.string
};

SelectBox.defaultProps = {
    onClick: noop,
    onDropDownClick: noop,
    placeholder: '',
    searchThreshold: 5
};

export default SelectBox;
