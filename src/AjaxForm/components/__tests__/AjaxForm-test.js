import {assert} from 'chai';
import React from 'react';
import {stub} from 'sinon';

import AjaxForm from '../AjaxForm';
import {request, TestUtils} from '../../../utils';


describe('AjaxForm/AjaxForm', () => {
    it('should render form and its children', () => {
        let component = TestUtils.createComponent(
            <AjaxForm action="/login/" className="cool-form">
                <input />
                <button>Submit</button>
            </AjaxForm>
        );
        let rendered = component.render();

        assert.equal(rendered.type, 'form');
        assert.equal(rendered.props.children.length, 2);
        assert.equal(rendered.props.action, '/login/');
        assert.equal(rendered.props.method, 'POST');
        assert.equal(rendered.props.children[0].type, 'input');
        assert.equal(rendered.props.children[1].type, 'button');
        assert.equal(rendered.props.onSubmit, component.onSubmit);
        assert.equal(
            rendered.props.className,
            'react-ui-ajax-form cool-form'
        );
    });

    it('should handle onResponse', () => {
        let onResponse = stub();
        let component = TestUtils.createComponent(
            <AjaxForm onResponse={onResponse} />
        );

        component.onResponse('mock error', 'mock response');
        assert.equal(onResponse.callCount, 1);
        assert.isTrue(onResponse.calledWith('mock error', 'mock response'));
    });

    it('should handle a onSubmit', () => {
        let onSubmit = stub();
        let evt = {preventDefault: stub()};
        let component = TestUtils.createComponent(
            <AjaxForm onSubmit={onSubmit} />
        );

        stub(component, 'submit');

        component.onSubmit(evt);
        assert.equal(evt.preventDefault.callCount, 1);
        assert.equal(onSubmit.callCount, 1);
        assert.equal(component.submit.callCount, 1);
        assert.isTrue(onSubmit.calledWith(evt));

        component.submit.restore();
    });

    it('should submit with FormData', () => {
        let component = TestUtils.createComponent(
            <AjaxForm />
        );

        global.FormData = true;
        component.refs = {form: 'mock form'};
        stub(React, 'findDOMNode', () => 'mock node');
        stub(component, 'submitFormData');

        component.submit();
        assert.equal(React.findDOMNode.callCount, 1);
        assert.equal(component.submitFormData.callCount, 1);
        assert.isTrue(React.findDOMNode.calledWith('mock form'));
        assert.isTrue(component.submitFormData.calledWith('mock node'));

        delete global.FormData;
        React.findDOMNode.restore();
        component.submitFormData.restore();
    });

    it('should submit without FormData', () => {
        let node = {submit: stub()};
        let component = TestUtils.createComponent(
            <AjaxForm />
        );

        component.refs = {form: 'mock form'};
        stub(React, 'findDOMNode', () => node);

        component.submit();
        assert.equal(React.findDOMNode.callCount, 1);
        assert.equal(node.submit.callCount, 1);
        assert.isTrue(React.findDOMNode.calledWith('mock form'));

        React.findDOMNode.restore();
    });

    it('should submit form data', () => {
        let form = {action: '/login/'};
        let component = TestUtils.createComponent(
            <AjaxForm />
        );

        global.FormData = function() {};
        stub(request, 'post');

        component.submitFormData(form);
        assert.equal(request.post.callCount, 1);
        assert.isTrue(request.post.calledWith(
            '/login/',
            new global.FormData(form),
            component.onResponse
        ));

        delete global.FormData;
        request.post.restore();
    });
});