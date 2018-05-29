import ActivationType from "./ActivationType";
import LayerType from "./LayerType";

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

    constructor(id: number,
        name: string,
        neuronsNumber: number,
        type: LayerType,
        x: number,
        y: number,
        activation: ActivationType,
        kernelsNumber: number,
        kernelWidth: number,
        kernelHeight: number) {
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
    }
}