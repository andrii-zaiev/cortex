import LayerType from "../models/LayerType";
import Layer from "../models/Layer";
import ActivationType from "../models/ActivationType";
import PoolingMode from "../models/PoolingMode";

export default class NewLayerViewModel {
    public name: string;
    public type: LayerType;
    public neuronsNumber: number;
    public activation: ActivationType;
    public kernelsNumber: number;
    public kernelWidth: number;
    public kernelHeight: number;
    public poolingMode: PoolingMode;
    public comment: string;
    public isInput: boolean;
    public isOutput: boolean;

    constructor(name: string,
        type: LayerType,
        neuronsNumber: number,
        activation: ActivationType,
        kernelsNumber: number,
        kernelWidth: number,
        kernelHeight: number,
        poolingMode: PoolingMode,
        comment: string,
        isInput: boolean,
        isOutput: boolean) {
        this.name = name;
        this.type = type;
        this.neuronsNumber = neuronsNumber;
        this.activation = activation;
        this.kernelsNumber = kernelsNumber;
        this.kernelWidth = kernelWidth;
        this.kernelHeight = kernelHeight;
        this.poolingMode = poolingMode;
        this.isInput = isInput;
        this.isOutput = isOutput;
    }

    public static init() {
        return new NewLayerViewModel('', LayerType.Dense, 1, ActivationType.Sigmoid, 1, 1, 1, PoolingMode.Max, '', false, false,);
    }

    public clone() {
        return new NewLayerViewModel(
            this.name,
            this.type,
            this.neuronsNumber,
            this.activation,
            this.kernelsNumber,
            this.kernelWidth,
            this.kernelHeight,
            this.poolingMode,
            this.comment,
            this.isInput,
            this.isOutput);
    }

    public with(prop: string, value: any) {
        this[prop] = value;
        return this;
    }

    public toModel(id: number) {
        return new Layer(
            id,
            this.name,
            this.neuronsNumber,
            this.type,
            0,
            0,
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