import {assert} from 'chai';
import React from 'react';
import {stub} from 'sinon';

import Slider from '../Slider';
import {TestUtils} from '../../../utils';


describe('Slider/Slider', () => {
    it('should render the correct top level elements', () => {
        const rendered = TestUtils.createComponent(
            <Slider />
        ).render();

        assert.equal(rendered.type, 'div');
        assert.equal(rendered.props.className, 'react-ui-slider');
        assert.equal(rendered.props.children.type, 'div');
        assert.equal(
            rendered.props.children.props.className,
            'react-ui-slider-track'
        );
        assert.equal(
            rendered.props.children.props.children.length,
            2
        );
        assert.equal(
            rendered.props.children.props.children[0].type,
            'div'
        );
        assert.equal(
            rendered.props.children.props.children[1].type,
            'div'
        );
        assert.equal(
            rendered.props.children.props.children[0].props.className,
            'react-ui-slider-fill'
        );
        assert.equal(
            rendered.props.children.props.children[1].props.className,
            'react-ui-slider-handle'
        );
    });

    it('should handle onChange', () => {
        const onChange = stub();
        const component = TestUtils.createComponent(
            <Slider onChange={onChange} />
        );
        const mockEvt = {stopPropagation: stub()};

        stub(component, 'setState');

        component.onChange(mockEvt);
        assert.equal(mockEvt.stopPropagation.callCount, 1);
        assert.equal(onChange.callCount, 0);
        assert.equal(component.setState.callCount, 0);

        component.state.sliding = true;
        component.state.value = 44;
        component.onChange(mockEvt);
        assert.equal(mockEvt.stopPropagation.callCount, 2);
        assert.equal(onChange.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(onChange.calledWith(mockEvt, 44));
        assert.isTrue(component.setState.calledWith({sliding: false}));

        component.setState.restore();
    });

    it('should handle onDragStart', () => {
        const component = TestUtils.createComponent(
            <Slider />
        );
        const mockEvt = {preventDefault: stub()};

        component.onDragStart(mockEvt);
        assert.equal(mockEvt.preventDefault.callCount, 1);
    });

    it('should handle onMouseDown', () => {
        const component = TestUtils.createComponent(
            <Slider />
        );
        const mockEvt = {preventDefault: stub()};

        stub(component, 'setState');

        component.onMouseDown(mockEvt);
        assert.equal(mockEvt.preventDefault.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({sliding: true}));

        component.setState.restore();
    });

    it('should handle onMouseMove', () => {
        const component = TestUtils.createComponent(
            <Slider />
        );
        const mockEvt = {
            clientX: 100
        };

        component.refs = {
            handle: {
                offsetWidth: 20
            },
            track: {
                getBoundingClientRect: stub(),
                offsetWidth: 100
            }
        };
        component.refs.track.getBoundingClientRect.returns({left: 30});
        stub(component, 'setState');
        stub(React, 'findDOMNode', (node) => node);

        component.state.sliding = true;
        component.onMouseMove(mockEvt);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({
            fillWidth: 70,
            handleLeft: 50,
            value: (50 / 100 * 100) / (100 - (20 / 100 * 100)) * 100
        }));

        component.setState.restore();
    });

    it('should handle onMouseMove when not sliding', () => {
        const component = TestUtils.createComponent(
            <Slider />
        );
        const mockEvt = {};

        stub(component, 'setState');

        component.onMouseMove(mockEvt);
        assert.equal(component.setState.callCount, 0);

        component.setState.restore();
    });

    it('should get bounded values', () => {
        const component = TestUtils.createComponent(
            <Slider />
        );

        assert.equal(component.getBoundedValue(55), 55);
        assert.equal(component.getBoundedValue(55, 0), 55);
        assert.equal(component.getBoundedValue(55, 0, 100), 55);
        assert.equal(component.getBoundedValue(-10, 0, 100), 0);
        assert.equal(component.getBoundedValue(305, 0, 100), 100);
    });
});
