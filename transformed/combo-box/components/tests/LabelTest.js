/** @jsx React.DOM */

var assert = require('chai').assert;
var TestUtils = React.addons.TestUtils;

var Label = require('../Label');

describe('Label', function() {
    it('should render a label', function() {
        var rendered = TestUtils.renderIntoDocument(
            Label( {className:"cool-label", label:"Cool Label:"} )
        );

        assert.equal(rendered.getDOMNode().className, 'cool-label');
        assert.equal(rendered.getDOMNode().textContent, 'Cool Label:');
    });
});
