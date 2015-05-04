var Trigger = React.createClass({displayName: "Trigger",
    render: function() {
        return (
            React.createElement("button", {
            className: this.props.className, 
            disabled: this.props.disabled, 
            onBlur: this.props.onBlur, 
            onClick: this.props.onClick, 
            type: "button"}
            )
        );
    }
});

module.exports = Trigger;
