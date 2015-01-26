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

    it('should render a combo box with an additional class', function() {
        var rendered = TestUtils.renderIntoDocument(
            <ComboBox options={options} className='class-one' />
        );

        assert.equal(rendered.getDOMNode().className, 'react-ui-combo-box class-one');
    });

    it('should render a disabled combo box', function() {
        var rendered = TestUtils.renderIntoDocument(
            <ComboBox disabled={true} options={options} />
        );

        assert.equal(rendered.getDOMNode().className, 'react-ui-combo-box react-ui-combo-box-disabled');
    });

    it('should get and clear the value', function() {
        var rendered = TestUtils.renderIntoDocument(<ComboBox options={options} />);

        rendered.setState({value: '1234'});
        assert.equal(rendered.getValue(), '1234');

        rendered.clearValue();
        assert.equal(rendered.getValue(), '');
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
        var rendered = TestUtils.renderIntoDocument(
            <ComboBox options={options} onOptionMouseDown={onOptionMouseDown} />
        );
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

    it('should not call onInputClick when editable', function() {
            var onInputClick = stub();
            var rendered = TestUtils.renderIntoDocument(
                <ComboBox onInputClick={onInputClick} options={options} />
            );
            var input = TestUtils.findRenderedDOMComponentWithClass(rendered, 'react-ui-combo-box-input');

            stub(rendered, 'setState');

            TestUtils.Simulate.click(input.getDOMNode());
            assert.equal(rendered.setState.callCount, 0);
            assert.equal(onInputClick.callCount, 0);

            rendered.setState.restore();
    });

    it('should call onInputClick when not editable', function() {
        var onInputClick = stub();
        var rendered = TestUtils.renderIntoDocument(
            <ComboBox editable={false} onInputClick={onInputClick} options={options} />
        );
        var input = TestUtils.findRenderedDOMComponentWithClass(rendered, 'react-ui-combo-box-input');

        stub(rendered, 'setState');

        TestUtils.Simulate.click(input.getDOMNode());
        assert.equal(onInputClick.callCount, 1);
        assert.equal(rendered.setState.callCount, 1);

        rendered.setState.restore();
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

    it('should handle up and down arrow press', function() {
        var rendered = TestUtils.renderIntoDocument(<ComboBox options={options} />);

        rendered.refs.input.getDOMNode().value = 'O';

        rendered.onArrowDownPress();
        assert.equal(rendered.state.index, 0);
        assert.equal(rendered.state.value.value, 'Option 1');

        rendered.onArrowDownPress();
        assert.equal(rendered.state.index, 1);
        assert.equal(rendered.state.value.value, 'Option 2');

        rendered.onArrowUpPress();
        assert.equal(rendered.state.index, 0);
        assert.equal(rendered.state.value.value, 'Option 1');

        rendered.onArrowUpPress();
        assert.equal(rendered.state.index, 0);
        assert.equal(rendered.state.value.value, 'Option 1');
    });

    it('should handle enter press', function() {
        var onOptionMouseDown = stub();
        var rendered = TestUtils.renderIntoDocument(
            <ComboBox
            onOptionMouseDown={onOptionMouseDown}
            options={options} />
        );

        rendered.setState({
            dropDownVisible: true,
            value: {}
        });
        assert.equal(rendered.state.dropDownVisible, true);
        rendered.onEnterPress();
        assert.equal(rendered.state.dropDownVisible, false);
        assert.equal(onOptionMouseDown.callCount, 1);
    });
});

