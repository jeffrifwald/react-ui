import {shallow} from 'enzyme';
import React from 'react';
import {spy} from 'sinon';
import test from 'tape';

import GridBody from '../../src/components/GridBody';


test('grid/components/GridBody', (t) => {
    spy(GridBody.defaultProps, 'onClickCell');

    const columns = [{
        header: 'Name',
        render(record) {
            return record.name;
        }
    }, {
        dataProp: 'id',
        header: 'ID'
    }];
    const data = [{
        id: 1,
        name: 'Cool McCool'
    }, null, {

    }, {
        id: 2,
        name: 'Neat McNeat'
    }];
    const selectedCell = [0, 1];
    const wrapper = shallow(
        <GridBody
        columns={columns}
        data={data}
        selectedCell={selectedCell} />
    );
    const rows = wrapper.find('.react-ui-grid-row');
    const cells = wrapper.find('.react-ui-grid-cell');

    t.equal(rows.length, 4);
    t.equal(cells.length, 8);
    t.equal(cells.at(1).hasClass('react-ui-grid-cell-selected'), true);

    cells.at(0).simulate('click', 'mock evt');
    t.equal(GridBody.defaultProps.onClickCell.callCount, 1);
    t.equal(GridBody.defaultProps.onClickCell.calledWith(
        'mock evt',
        data[0],
        columns[0],
        0,
        0
    ), true);

    GridBody.defaultProps.onClickCell.restore();
    t.end();
});
