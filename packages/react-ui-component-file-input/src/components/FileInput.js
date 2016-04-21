import React from 'react';

import classNames from 'react-ui-helper-class-names';


class FileInput extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            inputDisplay: '',
            inputKey: 0
        };
    }

    render() {
        const className = classNames({
            'react-ui-file-input': true,
            [this.props.className]: this.props.className
        });

        return (
            <div className={className}>
                {this.renderHiddenFileInput()}
                {this.renderChooseButton()}
                {this.renderClearButton()}
                {this.renderInput()}
            </div>
        );
    }

    renderHiddenFileInput() {
        const style = {
            display: 'none'
        };

        return (
            <input
            disabled={this.props.disabled}
            key={this.state.inputKey}
            name={this.props.name}
            onChange={this.onChange}
            ref="fileInput"
            style={style}
            type="file" />
        );
    }

    renderChooseButton() {
        return this.props.showChooseButton ? (
            <button
            className="react-ui-file-input-choose-button"
            disabled={this.props.disabled}
            onClick={this.onChooseClick}
            type="button">
                {this.props.chooseText}
            </button>
        ) : null;
    }

    renderClearButton() {
        return this.props.showClearButton ? (
            <button
            className="react-ui-file-input-clear-button"
            disabled={this.props.disabled}
            onClick={this.onClearClick}
            type="button">
                {this.props.clearText}
            </button>
        ) : null;
    }

    renderInput() {
        return this.props.showInput ? (
            <input
            className="react-ui-file-input-input"
            disabled={this.props.disabled}
            onClick={this.onChooseClick}
            placeholder={this.props.placeholder}
            readOnly={true}
            type="text"
            value={this.state.inputDisplay} />
        ) : null;
    }

    clear() {
        this.setState({
            inputDisplay: '',
            inputKey: this.state.inputKey + 1
        });
    }

    onChange = (evt) => {
        const inputDisplay = evt.target.value.split('\\').pop();

        this.setState({
            inputDisplay: inputDisplay
        }, () => {
            this.props.onChange(evt);
        });
    };

    onChooseClick = (evt) => {
        evt.preventDefault();
        this.refs.fileInput.click();
    };

    onClearClick = (evt) => {
        evt.preventDefault();
        this.clear();
    };
}

FileInput.propTypes = {
    chooseText: React.PropTypes.string,
    className: React.PropTypes.string,
    clearText: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    showChooseButton: React.PropTypes.bool,
    showClearButton: React.PropTypes.bool,
    showInput: React.PropTypes.bool
};

FileInput.defaultProps = {
    chooseText: 'Choose File',
    clearText: 'Clear File',
    disabled: false,
    onChange: () => {},
    showChooseButton: true,
    showClearButton: true,
    showInput: true
};

export default FileInput;
