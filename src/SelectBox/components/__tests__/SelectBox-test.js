import {assert} from 'chai';
import React from 'react';
import {stub} from 'sinon';

import SelectBox from '../SelectBox';
import {TestUtils} from '../../../utils';

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
        const component = TestUtils.createComponent(
            <SelectBox searchThreshold={1}>
                <option>1</option>
                <option>2</option>
            </SelectBox>
        );
        const search = component.renderSearch();

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

        assert.equal(renderedOptions.length, 1);
        assert.equal(renderedOptions[0].props.children, '1');
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

        assert.equal(renderedOptions.length, 2);
        assert.equal(renderedOptions[0].props.children, '1');
        assert.equal(renderedOptions[1].props.children, '2');
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

        assert.equal(renderedOptions.length, 2);
        assert.equal(renderedOptions[0].props.children, '1');
        assert.equal(renderedOptions[1].props.children, '2');
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
        const component = TestUtils.createComponent(
            <SelectBox>
                <option>A</option>
                <option>B</option>
            </SelectBox>
        );

        component.state.value = {display: 'B', value: 'B'};

        const options = component.renderOptions();

        assert.equal(options.length, 2);
        assert.equal(
            options[1].props.className,
            'react-ui-select-box-option react-ui-select-box-option-selected'
        );
    });

    it('should handle onChange', () => {
        const onChange = stub();
        const component = TestUtils.createComponent(
            <SelectBox onChange={onChange} />
        );

        stub(component, 'setState');

        component.onChange('mock value', 'mock evt');
        assert.equal(onChange.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(onChange.calledWith('mock evt', 'mock value'));
        assert.isTrue(component.setState.calledWith({
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

        component.onClearClick(mockEvt);
        assert.equal(mockEvt.stopPropagation.callCount, 1);
        assert.equal(onClearClick.callCount, 1);
        assert.equal(component.clear.callCount, 1);
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
        assert.isTrue(onClick.calledWith('mock evt', false));

        component.state.showDropDown = true;
        component.onClick('mock evt');
        assert.equal(onClick.callCount, 2);
        assert.equal(component.showDropDown.callCount, 1);
        assert.equal(component.hideDropDown.callCount, 1);
        assert.isTrue(onClick.calledWith('mock evt', true));

        component.hideDropDown.restore();
        component.showDropDown.restore();
    });

    it('should handle onDropDownClick', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );

        component.delayBlur = {cancel: stub()};
        component.onDropDownClick();
        assert.equal(component.delayBlur.cancel.callCount, 1);
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

        component.hideDropDown.restore();
        component.clearQuery.restore();
    });

    it('should handle onSearch', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );
        const mockNode = {value: 'Mock Value'};

        stub(React, 'findDOMNode');
        stub(component, 'setState');
        component.refs = {search: 'mock ref'};
        React.findDOMNode.returns(mockNode);

        component.onSearch();
        assert.equal(React.findDOMNode.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(React.findDOMNode.calledWith('mock ref'));
        assert.isTrue(component.setState.calledWith({query: 'mock value'}));

        React.findDOMNode.restore();
        component.setState.restore();
    });

    it('should handle onSearchClick', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );
        const mockEvt = {stopPropagation: stub()};

        component.delayBlur = {cancel: stub()};
        component.onSearchClick(mockEvt);
        assert.equal(mockEvt.stopPropagation.callCount, 1);
        assert.equal(component.delayBlur.cancel.callCount, 1);
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
        assert.deepEqual(component.getOptions(), [{
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
        assert.deepEqual(component.getOptions(), [{name: 'a'}]);
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

    it('should clear the value', () => {
        const component = TestUtils.createComponent(
            <SelectBox />
        );

        stub(component, 'setState');

        component.clear();
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({value: undefined}));

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
