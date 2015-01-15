var ClearButton = React.createClass({displayName: "ClearButton",
    render: function() {
        return this.props.showClearButton ? (
            React.createElement("button", {
            className: this.props.className, 
            onClick: this.props.onClick, 
            type: "button"}
            )
        ) : null;
    }
});

module.exports = ClearButton;
