var Trigger = React.createClass({
    render: function() {
        return (
            <button
            className={this.props.className}
            disabled={this.props.disabled}
            onBlur={this.props.onBlur}
            onClick={this.props.onClick}
            type="button">
            </button>
        );
    }
});

module.exports = Trigger;
