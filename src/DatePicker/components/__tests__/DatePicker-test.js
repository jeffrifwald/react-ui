import {assert} from 'chai';
import React from 'react';
import {stub} from 'sinon';

import DatePicker from '../DatePicker';
import {TestUtils} from '../../../utils';


describe('DatePicker/DatePicker', () => {
    it('should render the correct top level elements', () => {
        const rendered = TestUtils.createComponent(
            <DatePicker />
        ).render();

        assert.equal(rendered.type, 'div');
    });

    it('should cancel timeouts when unmounted', () => {
        const component = TestUtils.createComponent(<DatePicker />);

        component.delayBlur = {cancel: stub()};

        component.componentWillUnmount();
        assert.equal(component.delayBlur.cancel.callCount, 1);
    });

    it('should handle a default value', () => {
        const date = new Date(2015, 6, 1);
        const rendered = TestUtils.createComponent(
            <DatePicker defaultValue={date} />
        ).render();

        assert.equal(
            rendered.props.children[0].props.value,
            '2015-7-1'
        );
    });

    it('should render with an open drop down', () => {
        const component = TestUtils.createComponent(
            <DatePicker />
        );

        component.state.showCalendar = true;
        assert.isTrue(
            component.render().props.className.includes(
                'react-ui-date-picker-open'
            )
        );
    });

    it('should handle onBlur', () => {
        const component = TestUtils.createComponent(
            <DatePicker />
        );

        stub(component, 'hideCalendar');

        component.onBlur();
        assert.equal(component.hideCalendar.callCount, 1);

        component.hideCalendar.restore();
    });

    it('should handle onClearClick', () => {
        const onClearClick = stub();
        const component = TestUtils.createComponent(
            <DatePicker onClearClick={onClearClick} />
        );
        const mockEvt = {stopPropagation: stub()};

        stub(component, 'clear');

        component.onClearClick(mockEvt);
        assert.equal(mockEvt.stopPropagation.callCount, 1);
        assert.equal(onClearClick.callCount, 1);
        assert.equal(component.clear.callCount, 1);
        assert.isTrue(onClearClick.calledWith(mockEvt));

        component.clear.restore();
    });

    it('should handle onClick', () => {
        const onClick = stub();
        const component = TestUtils.createComponent(
            <DatePicker onClick={onClick} />
        );

        stub(component, 'hideCalendar');
        stub(component, 'showCalendar');

        component.onClick('mock evt');
        assert.equal(onClick.callCount, 1);
        assert.equal(component.hideCalendar.callCount, 0);
        assert.equal(component.showCalendar.callCount, 1);
        assert.isTrue(onClick.calledWith('mock evt', false));

        component.state.showCalendar = true;
        component.onClick('mock evt');
        assert.equal(onClick.callCount, 2);
        assert.equal(component.showCalendar.callCount, 1);
        assert.equal(component.hideCalendar.callCount, 1);
        assert.isTrue(onClick.calledWith('mock evt', true));

        component.hideCalendar.restore();
        component.showCalendar.restore();
    });

    it('should handle onClick disabled', () => {
        const onClick = stub();
        const component = TestUtils.createComponent(
            <DatePicker disabled={true} onClick={onClick} />
        );

        stub(component, 'hideCalendar');
        stub(component, 'showCalendar');

        component.onClick('mock evt');
        assert.equal(onClick.callCount, 0);
        assert.equal(component.hideCalendar.callCount, 0);
        assert.equal(component.showCalendar.callCount, 0);

        component.hideCalendar.restore();
        component.showCalendar.restore();
    });

    it('should handle onCalendarMouseDown', () => {
        const mockEvt = {stopPropagation: stub()};
        const component = TestUtils.createComponent(
            <DatePicker />
        );

        component.delayBlur = {cancel: stub()};

        component.onCalendarMouseDown(mockEvt);
        assert.equal(mockEvt.stopPropagation.callCount, 1);
        assert.equal(component.delayBlur.cancel.callCount, 1);
    });

    it('should handle onDateClick', () => {
        const mockEvt = {stopPropagation: stub()};
        const onDateClick = stub();
        const component = TestUtils.createComponent(
            <DatePicker onDateClick={onDateClick} />
        );
        const date = new Date(2015, 1, 3);

        stub(component, 'setState');
        component.delayBlur = {cancel: stub()};

        component.onDateClick(date, true, mockEvt);
        assert.equal(mockEvt.stopPropagation.callCount, 1);
        assert.equal(component.delayBlur.cancel.callCount, 1);
        assert.equal(onDateClick.callCount, 0);
        assert.equal(component.setState.callCount, 0);

        component.onDateClick(date, false, mockEvt);
        assert.equal(mockEvt.stopPropagation.callCount, 2);
        assert.equal(component.delayBlur.cancel.callCount, 2);
        assert.equal(onDateClick.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(onDateClick.calledWith(mockEvt, date));
        assert.isTrue(component.setState.calledWith({
            selectedMonth: new Date(2015, 1, 1),
            showCalendar: false,
            value: date
        }));

        component.setState.restore();
    });

    it('should handle onNextClick', () => {
        const mockEvt = {stopPropagation: stub()};
        const date = new Date(2015, 0, 8);
        const component = TestUtils.createComponent(
            <DatePicker defaultValue={date} />
        );

        component.delayBlur = {cancel: stub()};
        stub(component, 'setState');

        component.onNextClick(mockEvt);
        assert.equal(mockEvt.stopPropagation.callCount, 1);
        assert.equal(component.delayBlur.cancel.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({
            selectedMonth: new Date(2015, 1, 1)
        }));

        component.setState.restore();
    });

    it('should handle onPreviousClick', () => {
        const mockEvt = {stopPropagation: stub()};
        const date = new Date(2015, 0, 8);
        const component = TestUtils.createComponent(
            <DatePicker defaultValue={date} />
        );

        component.delayBlur = {cancel: stub()};
        stub(component, 'setState');

        component.onPreviousClick(mockEvt);
        assert.equal(mockEvt.stopPropagation.callCount, 1);
        assert.equal(component.delayBlur.cancel.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({
            selectedMonth: new Date(2014, 11, 1)
        }));

        component.setState.restore();
    });

    it('should clear the value', () => {
        const component = TestUtils.createComponent(
            <DatePicker />
        );

        stub(component, 'setState');

        component.clear();
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({
            value: undefined
        }));

        component.setState.restore();
    });

    it('should hide the calendar', () => {
        const component = TestUtils.createComponent(
            <DatePicker />
        );

        stub(component, 'setState');

        component.hideCalendar();
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({
            showCalendar: false
        }));

        component.setState.restore();
    });

    it('should show the calendar', () => {
        const component = TestUtils.createComponent(
            <DatePicker />
        );

        stub(component, 'setState');

        component.showCalendar();
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(component.setState.calledWith({
            showCalendar: true
        }));

        component.setState.restore();
    });
});
