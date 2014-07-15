/** @jsx React.DOM */

var assert = require('chai').assert;
var TestUtils = React.addons.TestUtils;

var Grid = require('../Grid');

describe('Grid', function() {
    var columns = [{name: 'Profit'}, {name: 'Margin'}];
    var data = [{profit: 10, margin: 20}, {profit: 5, margin: 3}, {profit: 3, margin: 1}];

    it('should render a grid', function() {
        var rendered = TestUtils.renderIntoDocument(<Grid columns={columns} data={data} />);
        var headers = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'react-ui-grid-header');
        var rows = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'react-ui-grid-row');

        assert.equal(headers.length, 2);
        assert.equal(rows.length, 4);
    });
});
