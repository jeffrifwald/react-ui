var assert = require('chai').assert;
var stub = require('sinon').stub;
var TestUtils = React.addons.TestUtils;

var Grid = require('../Grid');

describe('Grid', function() {
    var columns = [{name: 'Profit'}, {name: 'Margin'}];
    var data = [{profit: 10, margin: 20}, {profit: 5, margin: 3}, {profit: 3, margin: 1}];

    it('should render a grid', function() {
        var rendered = TestUtils.renderIntoDocument(React.createElement(Grid, {columns: columns, data: data}));
        var headers = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'react-ui-grid-header');
        var rows = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'react-ui-grid-row');

        assert.equal(headers.length, 2);
        assert.equal(rows.length, 4);
    });

    it('should keep track of the clicked index', function() {
        var rendered = TestUtils.renderIntoDocument(React.createElement(Grid, {columns: columns, data: data}));
        var headers = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'react-ui-grid-header');

        assert.equal(headers[0].getDOMNode().className, 'react-ui-grid-header');

        TestUtils.Simulate.click(headers[0]);
        assert.equal(rendered.state.clickedIndex, 0);
        assert.equal(headers[0].getDOMNode().className, 'react-ui-grid-header react-ui-grid-header-clicked');
        assert.equal(headers[1].getDOMNode().className, 'react-ui-grid-header');

        TestUtils.Simulate.click(headers[0]);
        assert.equal(rendered.state.clickedIndex, 0);
        assert.equal(headers[0].getDOMNode().className, 'react-ui-grid-header react-ui-grid-header-clicked-reverse');
        assert.equal(headers[1].getDOMNode().className, 'react-ui-grid-header');

        TestUtils.Simulate.click(headers[0]);
        assert.equal(rendered.state.clickedIndex, 0);
        assert.equal(headers[0].getDOMNode().className, 'react-ui-grid-header react-ui-grid-header-clicked');
        assert.equal(headers[1].getDOMNode().className, 'react-ui-grid-header');

        TestUtils.Simulate.click(headers[1]);
        assert.equal(rendered.state.clickedIndex, 1);
        assert.equal(headers[0].getDOMNode().className, 'react-ui-grid-header');
        assert.equal(headers[1].getDOMNode().className, 'react-ui-grid-header react-ui-grid-header-clicked');
    });

    it('should handle a cell click', function() {
        var onCellClick = stub();
        var mockEvent = {};
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Grid, {
            columns: columns, 
            data: data, 
            onCellClick: onCellClick})
        );
        var cells = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'react-ui-grid-cell');

        TestUtils.Simulate.click(cells[0], mockEvent);
        assert.equal(onCellClick.callCount, 1);

        TestUtils.Simulate.click(cells[1], mockEvent);
        assert.equal(onCellClick.callCount, 2);

        TestUtils.Simulate.click(cells[2], mockEvent);
        assert.equal(onCellClick.callCount, 3);

        TestUtils.Simulate.click(cells[3], mockEvent);
        assert.equal(onCellClick.callCount, 4);

        TestUtils.Simulate.click(cells[4], mockEvent);
        assert.equal(onCellClick.callCount, 5);

        TestUtils.Simulate.click(cells[5], mockEvent);
        assert.equal(onCellClick.callCount, 6);

        TestUtils.Simulate.click(cells[5], mockEvent);
        assert.equal(onCellClick.callCount, 7);
    });
});
