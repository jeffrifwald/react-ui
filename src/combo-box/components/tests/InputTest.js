/** @jsx React.DOM */

var assert = require('chai').assert;
var stub = require('sinon').stub;
var TestUtils = React.addons.TestUtils;

var Input = require('../Input');

describe('Input', function() {
    it('should render an input', function() {
        var value = {value: 'Cool Value'};
        var rendered = TestUtils.renderIntoDocument(
            <Input
            className="cool-input"
            readOnly={false}
            renderProps={true}
            value={value}
            valueProp="value" />
        );

        assert.equal(rendered.getDOMNode().className, 'cool-input');
        assert.equal(rendered.getDOMNode().value, 'Cool Value');
        assert.isFalse(rendered.getDOMNode().readonly);
    });

    it('should render an input with a display value', function() {
        var value = {value: 'Cool Value', name: 'Cool Name'};
        var rendered = TestUtils.renderIntoDocument(
            <Input
            className="cool-input"
            displayProp="name"
            readOnly={false}
            renderProps={true}
            value={value}
            valueProp="value" />
        );

        assert.equal(rendered.getDOMNode().className, 'cool-input');
        assert.equal(rendered.getDOMNode().value, 'Cool Name');
    });

    it('should render a plain option', function() {
        var value = 'Cool Plain Value';
        var rendered = TestUtils.renderIntoDocument(
            <Input
            className="cool-input"
            readOnly={false}
            renderProps={true}
            value={value} />
        );

        assert.equal(rendered.getDOMNode().className, 'cool-input');
        assert.equal(rendered.getDOMNode().value, 'Cool Plain Value');
    });

    it('should call the handler on change', function() {
        var options = [{value: 'Cool Value'}, {value: 'Cool Value 2'}];
        var value = {value: 'Cool Value'};
        var onInput = stub();
        var handleInputProps = stub();
        var rendered = TestUtils.renderIntoDocument(
            <Input
            className="cool-input"
            filterDelay={200}
            handleInputProps={handleInputProps}
            onInput={onInput}
            options={options}
            renderProps={true}
            value={value}
            valueProp="value" />
        );
        var timeout;

        //mock clearTimeout, setTimeout, and handleInput's bind method
        stub(global, 'clearTimeout');
        stub(global, 'setTimeout');
        stub(rendered, 'handleInput');
        stub(onInput, 'bind');

        timeout = rendered.inputTimeout;
        TestUtils.Simulate.change(rendered.getDOMNode(), {
            target: {value: 'mock typing'}
        });
        assert.equal(global.clearTimeout.callCount, 1);
        assert.equal(global.setTimeout.callCount, 1);
        assert.equal(onInput.bind.callCount, 1);
        assert.equal(handleInputProps.callCount, 1);
        assert.isTrue(global.clearTimeout.calledWith(timeout));
        assert.isTrue(rendered.handleInput.calledWith('mock typing', options));
        assert.isTrue(handleInputProps.calledWith());

        timeout = rendered.inputTimeout;
        TestUtils.Simulate.change(rendered.getDOMNode(), {
            target: {value: 'mock typing'},
            keyCode: 9 //should not fire when tab is pressed
        });
        assert.equal(global.clearTimeout.callCount, 2); //should always call clearTimeout
        assert.equal(global.setTimeout.callCount, 1);
        assert.equal(onInput.bind.callCount, 1);
        assert.equal(handleInputProps.callCount, 1);

        timeout = rendered.inputTimeout;
        TestUtils.Simulate.change(rendered.getDOMNode(), {
            target: {value: 'mock typing'}
        });
        assert.equal(global.clearTimeout.callCount, 3);
        assert.equal(global.setTimeout.callCount, 2);
        assert.equal(onInput.bind.callCount, 2);
        assert.equal(handleInputProps.callCount, 2);
        assert.isTrue(global.clearTimeout.calledWith(timeout));
        assert.isTrue(rendered.handleInput.calledWith('mock typing', options));
        assert.isTrue(handleInputProps.calledWith());

        //restore mocks
        global.clearTimeout.restore();
        global.setTimeout.restore();
        rendered.handleInput.restore();
    });

    it('should handle input', function() {
        var options = [{value: 'Cool Value'}, {value: 'Cool Value 2'}, {value: undefined}];
        var value = {value: 'Cool Value'};
        var rendered = TestUtils.renderIntoDocument(
            <Input
            className="cool-input"
            filterDelay={200}
            options={options}
            renderProps={true}
            value={value}
            valueProp="value" />
        );

        //mock set state and bind
        stub(rendered, 'setState');

        rendered.handleInput('value 2', options);
        assert.equal(rendered.setState.callCount, 1);
        assert.isTrue(rendered.setState.calledWith({value: 'value 2'}));

        rendered.handleInput('', options);
        assert.equal(rendered.setState.callCount, 2);
        assert.isTrue(rendered.setState.calledWith({value: ''}));

        //restore mocks
        rendered.setState.restore();
    });
});
