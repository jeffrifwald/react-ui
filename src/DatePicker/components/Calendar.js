import React from 'react';

import {getClassName} from '../../utils';


class Calendar extends React.Component {
    render() {
        const className = getClassName(
            'react-ui-date-picker-calendar',
            this.props.calendarClassName
        );
        const headerClassName = getClassName(
            'react-ui-date-picker-calendar-header',
            this.props.calendarHeaderClassName
        );
        const subHeaderClassName = getClassName(
            'react-ui-date-picker-calendar-sub-header',
            this.props.calendarSubHeaderClassName
        );
        const bodyClassName = getClassName(
            'react-ui-date-picker-calendar-body',
            this.props.calendarBodyClassName
        );

        return (
            <table
            onClick={this.props.onClick}
            className={className}>
                <tr className={headerClassName}>
                    {this.renderHeader()}
                </tr>
                <tr className={subHeaderClassName}>
                    {this.renderSubHeader()}
                </tr>

                <tr className={bodyClassName}>
                    {this.renderBody()}
                </tr>
            </table>
        );
    }

    renderHeader() {
        const date = this.props.value;
        const month = this.props.monthNames[date.getMonth()];
        const title = `${month} ${date.getFullYear()}`;
        const previousClassName = getClassName(
            'react-ui-date-picker-calendar-header-previous',
            this.props.calendarHeaderPreviousClassName
        );
        const nextClassName = getClassName(
            'react-ui-date-picker-calendar-header-next',
            this.props.calendarHeaderNextClassName
        );

        return (
            <tr className={className}>
                <td onClick={this.props.onPreviousClick}>
                    <span className={previousClassName}></span>
                </td>

                <td colSpan={5}>{title}</td>

                <td onClick={this.props.onNextClick}>
                    <span className={nextClassName}></span>
                </td>
            </tr>
        );
    }

    renderSubHeader() {
        return this.props.dayNames.map((name) => name[0]).map((name, i) => (
            <td key={i}>
                {name}
            </td>
        ));
    }

    renderBody() {
        return this.getDates().map((date, i) => (
            <td>
                {date.getDate()}
            </td>
        ));
    }

    getDates() {
        const startDate = this.getStartDate();
        const dates = [startDate];

        while (dates[dates.length - 1].getMonth() === startDate.getMonth()) {
            dates.push(new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                dates[dates.length - 1].getDate() + 1
            ));
        }

        dates.pop();

        return dates;
    }

    getStartDate() {
        return new Date(
            this.props.value.getFullYear(),
            this.props.value.getMonth(),
            1
        );
    }
}

export default Calendar;
