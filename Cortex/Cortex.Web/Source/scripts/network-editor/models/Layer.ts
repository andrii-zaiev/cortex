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

    constructor(id: number,
        name: string,
        neuronsNumber: number,
        type: LayerType,
        x: number,
        y: number,
        activation: ActivationType) {
        this.id = id;
        this.name = name;
        this.neuronsNumber = neuronsNumber;
        this.type = type;
        this.x = x;
        this.y = y;
        this.activation = activation;
    }
}