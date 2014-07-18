/** @jsx React.DOM */

var assert = require('chai').assert;
var stub = require('sinon').stub;
var TestUtils = React.addons.TestUtils;

var ComboBox = require('../ComboBox');

describe('ComboBox', function() {
    var options = [
        {value: 'Option 1'},
        {value: 'Option 2'},
        {value: 'Option 3'}
    ];

    it('should render a combo box', function() {
        var rendered = TestUtils.renderIntoDocument(<ComboBox options={options} />);

        assert.equal(rendered.getDOMNode().className, 'react-ui-combo-box');
    });

    it('should render a disabled combo box', function() {
        var rendered = TestUtils.renderIntoDocument(<ComboBox disabled={true} options={options} />);

        assert.equal(rendered.getDOMNode().className, 'react-ui-combo-box-disabled');
    });

    it('should show/hide the drop down on trigger click', function() {
        var rendered = TestUtils.renderIntoDocument(<ComboBox options={options} />);
        var trigger = TestUtils.findRenderedDOMComponentWithClass(rendered, 'react-ui-combo-box-trigger');
        var dropDown = TestUtils.findRenderedDOMComponentWithClass(rendered, 'react-ui-combo-box-drop-down');
        var mockEvent = {preventDefault: stub()};

        TestUtils.Simulate.click(trigger.getDOMNode(), mockEvent);
        assert.equal(mockEvent.preventDefault.callCount, 1);
        assert.isTrue(mockEvent.preventDefault.calledWith());
        assert.equal(dropDown.getDOMNode().style.display, 'block');

        TestUtils.Simulate.click(trigger.getDOMNode(), mockEvent);
        assert.equal(mockEvent.preventDefault.callCount, 2);
        assert.equal(dropDown.getDOMNode().style.display, 'none');
    });

    it('should handle option selection', function() {
        var onOptionMouseDown = stub();
        var rendered = TestUtils.renderIntoDocument(<ComboBox options={options} onOptionMouseDown={onOptionMouseDown} />);
        var dropDown = TestUtils.findRenderedDOMComponentWithClass(rendered, 'react-ui-combo-box-drop-down');
        var dropDownOptions = TestUtils.scryRenderedDOMComponentsWithClass(
            rendered,
            'react-ui-combo-box-option'
        );

        TestUtils.Simulate.mouseDown(dropDownOptions[0].getDOMNode());
        assert.equal(rendered.state.value, options[0]);
        assert.equal(dropDown.getDOMNode().style.display, 'none');
        assert.equal(onOptionMouseDown.callCount, 1);
        assert.isTrue(onOptionMouseDown.calledWith(options[0]));
    });

    it('should not call onTriggerClick on input click when editable', function() {
        var rendered = TestUtils.renderIntoDocument(<ComboBox options={options} />);
        var input = TestUtils.findRenderedDOMComponentWithClass(rendered, 'react-ui-combo-box-input');

        //mock onTriggerClick
        stub(rendered, 'onTriggerClick');

        TestUtils.Simulate.click(input.getDOMNode());
        assert.equal(rendered.onTriggerClick.callCount, 0);

        //restore mock
        rendered.onTriggerClick.restore();
    });

    it('should call onTriggerClick on input click when not editable', function() {
        var rendered = TestUtils.renderIntoDocument(<ComboBox options={options} editable={false} />);
        var input = TestUtils.findRenderedDOMComponentWithClass(rendered, 'react-ui-combo-box-input');

        //mock onTriggerClick
        stub(rendered, 'onTriggerClick');

        TestUtils.Simulate.click(input.getDOMNode());
        assert.equal(rendered.onTriggerClick.callCount, 1);
        assert.isTrue(rendered.onTriggerClick.calledWith());

        //restore mock
        rendered.onTriggerClick.restore();
    });

    it('should set state when the input is edited', function() {
        var simpleOptions = ['Option 1', 'Option 2', 'Option 3'];
        var rendered = TestUtils.renderIntoDocument(<ComboBox options={simpleOptions} />);
        var input = TestUtils.findRenderedDOMComponentWithClass(rendered, 'react-ui-combo-box-input');
        var mockEvent = {
            target: {value: '3'}
        };

        //mock the clearTimeout and setTimeout
        stub(global, 'clearTimeout');
        stub(global, 'setTimeout', function(fn) {
            fn();
        });

        TestUtils.Simulate.change(input.getDOMNode(), mockEvent);
        assert.deepEqual(rendered.state.dropDownOptions, [simpleOptions[2]]);
        assert.isTrue(rendered.state.dropDownVisible);
        assert.equal(rendered.state.value, '3');

        //restore mocks
        global.clearTimeout.restore();
        global.setTimeout.restore();
    });

    it('should hide the drop down when the input is blurred', function() {
        var rendered = TestUtils.renderIntoDocument(<ComboBox options={options} />);
        var input = TestUtils.findRenderedDOMComponentWithClass(rendered, 'react-ui-combo-box-input');

        rendered.setState({dropDownVisible: true});
        assert.isTrue(rendered.state.dropDownVisible);
        TestUtils.Simulate.blur(input);
        assert.isFalse(rendered.state.dropDownVisible);
    });
});

