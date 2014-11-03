var Trigger = React.createClass({
    render: function() {
        return (
            <button
            className={this.props.className}
            onBlur={this.props.onBlur}
            onClick={this.props.onClick}
            type="button">
            </button>
        );
    }
});

module.exports = Trigger;
