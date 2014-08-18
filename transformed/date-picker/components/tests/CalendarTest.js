/** @jsx React.DOM */

var assert = require('chai').assert;
var TestUtils = React.addons.TestUtils;

var Calendar = require('../Calendar');

describe('Calendar', function() {
    it('should not render', function() {
        var rendered = TestUtils.renderIntoDocument(Calendar( {visible:false} ));

        assert.equal(rendered.getDOMNode(), null);
    });
});
