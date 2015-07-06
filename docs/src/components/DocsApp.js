import AjaxForm from './AjaxForm';
import DatePicker from './DatePicker';
import FileInput from './FileInput';
import Grid from './Grid';
import ReactUI from '../../../src';
import SearchBox from './SearchBox';
import SelectBox from './SelectBox';


const components = [
    AjaxForm,
    DatePicker,
    FileInput,
    Grid,
    SearchBox,
    SelectBox
];

class DocsApp extends React.Component {
    componentDidMount() {
        hljs.initHighlightingOnLoad();
    }

    render() {
        return (
            <div className="docs-app">
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        );
    }

    renderHeader() {
        return (
            <div className="header">
                <span className="header-title">
                    ReactUI
                </span>
                <span className="header-version">
                     v{ReactUI.version}
                </span>

                <div className="header-subtitle">
                    <span>A collection of components for </span>
                    <a href="http://facebook.github.io/react/">React</a>.
                </div>
            </div>
        );
    }

    renderBody() {
        return (
            <div className="content">
                {this.renderInstallation()}
                {this.renderComponents()}
            </div>
        );
    }

    renderInstallation() {
        const npmInstallCode = '$ npm install react-ui --save';
        const browserInstallCode = '<script src="react-ui.js"></script>';

        return (
            <div className="installation">
                <h2>Installation</h2>

                <h3>npm</h3>
                <pre>
                    <code className="bash">
                        {npmInstallCode}
                    </code>
                </pre>

                <h3>browser</h3>
                <pre>
                    <code className="bash">
                        {browserInstallCode}
                    </code>
                </pre>
            </div>
        );
    }

    renderComponents() {
        const renderedComponents = components.map((component, i) => (
            <div className="component" key={i}>
                <h3>{component.name}</h3>

                <pre>
                    <code>
                        {component.code}
                    </code>
                </pre>

                <div className="component-container">
                    {component.rendered}
                </div>
            </div>
        ));

        return (
            <div className="components">
                <h2>Components</h2>

                {renderedComponents}
            </div>
        );
    }
}

export default DocsApp;
