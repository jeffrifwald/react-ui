/** @jsx React.DOM */

var Trigger = React.createClass({displayName: 'Trigger',
    render: function() {
        if (!this.props.showTrigger) {
            return null;
        }

        return (
            React.DOM.button({
            className: this.props.className, 
            onClick: this.props.onClick}, 
                this.props.triggerText
            )
        );
    }
});

module.exports = Trigger;
