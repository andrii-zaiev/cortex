const layerWidth = 50;
const baseLayerHeight = 100;

export default class Layer {
    public id: number;
    public name: string;
    public neuronsNumber: number;
    public type: any;
    public x: number;
    public y: number;
    public isSelected: boolean;

    constructor(id: number, name: string, neuronsNumber: number, type: any, x: number, y: number) {
        this.id = id;
        this.name = name;
        this.neuronsNumber = neuronsNumber;
        this.type = type;
        this.x = x;
        this.y = y;
        this.isSelected = false;
    }

    public get width(): number {
        return layerWidth;
    }

    public get height(): number {
        return baseLayerHeight + this.neuronsNumber;
    }
}