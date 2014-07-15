/** @jsx React.DOM */

var assert = require('chai').assert;
var rewire = require('rewire');
var TestUtils = React.addons.TestUtils;

var Row = rewire('../Row');

//mock the Cell component
Row.__set__('Cell', function() {
    return (<div className='mock-cell'>mock cell</div>);
});

describe('Header', function() {
    it('should render a row', function() {
        var record = {profit: 25};
        var columns = [{name: 'Profit'}, {name: 'Margin'}];
        var rendered;
        var cells;

        rendered = TestUtils.renderIntoDocument(
            <Row
            cellClassName="cool-cell"
            className="cool-row"
            columns={columns}
            record={record}
            rowIndex={0} />
        );

        assert.equal(rendered.getDOMNode().className, 'cool-row');
        cells = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'mock-cell');
        assert.equal(cells.length, 2);
        assert.equal(cells[0].getDOMNode().textContent, 'mock cell');
        assert.equal(cells[1].getDOMNode().textContent, 'mock cell');
    });
});
