import {assert} from 'chai';
import React from 'react';
import {stub} from 'sinon';

import SelectBox from '../SelectBox';
import {KEY_CODES, TestUtils} from '../../../utils';

describe('SelectBox/SelectBox', () => {
    it('should render the correct top level elements', () => {
        const rendered = TestUtils.createComponent(
            <SelectBox>
                <option>1</option>
            </SelectBox>
        ).render();

        assert.equal(rendered.type, 'div');
        assert.equal(rendered.props.className, 'react-ui-select-box');
        assert.equal(rendered.props.children.length, 2);
    });

    it('should cancel timeouts when unmounted', () => {
        const component = TestUtils.createComponent(<SelectBox />);

        component.delayBlur = {cancel: stub()};
        component.delaySearch = {cancel: stub()};

        component.componentWillUnmount();
        assert.equal(component.delayBlur.cancel.callCount, 1);
        assert.equal(component.delaySearch.cancel.callCount, 1);
    });

    it('should render a value', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );

        component.state.value = {display: 'Cool', value: 55};

        const renderedValue = component.renderValue();

        assert.equal(renderedValue.type, 'span');
        assert.equal(renderedValue.props.children[0].type, 'input');
        assert.equal(renderedValue.props.children[0].props.value, 55);
        assert.equal(renderedValue.props.children[1], 'Cool');
    });

    it('should not render a search box under the threshold', () => {
        const options = [{display: 1, value: 1}, {display: 2, value: 2}];
        const component = TestUtils.createComponent(
            <SelectBox searchThreshold={1}>
                <option>1</option>
                <option>2</option>
            </SelectBox>
        );
        const search = component.renderSearch(options);

        assert.equal(search.type, 'div');
        assert.equal(search.props.children.type, 'input');
    });

    it('should render with an open drop down', () => {
        const component = TestUtils.createComponent(
            <SelectBox>
                <option>1</option>
            </SelectBox>
        );

        component.state.showDropDown = true;

        const rendered = component.render();

        assert.equal(
            rendered.props.className,
            'react-ui-select-box react-ui-select-box-open'
        );
    });

    it('should render with an open drop down with one child', () => {
        const component = TestUtils.createComponent(
            <SelectBox>
                <option>1</option>
            </SelectBox>
        );

        component.state.showDropDown = true;

        const renderedDropDown = component.renderDropDown();
        const renderedOptions = renderedDropDown.props.children[1];

        assert.equal(renderedOptions.props.children.length, 1);
        assert.equal(renderedOptions.props.children[0].props.children, '1');
    });

    it('should render with an open drop down with many children', () => {
        const component = TestUtils.createComponent(
            <SelectBox>
                <option>1</option>
                <option>2</option>
            </SelectBox>
        );

        component.state.showDropDown = true;

        const renderedDropDown = component.renderDropDown();
        const renderedOptions = renderedDropDown.props.children[1];

        assert.equal(renderedOptions.props.children.length, 2);
        assert.equal(renderedOptions.props.children[0].props.children, '1');
        assert.equal(renderedOptions.props.children[1].props.children, '2');
    });

    it('should render with an open drop down with an array of children', () => {
        const options = [
            (<option key={0}>1</option>),
            (<option key={1}>2</option>)
        ];
        const component = TestUtils.createComponent(
            <SelectBox>
                {options}
            </SelectBox>
        );

        component.state.showDropDown = true;

        const renderedDropDown = component.renderDropDown();
        const renderedOptions = renderedDropDown.props.children[1];

        assert.equal(renderedOptions.props.children.length, 2);
        assert.equal(renderedOptions.props.children[0].props.children, '1');
        assert.equal(renderedOptions.props.children[1].props.children, '2');
    });

    it('should render with an open drop down with no children', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );

        component.state.showDropDown = true;

        const renderedDropDown = component.renderDropDown();

        assert.isNull(renderedDropDown.props.children[0]);
    });

    it('should render a clear button', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );

        assert.isNull(component.renderClear());

        component.state.value = 'mock value';

        const clear = component.renderClear();

        assert.equal(clear.props.className, 'react-ui-select-box-clear');
        assert.equal(clear.props.onClick, component.onClearClick);
    });

    it('should render options', () => {
        const options = [
            {display: 'A', value: 'A'},
            {display: 'B', value: 'B'}
        ];
        const component = TestUtils.createComponent(
            <SelectBox>
                <option>A</option>
                <option>B</option>
            </SelectBox>
        );

        component.state.value = {display: 'B', value: 'B'};
        component.state.highlightIndex = 0;

        const renderedOptions = component.renderOptions(options);

        assert.equal(renderedOptions.length, 2);
        assert.equal(
            renderedOptions[0].props.className,
            'react-ui-select-box-option react-ui-select-box-option-highlighted'
        );
        assert.equal(
            renderedOptions[1].props.className,
            'react-ui-select-box-option react-ui-select-box-option-selected'
        );
    });

    it('should handle onChange', () => {
        const onChange = stub();
        const component = TestUtils.createComponent(
            <SelectBox onChange={onChange} />
        );
        const mockEvt = {stopPropagation: stub()};

        component.delayBlur = {cancel: stub()};
        stub(component, 'setState');

        component.onChange('mock value', mockEvt);
        assert.equal(component.delayBlur.cancel.callCount, 1);
        assert.equal(onChange.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(onChange.calledWith(mockEvt, 'mock value'));
        assert.isTrue(component.setState.calledWith({
            highlightIndex: -1,
            showDropDown: false,
            value: 'mock value'
        }));

        component.setState.restore();
    });

    it('should handle onClearClick', () => {
        const onClearClick = stub();
        const component = TestUtils.createComponent(
            <SelectBox onClearClick={onClearClick} />
        );
        const mockEvt = {stopPropagation: stub()};

        stub(component, 'clear');
        component.delayBlur = {cancel: stub()};

        component.onClearClick(mockEvt);
        assert.equal(mockEvt.stopPropagation.callCount, 1);
        assert.equal(onClearClick.callCount, 1);
        assert.equal(component.clear.callCount, 1);
        assert.equal(component.delayBlur.cancel.callCount, 1);
        assert.isTrue(onClearClick.calledWith(mockEvt));

        component.clear.restore();
    });

    it('should handle onClick', () => {
        const onClick = stub();
        const component = TestUtils.createComponent(
            <SelectBox onClick={onClick} />
        );

        stub(component, 'hideDropDown');
        stub(component, 'showDropDown');

        component.onClick('mock evt');
        assert.equal(onClick.callCount, 1);
        assert.equal(component.showDropDown.callCount, 1);
        assert.equal(component.hideDropDown.callCount, 0);
        assert.isTrue(onClick.calledWith('mock evt', false, false));

        component.state.showDropDown = true;
        component.onClick('mock evt');
        assert.equal(onClick.callCount, 2);
        assert.equal(component.showDropDown.callCount, 1);
        assert.equal(component.hideDropDown.callCount, 1);
        assert.isTrue(onClick.calledWith('mock evt', true, false));

        component.hideDropDown.restore();
        component.showDropDown.restore();
    });

    it('should handle onClick disabled', () => {
        const onClick = stub();
        const component = TestUtils.createComponent(
            <SelectBox disabled={true} onClick={onClick} />
        );

        stub(component, 'hideDropDown');
        stub(component, 'showDropDown');

        const rendered = component.render();

        assert.equal(
            rendered.props.className,
            'react-ui-select-box react-ui-select-box-disabled'
        );

        component.onClick('mock evt');
        assert.equal(onClick.callCount, 1);
        assert.equal(component.showDropDown.callCount, 0);
        assert.equal(component.hideDropDown.callCount, 0);
        assert.isTrue(onClick.calledWith('mock evt', false, true));

        component.state.showDropDown = true;
        component.onClick('mock evt');
        assert.equal(onClick.callCount, 2);
        assert.equal(component.showDropDown.callCount, 0);
        assert.equal(component.hideDropDown.callCount, 0);
        assert.isTrue(onClick.calledWith('mock evt', true, true));

        component.hideDropDown.restore();
        component.showDropDown.restore();
    });

    it('should handle onDropDownMouseDown and onDropDownMouseUp', () => {
        const component = TestUtils.createComponent(<SelectBox />);

        assert.isTrue(component.canHideDropDown);
        component.onDropDownMouseDown();
        assert.isFalse(component.canHideDropDown);
        component.onDropDownMouseUp();
        assert.isTrue(component.canHideDropDown);
    });

    it('should handle onBlur', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );

        stub(component, 'hideDropDown');
        stub(component, 'clearQuery');

        component.onBlur();
        assert.equal(component.hideDropDown.callCount, 1);
        assert.equal(component.clearQuery.callCount, 1);

        component.canHideDropDown = false;
        component.onBlur();
        assert.equal(component.hideDropDown.callCount, 1);
        assert.equal(component.clearQuery.callCount, 1);

        component.hideDropDown.restore();
        component.clearQuery.restore();
    });

    it('should handle onSearch', () => {
        const onSearch = stub();
        const component = TestUtils.createComponent(
            <SelectBox onSearch={onSearch} />
        );
        const mockNode = {value: 'Mock Value'};

        stub(React, 'findDOMNode');
        stub(component, 'setState');
        component.refs = {search: 'mock ref'};
        React.findDOMNode.returns(mockNode);

        component.onSearch();
        assert.equal(React.findDOMNode.callCount, 1);
        assert.equal(onSearch.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(React.findDOMNode.calledWith('mock ref'));
        assert.isTrue(onSearch.calledWith('mock value'));
        assert.isTrue(component.setState.calledWith({query: 'mock value'}));

        onSearch.returns(true);
        component.onSearch();
        assert.equal(React.findDOMNode.callCount, 2);
        assert.equal(onSearch.callCount, 2);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(React.findDOMNode.calledWith('mock ref'));
        assert.isTrue(onSearch.calledWith('mock value'));

        React.findDOMNode.restore();
        component.setState.restore();
    });

    it('should handle onSearchFocus', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );
        const mockEvt = {stopPropagation: stub()};

        component.delayBlur = {cancel: stub()};
        component.onSearchFocus(mockEvt);
        assert.equal(mockEvt.stopPropagation.callCount, 1);
        assert.equal(component.delayBlur.cancel.callCount, 1);
    });

    it('should handle onSearchKeyDown', () => {
        const mockEvt = {};
        const component = TestUtils.createComponent(<SelectBox />);

        stub(component, 'onChange');
        stub(component, 'highlightIndex');

        component.onSearchKeyDown([], mockEvt);
        assert.equal(component.onChange.callCount, 0);
        assert.equal(component.highlightIndex.callCount, 0);

        mockEvt.keyCode = KEY_CODES.ARROW_DOWN;
        component.onSearchKeyDown([], mockEvt);
        assert.equal(component.onChange.callCount, 0);
        assert.equal(component.highlightIndex.callCount, 1);
        assert.isTrue(component.highlightIndex.calledWith(0));

        mockEvt.keyCode = KEY_CODES.ARROW_UP;
        component.onSearchKeyDown([], mockEvt);
        assert.equal(component.onChange.callCount, 0);
        assert.equal(component.highlightIndex.callCount, 2);
        assert.isTrue(component.highlightIndex.calledWith(-2));

        mockEvt.keyCode = KEY_CODES.ENTER;
        component.state.highlightIndex = 1;
        component.onSearchKeyDown(['a', 'b', 'c'], mockEvt);
        assert.equal(component.onChange.callCount, 1);
        assert.equal(component.highlightIndex.callCount, 2);
        assert.isTrue(component.onChange.calledWith('b', mockEvt));

        component.onChange.restore();
        component.highlightIndex.restore();
    });

    it('should get filtered options', () => {
        const component = TestUtils.createComponent(
            <SelectBox>
                <option>1</option>
                <option value={2}>Two</option>
                <option>3</option>
                <option>Four</option>
            </SelectBox>
        );

        component.state.query = 'o';
        assert.deepEqual(component.filterOptions(), [{
            display: 'Two',
            value: 2
        }, {
            display: 'Four',
            value: 'Four'
        }]);
    });

    it('should get filtered options with prop options', () => {
        const options = [{name: 'a'}, {name: 'b'}];
        const component = TestUtils.createComponent(
            <SelectBox displayProp="name" options={options} />
        );

        component.state.query = 'a';
        assert.deepEqual(component.filterOptions(), [{name: 'a'}]);
    });

    it('should determine if an option is selected', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );

        assert.isFalse(component.isOptionSelected());
        assert.isFalse(component.isOptionSelected({}));
        component.state.value = {display: 'A', value: 'A'};
        assert.isTrue(component.isOptionSelected({display: 'A', value: 'A'}));
        assert.isFalse(component.isOptionSelected({display: 'A', value: 'B'}));
        assert.isFalse(component.isOptionSelected({display: 'B', value: 'A'}));
    });

    it('should highlight an index', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );
        const options = ['a', 'b', 'c'];

        stub(component, 'setState');

        component.highlightIndex(1, options);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({
            highlightIndex: 1
        }));

        component.highlightIndex(-2, options);
        assert.equal(component.setState.callCount, 2);
        assert.isTrue(component.setState.calledWith({
            highlightIndex: 0
        }));

        component.highlightIndex(10, options);
        assert.equal(component.setState.callCount, 3);
        assert.isTrue(component.setState.calledWith({
            highlightIndex: 2
        }));

        component.setState.restore();
    });

    it('should clear the value', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );

        stub(component, 'setState');

        component.clear();
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({
            highlightIndex: -1,
            value: undefined
        }));

        component.setState.restore();
    });

    it('should clear the query', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );

        stub(component, 'setState');

        component.clearQuery();
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({query: ''}));

        component.setState.restore();
    });

    it('should hide the drop down', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );

        stub(component, 'setState');

        component.hideDropDown();
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({showDropDown: false}));

        component.setState.restore();
    });

    it('should show the drop down', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );

        stub(component, 'setState');

        component.showDropDown();
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({showDropDown: true}));

        component.setState.restore();
    });
});
