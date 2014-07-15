/** @jsx React.DOM */

/**
 * @class Header
 * Renders a header for the grid.
 */
var Header = React.createClass({
    getInitialState: function() {
        return {
            direction: 'asc',
            sorted: false
        };
    },

    render: function() {
        return (
            <th
            className={this.props.className}
            onClick={this.props.onClick.bind(this, this.props.column)}>
                {this.props.column.name}
            </th>
        );
    }
});

module.exports = Header;
