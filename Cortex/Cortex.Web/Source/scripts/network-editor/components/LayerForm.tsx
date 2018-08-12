import * as React from "react";
import { Layer, LayerType, ActivationType, PoolingMode } from "../models";
import { TextInput, MultilineInput, CheckboxInput, SelectInput, IOption, NumericInput } from "./inputs";
import { List } from "immutable";

export interface ILayerFormProps {
    layer: Layer,
    onChange: (layer: Layer) => void
}

const LayerForm = (props: ILayerFormProps) => {
    const typeOptions: List<IOption> = List([
        { label: 'Dense', value: LayerType.Dense },
        { label: 'Convolutional', value: LayerType.Convolutional },
        { label: 'Pooling', value: LayerType.Pooling },
        //{ label: 'Recurrent', value: LayerType.Recurrent }
    ]);
    const activationOptions: List<IOption> = List([
        { label: 'ELU', value: ActivationType.ELU },
        { label: 'Hard sigmoid', value: ActivationType.HardSigmoid },
        { label: 'Linear', value: ActivationType.Linear },
        { label: 'Other', value: ActivationType.Other },
        { label: 'ReLU', value: ActivationType.ReLU },
        { label: 'SELU', value: ActivationType.SELU },
        { label: 'Sigmoid', value: ActivationType.Sigmoid },
        { label: 'Softmax', value: ActivationType.Softmax },
        { label: 'Softplus', value: ActivationType.Softplus },
        { label: 'Softsign', value: ActivationType.Softsign },
        { label: 'tanh', value: ActivationType.tanh }
    ]);
    const poolingOptions: List<IOption> = List([
        { label: 'Average', value: PoolingMode.Average },
        { label: 'Max', value: PoolingMode.Max }
    ]);

    return (
        <div className="form">
            <TextInput label="Name"
                value={props.layer.name}
                onChange={v => props.onChange(props.layer.set('name', v))} />
            <MultilineInput label="Comment"
                value={props.layer.comment}
                onChange={v => props.onChange(props.layer.set('comment', v))} />
            <CheckboxInput label="Is input"
                value={props.layer.isInput}
                onChange={v => props.onChange(props.layer.set('isInput', v))} />
            <CheckboxInput label="Is output"
                value={props.layer.isOutput}
                onChange={v => props.onChange(props.layer.set('isOutput', v))} />
            <SelectInput label="Type"
                value={props.layer.type}
                options={typeOptions}
                onChange={v => props.onChange(props.layer.set('type', v))} />

            {props.layer.type !== LayerType.Pooling &&
            <SelectInput label="Activation"
                value={props.layer.activation}
                options={activationOptions}
                onChange={v => props.onChange(props.layer.set('activation', v))} />
            }

            {props.layer.type === LayerType.Dense && 
            <NumericInput label="Neurons"
                value={props.layer.neuronsNumber}
                min={1}
                max={100000}
                onChange={v => props.onChange(props.layer.set('neuronsNumber', v))} />

                    //<div className="form-row">
                    //    <label>Dropout</label>
                    //    <input type="checkbox" />
                    //    <input type="number" min={0} max={1} step={0.05} />
                    //</div>
            }
            {props.layer.type === LayerType.Convolutional &&
                <div>
                <NumericInput label="Kernels"
                    value={props.layer.kernelsNumber}
                    min={1}
                    max={100000}
                    onChange={v => props.onChange(props.layer.set('kernelsNumber', v))} />
                <NumericInput label="Width"
                    value={props.layer.kernelWidth}
                    min={1}
                    max={1000}
                    onChange={v => props.onChange(props.layer.set('kernelWidth', v))} />
                <NumericInput label="Height"
                    value={props.layer.kernelHeight}
                    min={1}
                    max={1000}
                    onChange={v => props.onChange(props.layer.set('kernelHeight', v))} />
                </div>
            }
            {props.layer.type === LayerType.Pooling &&
                <div>
                <SelectInput label="Mode"
                    value={props.layer.poolingMode}
                    options={poolingOptions}
                    onChange={v => props.onChange(props.layer.set('poolingMode', v))} />
                <NumericInput label="Width"
                    value={props.layer.kernelWidth}
                    min={1}
                    max={1000}
                    onChange={v => props.onChange(props.layer.set('kernelWidth', v))} />
                <NumericInput label="Height"
                    value={props.layer.kernelHeight}
                    min={1}
                    max={1000}
                    onChange={v => props.onChange(props.layer.set('kernelHeight', v))} />
                </div>
            }
        </div>);
};

export default LayerForm;