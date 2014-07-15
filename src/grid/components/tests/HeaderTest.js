/** @jsx React.DOM */

var assert = require('chai').assert;
var stub = require('sinon').stub;
var TestUtils = React.addons.TestUtils;

var Header = require('../Header');

describe('Header', function() {
    it('should render a header', function() {
        var column = {name: 'Profit'};
        var clickHandler = stub();
        var rendered = TestUtils.renderIntoDocument(
            <Header column={column} onClick={clickHandler} />
        );

        assert.equal(rendered.getDOMNode().textContent, 'Profit');
        TestUtils.Simulate.click(rendered.getDOMNode());
        assert.equal(clickHandler.callCount, 1);
    });
});
