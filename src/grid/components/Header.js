/**
 * @class Header
 * Renders a header for the grid.
 */
var Header = React.createClass({
    getInitialState: function() {
        return {
            numClicks: 0
        };
    },

    render: function() {
        return (
            <th className={this.getClassName()} onClick={this.onClick}>
                {this.props.column.name}
            </th>
        );
    },

    /**
     * @method getClassName
     * Gets the class name based on if this column is the most currently clicked.
     */
    getClassName: function() {
        var className = this.props.className;

        if (this.props.clickedIndex === this.props.columnIndex) {
            className += ' ' + this.props.clickedClassName;

            if (this.state.numClicks > 0 && this.state.numClicks % 2 === 0) {
                className += '-reverse';
            }
        }

        return className;
    },

    /**
     * @method onClick
     * Calls the onClick handler passed from the Grid.
     * Sets the reverse state of the header.
     */
    onClick: function() {
        if (this.props.column.ignoreHeaderClick) {
            return;
        }

        this.props.onClick(
            this.props.column,
            this.props.columnIndex,
            this.state.numClicks % 2 !== 0
        );
        this.setState({numClicks: this.state.numClicks + 1});
    }
});

module.exports = Header;
