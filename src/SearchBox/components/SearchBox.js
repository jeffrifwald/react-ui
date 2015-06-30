import React from 'react';

import {
    BLUR_DELAY_MS,
    debounce,
    getClassName,
    noop,
    request
} from '../../utils';


class SearchBox extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            showDropDown: false,
            results: []
        };
        this.onResponse = this.onResponse.bind(this);
        this.onDropDownClick = this.onDropDownClick.bind(this);
        this.delayBlur = debounce(
            this.onBlur.bind(this),
            BLUR_DELAY_MS
        );
        this.delaySearch = debounce(
            this.onSearch.bind(this),
            this.props.delay
        );
    }

    componentWillUnmount() {
        this.delayBlur.cancel();
        this.delaySearch.cancel();
    }

    render() {
        const className = getClassName(
            'react-ui-search-box',
            this.props.className
        );

        return (
            <div className={className}>
                <input
                onBlur={this.delayBlur}
                onChange={this.delaySearch}
                placeholder={this.props.placeholder}
                ref="search"
                type="text" />

                {this.renderDropDown()}
            </div>
        );
    }

    renderDropDown() {
        if (!this.state.showDropDown) {
            return null;
        }

        const dropDownClassName = getClassName(
            'react-ui-search-box-drop-down',
            this.props.resultsWapperClassName
        );
        const resultClassName = getClassName(
            'react-ui-search-box-result',
            this.props.resultClassName
        );
        const results = (this.state.results || []).map((result, i) => (
            <div
            className={resultClassName}
            key={i}
            onClick={this.onResultClick.bind(this, result)}>
                {this.props.renderResult(result)}
            </div>
        ));

        return (
            <div
            className={dropDownClassName}
            onClick={this.onDropDownClick}>
                {results}
            </div>
        );
    }

    onBlur() {
        this.hideDropDown();
    }

    onResultClick(result, evt) {
        this.delayBlur.cancel();
        this.props.onResultClick(evt, result);
        this.select(result);
        this.hideDropDown();
    }

    onDropDownClick(evt) {
        this.props.onDropDownClick(evt);
        this.delayBlur.cancel();
    }

    onResponse(err, req) {
        const results = this.props.parseResults(req);

        this.props.onResponse(err, req, results);
        this.setState({
            results: results,
            showDropDown: true
        });
    }

    onSearch(evt) {
        const value = React.findDOMNode(this.refs.search).value;
        const url = this.getUrl(value);

        if (value) {
            this.props.onSearch(evt, url);
            request.get(url, this.onResponse);
        } else {
            this.hideDropDown();
        }
    }

    getUrl(query) {
        return this.props.queryParam ? (
            `${this.props.url}?${this.props.queryParam}=${query}`
        ) : (
            this.props.url
        );
    }

    select(result) {
        this.setState({value: result});
    }

    hideDropDown() {
        this.setState({showDropDown: false});
    }

    showDropDown() {
        this.setState({showDropDown: true});
    }
}

SearchBox.propTypes = {
    className: React.PropTypes.string,
    delay: React.PropTypes.number,
    dropDownClassName: React.PropTypes.string,
    name: React.PropTypes.string,
    onResponse: React.PropTypes.func,
    onResultClick: React.PropTypes.func,
    onSearch: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    resultClassName: React.PropTypes.string,
    renderResult: React.PropTypes.func,
    url: React.PropTypes.string
};

SearchBox.defaultProps = {
    delay: 400,
    onDropDownClick: noop,
    onResultClick: noop,
    onResponse: noop,
    onSearch: noop,
    placeholder: '',
    parseResults: (req) => req,
    renderResult: (result) => result
};

export default SearchBox;
