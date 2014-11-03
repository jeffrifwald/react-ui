var assert = require('chai').assert;
var stub = require('sinon').stub;
var TestUtils = React.addons.TestUtils;

var Header = require('../Header');

describe('Header', function() {
    it('should render a header', function() {
        var column = {name: 'Profit'};
        var clickHandler = stub();
        var rendered = TestUtils.renderIntoDocument(
            React.createElement("table", null, 
                React.createElement(Header, {column: column, columnIndex: 1, onClick: clickHandler})
            )
        );
        var header = TestUtils.findRenderedComponentWithType(rendered, Header);

        assert.equal(header.getDOMNode().textContent, 'Profit');

        TestUtils.Simulate.click(header.getDOMNode());
        assert.equal(clickHandler.callCount, 1);
        assert.isTrue(clickHandler.calledWith(column, 1, false));

        TestUtils.Simulate.click(header.getDOMNode());
        assert.equal(clickHandler.callCount, 2);
        assert.isTrue(clickHandler.calledWith(column, 1, true));
    });

    it('should ignore a column header click', function() {
        var column = {name: 'Profit', ignoreHeaderClick: true};
        var clickHandler = stub();
        var rendered = TestUtils.renderIntoDocument(
            React.createElement("table", null, 
                React.createElement(Header, {column: column, columnIndex: 1, onClick: clickHandler})
            )
        );
        var header = TestUtils.findRenderedComponentWithType(rendered, Header);

        assert.equal(header.getDOMNode().textContent, 'Profit');

        TestUtils.Simulate.click(header.getDOMNode());
        assert.equal(clickHandler.callCount, 0);
        assert.equal(header.state.numClicks, 0);
    });

    it('should get a class name for a clicked header', function() {
        var column = {name: 'Profit'};
        var clickHandler = stub();
        var rendered = TestUtils.renderIntoDocument(
            React.createElement("table", null, 
                React.createElement(Header, {
                className: "cool-header", 
                clickedClassName: "clicked-cool-header", 
                clickedIndex: 1, 
                column: column, 
                columnIndex: 1, 
                onClick: clickHandler})
            )
        );
        var header = TestUtils.findRenderedComponentWithType(rendered, Header);

        assert.equal(header.getClassName(), 'cool-header clicked-cool-header');
    });
});
