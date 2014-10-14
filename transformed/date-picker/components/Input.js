/** @jsx React.DOM */

var Input = React.createClass({displayName: 'Input',
    render: function() {
        return (
            React.DOM.input({
            className: this.props.className, 
            onClick: this.props.onClick, 
            placeholder: this.props.placeholder, 
            readOnly: true, 
            type: "textbox", 
            value: this.props.value})
        );
    }
});

module.exports = Input;
