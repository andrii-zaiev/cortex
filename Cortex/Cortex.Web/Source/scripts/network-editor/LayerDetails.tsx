import * as React from 'react';

export default class EditorToolbar
    extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }

    //public static getDerivedStateFromProps(nextProps, prevState) {
    //    return 
    //}

    public render(): React.ReactNode {
        return (
            <div className="panel">
                <div className="form">
                    <div className="form-row">
                        <label>Name</label>
                    </div>
                </div>
            </div>
        );
    }
}