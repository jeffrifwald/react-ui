var assert = require('chai').assert;
var TestUtils = React.addons.TestUtils;

var DatePicker = require('../DatePicker');


describe('DatePicker', function() {
    var date = new Date(2014, 6, 9);
    var rendered = TestUtils.renderIntoDocument(React.createElement(DatePicker, {value: date}));
    var disabled = TestUtils.renderIntoDocument(React.createElement(DatePicker, {disabled: true}));

    it('should show the calendar', function() {
        var trigger = TestUtils.findRenderedDOMComponentWithTag(rendered, 'button');
        var calendar;

        TestUtils.Simulate.click(trigger.getDOMNode());
        calendar = TestUtils.findRenderedDOMComponentWithClass(rendered, 'react-ui-date-picker-calendar');
        assert.isTrue(TestUtils.isDOMComponent(calendar));

        TestUtils.Simulate.click(trigger.getDOMNode());
        calendar = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'react-ui-date-picker-calendar');
        assert.equal(calendar.length, 0);
    });

    it('should not show the calendar', function() {
        var trigger = TestUtils.findRenderedDOMComponentWithTag(disabled, 'button');
        var calendar;

        TestUtils.Simulate.click(trigger.getDOMNode());
        calendar = TestUtils.scryRenderedDOMComponentsWithClass(disabled, 'react-ui-date-picker-calendar');
        assert.equal(calendar.length, 0);
    });

    it('should handle a date click', function() {
        var trigger = TestUtils.findRenderedDOMComponentWithTag(rendered, 'button');
        var calendar, cells;

        TestUtils.Simulate.click(trigger.getDOMNode());
        cells = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'react-ui-date-picker-date');

        TestUtils.Simulate.mouseDown(cells[0].getDOMNode());

        //should close the calendar
        calendar = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'react-ui-date-picker-calendar');
        assert.equal(calendar.length, 0);
    });

    it('should handle next and previous clicks', function() {
        var trigger = TestUtils.findRenderedDOMComponentWithTag(rendered, 'button');
        var next, prev;

        //reset the date
        rendered.onDateMouseDown(new Date(2014, 6, 9));

        TestUtils.Simulate.click(trigger.getDOMNode());
        next = TestUtils.findRenderedDOMComponentWithClass(rendered, 'react-ui-date-picker-next');
        prev = TestUtils.findRenderedDOMComponentWithClass(rendered, 'react-ui-date-picker-prev');

        TestUtils.Simulate.click(next);
        assert.equal(rendered.state.date.getDate(), 1);
        assert.equal(rendered.state.date.getMonth(), 7);

        TestUtils.Simulate.click(prev);
        TestUtils.Simulate.click(prev);
        assert.equal(rendered.state.date.getDate(), 1);
        assert.equal(rendered.state.date.getMonth(), 5);
    });
});


