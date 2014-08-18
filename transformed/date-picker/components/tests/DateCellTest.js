/** @jsx React.DOM */

var assert = require('chai').assert;
var stub = require('sinon').stub;
var TestUtils = React.addons.TestUtils;

var DateCell = require('../DateCell');

describe('DateCell', function() {
    var date = new Date();
    var tomorrow = new Date(date);
    var yesterday = new Date(date);
    var nextMonth = new Date(date);
    var disabledDates = [date];
    var isDateDisabled = function() {
        return true;
    };
    var notDisabled = function() {};

    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    it('should determine if it is selectable', function() {
        var rendered;

        rendered = TestUtils.renderIntoDocument(
            DateCell( {date:date, isDateDisabled:isDateDisabled, value:date} )
        );
        assert.isFalse(rendered.isSelectable());

        rendered = TestUtils.renderIntoDocument(
            DateCell( {date:date, disabledDates:disabledDates, isDateDisabled:notDisabled, value:date} )
        );
        assert.isFalse(rendered.isSelectable());


        rendered = TestUtils.renderIntoDocument(
            DateCell( {date:date, disabledDates:[], isDateDisabled:notDisabled, maxValue:yesterday, value:date} )
        );
        assert.isFalse(rendered.isSelectable());

        rendered = TestUtils.renderIntoDocument(
            DateCell( {date:date, disabledDates:[], isDateDisabled:notDisabled, minValue:tomorrow, value:date} )
        );
        assert.isFalse(rendered.isSelectable());

        rendered = TestUtils.renderIntoDocument(
            DateCell( {date:date, disabledDates:[], isDateDisabled:notDisabled, value:date} )
        );
        assert.isTrue(rendered.isSelectable());
    });

    it('should determine if it is current', function() {
        var rendered;

        rendered = TestUtils.renderIntoDocument(
            DateCell( {date:date, disabledDates:[], isDateDisabled:notDisabled, value:date} )
        );
        assert.isTrue(rendered.isCurrent());

        rendered = TestUtils.renderIntoDocument(
            DateCell( {date:tomorrow, disabledDates:[], isDateDisabled:notDisabled, value:tomorrow} )
        );
        assert.isFalse(rendered.isCurrent());
    });

    it('should determine if it is selected', function() {
        var rendered = TestUtils.renderIntoDocument(
            DateCell( {date:date, disabledDates:[], isDateDisabled:notDisabled, value:date} )
        );
        assert.isFalse(rendered.isSelected());
    });

    it('should determine the class name', function() {
        var rendered = TestUtils.renderIntoDocument(
            DateCell(
            {className:"date-cell",
            date:date,
            disabledDates:[],
            isDateDisabled:notDisabled,
            selected:nextMonth,
            value:nextMonth} )
        );
        assert.equal(rendered.getClassName(), 'date-cell other-month selected-date');
    });

    it('should handle mouse down', function() {
        var onMouseDown = stub();
        var rendered = TestUtils.renderIntoDocument(
            DateCell(
            {date:date,
            disabledDates:[],
            isDateDisabled:notDisabled,
            onMouseDown:onMouseDown,
            value:date} )
        );

        TestUtils.Simulate.mouseDown(rendered.getDOMNode());
        assert.equal(onMouseDown.callCount, 1);
        assert.isTrue(onMouseDown.calledWith(date));
    });
});
