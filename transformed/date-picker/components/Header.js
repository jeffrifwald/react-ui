/** @jsx React.DOM */

var Header = React.createClass({displayName: 'Header',
    render: function() {
        return (
            React.DOM.tr( {className:this.props.headerClassName}, 
                React.DOM.td(
                {className:this.props.prevClassName,
                onClick:this.props.onPrevClick}, 
                    this.props.prevChar
                ),

                React.DOM.td( {className:this.props.monthClassName, colSpan:"5"}, this.props.header),

                React.DOM.td(
                {className:this.props.nextClassName,
                onClick:this.props.onNextClick}, 
                    this.props.nextChar
                )
            )
        );
    }
});

module.exports = Header;
