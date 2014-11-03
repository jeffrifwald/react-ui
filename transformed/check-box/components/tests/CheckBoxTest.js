var assert = require('chai').assert;
var TestUtils = React.addons.TestUtils;

var CheckBox = require('../CheckBox');

describe('CheckBox', function() {
    it('should handle a textbox change', function() {
        var rendered = TestUtils.renderIntoDocument(React.createElement(CheckBox, null));
        var inputs = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'input');

        TestUtils.Simulate.change(inputs[0].getDOMNode());
        assert.equal(inputs[1].getDOMNode().value, 'true');

        TestUtils.Simulate.change(inputs[0].getDOMNode());
        assert.equal(inputs[1].getDOMNode().value, 'false');
    });
});
