import {assert} from 'chai';
import React from 'react';
import {stub} from 'sinon';

import DatePicker from '../DatePicker';
import Calendar from '../Calendar';
import {TestUtils} from '../../../utils';


describe('DatePicker/Calendar', () => {
    const selectedMonth = new Date(2015, 7, 1);
    const today = new Date(2015, 7, 5);
    const value = new Date(2015, 7, 1);
    const props = DatePicker.defaultProps;

    it('should render the correct top level elements', () => {
        const rendered = TestUtils.createComponent(
            <Calendar
            {...props}
            selectedMonth={selectedMonth}
            today={today} />
        ).render();

        assert.equal(rendered.type, 'table');
    });

    it('should rendered disabled dates', () => {
        const component = TestUtils.createComponent(
            <Calendar
            {...props}
            selectedMonth={selectedMonth}
            today={today} />
        );

        stub(component, 'isDateDisabled');
        component.isDateDisabled.returns(true);

        const rendered = component.render();
        const body = rendered.props.children[2];

        assert.isTrue(
            body.props.children[0].props.children[0].props.className.includes(
                'react-ui-date-picker-calendar-disabled-day'
            )
        );
    });

    it('should rendered selected dates', () => {
        const component = TestUtils.createComponent(
            <Calendar
            {...props}
            selectedMonth={selectedMonth}
            today={today}
            value={value} />
        );

        const rendered = component.render();
        const body = rendered.props.children[2];

        assert.isTrue(
            body.props.children[0].props.children[6].props.className.includes(
                'react-ui-date-picker-calendar-selected-day'
            )
        );
    });

    it('should get a disabled date', () => {
        const isDateDisabled = (date) => date.getDate() === 25;
        const maxValue = new Date(2015, 6, 1);
        const minValue = new Date(2015, 4, 1);
        const component = TestUtils.createComponent(
            <Calendar
            isDateDisabled={isDateDisabled}
            maxValue={maxValue}
            minValue={minValue} />
        );

        assert.isFalse(component.isDateDisabled(new Date(2015, 5, 1)));
        assert.isTrue(component.isDateDisabled(new Date(2015, 5, 25)));
        assert.isTrue(component.isDateDisabled(new Date(2015, 3, 1)));
        assert.isTrue(component.isDateDisabled(new Date(2015, 7, 1)));
    });
});
