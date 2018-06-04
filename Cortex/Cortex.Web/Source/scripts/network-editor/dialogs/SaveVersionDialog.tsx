import * as React from 'react';
import * as Modal from 'react-modal';

import NewLayerViewModel from '../view-models/NewLayerViewModel';
import LayerType from '../models/LayerType';
import Layer from '../models/Layer';
import EventBus from '../../shared/events/EventBus';
import { Message, MessageType } from '../../shared/events/Message';
import Network from '../models/Network';
import VersionDto from '../services/dtos/VersionDto';
import NetworkService from '../services/NetworkService';

export default class SaveVersionDialog
    extends React.Component<{ isOpen: boolean, network: Network, networkId: string, versionId: string },
                            { isOpen: boolean, network: Network, comment: string, saving: boolean, error: string }> {
    private appElement = document.getElementById('network-editor');
    private networkId: string;
    private versionId: string;
    private networkService: NetworkService = new NetworkService();

    constructor(props) {
        super(props);

        this.networkId = props.networkId;
        this.versionId = props.versionId;

        this.closeDialog = this.closeDialog.bind(this);
        this.save = this.save.bind(this);
        this.updateComment = this.updateComment.bind(this);

        this.state = {
            isOpen: props.isOpen,
            network: props.network,
            comment: '',
            saving: false,
            error: ''
        };
    }

    public static getDerivedStateFromProps(nextProps, prevState) {
        return {
            isOpen: nextProps.isOpen,
            network: nextProps.network,
            comment: prevState.comment,
            saving: prevState.saving,
            error: prevState.error
        };
    }

    private updateComment(event) {
        const comment = event.target.value;
        this.setState(prevState => ({
            isOpen: this.state.isOpen,
            network: this.state.network,
            comment: comment,
            saving: prevState.saving,
            error: prevState.error
        }));
    }

    private closeDialog() {
        EventBus.emit(new Message<void>(MessageType.CloseSaveDialog, null));
    }

    private save() {
        const versionDto = new VersionDto(this.state.network, this.state.comment, this.versionId, this.networkId);
        this.setState(prevState => ({
            isOpen: this.state.isOpen,
            network: this.state.network,
            comment: this.state.comment,
            saving: true,
            error: prevState.error
        }));

        this.networkService.saveVersion(versionDto)
            .then(id => {
                const versionUrl = `${location.origin}/network/${this.networkId}/${id}`;
                location.assign(versionUrl);
            })
            .catch(error => {
                this.setState(prevState => ({
                    isOpen: this.state.isOpen,
                    network: this.state.network,
                    comment: this.state.comment,
                    saving: false,
                    error: error
                }));
            });
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
                            <textarea maxLength={200} value={this.state.comment} onChange={this.updateComment} ></textarea>
                        </div>
                    </div>
                    {this.state.error && 
                        <div className="form-row">
                            <label className="error-text">{this.state.error}</label>
                        </div>}
                </div>
                <div className="dialog-buttons">
                    <button className="button" onClick={this.closeDialog}>Cancel</button>
                    <button className="button-primary" onClick={this.save}>Save</button>
                </div>
                {this.state.saving &&
                    <div className="fade">
                        <i className="fa fa-2x fa-spinner fa-spin spinner" />
                    </div>}
            </Modal>
        );
    }
}
