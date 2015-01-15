var assert = require('chai').assert;
var stub = require('sinon').stub;
var TestUtils = React.addons.TestUtils;

var ClearButton = require('../ClearButton');

describe('ClearButton', function() {
    it('should not render when not shown', function() {
        assert.equal(
            TestUtils.renderIntoDocument(React.createElement(ClearButton, null)).getDOMNode(),
            null
        );
    });

    it('should render a clear button', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(ClearButton, {className: "cool-clear-btn", showClearButton: true})
        );

        assert.equal(rendered.getDOMNode().className, 'cool-clear-btn');
    });

    it('should call the given handler on click', function() {
        var onClick = stub();
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(ClearButton, {
            className: "cool-clear-btn", 
            onClick: onClick, 
            showClearButton: true})
        );

        TestUtils.Simulate.click(rendered.getDOMNode());
        assert.equal(onClick.callCount, 1);
    });
});
