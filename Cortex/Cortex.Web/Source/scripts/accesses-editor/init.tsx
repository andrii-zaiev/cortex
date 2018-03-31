import * as ReactDOM from 'react-dom';
import * as React from 'react';
import AccessesEditor from './AccessesEditor';

const element = document.getElementById('access-editor');

if (element) {
    ReactDOM.render(<AccessesEditor viewMode={0} editMode={0} />, element);
}