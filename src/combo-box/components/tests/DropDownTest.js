var assert = require('chai').assert;
var stub = require('sinon').stub;
var TestUtils = React.addons.TestUtils;

var DropDown = require('../DropDown');

describe('DropDown', function() {
    var options = [
        {value: 'Option 1'},
        {value: 'Option 2'},
        {value: 'Option 3'}
    ];
    var onOptionMouseDown;
    var renderOption = function(option) {
        return option.value;
    };

    beforeEach(function() {
        onOptionMouseDown = stub();
    });

    it('should render a visible drop down', function() {
        var rendered = TestUtils.renderIntoDocument(
            <DropDown
            onOptionMouseDown={onOptionMouseDown}
            optionClassName="cool-option"
            options={options}
            renderOption={renderOption}
            selected={options[0]}
            valueProp="value"
            visible={true} />
        );
        var renderedOptions = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'cool-option');

        assert.equal(rendered.getDOMNode().style.display, 'block');
        assert.equal(renderedOptions.length, 3);
        assert.equal(renderedOptions[0].getDOMNode().textContent, 'Option 1');
        assert.equal(renderedOptions[1].getDOMNode().textContent, 'Option 2');
        assert.equal(renderedOptions[2].getDOMNode().textContent, 'Option 3');
    });

    it('should render a hidden drop down', function() {
        var rendered = TestUtils.renderIntoDocument(
            <DropDown
            onOptionMouseDown={onOptionMouseDown}
            optionClassName="cool-option"
            options={options}
            renderOption={renderOption}
            selected={options[0]}
            valueProp="value"
            visible={false} />
        );

        assert.equal(rendered.getDOMNode().style.display, 'none');
    });

    it('should handle a click', function() {
        var rendered = TestUtils.renderIntoDocument(
            <DropDown
            onOptionMouseDown={onOptionMouseDown}
            optionClassName="cool-option"
            options={options}
            renderOption={renderOption}
            selected={options[0]}
            valueProp="value"
            visible={true} />
        );
        var renderedOptions = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'cool-option');

        TestUtils.Simulate.mouseDown(renderedOptions[0].getDOMNode());
        assert.equal(onOptionMouseDown.callCount, 1);
        assert.isTrue(onOptionMouseDown.calledWith(options[0]));
    });
});
