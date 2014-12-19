var Trigger = React.createClass({displayName: "Trigger",
    render: function() {
        if (!this.props.showTrigger) {
            return null;
        }

        return (
            React.createElement("button", {
            className: this.props.className, 
            onClick: this.props.onClick, 
            type: "button"}, 
                this.props.triggerText
            )
        );
    }
});

module.exports = Trigger;
