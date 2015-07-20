import Slider from '../../../src/Slider';


function onChange(evt, value) {
    alert(`You picked ${value}!`);
}

export default {
    code: [
        '<Slider',
        'defaultValue={28}',
        'onChange={onChange} />'
    ].join('\n'),
    name: 'Slider',
    rendered: (
        <Slider
        defaultValue={28}
        onChange={onChange} />
    )
};
