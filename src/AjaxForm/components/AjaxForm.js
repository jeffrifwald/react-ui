import React from 'react';

import {classNames, noop, post} from '../../utils';


class AjaxForm extends React.Component {
    constructor(...args) {
        super(...args);

        this.onResponse = this.onResponse.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <form
            action={this.props.action}
            className={this.getClassName()}
            method='POST'
            onSubmit={this.onSubmit}>
                {this.props.children}
            </form>
        );
    }

    onResponse(err, res) {
        this.props.onResponse(err, res);
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.submit(evt);
    }

    getClassName() {
        return classNames({
            [this.props.className]: !!this.props.className,
            'react-ui-ajax-form': true
        });
    }

    submit(evt) {
        this.props.onSubmit(evt);

        if (global.FormData) {
            this.submitFormData(evt);
        } else {
            evt.target.submit();
        }
    }

    submitFormData(evt) {
        post(
            evt.target.action,
            new global.FormData(evt.target),
            this.onResponse
        );
    }
}

AjaxForm.propTypes = {
    className: React.PropTypes.string,
    onResponse: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    url: React.PropTypes.string
};

AjaxForm.defaultProps = {
    className: '',
    onResponse: noop,
    onSubmit: noop,
    url: ''
};


