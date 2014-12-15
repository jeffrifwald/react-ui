var Trigger = React.createClass({
    render: function() {
        if (!this.props.showTrigger) {
            return null;
        }

        return (
            <button
            className={this.props.className}
            onClick={this.props.onClick}
            type="button">
                {this.props.triggerText}
            </button>
        );
    }
});

module.exports = Trigger;
