/** @jsx React.DOM */

var assert = require('chai').assert;
var TestUtils = React.addons.TestUtils;
var stub = require('sinon').stub;

var AjaxForm = require('../AjaxForm');

describe('AjaxForm', function() {
    var mockRequest = {
        open: function() {},
        send: function() {}
    };

    stub(mockRequest, 'open');
    stub(mockRequest, 'send', function() {

        //send ok
        this.status = 200;
        this.responseText = JSON.stringify({
            status: {errors: [], success: true}
        });
        this.onload();

        //send bad status
        this.status = 404;
        this.onload();

        //send error
        this.onerror();
    }.bind(mockRequest));

    window.XMLHttpRequest = function() {
        return mockRequest;
    };

    it('should handle submission with FormData', function() {
        var onResponse = stub();
        var mockEvent = {preventDefault: stub()};
        var rendered = TestUtils.renderIntoDocument(
            <AjaxForm onResponse={onResponse} url="/submit/" />
        );
        var node = rendered.getDOMNode();
        var formDataCalled = 0;

        //mock FormData
        window.FormData = function(form) {
            formDataCalled++;
            assert.equal(form, node);
        };

        TestUtils.Simulate.submit(node, mockEvent);
        assert.equal(mockEvent.preventDefault.callCount, 1);
        assert.isTrue(mockEvent.preventDefault.calledWith());
        assert.equal(onResponse.callCount, 3); //called for ok, failure, and error
        assert.isTrue(onResponse.calledWith(undefined, mockRequest));
        assert.isTrue(onResponse.calledWith(new Error('AjaxForm: StatusError'), mockRequest));
        assert.isTrue(onResponse.calledWith(new Error('AjaxForm: Network Error'), mockRequest));
        assert.equal(formDataCalled, 1);
        assert.equal(mockRequest.open.callCount, 1);
        assert.isTrue(mockRequest.open.calledWith('POST', '/submit/', true));
        assert.equal(mockRequest.send.callCount, 1);
        assert.isTrue(mockRequest.send.calledWith(new window.FormData(node)));
    });

    it('should handle submission without FormData', function() {
        var mockEvent = {preventDefault: stub()};
        var rendered = TestUtils.renderIntoDocument(
            <AjaxForm url="/submit/" />
        );
        var node = rendered.getDOMNode();

        //mock form submit
        stub(node, 'submit');
        window.FormData = undefined;

        TestUtils.Simulate.submit(node, mockEvent);
        assert.equal(mockEvent.preventDefault.callCount, 1);
        assert.isTrue(mockEvent.preventDefault.calledWith());

        //restore mocks
        node.submit.restore();
    });
});
