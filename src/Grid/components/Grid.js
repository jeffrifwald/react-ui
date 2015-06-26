import React from 'react';

import {getClassName, noop} from '../../utils';


class Grid extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            activeCell: [-1, -1],
            activeHeader: -1,
            activeRow: -1
        };

        this.onCellClick = this.onCellClick.bind(this);
        this.onHeaderClick = this.onHeaderClick.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
    }

    render() {
        const className = getClassName('react-ui-grid', this.props.className);

        return (
            <table className={className}>
                {this.renderHeaders()}
                {this.renderRows()}
            </table>
        );
    }

    renderHeaders() {
        const className = getClassName('react-ui-grid-row', this.props.rowClassName);
        const headers = this.props.columns.map((column, i) => (
            <Header
            {...this.props}
            {...this.state}
            column={column}
            columnIndex={i}
            key={i}
            onHeaderClick={this.onHeaderClick} />
        ));

        return (
            <thead>
                <tr className={className}>
                    {headers}
                </tr>
            </thead>
        );
    }

    renderRows() {
        const rows = this.props.data.map((record, i) => (
            <Row
            {...this.props}
            {...this.state}
            onCellClick={this.onCellClick}
            onRowClick={this.onRowClick}
            record={record}
            rowIndex={i} />
        ));

        return (
            <tbody>
                {rows}
            </tbody>
        );
    }

    onCellClick(...args) {
        this.props.onHeaderClick(...args);
        this.setState({activeCell: [args[2], args[3]]});
    }

    onHeaderClick(...args) {
        this.props.onHeaderClick(...args);
        this.setState({activeHeader: args[2]});
    }

    onRowClick(...args) {
        this.props.onHeaderClick(...args);
        this.setState({activeRow: args[3]});
    }
}

Grid.propTypes = {
    activeCellClassName: React.PropTypes.string,
    activeColumnClassName: React.PropTypes.string,
    activeHeaderClassName: React.PropTypes.string,
    activeRowClassName: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    cellClassName: React.PropTypes.string,
    className: React.PropTypes.string,
    headerClassName: React.PropTypes.string,
    rowClassName: React.PropTypes.string,
    onCellClick: noop,
    onHeaderClick: noop,
    onRowClick: noop
};

Grid.defaultProps = {
    activeCellClassName: '',
    activeColumnClassName: '',
    activeHeaderClassName: '',
    activeRowClassName: '',
    data: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    cellClassName: '',
    className: '',
    headerClassName: '',
    rowClassName: '',
    onCellClick: noop,
    onHeaderClick: noop,
    onRowClick: noop
};

export default Grid;
