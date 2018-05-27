import * as React from 'react';
import * as Modal from 'react-modal';

import NewLayerViewModel from '../view-models/NewLayerViewModel';
import LayerType from '../models/LayerType';
import Layer from '../models/Layer';
import EventBus from '../events/EventBus';
import { Message, MessageType } from '../events/Message';

export default class SaveVersionDialog
    extends React.Component<{ isOpen: boolean }, { isOpen: boolean }> {
    private appElement = document.getElementById('network-editor');

    constructor(props) {
        super(props);
    }

    //public static getDerivedStateFromProps(nextProps, prevState) {
    //    return {
    //        isOpen: nextProps.isOpen,
    //        layer: prevState.layer,
    //        layerId: nextProps.layerId
    //    };
    //}

    private closeDialog() {
        EventBus.emit(new Message<void>(MessageType.CloseAddDialog, null));
    }

    public render() {
        return (
            <Modal isOpen={this.state.isOpen} appElement={this.appElement}>
                <div className="dialog-heading">
                    <h4>Save Version</h4>
                </div>
                <div className="dialog-body">
                    <div className="form">
                        <div className="form-row">
                            <label className="top-label">Comment</label>
                            <textarea></textarea>
                        </div>
                    </div>
                </div>
                <div className="dialog-buttons">
                    <button className="button" onClick={this.closeDialog}>Cancel</button>
                    <button className="button-primary">Save</button>
                </div>
            </Modal>
        );
    }
}
