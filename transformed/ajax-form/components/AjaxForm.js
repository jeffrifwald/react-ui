/** @jsx React.DOM */

var utils = require('./utils');

/**
 * @class AjaxForm
 * A form component that attempts to submit its contents with an asynchronous POST request.
 * Falls back to synchronously submitting the form in older browsers.
 */
var AjaxForm = React.createClass({displayName: 'AjaxForm',
    propTypes: {
        /** @prop {String} className - The className of the form. */
        className: React.PropTypes.string,

        /** @prop {Function} onResponse - The method to call when a response is available. */
        onResponse: React.PropTypes.func,

        /** @prop {String} url - The url for sending the request. */
        url: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            className: 'react-ui-ajax-form',
            onResponse: utils.emptyFn,
            url: ''
        };
    },

    render: function() {
        return (
            React.DOM.form(
            {action:this.props.url,
            className:this.props.className,
            method:"POST",
            onSubmit:this.onSubmit}, 
                this.props.children
            )
        );
    },

    /**
     * @method onSubmit
     * Prevents form submission and decides how to handle the form.
     * Submits the form via ajax with FormData or posts to an iframe.
     * @param {Object} evt - The submit event.
     */
    onSubmit: function(evt) {
        evt.preventDefault(); //do not submit the form yet
        utils.handleForm(this.getDOMNode(), this.props.onResponse);
    }
});

module.exports = AjaxForm;
