var ClearButton = React.createClass({
    render: function() {
        return this.props.showClearButton ? (
            <button
            className={this.props.className}
            onClick={this.props.onClick}
            type="button">
            </button>
        ) : null;
    }
});

module.exports = ClearButton;
