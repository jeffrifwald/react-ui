import {shallow} from 'enzyme';
import React from 'react';
import {spy} from 'sinon';
import test from 'tape';

import GridHeader from '../../src/components/GridHeader';


test('grid/components/GridHeader', (t) => {
    spy(GridHeader.defaultProps, 'onClick');

    const columns = [{
        header: 'Cool Header'
    }, {
        renderHeader() {
            return 'Cooler Header';
        }
    }];
    const wrapper = shallow(
        <GridHeader
        columns={columns}
        sortedColumn={0} />
    );
    const rows = wrapper.find('.react-ui-grid-row');
    const headers = wrapper.find('.react-ui-grid-header');

    t.equal(rows.length, 1);
    t.equal(headers.length, 2);
    t.equal(headers.at(0).hasClass('react-ui-grid-header-sorted-asc'), true);

    headers.at(0).simulate('click', 'mock evt');
    t.equal(GridHeader.defaultProps.onClick.callCount, 1);
    t.equal(GridHeader.defaultProps.onClick.calledWith('mock evt', columns[0], 0, true), true);

    headers.at(1).simulate('click', 'mock evt');
    t.equal(GridHeader.defaultProps.onClick.callCount, 2);
    t.equal(GridHeader.defaultProps.onClick.calledWith('mock evt', columns[1], 1, false), true);

    GridHeader.defaultProps.onClick.restore();
    t.end();
});
