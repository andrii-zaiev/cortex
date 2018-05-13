export default class Layer {
    public id: number;
    public name: string;
    public neuronsNumber: number;
    public type: any;
    public x: number;
    public y: number;

    constructor(id: number, name: string, neuronsNumber: number, type: any, x: number, y: number) {
        this.id = id;
        this.name = name;
        this.neuronsNumber = neuronsNumber;
        this.type = type;
        this.x = x;
        this.y = y;
    }

    public get width(): number {
        return 50;
    }

    public get height(): number {
        return this.neuronsNumber;
    }
}