import {assert} from 'chai';
import {spy, stub} from 'sinon';

import {
    classNames,
    getClassName,
    noop,
    request
} from '../utils';


describe('utils/classNames', () => {
    it('should generate an empty class names with arguments', () => {
        assert.equal(classNames(), '');
    });

    it('should generate an empty class name with a config', () => {
        assert.equal(classNames({}), '');
    });

    it('should generate a class name with arguments', () => {
        assert.equal(classNames('a', 'b', 'c'), 'a b c');
    });

    it('should generate a class name with a config', () => {
        assert.equal(classNames({
            'awesome-stuff': true,
            'bad-stuff': false,
            'cool-stuff': true
        }), 'awesome-stuff cool-stuff');
    });
});

describe('utils/getClassName', () => {
    it('should generate a class name for a component', () => {
        const result = getClassName('react-ui-ajax-form', 'custom-form');

        assert.equal(result, 'react-ui-ajax-form custom-form');
    });
});

describe('utils/noop', () => {
    it('should do nothing', () => {
        assert.isUndefined(noop());
    });
});

describe('utils/post', () => {
    const originalXMLHttpRequest = global.XMLHttpRequest;
    let mockRequest;

    class MockXMLHttpRequest {
        constructor() {
            mockRequest = this;
        }

        open() {

        }

        send() {
            spy(this, 'onload');
            spy(this, 'onerror');

            this.status = 200;
            this.onload();
            this.status = 404;
            this.onload();
            this.onerror();
        }
    }

    beforeEach(() => {
        spy(MockXMLHttpRequest.prototype, 'open');
        spy(MockXMLHttpRequest.prototype, 'send');

        global.XMLHttpRequest = MockXMLHttpRequest;
    });

    afterEach(() => {
        MockXMLHttpRequest.prototype.open.restore();
        MockXMLHttpRequest.prototype.send.restore();

        global.XMLHttpRequest = originalXMLHttpRequest;
    });

    it('should make a POST request', () => {
        const onResponse = stub();

        request.post('/api/neato/', 'mock data', onResponse);

        assert.equal(mockRequest.open.callCount, 1);
        assert.equal(mockRequest.send.callCount, 1);
        assert.equal(mockRequest.onload.callCount, 2);
        assert.equal(mockRequest.onerror.callCount, 1);
        assert.equal(onResponse.callCount, 3);
        assert.isTrue(mockRequest.open.calledWith('POST', '/api/neato/', true));
        assert.isTrue(mockRequest.send.calledWith('mock data'));
        assert.isTrue(onResponse.calledWith(
            new Error('ReactUI.AjaxForm: Network Error'),
            mockRequest
        ));
        assert.isTrue(onResponse.calledWith(
            new Error('ReactUI.AjaxForm: Status Error'),
            mockRequest
        ));
        assert.isTrue(onResponse.calledWith(
            undefined,
            mockRequest
        ));
    });
});
