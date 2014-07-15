/** @jsx React.DOM */

var assert = require('chai').assert;
var TestUtils = React.addons.TestUtils;

var Cell = require('../Cell');

describe('Cell', function() {
    it('should render a cell from a data property', function() {
        var column = {dataProp: 'margin'};
        var record = {profit: 10, margin: 0.56};
        var rendered = TestUtils.renderIntoDocument(
            <Cell
             className="cool-cell"
             column={column}
             record={record} />
        );

        assert.equal(rendered.getDOMNode().textContent, '0.56');
        assert.equal(rendered.getDOMNode().className, 'cool-cell');
    });

    it('should render a cell from a render method', function() {
        var column = {
            render: function(record) {
                return '$' + record.profit;
            }
        };
        var record = {profit: 10, margin: 0.56};
        var rendered;


        rendered = TestUtils.renderIntoDocument(
            <Cell
             className="cool-cell"
             column={column}
             record={record} />
        );

        assert.equal(rendered.getDOMNode().textContent, '$10');
    });
});
