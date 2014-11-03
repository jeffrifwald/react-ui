var assert = require('chai').assert;
var stub = require('sinon').stub;
var TestUtils = React.addons.TestUtils;

var Input = require('../Input');

describe('Input', function() {
    it('should handle a click', function() {
        var onClick = stub();
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Input, {onClick: onClick})
        );

        TestUtils.Simulate.click(rendered.getDOMNode());
        assert.equal(onClick.callCount, 1);
    });
});
