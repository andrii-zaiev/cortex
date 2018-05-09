import * as ReactDOM from 'react-dom';
import * as React from 'react';
import AccessesEditor from './AccessesEditor';

const element = document.getElementById('access-editor');

if (element) {
    const viewMode = Number(element.attributes['data-view-mode'].value);
    const editMode = Number(element.attributes['data-edit-mode'].value);

    ReactDOM.render(<AccessesEditor viewMode={viewMode} editMode={editMode} />, element);
}