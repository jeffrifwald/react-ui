import {assert} from 'chai';
import {spy, stub} from 'sinon';

import {
    chunk,
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
    const mocks = {};

    class MockXMLHttpRequest {
        constructor() {
            mocks.request = this;
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

        assert.equal(mocks.request.open.callCount, 1);
        assert.equal(mocks.request.send.callCount, 1);
        assert.equal(mocks.request.onload.callCount, 2);
        assert.equal(mocks.request.onerror.callCount, 1);
        assert.equal(onResponse.callCount, 3);
        assert.isTrue(mocks.request.open.calledWith(
            'POST',
            '/api/neato/',
            true
        ));
        assert.isTrue(mocks.request.send.calledWith('mock data'));
        assert.isTrue(onResponse.calledWith(
            new Error('ReactUI.AjaxForm: Network Error'),
            mocks.request
        ));
        assert.isTrue(onResponse.calledWith(
            new Error('ReactUI.AjaxForm: Status Error'),
            mocks.request
        ));
        assert.isTrue(onResponse.calledWith(
            undefined,
            mocks.request
        ));
    });
});

describe('utils/chunk', () => {
    it('should chunk an iterable with items', () => {
        const xs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const result = chunk(xs, 3);

        assert.deepEqual(result, [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [10]
        ]);
    });

    it('should chunk with too large n', () => {
        const xs = [1, 2, 3, 4];
        const result = chunk(xs, 10);

        assert.deepEqual(result, [[1, 2, 3, 4]]);
    });
});
