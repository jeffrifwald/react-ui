import FileInput from '../../../src/FileInput';


export default {
    code: [
        '<FileInput',
        'chooseText="Choose"',
        'clearText="Remove"',
        'placeholder="Upload a file"',
        'name="photo" />'
    ].join('\n'),
    name: 'FileInput',
    rendered: (
        <FileInput
        chooseText="Choose"
        clearText="Remove"
        placeholder="Upload a file"
        name="photo" />
    )
};
