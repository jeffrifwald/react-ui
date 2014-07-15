/** @jsx React.DOM */

var Trigger = React.createClass({
    render: function() {
        return (
            <button
            className={this.props.className}
            onClick={this.props.onClick}
            type="button">
            </button>
        );
    }
});

module.exports = Trigger;
