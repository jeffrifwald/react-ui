import {assert} from 'chai';
import React from 'react';
import {stub} from 'sinon';

import fixtures from './fixtures';
import Row from '../Row';
import {TestUtils} from '../../../utils';


describe('Grid/Row', () => {
    it('should render the correct number of elements', () => {
        const rendered = TestUtils.createComponent(
            <Row
            columns={fixtures.columns}
            rowIndex={0} />
        ).render();

        assert.equal(rendered.type, 'tr');
        assert.equal(rendered.props.className, 'react-ui-grid-row');
    });

    it('should handle onClick', () => {
        const onRowClick = stub();
        const component = TestUtils.createComponent(
            <Row
            columns={fixtures.columns}
            onRowClick={onRowClick}
            rowIndex={1} />
        );

        stub(component, 'setState');

        component.onClick('mock evt');
        assert.equal(onRowClick.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(onRowClick.calledWith(
            'mock evt',
            undefined,
            undefined,
            1,
            undefined,
            1
        ));
        assert.isTrue(component.setState.calledWith({numClicks: 1}));

        component.setState.restore();
    });

    it('should get special class names', () => {
        const component = TestUtils.createComponent(
            <Row
            activeRow={1}
            columns={fixtures.columns}
            rowIndex={1} />
        );

        assert.equal(
            component.getClassName(),
            'react-ui-grid-row react-ui-grid-row-active'
        );
    });
});
