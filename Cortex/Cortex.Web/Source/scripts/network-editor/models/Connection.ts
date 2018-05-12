import Layer from './Layer';

export default class Connection {
    public id: number;
    public from: Layer;
    public to: Layer;
    public type: any;
}