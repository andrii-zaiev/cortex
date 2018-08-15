import * as React from "react";
import { Layer } from "../models";
import { Record } from "immutable";

export interface ILayerDetailsPanelProps {
    isVisible: boolean,
    isEdit: boolean,
    layer: Layer,
    onSave: (layer: Layer) => void
}

interface ILayerDetailsPanelState {
    layer: Layer,
    isModified: boolean
}

const StateRecord = Record<ILayerDetailsPanelState>({ layer: new Layer(), isModified: false });

class LayerDetailsPanelState extends StateRecord {
    constructor(state: Partial<ILayerDetailsPanelState> = {}) {
        super(state);
    }
}

export default class LayerDetailsPanel
    extends React.Component<ILayerDetailsPanelProps, LayerDetailsPanelState> {
    constructor(props: ILayerDetailsPanelProps) {
        super(props);

        this.cancelChanges = this.cancelChanges.bind(this);

        this.state = new LayerDetailsPanelState();
    }

    static getDerivedStateFromProps(props: ILayerDetailsPanelProps, state: LayerDetailsPanelState): LayerDetailsPanelState {
        if (props.layer.id !== state.layer.id) {
            return state.set('layer', props.layer).set('isModified', false);
        }

        return state;
    }

    cancelChanges() {
        this.setState(prevState => prevState.set('layer', this.props.layer));
    }

    public render(): React.ReactNode {
        if (this.props.isVisible) {
            if (this.props.isEdit) {
                return (
                    <div className="panel">
                        <div className="details-heading">
                            <h5>Layer Details</h5>
                            {this.props.isEdit && this.state.isModified &&
                                <div className="details-heading-buttons">
                                    <button title="Cancel"
                                        className="button-light button-icon"
                                        onClick={this.cancelChanges}>
                                        <i className="fa fa-close"></i>
                                    </button>
                                    <button title="Save"
                                        className="button-primary button-icon"
                                        onClick={() => this.props.onSave(this.state.layer)}>
                                        <i className="fa fa-save"></i>
                                    </button>
                                </div>
                            }
                        </div>
                        
                    </div>
                );
            } else {
                return (
                    <div className="panel">
                        <h5>Layer Details</h5>
                        <div className="form-dense">
                            <div className="form-row">
                                <label>Name</label>
                                <span>{this.state.layer.name}</span>
                            </div>
                            <div className="form-row">
                                <label>Type</label>
                                <span>{this.state.layer.typeName}</span>
                            </div>
                            <div className="form-row">
                                <label className="top-label">Comment</label>
                                <div>{this.state.layer.comment}</div>
                            </div>
                            {this.state.layer.type !== LayerType.Pooling &&
                                <div className="form-row">
                                    <label>Activation</label>
                                    <span>{this.state.layer.activationName}</span>
                                </div>
                            }
                            <div className="form-row">
                                <label>Is input</label>
                                <span>{this.state.layer.isInput ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="form-row">
                                <label>Is output</label>
                                <span>{this.state.layer.isOutput ? 'Yes' : 'No'}</span>
                            </div>
                            {this.state.layer.initial.type == LayerType.Dense &&
                                <div>
                                    <div className="form-row">
                                        <label>Neurons</label>
                                        <span>{this.state.layer.neuronsNumber}</span>
                                    </div>
                                    <div className="form-row">
                                        <label>Dropout</label>
                                        <span>No</span>
                                    </div>
                                </div>
                            }
                            {this.state.layer.type == LayerType.Convolutional &&
                                <div>
                                    <div className="form-row">
                                        <label>Kernels</label>
                                        <span>{this.state.layer.kernelsNumber}</span>
                                    </div>
                                    <div className="form-row">
                                        <label>Width</label>
                                        <span>{this.state.layer.kernelWidth}</span>
                                    </div>
                                    <div className="form-row">
                                        <label>Height</label>
                                        <span>{this.state.layer.kernelHeight}</span>
                                    </div>
                                </div>
                            }
                            {this.state.layer.type == LayerType.Pooling &&
                                <div>
                                    <div className="form-row">
                                        <label>Mode</label>
                                        <span>{this.state.layer.poolingModeName}</span>
                                    </div>
                                    <div className="form-row">
                                        <label>Width</label>
                                        <span>{this.state.layer.kernelWidth}</span>
                                    </div>
                                    <div className="form-row">
                                        <label>Height</label>
                                        <span>{this.state.layer.kernelHeight}</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                );
            }
        }

        return null;
    }
}