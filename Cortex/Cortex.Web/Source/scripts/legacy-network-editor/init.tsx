import * as ReactDOM from 'react-dom';
import * as React from 'react';
import NetworkEditor from './NetworkEditor';

const element = document.getElementById('network-editor');

if (element) {
    const networkId = element.attributes['data-network-id'].value;
    const versionId = element.attributes['data-version-id'].value;
    const isReadOnlyString = element.attributes['data-is-read-only'].value;
    const isReadOnly = isReadOnlyString ? isReadOnlyString.toLowerCase() === 'true' : false;
    const isEditString = element.attributes['data-is-edit'].value;
    const isEdit = isEditString ? isEditString.toLowerCase() === 'true' : false;

    ReactDOM.render(<NetworkEditor networkId={networkId} versionId={versionId} isReadOnly={isReadOnly} isEdit={isEdit} />, element);
}