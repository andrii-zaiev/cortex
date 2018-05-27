import * as ReactDOM from 'react-dom';
import * as React from 'react';
import NetworkEditor from './NetworkEditor';

const element = document.getElementById('network-editor');

if (element) {
    const networkId = element.attributes['data-network-id'].value;
    const versionId = element.attributes['data-version-id'].value;
    const isReadOnly = element.attributes['data-is-read-only'].value === 'true';

    ReactDOM.render(<NetworkEditor networkId={networkId} versionId={versionId} isReadOnly={isReadOnly} />, element);
}