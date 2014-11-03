var assert = require('chai').assert;
var stub = require('sinon').stub;
var TestUtils = React.addons.TestUtils;

var Trigger = require('../Trigger');

describe('Trigger', function() {
    it('should render a trigger', function() {
        var rendered = TestUtils.renderIntoDocument(React.createElement(Trigger, {className: "cool-trigger"}));
        assert.equal(rendered.getDOMNode().className, 'cool-trigger');
    });

    it('should call the given handler on click', function() {
        var onClick = stub();
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Trigger, {className: "cool-trigger", onClick: onClick})
        );

        TestUtils.Simulate.click(rendered.getDOMNode());
        assert.equal(onClick.callCount, 1);
    });
});
