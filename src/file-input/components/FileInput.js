/** @jsx React.DOM */

var emptyFn = function() {};

var FileInput = React.createClass({
    propTypes: {

        /** @prop {String} chooseButtonClassName - The className of the choose button. */
        chooseButtonClassName: React.PropTypes.string,

        /** @prop {String} chooseButtonText - The text of the choose button. */
        chooseButtonText: React.PropTypes.string,

        /** @prop {String} className - The className of the file input. */
        className: React.PropTypes.string,

        /** @prop {String} clearButtonClassName - The className of the clear button. */
        clearButtonClassName: React.PropTypes.string,

        /** @prop {String} clearButtonText - The text of the clear button. */
        clearButtonText: React.PropTypes.string,

        /** @prop {String} fileNameClassName - The class name of the file name input. */
        fileNameClassName: React.PropTypes.string,

        /** @prop {String} name - The name of the input. */
        name: React.PropTypes.string,

        /** @prop {Function} onChooseClick - The method to call when the choose button is clicked. */
        onChooseClick: React.PropTypes.func,

        /** @prop {Function} onClearClick - The method to call when the clear button is clicked. */
        onClearClick: React.PropTypes.func,

        /** @prop {Function} onFileChange - The method to call when the file input changes. */
        onFileChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            chooseButtonClassName: 'react-component-file-input-choose',
            chooseButtonText: 'Choose File',
            className: 'react-component-file-input',
            clearButtonClassName: 'react-component-file-input-clear',
            clearButtonText: 'Clear File',
            fileNameClassName: 'react-component-file-input-file-name',
            onChooseClick: emptyFn,
            onClearClick: emptyFn,
            onFileChange: emptyFn
        };
    },

    getInitialState: function() {
        return {
            inputKey: 0,
            inputValue: ''
        };
    },

    render: function() {
        return (
            <div className={this.props.className}>
                {this.renderHiddenInput()}

                <button
                className={this.props.chooseButtonClassName}
                onClick={this.onChooseClick}
                type="button">{this.props.chooseButtonText}</button>

                <button
                className={this.props.clearButtonClassName}
                onClick={this.onClearClick}
                type="button">{this.props.clearButtonText}</button>

                <input
                className={this.props.fileNameClassName}
                readOnly={true}
                type="textbox"
                value={this.state.inputValue} />
            </div>
        );
    },

    /**
     * @method renderHiddenInput
     * Renders a hidden input to contain the file uploader.
     */
    renderHiddenInput: function() {
        var hiddenStyle = {display: 'none'};
        var key = 'hidden-input-' + this.state.inputKey;

        return (
            <input
            key={key}
            name={this.props.name}
            onChange={this.onFileChange}
            style={hiddenStyle}
            type="file" />
        );
    },

    /**
     * @method onChooseClick
     * Opens the file selection dialog by programmatically clicking the file input.
     * @param {Object} evt - The click event.
     */
    onChooseClick: function(evt) {
        evt.preventDefault();
        this.getDOMNode().querySelector('input[type=file]').click();
        this.props.onChooseClick(evt);
    },

    /**
     * @method onClearClick
     * Clears the file input increasing the id on the input key.
     * Clears the file name by emptying the input value.
     * @param {Object} evt - The click event.
     */
    onClearClick: function(evt) {
        evt.preventDefault();
        this.setState({
            inputKey: this.state.inputKey + 1,
            inputValue: ''
        });
        this.props.onClearClick(evt);
    },

    /**
     * @method onFileChange
     * Sets the input value to the file name when a file is chosen.
     * @param {Object} evt - The click event.
     */
    onFileChange: function(evt) {
        this.setState({
            inputValue: evt.target.value.split('\\').pop()
        });
        this.props.onFileChange(evt);
    }
});

module.exports = FileInput;
