import React from 'react';

import classNames from 'react-ui-helper-class-names';


export const renderColumnHeader = (column) => {
    if (typeof column.renderHeader === 'function') {
        return column.renderHeader();
    }

    return column.header;
};

const GridHeader = (props) => {
    const headers = props.columns.map((column, i) => {
        const sorted = props.sortedColumn === i;
        const reverse = props.sortReverse;
        const nextReverse = sorted ? !reverse : false;
        const sortedAsc = sorted && !reverse;
        const sortedDsc = sorted && reverse;
        const className = classNames({
            'react-ui-grid-header': true,
            'react-ui-grid-header-sorted-asc': sortedAsc,
            'react-ui-grid-header-sorted-dsc': sortedDsc
        });
        const onClick = (evt) => props.onClick(evt, column, i, nextReverse);

        return (
            <th
            className={className}
            key={i}
            onClick={onClick}>
                {renderColumnHeader(column)}
            </th>
        );
    });

    return (
        <thead>
            <tr className="react-ui-grid-row">
                {headers}
            </tr>
        </thead>
    );
};

GridHeader.propTypes = {
    columns: React.PropTypes.array,
    onClick: React.PropTypes.func,
    sortedColumn: React.PropTypes.number,
    sortReverse: React.PropTypes.bool
};

GridHeader.defaultProps = {
    columns: [],
    onClick: () => {},
    sortedColumn: -1,
    sortReverse: false
};

export default GridHeader;
