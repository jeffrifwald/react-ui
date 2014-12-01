var assert = require('chai').assert;

var utils = require('../utils');


describe('Utils', function() {
    it('should get a class name', function() {
        assert.equal(utils.className({
            one: true,
            two: false,
            three: true
        }), 'one three');

        assert.equal(utils.className('one', 'two', 'three'), 'one two three');
    });
});
