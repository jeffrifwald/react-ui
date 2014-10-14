/** @jsx React.DOM */

var assert = require('chai').assert;
var TestUtils = React.addons.TestUtils;

var Cell = require('../Cell');

describe('Cell', function() {
    it('should render a cell from a data property', function() {
        var column = {dataProp: 'margin'};
        var record = {profit: 10, margin: 0.56};
        var rendered = TestUtils.renderIntoDocument(
            React.DOM.table(null, 
                React.DOM.tr(null, 
                    Cell({
                    className: "cool-cell", 
                    column: column, 
                    record: record})
                )
            )
        );
        var cell = TestUtils.findRenderedComponentWithType(rendered, Cell);

        assert.equal(cell.getDOMNode().textContent, '0.56');
        assert.equal(cell.getDOMNode().className, 'cool-cell');
    });

    it('should render a cell from a render method', function() {
        var column = {
            render: function(record) {
                return '$' + record.profit;
            }
        };
        var record = {profit: 10, margin: 0.56};
        var rendered = TestUtils.renderIntoDocument(
            React.DOM.table(null, 
                React.DOM.tr(null, 
                    Cell({
                    className: "cool-cell", 
                    column: column, 
                    record: record})
                )
            )
        );
        var cell = TestUtils.findRenderedComponentWithType(rendered, Cell);

        assert.equal(cell.getDOMNode().textContent, '$10');
    });
});
