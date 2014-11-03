var assert = require('chai').assert;
var TestUtils = React.addons.TestUtils;
var stub = require('sinon').stub;

var FileInput = require('../FileInput');

describe('FileInput', function() {
    it('should handle choosing and clearing', function() {
        var onChooseClick = stub();
        var onClearClick = stub();
        var onFileChange = stub();
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(FileInput, {
            name: "cool_name", 
            onChooseClick: onChooseClick, 
            onClearClick: onClearClick, 
            onFileChange: onFileChange})
        );
        var mockEvent = {
            preventDefault: stub(),
            target: {value: 'C:\\files\\mock_file.jpg'}
        };
        var fileName = TestUtils.findRenderedDOMComponentWithClass(
            rendered,
            'react-ui-file-input-file-name'
        );
        var chooseBtn = TestUtils.findRenderedDOMComponentWithClass(
            rendered,
            'react-ui-file-input-choose'
        );
        var clearBtn = TestUtils.findRenderedDOMComponentWithClass(
            rendered,
            'react-ui-file-input-clear'
        );
        var inputs = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'input');

        TestUtils.Simulate.click(chooseBtn.getDOMNode(), mockEvent);
        assert.equal(mockEvent.preventDefault.callCount, 1);
        assert.isTrue(mockEvent.preventDefault.calledWith());
        assert.equal(onChooseClick.callCount, 1);

        TestUtils.Simulate.change(inputs[0], mockEvent);
        assert.equal(fileName.getDOMNode().value, 'mock_file.jpg');
        assert.equal(onFileChange.callCount, 1);

        TestUtils.Simulate.click(clearBtn.getDOMNode(), mockEvent);
        assert.equal(mockEvent.preventDefault.callCount, 2);
        assert.isTrue(mockEvent.preventDefault.calledWith());
        assert.equal(fileName.getDOMNode().value, '');
        assert.equal(rendered.state.inputKey, 1);
        assert.equal(onClearClick.callCount, 1);
    });
});
