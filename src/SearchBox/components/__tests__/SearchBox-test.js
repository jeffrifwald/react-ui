import {assert} from 'chai';
import React from 'react';
import {stub} from 'sinon';

import SearchBox from '../SearchBox';
import {request, TestUtils} from '../../../utils';


describe('SearchBox/SearchBox', () => {
    it('should render the correct top level elements', () => {
        const rendered = TestUtils.createComponent(
            <SearchBox />
        ).render();

        assert.equal(rendered.type, 'div');
    });

    it('should cancel timeouts when unmounted', () => {
        const component = TestUtils.createComponent(<SearchBox />);

        component.delayBlur = {cancel: stub()};
        component.delaySearch = {cancel: stub()};

        component.componentWillUnmount();
        assert.equal(component.delayBlur.cancel.callCount, 1);
        assert.equal(component.delaySearch.cancel.callCount, 1);
    });

    it('should render a drop down with results', () => {
        const component = TestUtils.createComponent(<SearchBox />);

        component.state.showDropDown = true;
        component.state.results = ['a', 'b', 'c'];

        const renderedDropDown = component.renderDropDown();

        assert.equal(renderedDropDown.props.children.length, 3);
    });

    it('should handle onBlur', () => {
        const component = TestUtils.createComponent(<SearchBox />);

        stub(component, 'hideDropDown');

        component.onBlur();
        assert.equal(component.hideDropDown.callCount, 1);

        component.hideDropDown.restore();
    });

    it('should handle onResultClick', () => {
        const onResultClick = stub();
        const component = TestUtils.createComponent(
            <SearchBox
            onResultClick={onResultClick} />
        );

        component.delayBlur = {cancel: stub()};
        stub(component, 'select');
        stub(component, 'hideDropDown');

        component.onResultClick('mock result', 'mock evt');
        assert.equal(component.delayBlur.cancel.callCount, 1);
        assert.equal(onResultClick.callCount, 1);
        assert.equal(component.select.callCount, 1);
        assert.equal(component.hideDropDown.callCount, 1);
        assert.isTrue(onResultClick.calledWith('mock evt', 'mock result'));
        assert.isTrue(component.select.calledWith('mock result'));

        component.select.restore();
        component.hideDropDown.restore();
    });

    it('should handle onDropDownClick', () => {
        const component = TestUtils.createComponent(<SearchBox />);

        component.delayBlur = {cancel: stub()};

        component.onDropDownClick();
        assert.equal(component.delayBlur.cancel.callCount, 1);
    });

    it('should handle onResponse', () => {
        const onResponse = stub();
        const parseResults = stub();
        const component = TestUtils.createComponent(
            <SearchBox
            onResponse={onResponse}
            parseResults={parseResults} />
        );

        stub(component, 'setState');
        parseResults.returns('mock results');

        component.onResponse('mock err', 'mock req');
        assert.equal(parseResults.callCount, 1);
        assert.equal(onResponse.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(parseResults.calledWith('mock req'));
        assert.isTrue(
            onResponse.calledWith('mock err', 'mock req', 'mock results')
        );
        assert.isTrue(component.setState.calledWith({
            results: 'mock results',
            showDropDown: true
        }));

        component.setState.restore();
    });

    it('should handle onResponse with no results', () => {
        const onResponse = stub();
        const parseResults = stub();
        const component = TestUtils.createComponent(
            <SearchBox
            onResponse={onResponse}
            parseResults={parseResults} />
        );

        stub(component, 'setState');
        parseResults.returns(null);

        component.onResponse('mock err', 'mock req');
        assert.equal(parseResults.callCount, 1);
        assert.equal(onResponse.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(parseResults.calledWith('mock req'));
        assert.isTrue(
            onResponse.calledWith('mock err', 'mock req', [])
        );
        assert.isTrue(component.setState.calledWith({
            results: [],
            showDropDown: true
        }));

        component.setState.restore();
    });

    it('should handle onSearch', () => {
        const mockNode = {value: 'mock value'};
        const onSearch = stub();
        const component = TestUtils.createComponent(
            <SearchBox onSearch={onSearch} />
        );

        stub(React, 'findDOMNode');
        stub(request, 'get');
        stub(component, 'getUrl');
        React.findDOMNode.returns(mockNode);
        component.getUrl.returns('/mock/url/');

        component.refs = {search: 'mock search ref'};
        component.onSearch('mock evt');
        assert.equal(React.findDOMNode.callCount, 1);
        assert.equal(component.getUrl.callCount, 1);
        assert.equal(onSearch.callCount, 1);
        assert.equal(request.get.callCount, 1);
        assert.isTrue(React.findDOMNode.calledWith('mock search ref'));
        assert.isTrue(onSearch.calledWith('mock evt', '/mock/url/'));
        assert.isTrue(request.get.calledWith(
            '/mock/url/',
            component.onResponse
        ));

        React.findDOMNode.restore();
        request.get.restore();
        component.getUrl.restore();
    });

    it('should handle onSearch without a value', () => {
        const mockNode = {value: ''};
        const onSearch = stub();
        const component = TestUtils.createComponent(
            <SearchBox onSearch={onSearch} />
        );

        stub(React, 'findDOMNode');
        stub(component, 'getUrl');
        stub(component, 'hideDropDown');
        React.findDOMNode.returns(mockNode);
        component.getUrl.returns('/mock/url/');

        component.refs = {search: 'mock search ref'};
        component.onSearch('mock evt');
        assert.equal(React.findDOMNode.callCount, 1);
        assert.equal(component.getUrl.callCount, 1);
        assert.equal(component.hideDropDown.callCount, 1);
        assert.isTrue(React.findDOMNode.calledWith('mock search ref'));

        React.findDOMNode.restore();
        component.getUrl.restore();
        component.hideDropDown.restore();
    });

    it('should get a url', () => {
        const component = TestUtils.createComponent(
            <SearchBox url="/mock/url/" />
        );

        assert.equal(component.getUrl(), '/mock/url/');
    });

    it('should get a url with a query param', () => {
        const component = TestUtils.createComponent(
            <SearchBox queryParam="query" url="/mock/url/" />
        );

        assert.equal(component.getUrl('cool'), '/mock/url/?query=cool');
    });

    it('should select', () => {
        const component = TestUtils.createComponent(
            <SearchBox queryParam="query" url="/mock/url/" />
        );

        stub(component, 'setState');

        component.select('mock value');
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({
            value: 'mock value'
        }));

        component.setState.restore();
    });

    it('should hide the drop down', () => {
        const component = TestUtils.createComponent(
            <SearchBox queryParam="query" url="/mock/url/" />
        );

        stub(component, 'setState');

        component.hideDropDown();
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({
            showDropDown: false
        }));

        component.setState.restore();
    });

    it('should show the drop down', () => {
        const component = TestUtils.createComponent(
            <SearchBox queryParam="query" url="/mock/url/" />
        );

        stub(component, 'setState');

        component.showDropDown();
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({
            showDropDown: true
        }));

        component.setState.restore();
    });

    it('should parse results', () => {
        const component = TestUtils.createComponent(
            <SearchBox />
        );

        assert.equal(
            component.props.parseResults('mock results'),
            'mock results'
        );
    });
});
