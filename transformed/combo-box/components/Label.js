/** @jsx React.DOM */

var Label = React.createClass({displayName: 'Label',
    render: function() {
        return (
            React.DOM.label( {className:this.props.className}, this.props.label)
        );
    }
});

module.exports = Label;
