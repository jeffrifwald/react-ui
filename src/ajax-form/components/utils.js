/**
 * @method doFormData
 * Submits the form with the FormData object.
 * Calls the callback on request load and error.
 * @param {Object} form - The form to submit.
 * @param {Function} - The callback called when the request loads or errors.
 */
function doFormData(form, callback) {
    var formData = new window.FormData(form);
    var request = new window.XMLHttpRequest();

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            callback(undefined, request);
        } else {
            callback(new Error('AjaxForm: StatusError'), request);
        }
    };

    request.onerror = function() {
        callback(new Error('AjaxForm: Network Error'), request);
    };

    request.open('POST', form.action, true);
    request.send(formData);
}

module.exports = {

    /**
     * @method emptyFn
     * Default handler for all events.
     */
    emptyFn: function() {},

    /**
     * @method handleForm
     * Uses either FormData or a hidden iframe to submit the form.
     * @param {Object} component - The form component to handle.
     */
    handleForm: function(form, callback) {
        if (window.FormData) { //use ajax
            doFormData(form, callback);
        } else { //fallback to simply submit the form
            form.submit();
        }
    }
};
