/** @jsx React.DOM */

var assert = require('chai').assert;
var TestUtils = React.addons.TestUtils;

var Row = require('../Row');

describe('Row', function() {
    it('should render a row', function() {
        var record = {profit: 25, margin: 0.1};
        var columns = [{name: 'Profit', dataProp: 'profit'}, {name: 'Margin', dataProp: 'margin'}];
        var rendered;
        var cells;

        rendered = TestUtils.renderIntoDocument(
            Row(
            {cellClassName:"cool-cell",
            className:"cool-row",
            columns:columns,
            record:record,
            rowIndex:0} )
        );

        assert.equal(rendered.getDOMNode().className, 'cool-row');
        cells = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'cool-cell');
        assert.equal(cells.length, 2);
        assert.equal(cells[0].getDOMNode().textContent, '25');
        assert.equal(cells[1].getDOMNode().textContent, '0.1');
    });
});
