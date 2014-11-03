var assert = require('chai').assert;
var stub = require('sinon').stub;
var TestUtils = React.addons.TestUtils;

var Trigger = require('../Trigger');

describe('Trigger', function() {
    it('should not render', function() {
        var rendered = TestUtils.renderIntoDocument(React.createElement(Trigger, {showTrigger: false}));

        assert.equal(rendered.getDOMNode(), null);
    });

    it('should handle a click', function() {
        var onClick = stub();
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Trigger, {onClick: onClick, showTrigger: true, triggerText: "Click Me"})
        );

        TestUtils.Simulate.click(rendered.getDOMNode());
        assert.equal(onClick.callCount, 1);
        assert.equal(rendered.getDOMNode().textContent, 'Click Me');
    });
});
