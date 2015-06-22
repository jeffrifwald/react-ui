import AjaxForm from '../../../src/AjaxForm';


function onResponse(err, res) {
    if (err) {
        alert('Request failure, see the console for the error.');
        console.log('AjaxForm:', err, res);
    } else {
        alert('Request success, see the console for the response.');
        console.log('AjaxForm:', res);
    }
}

export default {
    code: [
        '<AjaxForm action="http://httpbin.org/post" onResponse={onResponse}>',
        '    <input name="message" placeholder="message" type="text" />',
        '    <button type="submit">Send Message</button>',
        '</AjaxForm>'
    ].join('\n'),
    name: 'AjaxForm',
    rendered: (
        <AjaxForm action="http://httpbin.org/post" onResponse={onResponse}>
            <input name="message" placeholder="message" type="text" />
            <button type="submit">Send Message</button>
        </AjaxForm>
    )
};
