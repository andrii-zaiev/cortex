import ActivationType from "./ActivationType";
import LayerType from "./LayerType";
import PoolingMode from "./PoolingMode";

export default class Layer {
    public id: number;
    public name: string;
    public neuronsNumber: number;
    public type: LayerType;
    public x: number;
    public y: number;
    public activation: ActivationType;
    public kernelsNumber: number;
    public kernelWidth: number;
    public kernelHeight: number;
    public poolingMode: PoolingMode;
    public comment: string;

    constructor(id: number,
        name: string,
        neuronsNumber: number,
        type: LayerType,
        x: number,
        y: number,
        activation: ActivationType,
        kernelsNumber: number,
        kernelWidth: number,
        kernelHeight: number,
        poolingMode: PoolingMode,
        comment: string) {
        this.id = id;
        this.name = name;
        this.neuronsNumber = neuronsNumber;
        this.type = type;
        this.x = x;
        this.y = y;
        this.activation = activation;
        this.kernelsNumber = kernelsNumber;
        this.kernelWidth = kernelWidth;
        this.kernelHeight = kernelHeight;
        this.poolingMode = poolingMode;
        this.comment = comment;
    }

    public static move(layer: Layer, dx: number, dy: number): Layer {
        return new Layer(
            layer.id,
            layer.name,
            layer.neuronsNumber,
            layer.type,
            layer.x + dx,
            layer.y + dy,
            layer.activation,
            layer.kernelsNumber,
            layer.kernelWidth,
            layer.kernelHeight,
            layer.poolingMode,
            layer.comment)
    }
}