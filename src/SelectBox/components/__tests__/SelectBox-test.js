import Mingus from 'mingus';
import React from 'react';
import ReactDOM from 'react-dom';

import SelectBox from '../SelectBox';
import {KEY_CODES} from '../../../utils';


Mingus.createTestCase('SelectBoxTest', {
    testConstructor() {
        // Create the component
        let component = this.createComponent(<SelectBox />);

        // Assert that we have a good initial state
        this.assertDeepEqual(component.state, {
            highlightedIndex: -1,
            showDropDown: false,
            value: undefined,
            query: '',
            dropDownTop: null,
            dropDownPosition: 'bottom'
        });

        // Assert that we set the default document listener value
        this.assertEqual(false, component.hasDocumentClickListener);

        // Test with value
        component = this.createComponent(<SelectBox value={{value: 'test'}} />);
        this.assertDeepEqual(component.state.value, {value: 'test'});
    },

    testComponentWillUnMount() {
        // Create the component
        const component = this.createComponent(<SelectBox />);

        // Stub out any items we want to test for
        this.stub(component, 'removeDocumentClickListener');
        component.delaySearch = {cancel: this.stub()};

        // Call the unmount method
        component.componentWillUnmount();

        // Assert that we called remove on the document click listener
        this.assertEqual(component.removeDocumentClickListener.callCount, 1);

        // Assert that we called cancel on the search delay
        this.assertEqual(component.delaySearch.cancel.callCount, 1);
    },

    /**
     * Test when the component will receive new props but the value did not change
     */
    testComponentWillReceivePropsNoValueChange() {
        // Create the component
        const component = this.createComponent(<SelectBox />);

        // Stub out any methods we want to test
        this.stub(component, 'setValue');

        // Call the method without any changes
        component.componentWillReceiveProps(component.props);
    },

    /**
     * Test when the component will receive new props and the value
     * is new and there is no current value
     */
    testComponentWillReceivePropsWithValueChangeButNoCurrentValue() {
        // Create the component
        const component = this.createComponent(<SelectBox />);

        // Stub out any methods we want to test
        this.stub(component, 'setValue');

        // Update the props to have a new value
        let props = Object.assign({}, component.props, {
            value: {
                display: 'new',
                value: 'new'
            }
        });

        // Call the method without any changes
        component.componentWillReceiveProps(props);

        // Assert that set value was called
        this.assertTrue(component.setValue.calledWith({
            display: 'new',
            value: 'new'
        }));
    },

    /**
     * Test when the component will receive new props and the value
     * is different than one that exists
     */
    testComponentWillReceivePropsWithValueChangeWithCurrentValue() {
        // Create the component
        const component = this.createComponent(<SelectBox value={{value: 'test'}} />);

        // Stub out any methods we want to test
        this.stub(component, 'setValue');

        // Update the props to have a new value
        let props = Object.assign({}, component.props, {
            value: {
                display: 'new',
                value: 'new'
            }
        });

        // Call the method without any changes
        component.componentWillReceiveProps(props);

        // Assert that set value was called
        this.assertTrue(component.setValue.calledWith({
            display: 'new',
            value: 'new'
        }));
    },

    /**
     * Test when the component updates and we just switched to showing the drop down
     */
    testComponentDidUpdateWithShowDropDown() {
        // Create the component
        const component = this.createComponent(<SelectBox />);

        // Manually set the state of the component for testing
        component.state.showDropDown = true;

        // Stub out any methods we want to test
        this.stub(component, 'positionDropDown');
        this.stub(component, 'addDocumentClickListener');
        this.stub(component, 'removeDocumentClickListener');

        // Call the component did update method
        component.componentDidUpdate({}, {
            showDropDown: false
        });

        // Assert that we called the position drop down method correctly
        this.assertTrue(component.positionDropDown.calledWith(true));

        // Assert that we called the add document click listener
        this.assertTrue(component.addDocumentClickListener.calledWith());
    },

    /**
     * Test when the component updates and we were already showing the drop down
     */
    testComponentDidUpdateWithShowDropDownAlreadyShowing() {
        // Create the component
        const component = this.createComponent(<SelectBox />);

        // Manually set the state of the component for testing
        component.state.showDropDown = true;

        // Stub out any methods we want to test
        this.stub(component, 'positionDropDown');
        this.stub(component, 'addDocumentClickListener');
        this.stub(component, 'removeDocumentClickListener');

        // Call the component did update method
        component.componentDidUpdate({}, {
            showDropDown: true
        });

        // Assert that we called the position drop down method correctly
        this.assertTrue(component.positionDropDown.calledWith(false));

        // Assert that we called the add document click listener
        this.assertTrue(component.addDocumentClickListener.calledWith());
    },

    /**
     * Test when the component updates and the drop down is hidden
     */
    testComponentDidUpdateWithShowDropDownNotShowing() {
        // Create the component
        const component = this.createComponent(<SelectBox />);

        // Manually set the state of the component for testing
        component.state.showDropDown = false;

        // Stub out any methods we want to test
        this.stub(component, 'positionDropDown');
        this.stub(component, 'addDocumentClickListener');
        this.stub(component, 'removeDocumentClickListener');

        // Call the component did update method
        component.componentDidUpdate({}, {
            showDropDown: false
        });

        // Assert that we did not call the position drop down method correctly
        this.assertEqual(component.positionDropDown.callCount, 0);

        // Assert that we called the remove document click listener
        this.assertTrue(component.removeDocumentClickListener.calledWith());
    },

    testRender() {
        const rendered = this.renderComponent(
            <SelectBox>
                <option>1</option>
            </SelectBox>
        );

        this.assertIsType(rendered, 'div');
        this.assertHasClass(rendered, 'react-ui-select-box');
        this.assertNumChildren(rendered, 2);
    },

    testRenderValue() {
        const component = this.createComponent(<SelectBox />);

        component.state.value = {display: 'Cool', value: 55};

        const renderedValue = component.renderValue();
        const renderedChildren = this.getChildren(renderedValue);

        this.assertIsType(renderedValue, 'span');
        this.assertIsType(renderedChildren[0], 'input');
        this.assertEqual(renderedChildren[0].props.value, 55);
        this.assertEqual(renderedChildren[1], 'Cool');
    },

    /**
     * Test the rendering of the display when search is null
     */
    testRenderDisplayNoSearch() {
        // Create the component
        const component = this.createComponent(<SelectBox />);

        // Update some state
        component.state.value = {display: 'Cool', value: 55};

        // Stub out components we want to test
        this.stub(component, 'renderSearch').returns(null);

        // Call the method
        const rendered = component.renderDisplay();

        // Assert we rendered just the display value
        this.assertEqual(rendered, 'Cool');
    },

    /**
     * Test the rendering of the display when the drop down is shown and search exists
     */
    testRenderDisplayWithSearch() {
        // Create the component
        const component = this.createComponent(<SelectBox />);

        // Update some state
        component.state.showDropDown = true;

        // Stub out components we want to test
        this.stub(component, 'renderSearch').returns(<div className="search"></div>);

        // Call the method
        const rendered = component.renderDisplay();

        // Assert we rendered the search
        this.assertHasClass(rendered, 'search');
    },

    testRenderSearch() {
        const options = [{display: 1, value: 1}, {display: 2, value: 2}];
        const component = this.createComponent(
            <SelectBox searchThreshold={1}>
                <option>1</option>
                <option>2</option>
            </SelectBox>
        );
        const search = component.renderSearch(options);

        this.assertIsType(search, 'div');
        this.assertIsType(this.getChildren(search)[0], 'input');
        this.assertNumChildren(search, 1);
    },

    testRenderSearchUnderThreshold() {
        const options = [{display: 1, value: 1}, {display: 2, value: 2}];
        const component = this.createComponent(
            <SelectBox searchThreshold={5}>
                <option>1</option>
                <option>2</option>
            </SelectBox>
        );

        this.assertNull(component.renderSearch(options));
    },

    testRenderOpen() {
        const component = this.createComponent(
            <SelectBox>
                <option>1</option>
            </SelectBox>
        );

        component.state.showDropDown = true;

        const rendered = component.render();

        this.assertHasClass(
            rendered,
            'react-ui-select-box'
        );
        this.assertHasClass(
            rendered,
            'react-ui-select-box-open'
        );
    },

    testRenderDropDownDoNotShow() {
        const component = this.createComponent(
            <SelectBox>
                <option>1</option>
            </SelectBox>
        );

        component.state.showDropDown = false;

        // Render the component
        const renderedDropDown = component.renderDropDown();

        // Check the style
        this.assertDeepEqual(renderedDropDown.props.style, {
            visibility: 'hidden',
            opacity: 0,
            width: 0,
            height: 0,
            overflow: 'hidden'
        });
    },

    testRenderDropDownWithTop() {
        const component = this.createComponent(
            <SelectBox>
                <option>1</option>
            </SelectBox>
        );

        component.state.dropDownTop = -100;

        // Render the component
        const renderedDropDown = component.renderDropDown();

        // Check the style
        this.assertDeepEqual(renderedDropDown.props.style, {
            visibility: 'hidden',
            opacity: 0,
            width: 0,
            height: 0,
            overflow: 'hidden',
            top: -100
        });
    },

    testRenderDropDownOneChild() {
        const component = this.createComponent(
            <SelectBox>
                <option>1</option>
            </SelectBox>
        );

        component.state.showDropDown = true;

        const renderedDropDown = component.renderDropDown();
        const renderedOptionsWrapper = this.getChildren(renderedDropDown)[0];
        const renderedOptions = this.getChildren(renderedOptionsWrapper);

        this.assertNumChildren(renderedOptionsWrapper, 1);
        this.assertText(renderedOptions[0], '1');
    },

    testRenderDropDownManyChildren() {
        const component = this.createComponent(
            <SelectBox>
                <option>1</option>
                <option>2</option>
            </SelectBox>
        );

        component.state.showDropDown = true;

        const renderedDropDown = component.renderDropDown();
        const renderedOptionsWrapper = this.getChildren(renderedDropDown)[0];
        const renderedOptions = this.getChildren(renderedOptionsWrapper);

        this.assertNumChildren(renderedOptionsWrapper, 2);
        this.assertText(renderedOptions[0], '1');
        this.assertText(renderedOptions[1], '2');
    },

    testRenderDropDownChildArray() {
        const options = [
            (<option key={0}>1</option>),
            (<option key={1}>2</option>)
        ];
        const component = this.createComponent(
            <SelectBox>
                {options}
            </SelectBox>
        );

        component.state.showDropDown = true;

        const renderedDropDown = component.renderDropDown();
        const renderedOptionsWrapper = this.getChildren(renderedDropDown)[0];
        const renderedOptions = this.getChildren(renderedOptionsWrapper);

        this.assertNumChildren(renderedOptionsWrapper, 2);
        this.assertText(renderedOptions[0], '1');
        this.assertText(renderedOptions[1], '2');
    },

    testRenderDropDownNoChildren() {
        // Create the component
        const component = this.createComponent(
            <SelectBox />
        );

        // Set the drop down to be showing
        component.state.showDropDown = true;

        // Render the drop down
        const renderedDropDown = component.renderDropDown();

        // Assert that the drop down has no children
        this.assertNull(renderedDropDown.props.children);
    },

    testRenderClearButton() {
        const component = this.createComponent(
            <SelectBox />
        );

        // Stub the shouldShowClear method
        this.stub(component, 'shouldShowClear').returns(false);

        // Call the method
        this.assertNull(component.renderClear());

        // Set the should show to return true
        component.shouldShowClear.returns(true);

        // Render the clear button again
        const clear = component.renderClear();

        // Assert that it rendered correctly
        this.assertHasClass(clear, 'react-ui-select-box-clear');
        this.assertEqual(clear.props.onClick, component.onClearClick);
    },

    testRenderTrigger() {
        const component = this.createComponent(
            <SelectBox />
        );

        this.stub(component, 'shouldShowTrigger');

        // Test when should show trigger is false
        component.shouldShowTrigger.returns(false);
        this.assertEqual(component.renderTrigger(), null);

        // Test when should show trigger is true
        component.shouldShowTrigger.returns(true);
        this.assertTrue(component.renderTrigger() !== null);
    },

    testRenderOptions() {
        const options = [
            {display: 'A', value: 'A'},
            {display: 'B', value: 'B'}
        ];

        const component = this.createComponent(
            <SelectBox>
                <option>A</option>
                <option>B</option>
            </SelectBox>
        );

        component.state.value = {display: 'B', value: 'B'};
        component.state.highlightedIndex = 0;

        const renderedOptions = component.renderOptions(options);

        this.assertEqual(renderedOptions.length, 2);
        this.assertHasClass(
            renderedOptions[0],
            'react-ui-select-box-option'
        );
        this.assertHasClass(
            renderedOptions[0],
            'react-ui-select-box-option-highlighted'
        );
        this.assertHasClass(
            renderedOptions[1],
            'react-ui-select-box-option'
        );
        this.assertHasClass(
            renderedOptions[1],
            'react-ui-select-box-option-selected'
        );
    },

    testOnDocumentClickInside() {
        // Create the component
        const component = this.createComponent(
            <SelectBox />
        );

        // Stubs
        this.stub(ReactDOM, 'findDOMNode').returns({
            contains: function() {
                return true;
            }
        });

        // Call the method
        component.onDocumentClick({});
    },

    testOnDocumentClickOutside() {
        // Create the component
        const component = this.createComponent(
            <SelectBox />
        );

        // Stubs
        this.stub(ReactDOM, 'findDOMNode').returns({
            contains: function() {
                return false;
            }
        });
        this.stub(component, 'hideDropDown');

        // Call the method
        component.onDocumentClick({});

        // Assert that we hide the drop down
        this.assertTrue(component.hideDropDown.called);
    },

    testOnChange() {
        // Create a stub on change event listener
        const onChange = this.stub();

        // Create the component
        const component = this.createComponent(
            <SelectBox onChange={onChange} />
        );

        // Create a mock event
        const mockEvt = {stopPropagation: this.stub()};

        // Stub out the set value method
        this.stub(component, 'setValue');

        // Call the on change event
        component.onChange('mock value', mockEvt);

        // Assert that the on change prop was called
        this.assertEqual(onChange.callCount, 1);

        // Assert that we set the value
        this.assertEqual(component.setValue.callCount, 1);

        // Assert that the prop was called with the correct values
        this.assertTrue(onChange.calledWith(mockEvt, 'mock value'));
    },

    testOnClearClick() {
        // Create a mock clear click listener
        const onClearClick = this.stub();

        // Create the component
        const component = this.createComponent(
            <SelectBox onClearClick={onClearClick} />
        );

        // Create a mock event
        const mockEvt = {stopPropagation: this.stub()};

        // Stub out the clear method
        this.stub(component, 'clear');

        // Call the method
        component.onClearClick(mockEvt);

        // Assert that we stop event propagation
        this.assertEqual(mockEvt.stopPropagation.callCount, 1);

        // Assert that we call the prop
        this.assertEqual(onClearClick.callCount, 1);

        // Assert that we call clear
        this.assertEqual(component.clear.callCount, 1);

        // Assert that we call the prop with the correct arguments
        this.assertTrue(onClearClick.calledWith(mockEvt));
    },

    testOnClick() {
        const onClick = this.stub();

        const component = this.createComponent(
            <SelectBox onClick={onClick} />
        );

        this.stub(component, 'hideDropDown');
        this.stub(component, 'showDropDown');

        component.onClick('mock evt');
        this.assertEqual(onClick.callCount, 1);
        this.assertEqual(component.showDropDown.callCount, 1);
        this.assertEqual(component.hideDropDown.callCount, 0);
        this.assertTrue(onClick.calledWith('mock evt', false));

        component.state.showDropDown = true;
        component.onClick('mock evt');
        this.assertEqual(onClick.callCount, 2);
        this.assertEqual(component.showDropDown.callCount, 1);
        this.assertEqual(component.hideDropDown.callCount, 1);
        this.assertTrue(onClick.calledWith('mock evt', true));
    },

    testOnClickDisabled() {
        const onClick = this.stub();

        const component = this.createComponent(
            <SelectBox disabled={true} onClick={onClick} />
        );

        this.stub(component, 'hideDropDown');
        this.stub(component, 'showDropDown');

        const rendered = component.render();

        this.assertHasClass(
            rendered,
            'react-ui-select-box'
        );
        this.assertHasClass(
            rendered,
            'react-ui-select-box-disabled'
        );

        component.onClick('mock evt');
        this.assertEqual(onClick.callCount, 0);
        this.assertEqual(component.showDropDown.callCount, 0);
        this.assertEqual(component.hideDropDown.callCount, 0);

        component.state.showDropDown = true;
        component.onClick('mock evt');
        this.assertEqual(onClick.callCount, 0);
        this.assertEqual(component.showDropDown.callCount, 0);
        this.assertEqual(component.hideDropDown.callCount, 0);
    },

    testOnSearch() {
        // Create the component
        const component = this.createComponent(
            <SelectBox />
        );

        // Create a mock event node
        const mockNode = {value: 'Mock Value'};

        // Mock out the setQuery method
        this.stub(component, 'setQuery');

        // Populate the refs with the fake node
        component.refs = {search: mockNode};

        // Call the method
        component.onSearch();

        // Assert that we called setQuery
        this.assertEqual(component.setQuery.callCount, 1);

        // Assert that we called set query with the proper args
        this.assertTrue(component.setQuery.calledWith('mock value'));
    },

    testOnSearchFocus() {
        const component = this.createComponent(<SelectBox />);
        const mockEvt = {stopPropagation: this.stub(), target: {
            value: 'test'
        }};

        component.onSearchFocus(mockEvt);
        this.assertEqual(mockEvt.stopPropagation.callCount, 1);
    },

    testOnSearchKeyDown() {
        const mockEvt = {};
        const component = this.createComponent(<SelectBox />);

        this.stub(component, 'onChange');
        this.stub(component, 'highlightIndex');

        component.onSearchKeyDown([], mockEvt);
        this.assertEqual(component.onChange.callCount, 0);
        this.assertEqual(component.highlightIndex.callCount, 0);

        mockEvt.keyCode = KEY_CODES.ARROW_DOWN;
        component.onSearchKeyDown([], mockEvt);
        this.assertEqual(component.onChange.callCount, 0);
        this.assertEqual(component.highlightIndex.callCount, 1);
        this.assertTrue(component.highlightIndex.calledWith(0));

        mockEvt.keyCode = KEY_CODES.ARROW_UP;
        component.onSearchKeyDown([], mockEvt);
        this.assertEqual(component.onChange.callCount, 0);
        this.assertEqual(component.highlightIndex.callCount, 2);
        this.assertTrue(component.highlightIndex.calledWith(-2));

        mockEvt.keyCode = KEY_CODES.ENTER;
        component.state.highlightedIndex = 1;
        component.onSearchKeyDown(['a', 'b', 'c'], mockEvt);
        this.assertEqual(component.onChange.callCount, 1);
        this.assertEqual(component.highlightIndex.callCount, 2);
        this.assertTrue(component.onChange.calledWith('b', mockEvt));
    },

    testGetFilteredOptions() {
        const component = this.createComponent(
            <SelectBox>
                <option>1</option>
                <option value={2}>Two</option>
                <option>3</option>
                <option>Four</option>
            </SelectBox>
        );

        component.state.query = 'o';
        this.assertDeepEqual(component.filterOptions(), [{
            display: 'Two',
            value: 2
        }, {
            display: 'Four',
            value: 'Four'
        }]);
    },

    /**
     * Test the add document click listener method when the listener has already been added
     */
    testAddDocumentClickListenerAlreadyHasListener() {
        global.document = {
            addEventListener: this.stub()
        };

        // Create the component
        const component = this.createComponent(<SelectBox />);

        component.hasDocumentClickListener = true;

        // Call the method
        component.addDocumentClickListener();

        // Assert that we called the add event listener
        this.assertEqual(global.document.addEventListener.callCount, 0);
    },

    /**
     * Test the add document click listener method when it has not already been added
     */
    testAddDocumentClickListenerDoesNotExist() {
        global.document = {
            addEventListener: this.stub()
        };

        // Create the component
        const component = this.createComponent(<SelectBox />);

        component.hasDocumentClickListener = false;

        // Call the method
        component.addDocumentClickListener();

        // Assert that we called the add event listener
        this.assertTrue(
            global.document.addEventListener.calledWith('click', component.onDocumentClick, false)
        );
    },

    /**
     * Test the remove document click listener method when the listener has already been removed
     */
    testRemoveDocumentClickListenerAlreadyHasListener() {
        global.document = {
            removeEventListener: this.stub()
        };

        // Create the component
        const component = this.createComponent(<SelectBox />);

        component.hasDocumentClickListener = false;

        // Call the method
        component.removeDocumentClickListener();

        // Assert that we called the add event listener
        this.assertEqual(global.document.removeEventListener.callCount, 0);
    },

    /**
     * Test the remove document click listener method when it has not already been removed
     */
    testRemoveDocumentClickListenerDoesNotExist() {
        global.document = {
            removeEventListener: this.stub()
        };

        // Create the component
        const component = this.createComponent(<SelectBox />);

        component.hasDocumentClickListener = true;

        // Call the method
        component.removeDocumentClickListener();

        // Assert that we called the add event listener
        this.assertTrue(
            global.document.removeEventListener.calledWith(
                'click',
                component.onDocumentClick,
                false
            )
        );
    },

    testHasValue() {
        // Create the component
        const component = this.createComponent(<SelectBox />);

        // Test when value is undefined
        component.state.value = undefined;
        this.assertFalse(component.hasValue());

        // Test when value is null
        component.state.value = null;
        this.assertFalse(component.hasValue());

        // Test when value is defined, but valueProp is undefined
        component.state.value = {
            value: undefined
        };
        this.assertFalse(component.hasValue());

        // Test when value is defined but value prop is null
        component.state.value = {
            value: null
        };
        this.assertFalse(component.hasValue());

        // Test when value is defined
        component.state.value = {
            value: true
        };
        this.assertTrue(component.hasValue());
    },

    testSetValue() {
        // Create the component
        const component = this.createComponent(<SelectBox />);

        // Stub out set state
        this.stub(component, 'setState');

        // Call the method
        component.setValue({value: 'value'});

        // Assert that set state was called correctly
        this.assertTrue(component.setState.calledWith({
            highlightedIndex: -1,
            showDropDown: false,
            value: {value: 'value'}
        }));
    },

    testSetQuery() {
        // Create the component
        const component = this.createComponent(<SelectBox />);

        // Stub the delaySearch method
        component.setState = function(state, callback) {
            callback();
        };
        this.stub(component, 'delaySearch');

        // Call the method
        component.setQuery('test');

        // Assert that delay search was called
        this.assertTrue(component.delaySearch.calledWith('test'));
    },

    testShouldShowClear() {
        // Test when showClear is false
        let component = this.createComponent(<SelectBox showClear={false} />);

        this.assertFalse(component.shouldShowClear());

        // Test when showClear is true, has no value
        component = this.createComponent(<SelectBox showClear={true} />);
        this.assertFalse(component.shouldShowClear());

        // Test when showClear is true, has value, disabled
        component = this.createComponent(<SelectBox showClear={true} disabled={true} />);
        component.state.value = {value: 'test'};
        this.assertFalse(component.shouldShowClear());

        // Test when showClear is true, has value, not disabled
        component = this.createComponent(<SelectBox showClear={true} />);
        component.state.value = {value: 'test'};
        this.assertTrue(component.shouldShowClear());
    },

    testShouldShowTrigger() {
        // Create the component
        const component = this.createComponent(<SelectBox />);

        // Stub the show clear method
        this.stub(component, 'shouldShowClear').returns(true);

        // Test when true
        this.assertFalse(component.shouldShowTrigger());

        // Test when false
        component.shouldShowClear.returns(false);
        this.assertTrue(component.shouldShowTrigger());
    },

    testGetFilteredOptionsNoProps() {
        const options = [{name: 'a'}, {name: 'b'}];
        const component = this.createComponent(
            <SelectBox displayProp="name" options={options} />
        );

        component.state.query = 'a';
        this.assertDeepEqual(component.filterOptions(), [{name: 'a'}]);
    },

    testIsOptionSelected() {
        const component = this.createComponent(
            <SelectBox />
        );

        this.assertFalse(component.isOptionSelected());
        this.assertFalse(component.isOptionSelected({}));
        component.state.value = {display: 'A', value: 'A'};
        this.assertTrue(component.isOptionSelected(
            {display: 'A', value: 'A'}
        ));
        this.assertFalse(component.isOptionSelected(
            {display: 'A', value: 'B'}
        ));
        this.assertFalse(component.isOptionSelected(
            {display: 'B', value: 'A'}
        ));
    },

    testHighlightIndex() {
        const component = this.createComponent(<SelectBox />);
        const options = ['a', 'b', 'c'];

        this.stub(component, 'setState');

        component.highlightIndex(1, options);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            highlightedIndex: 1
        }));

        component.highlightIndex(-2, options);
        this.assertEqual(component.setState.callCount, 2);
        this.assertTrue(component.setState.calledWith({
            highlightedIndex: 0
        }));

        component.highlightIndex(10, options);
        this.assertEqual(component.setState.callCount, 3);
        this.assertTrue(component.setState.calledWith({
            highlightedIndex: 2
        }));
    },

    testClear() {
        const component = this.createComponent(<SelectBox />);

        this.stub(component, 'setValue');
        this.stub(component, 'clearQuery');

        component.clear();
        this.assertEqual(component.setValue.callCount, 1);
        this.assertEqual(component.clearQuery.callCount, 1);
        this.assertTrue(component.setValue.calledWith(undefined));
    },

    testClearQuery() {
        const component = this.createComponent(<SelectBox />);

        this.stub(component, 'setState');

        component.clearQuery();
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({query: ''}));
    },

    testHideDropDown() {
        const component = this.createComponent(<SelectBox />);

        this.stub(component, 'setState');

        component.hideDropDown();
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({showDropDown: false}));
    },

    testShowDropDown() {
        const component = this.createComponent(<SelectBox />);

        this.stub(component, 'setState');

        component.showDropDown();
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            showDropDown: true,
            dropDownTop: null,
            dropDownPosition: 'bottom'
        }));
    },

    testGetViewportDimensions() {
        // Setup the window and document
        global.window = {
            innerWidth: 100,
            innerHeight: 100
        };
        global.document = {
            documentElement: {},
            getElementsByTagName: function() {
                return [{}, {}];
            }
        };

        // Create the component
        const component = this.createComponent(<SelectBox />);

        // Call the method
        this.assertDeepEqual({width: 100, height: 100}, component.getViewportDimensions());
    },

    testPositionDropDown() {
        // Create the component
        const component = this.createComponent(<SelectBox />);

        // Create the refs
        component.refs = {
            el: {
                getBoundingClientRect: function() {
                    return {
                        top: 550,
                        bottom: 600,
                        width: 100,
                        height: 50
                    };
                }
            },
            dropDown: {
                getBoundingClientRect: function() {
                    return {
                        top: 600,
                        bottom: 700,
                        width: 100,
                        height: 100
                    };
                }
            }
        };

        // Stub any methods
        this.stub(component, 'getViewportDimensions').returns({
            width: 1000,
            height: 650
        });
        this.stub(component, 'setState');

        // Call the method
        component.positionDropDown(true);

        // Assert we called set state properly
        this.assertTrue(
            component.setState.calledWith({ dropDownTop: -100, dropDownPosition: 'top' })
        );

        // Change the dimensions and re call
        component.refs.dropDown.getBoundingClientRect = function() {
            return {
                top: 600,
                bottom: 800,
                width: 100,
                height: 200
            };
        };
        component.state.dropDownTop = -100;
        component.state.dropDownPosition = 'top';

        // Call the method
        component.positionDropDown();

        // Assert we called set state properly
        this.assertTrue(component.setState.calledWith({ dropDownTop: -200}));

        // Test the case when their are no changes
        component.state.dropDownTop = -200;
        component.state.dropDownPosition = 'top';

        // Call the method
        component.positionDropDown();

        // Assert that we did not call set state
        this.assertEqual(component.setState.callCount, 2);
    }
});
