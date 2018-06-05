import Layer from "../models/Layer";
import LayerType from "../models/LayerType";
import ActivationType from "../models/ActivationType";
import PoolingMode from "../models/PoolingMode";

export default class EditLayerViewModel {
    public id: number;
    public name: string;
    public initial: Layer;
    public neuronsNumber: number;
    public activation: ActivationType;
    public comment: string;
    public kernelsNumber: number;
    public kernelWidth: number;
    public kernelHeight: number;
    public poolingMode: PoolingMode;
    public isInput: boolean;
    public isOutput: boolean;

    constructor(
        id: number,
        name: string,
        initial: Layer,
        neuronsNumber: number,
        activation: ActivationType,
        comment: string,
        kernelsNumber: number,
        kernelWidth: number,
        kernelHeight: number,
        poolingMode: PoolingMode,
        isInput: boolean,
        isOutput: boolean) {
        this.id = id;
        this.name = name;
        this.initial = initial;
        this.neuronsNumber = neuronsNumber;
        this.activation = activation;
        this.comment = comment;
        this.kernelsNumber = kernelsNumber;
        this.kernelWidth = kernelWidth;
        this.kernelHeight = kernelHeight;
        this.poolingMode = poolingMode;
        this.isInput = isInput;
        this.isOutput = isOutput;
    }

    public static fromModel(layer: Layer): EditLayerViewModel {
        return new EditLayerViewModel(
            layer.id,
            layer.name,
            layer,
            layer.neuronsNumber,
            layer.activation,
            layer.comment,
            layer.kernelsNumber,
            layer.kernelWidth,
            layer.kernelHeight,
            layer.poolingMode,
            layer.isInput,
            layer.isOutput);
    }

    public get typeName() {
        if (!this.initial) {
            return '';
        }

        return LayerType[this.initial.type];
    }

    public get type() {
        if (!this.initial) {
            return LayerType.Dense;
        }

        return this.initial.type;
    }

    public get activationName() {
        return ActivationType[this.activation];
    }

    public get poolingModeName() {
        return PoolingMode[this.poolingMode];
    }

    public clone() {
        return new EditLayerViewModel(
            this.id,
            this.name,
            this.initial,
            this.neuronsNumber,
            this.activation,
            this.comment,
            this.kernelsNumber,
            this.kernelWidth,
            this.kernelHeight,
            this.poolingMode,
            this.isInput,
            this.isOutput);
    }

    public with(prop: string, value: any) {
        this[prop] = value;
        return this;
    }

    public restoreInitial() {
        return new EditLayerViewModel(
            this.id,
            this.initial.name,
            this.initial,
            this.initial.neuronsNumber,
            this.initial.activation,
            this.initial.comment,
            this.initial.kernelsNumber,
            this.initial.kernelWidth,
            this.initial.kernelHeight,
            this.initial.poolingMode,
            this.initial.isInput,
            this.initial.isOutput);
    }

    public toModel(): Layer {
        return new Layer(
            this.initial.id,
            this.name,
            this.neuronsNumber,
            this.initial.type,
            this.initial.x,
            this.initial.y,
            this.activation,
            this.kernelsNumber,
            this.kernelWidth,
            this.kernelHeight,
            this.poolingMode,
            this.comment,
            this.isInput,
            this.isOutput);
    }
}