import SelectBox from '../../../src/SelectBox';


function onChange(evt, option) {
    alert(`You selected ${option.name} with a value of ${option.value}`);
}

export default {
    code: [
        '<SelectBox',
        'onChange={onChange}',
        'placeholder="Select a number..."',
        'searchThreshold={3}>',
        '   <option value="100">One Hundred</option>',
        '   <option value="200">Two Hundred</option>',
        '   <option value="300">Three Hundred</option>',
        '   <option value="400">Four Hundred</option>',
        '   <option value="500">Five Hundred</option>',
        '</SelectBox>'
    ].join('\n'),
    name: 'SelectBox',
    rendered: (
        <SelectBox
        onChange={onChange}
        placeholder="Select a number..."
        searchThreshold={3}>
            <option value="100">One Hundred</option>
            <option value="200">Two Hundred</option>
            <option value="300">Three Hundred</option>
            <option value="400">Four Hundred</option>
            <option value="500">Five Hundred</option>
        </SelectBox>
    )
};
