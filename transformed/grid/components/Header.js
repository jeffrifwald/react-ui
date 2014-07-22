/** @jsx React.DOM */

/**
 * @class Header
 * Renders a header for the grid.
 */
var Header = React.createClass({displayName: 'Header',
    getInitialState: function() {
        return {
            reverse: false
        };
    },

    render: function() {
        return (
            React.DOM.th( {className:this.getClassName(), onClick:this.onClick}, 
                this.props.column.name
            )
        );
    },

    /**
     * @method getClassName
     * Gets the class name based on if this column is the most currently clicked.
     */
    getClassName: function() {
        if (this.props.clickedIndex === this.props.columnIndex) {
            return this.props.className + ' ' + this.props.clickedClassName;
        }

        return this.props.className;
    },

    /**
     * @method onClick
     * Calls the onClick handler passed from the Grid.
     * Sets the reverse state of the header.
     */
    onClick: function() {
        this.props.onClick(this.props.column, this.props.columnIndex, this.state.reverse);
        this.setState({reverse: !this.state.reverse});
    }
});

module.exports = Header;
