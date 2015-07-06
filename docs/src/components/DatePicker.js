import DatePicker from '../../../src/DatePicker';


function isDateDisabled(date) {
    return date.getDay() === 1;
}

export default {
    code: [
        '<DatePicker',
        'isDateDisabled={isDateDisabled}',
        'placeholder="Pick a date..." />'
    ].join('\n'),
    name: 'DatePicker',
    rendered: (
        <DatePicker
        isDateDisabled={isDateDisabled}
        placeholder="Pick a date..." />
    )
};
