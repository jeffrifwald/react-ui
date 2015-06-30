import SelectBox from '../../../src/SelectBox';


const options = [

];

export default {
    code: [
        '<SelectBox>',
        '   {options}',
        '</SelectBox>'
    ].join('\n'),
    name: 'SelectBox',
    rendered: (
        <SelectBox>
            <option value="100">One-Hundred</option>
            <option value="200">Two-Hundred</option>
        </SelectBox>
    )
};
