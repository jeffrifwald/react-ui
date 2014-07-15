/** @jsx React.DOM */

var Trigger = React.createClass({displayName: 'Trigger',
    render: function() {
        return (
            React.DOM.button(
            {className:this.props.className,
            onClick:this.props.onClick,
            type:"button"}
            )
        );
    }
});

module.exports = Trigger;
