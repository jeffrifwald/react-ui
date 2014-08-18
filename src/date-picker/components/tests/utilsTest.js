/** @jsx React.DOM */

var assert = require('chai').assert;

var utils = require('../utils');

describe('utils', function() {
    it('should format dates', function() {
        var date = new Date(2014, 6, 9);

        assert.equal(utils.formatMap.d.call(utils, date), '09');
        assert.equal(utils.formatMap.j.call(utils, date), '9');
        assert.equal(utils.formatMap.m.call(utils, date), '07');
        assert.equal(utils.formatMap.n.call(utils, date), '7');
        assert.equal(utils.formatMap.w.call(utils, date), '3');
        assert.equal(utils.formatMap.Y.call(utils, date), '2014');
        assert.equal(utils.formatMap.y.call(utils, date), '14');
        assert.equal(utils.formatMap.U.call(utils, date), parseInt(date.getTime() / 1000, 10));
    });

    it('should add days', function() {
        var date = new Date(2014, 6, 9);
        var added = utils.addDays(date, 4);
        var subtracted = utils.addDays(date, -4);

        assert.equal(added.getFullYear(), 2014);
        assert.equal(added.getMonth(), 6);
        assert.equal(added.getDate(), 13);

        assert.equal(subtracted.getFullYear(), 2014);
        assert.equal(subtracted.getMonth(), 6);
        assert.equal(subtracted.getDate(), 5);
    });

    it('should clean a date', function() {
        var date = new Date();
        var clean = utils.cleanDate(date);

        assert.notEqual(date, clean);
        assert.equal(clean.getHours(), 0);
        assert.equal(clean.getMinutes(), 0);
        assert.equal(clean.getSeconds(), 0);
        assert.equal(clean.getMilliseconds(), 0);
    });

    it('should format a date', function() {
        var date = new Date(2014, 6, 9);

        assert.equal(utils.format(date, 'm/d/Y'), '07/09/2014');
        assert.equal(utils.format(date, '\\da\\y w'), 'day 3');
        assert.equal(utils.format(date, 'U'), parseInt(date.getTime() / 1000, 10));
    });

    it('should get an array of days', function() {
        var date = new Date(2014, 6, 9);
        var days = utils.getDays(date);

        assert.equal(days.length, 42);
    });

    it('should determine the same date', function() {
        var date = new Date(2014, 6, 9);
        var same = new Date(2014, 6, 9);
        var diff = new Date(2013, 6, 9);

        assert.isTrue(utils.sameDate(date, same));
        assert.isFalse(utils.sameDate(date, diff));
    });

    it('should determine a disabled date', function() {
        var disabled = [new Date(2014, 6, 9), new Date(2014, 6, 10)];

        assert.isTrue(utils.isDisabledDate(new Date(2014, 6, 9), disabled));
        assert.isFalse(utils.isDisabledDate(new Date(2014, 5, 9), disabled));
    });
});
