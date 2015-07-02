import {assert} from 'chai';
import React from 'react';
import {stub} from 'sinon';

import FileInput from '../FileInput';
import {TestUtils} from '../../../utils';


describe('FileInput/FileInput', () => {
    it('should render the correct top level elements', () => {
        const rendered = TestUtils.createComponent(
            <FileInput className="test-file-input" />
        ).render();

        assert.equal(rendered.type, 'div');
        assert.equal(rendered.props.children.length, 4);
        assert.equal(
            rendered.props.className,
            'react-ui-file-input test-file-input'
        );
    });

    it('should render a hidden file input', () => {
        const component = TestUtils.createComponent(
            <FileInput name="photo" />
        );
        const rendered = component.render();
        const input = rendered.props.children[0];

        assert.equal(input.type, 'input');
        assert.equal(input.props.type, 'file');
        assert.equal(input.props.name, 'photo');
        assert.equal(input.props.style.display, 'none');
        assert.equal(input.props.onChange, component.onChange);
    });

    it('should render a choose button', () => {
        const component = TestUtils.createComponent(
            <FileInput chooseClassName="cool-btn" />
        );
        const rendered = component.render();
        const button = rendered.props.children[1];

        assert.equal(button.type, 'button');
        assert.equal(
            button.props.className,
            'react-ui-file-input-choose cool-btn'
        );
        assert.equal(button.props.onClick, component.onChooseClick);
    });

    it('should render a clear button', () => {
        const component = TestUtils.createComponent(
            <FileInput clearClassName="neat-btn" />
        );
        const rendered = component.render();
        const button = rendered.props.children[2];

        assert.equal(button.type, 'button');
        assert.equal(
            button.props.className,
            'react-ui-file-input-clear neat-btn'
        );
        assert.equal(button.props.onClick, component.onClearClick);
    });

    it('should render a readonly text input', () => {
        const component = TestUtils.createComponent(
            <FileInput
            clearClassName="neat-btn"
            placeholder="neat.png" />
        );
        const rendered = component.render();
        const input = rendered.props.children[3];

        assert.equal(input.type, 'input');
        assert.equal(input.props.type, 'text');
        assert.equal(input.props.placeholder, 'neat.png');
        assert.equal(input.props.onClick, component.onChooseClick);
        assert.isTrue(input.props.readOnly);
    });

    it('should disable inputs', () => {
        const rendered = TestUtils.createComponent(
            <FileInput
            disabled={true} />
        ).render();
        const inputs = rendered.props.children;

        inputs.forEach((input) => assert.isTrue(input.props.disabled));
    });

    it('should hide inputs', () => {
        const rendered = TestUtils.createComponent(
            <FileInput
            showChooseButton={false}
            showClearButton={false}
            showInput={false} />
        ).render();

        assert.equal(rendered.props.children[0].type, 'input');
        assert.isNull(rendered.props.children[1]);
        assert.isNull(rendered.props.children[2]);
        assert.isNull(rendered.props.children[3]);
    });

    it('should handle onChange', () => {
        const onChange = stub();
        const evt = {target: {value: 'path\\cool.jpg'}};
        const component = TestUtils.createComponent(
            <FileInput onChange={onChange} />
        );

        stub(component, 'setState');

        component.onChange(evt);
        assert.equal(onChange.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(onChange.calledWith(evt, 'cool.jpg'));
        assert.isTrue(component.setState.calledWith({
            inputDisplay: 'cool.jpg'
        }));

        component.setState.restore();
    });

    it('should handle onChooseClick', () => {
        const onChooseClick = stub();
        const evt = {preventDefault: stub()};
        const node = {click: stub()};
        const component = TestUtils.createComponent(
            <FileInput onChooseClick={onChooseClick} />
        );

        component.refs = {fileInput: 'mock ref'};
        stub(React, 'findDOMNode', () => node);

        component.onChooseClick(evt);
        assert.equal(evt.preventDefault.callCount, 1);
        assert.equal(onChooseClick.callCount, 1);
        assert.equal(React.findDOMNode.callCount, 1);
        assert.equal(node.click.callCount, 1);
        assert.isTrue(onChooseClick.calledWith(evt));
        assert.isTrue(React.findDOMNode.calledWith('mock ref'));

        React.findDOMNode.restore();
    });

    it('should handle onClearClick', () => {
        const onClearClick = stub();
        const evt = {preventDefault: stub()};
        const component = TestUtils.createComponent(
            <FileInput onClearClick={onClearClick} />
        );

        stub(component, 'clear');

        component.onClearClick(evt);
        assert.equal(evt.preventDefault.callCount, 1);
        assert.equal(onClearClick.callCount, 1);
        assert.equal(component.clear.callCount, 1);
        assert.isTrue(onClearClick.calledWith(evt));

        component.clear.restore();
    });

    it('should clear', () => {
        const component = TestUtils.createComponent(
            <FileInput />
        );

        stub(component, 'setState');

        component.clear();
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({
            inputDisplay: '',
            inputKey: component.state.inputKey + 1
        }));

        component.setState.restore();
    });
});
