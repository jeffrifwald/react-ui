import React from 'react';

import ExampleGrid from './examples/Grid';


const examples = [
    ExampleGrid
];

class DocsApp extends React.Component {
    componentDidMount() {
        hljs.initHighlightingOnLoad();
    }

    render() {
        return (
            <div className="docs">
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
                     v1.x.x
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
                {this.renderExamples()}
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

    renderExamples() {
        const renderedExamples = examples.map((example, i) => (
            <div className="component" key={i}>
                <h3>{example.name}</h3>

                <pre>
                    <code>
                        {example.code}
                    </code>
                </pre>

                <div className="component-container">
                    {example.rendered}
                </div>
            </div>
        ));

        return (
            <div className="components">
                <h2>Components</h2>

                {renderedExamples}
            </div>
        );
    }
}

export default DocsApp;
