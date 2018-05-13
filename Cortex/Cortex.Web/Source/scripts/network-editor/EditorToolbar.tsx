import * as React from 'react';

export default class EditorToolbar
    extends React.Component {
    public render(): React.ReactNode {
        return (
            <div className="toolbar">
                <div className="toolbar-button" title="Add layer">
                    <i className="fa fa-square" />
                </div>
            </div>
        );
    }
}