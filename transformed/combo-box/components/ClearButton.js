var ClearButton = React.createClass({displayName: "ClearButton",
    render: function() {
        return this.props.showClearButton ? (
            React.createElement("button", {
            className: this.props.className, 
            disabled: this.props.disabled, 
            onClick: this.props.onClick, 
            type: "button"}
            )
        ) : null;
    }
});

module.exports = ClearButton;
