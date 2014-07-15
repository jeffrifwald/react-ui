/** @jsx React.DOM */

var Label = React.createClass({
    render: function() {
        return (
            <label className={this.props.className}>{this.props.label}</label>
        );
    }
});

module.exports = Label;
