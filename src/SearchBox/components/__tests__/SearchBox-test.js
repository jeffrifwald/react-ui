import {assert} from 'chai';
import React from 'react';
import {stub} from 'sinon';

import SearchBox from '../SearchBox';
import {KEY_CODES, request, TestUtils} from '../../../utils';


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

    it('should render a drop down with a selected result', () => {
        const component = TestUtils.createComponent(<SearchBox />);

        component.state.showDropDown = true;
        component.state.results = ['a', 'b', 'c'];
        component.state.selectedIndex = 1;

        const renderedDropDown = component.renderDropDown();

        assert.equal(renderedDropDown.props.children.length, 3);
        assert.equal(
            renderedDropDown.props.children[1].props.className,
            'react-ui-search-box-result react-ui-search-box-result-selected'
        );
    });

    it('should handle onBlur', () => {
        const component = TestUtils.createComponent(<SearchBox />);

        stub(component, 'hideDropDown');

        component.onBlur();
        assert.equal(component.hideDropDown.callCount, 1);

        component.canHideDropDown = false;
        component.onBlur();
        assert.equal(component.hideDropDown.callCount, 1);

        component.hideDropDown.restore();
    });

    it('should handle onKeyDown', () => {
        const mockEvt = {};
        const component = TestUtils.createComponent(<SearchBox />);

        stub(component, 'onChange');
        stub(component, 'selectIndex');

        component.onKeyDown(mockEvt);
        assert.equal(component.onChange.callCount, 0);
        assert.equal(component.selectIndex.callCount, 0);

        mockEvt.keyCode = KEY_CODES.ARROW_DOWN;
        component.onKeyDown(mockEvt);
        assert.equal(component.onChange.callCount, 0);
        assert.equal(component.selectIndex.callCount, 1);
        assert.isTrue(component.selectIndex.calledWith(0));

        mockEvt.keyCode = KEY_CODES.ARROW_UP;
        component.onKeyDown(mockEvt);
        assert.equal(component.onChange.callCount, 0);
        assert.equal(component.selectIndex.callCount, 2);
        assert.isTrue(component.selectIndex.calledWith(-2));

        mockEvt.keyCode = KEY_CODES.ENTER;
        component.state.selectedIndex = 1;
        component.state.results = ['a', 'b', 'c'];
        component.onKeyDown(mockEvt);
        assert.equal(component.onChange.callCount, 1);
        assert.equal(component.selectIndex.callCount, 2);
        assert.isTrue(component.onChange.calledWith('b', mockEvt));

        component.onChange.restore();
        component.selectIndex.restore();
    });

    it('should handle onChange', () => {
        const onChange = stub();
        const component = TestUtils.createComponent(
            <SearchBox
            onChange={onChange} />
        );
        const mockEvt = {stopPropagation: stub()};

        component.delayBlur = {cancel: stub()};
        stub(component, 'select');
        stub(component, 'hideDropDown');

        component.onChange('mock result', mockEvt);
        assert.equal(component.delayBlur.cancel.callCount, 1);
        assert.equal(onChange.callCount, 1);
        assert.equal(component.select.callCount, 1);
        assert.equal(component.hideDropDown.callCount, 1);
        assert.isTrue(onChange.calledWith(mockEvt, 'mock result'));
        assert.isTrue(component.select.calledWith('mock result'));

        component.select.restore();
        component.hideDropDown.restore();
    });

    it('should handle onDropDownMouseDown and onDropDownMouseUp', () => {
        const component = TestUtils.createComponent(<SearchBox />);

        assert.isTrue(component.canHideDropDown);
        component.onDropDownMouseDown();
        assert.isFalse(component.canHideDropDown);
        component.onDropDownMouseUp();
        assert.isTrue(component.canHideDropDown);
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
            selectedIndex: -1,
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
            selectedIndex: -1,
            showDropDown: true
        }));

        component.setState.restore();
    });

    it('should handle onSearch', () => {
        const mockNode = {value: 'mock value'};
        const onSearch = stub();
        const getUrl = () => '/mock/url/';
        const component = TestUtils.createComponent(
            <SearchBox
            getUrl={getUrl}
            onSearch={onSearch} />
        );

        stub(React, 'findDOMNode');
        stub(request, 'get');
        React.findDOMNode.returns(mockNode);

        component.refs = {search: 'mock search ref'};
        component.onSearch('mock evt');
        assert.equal(React.findDOMNode.callCount, 1);
        assert.equal(onSearch.callCount, 1);
        assert.equal(request.get.callCount, 1);
        assert.isTrue(React.findDOMNode.calledWith('mock search ref'));
        assert.isTrue(request.get.calledWith(
            '/mock/url/',
            component.onResponse
        ));

        React.findDOMNode.restore();
        request.get.restore();
    });

    it('should handle onSearch without a value', () => {
        const mockNode = {value: ''};
        const onSearch = stub();
        const component = TestUtils.createComponent(
            <SearchBox onSearch={onSearch} />
        );

        stub(React, 'findDOMNode');
        stub(component, 'hideDropDown');
        React.findDOMNode.returns(mockNode);

        component.refs = {search: 'mock search ref'};
        component.onSearch('mock evt');
        assert.equal(React.findDOMNode.callCount, 1);
        assert.equal(component.hideDropDown.callCount, 1);
        assert.isTrue(React.findDOMNode.calledWith('mock search ref'));

        React.findDOMNode.restore();
        component.hideDropDown.restore();
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

    it('should select an index', () => {
        const component = TestUtils.createComponent(
            <SearchBox queryParam="query" url="/mock/url/" />
        );

        stub(component, 'setState');
        component.state.results = ['a', 'b', 'c'];

        component.selectIndex(1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({
            selectedIndex: 1
        }));

        component.selectIndex(-2);
        assert.equal(component.setState.callCount, 2);
        assert.isTrue(component.setState.calledWith({
            selectedIndex: 0
        }));

        component.selectIndex(10);
        assert.equal(component.setState.callCount, 3);
        assert.isTrue(component.setState.calledWith({
            selectedIndex: 2
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
