/**
 * @class CheckBox
 * A check box component that can easily be styled.
 */
var CheckBox = React.createClass({displayName: 'CheckBox',
    propTypes: {

        /** @prop {String} className - The class name of the component. */
        className: React.PropTypes.string,

        /** @prop {String} inputClassName - The class name of the component's input. */
        inputClassName: React.PropTypes.string,

        /** @prop {String} label - The label for the component. */
        label: React.PropTypes.string,

        /** @prop {String} labelClassName - The class name of the label. */
        labelClassName: React.PropTypes.string,

        /** @prop {String} className - The name of the input. */
        name: React.PropTypes.string
    },

    getInitialState: function() {
        return {
            checked: this.props.checked || false
        };
    },

    render: function() {
        var inputId = 'react-ui-check-box-' + this.props.name;

        return (
           React.createElement("div", {className: this.props.className}, 
                React.createElement("input", {
                checked: this.state.checked, 
                className: this.props.inputClassName, 
                disabled: !this.props.disabled, 
                id: inputId, 
                onChange: this.onChange, 
                type: "checkbox"}), 

                React.createElement("label", {htmlFor: inputId}, React.createElement("span", null)), 
                React.createElement("label", {className: this.props.labelClassName}, this.props.label), 

                React.createElement("input", {name: this.props.name, type: "hidden", value: this.state.checked})
            )
        );
    },

    /**
     * @method onChange
     * Toggles the value of the input for the check box.
     */
    onChange: function() {
        this.setState({
            checked: !this.state.checked
        });
    }
});

module.exports = CheckBox;
