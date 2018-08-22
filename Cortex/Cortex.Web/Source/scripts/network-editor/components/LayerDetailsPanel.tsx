// Cortex - web application for creating and managing neural networks diagrams.
// Copyright (C) 2018  Andrii Zaiev <andrii.zaiev@gmail.com>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


import * as React from "react";
import { Layer } from "../models";
import { Record } from "immutable";
import LayerForm from "./LayerForm";

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
        this.updateLayer = this.updateLayer.bind(this);

        this.state = new LayerDetailsPanelState();
    }

    static getDerivedStateFromProps(props: ILayerDetailsPanelProps, state: LayerDetailsPanelState): LayerDetailsPanelState {
        if (props.layer && props.layer.id !== state.layer.id) {
            return state.set('layer', props.layer).set('isModified', false);
        }

        return state;
    }

    cancelChanges() {
        this.setState(prevState => prevState.set('layer', this.props.layer));
    }

    updateLayer(layer: Layer) {
        this.setState(prevState => prevState.set('layer', layer).set('isModified', true))
    }

    public render(): React.ReactNode {
        if (this.props.isVisible) {
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
                    <LayerForm layer={this.state.layer}
                        onChange={l => this.updateLayer(l)}
                        isReadOnly={!this.props.isEdit} />
                </div>
            );
        }

        return null;
    }
}
