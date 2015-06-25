import React from 'react';

import {getClassName, noop, request} from '../../utils';


/**
 * @class AjaxForm
 * A form that submits its contents with an
 * asynchronous POST request via FormData. Falls back to synchronously
 * submitting the form when FormData does not exist.
 */
class AjaxForm extends React.Component {
    constructor(...args) {
        super(...args);

        this.onResponse = this.onResponse.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        const className = getClassName(
            'react-ui-ajax-form',
            this.props.className
        );

        return (
            <form
            action={this.props.action}
            className={className}
            method="POST"
            onSubmit={this.onSubmit}
            ref="form">
                {this.props.children}
            </form>
        );
    }

    onResponse(err, res) {
        this.props.onResponse(err, res);
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.props.onSubmit(evt);
        this.submit();
    }

    submit() {
        let form = React.findDOMNode(this.refs.form);

        if (global.FormData) {
            this.submitFormData(form);
        } else {
            form.submit();
        }
    }

    submitFormData(form) {
        request.post(
            form.action,
            new global.FormData(form),
            this.onResponse
        );
    }
}

AjaxForm.propTypes = {
    action: React.PropTypes.string,
    className: React.PropTypes.string,
    onResponse: React.PropTypes.func,
    onSubmit: React.PropTypes.func
};

AjaxForm.defaultProps = {
    action: '',
    className: '',
    onResponse: noop,
    onSubmit: noop
};

export default AjaxForm;

