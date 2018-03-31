import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Hello extends React.Component {
    render() {
        return <h1>Hello</h1>;
    }
}

const element = document.getElementById('access-editor');

if (element) {
    ReactDOM.render(<Hello />, element);
}