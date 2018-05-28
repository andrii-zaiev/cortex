import * as React from 'react';
import * as d3 from 'd3';

import Network from './models/Network';
import { select, Selection, BaseType } from 'd3';
import Layer from './models/Layer';
import NetworkViewModel from './view-models/NetworkViewModel';
import LayerViewModel from './view-models/LayerViewModel';
import ConnectionViewModel from './view-models/ConnectionViewModel';
import Connection from './models/Connection';

const d3RootId: string = 'd3-root';
const labelFontSize = 15;

class GrabbingState {
    public isActive: boolean;
    public prevX: number;
    public prevY: number;
    public cursor: string;

    constructor(isActive: boolean, prevX: number, prevY: number, cursor: string) {
        this.isActive = isActive;
        this.prevX = prevX;
        this.prevY = prevY;
        this.cursor = cursor;
    }
}

class State {
    public network: NetworkViewModel;
    public translate: { x: number, y: number };
    public scale: number;
    public grabbing: GrabbingState;
    public isEdit: boolean;

    constructor(
        network: NetworkViewModel,
        translate: { x: number, y: number },
        scale: number,
        grabbing: GrabbingState,
        isEdit: boolean) {
        this.network = network;
        this.translate = translate;
        this.scale = scale;
        this.grabbing = grabbing;
        this.isEdit = isEdit;
    }

    public static createInitial(network: Network, isEdit: boolean): State {
        return new State(
            NetworkViewModel.fromModel(network),
            { x: 0, y: 0 },
            1,
            new GrabbingState(false, 0, 0, '-webkit-grab'),
        isEdit);
    }
}

export default class NetworkDisplayArea
    extends React.Component<{ network: Network, isEdit: boolean }, State> {

    constructor(props: { network: Network, isEdit: boolean }) {
        super(props);

        this.updateScale = this.updateScale.bind(this);
        this.startGrabbing = this.startGrabbing.bind(this);
        this.translate = this.translate.bind(this);
        this.endGrabbing = this.endGrabbing.bind(this);
        this.selectLayer = this.selectLayer.bind(this);
        this.deselectAll = this.deselectAll.bind(this);
        this.startLayerDragging = this.startLayerDragging.bind(this);
        this.dragLayer = this.dragLayer.bind(this);
        this.dropLayer = this.dropLayer.bind(this);
        this.selectConnection = this.selectConnection.bind(this);

        this.state = State.createInitial(props.network, props.isEdit);
    }

    public static getDerivedStateFromProps(nextProps: { network: Network, isEdit: boolean }, prevState: State) {
        return new State(
            NetworkViewModel.fromModel(nextProps.network),
            prevState.translate,
            prevState.scale,
            prevState.grabbing,
            nextProps.isEdit);
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    private draw(): void {
        const svg = d3.select(`#${d3RootId}`)
            .on('mousemove', this.dragLayer)
            .on('mouseup', this.dropLayer);

        this.drawLayers(svg);
        this.drawConnections(svg);
    }

    private drawLayers(svg: Selection<BaseType, {}, HTMLElement, any>) {
        const layerGroup = svg.selectAll('g')
            .data(this.state.network.layers, l => (l as LayerViewModel).model.id.toString());
        const layerRect = this.updateLayers(layerGroup.select('rect'));
        const layerLabel = this.updateLayerLabels(layerGroup.select('text'));
        const layerNameLabel = this.updateNameLabels(layerLabel.select('tspan#name'));
        const layerInfoLabel = this.updateInfoLabels(layerLabel.select('tspan#info'));
        const layerSizeLabel = this.updateSizeLabels(layerLabel.select('tspan#size'));

        // Enter…
        const groupEnter = layerGroup.enter().append('g');
        this.updateLayers(groupEnter.append('rect')
            .style('stroke', 'black')
            .style('stroke-width', 2)
            .on('click', l => this.selectLayer(l))
            .on('mousedown', l => this.startLayerDragging(l)));
        const layerEnter = this.updateLayerLabels(groupEnter.append('text'));
        this.updateNameLabels(layerEnter.append('tspan').attr('id', 'name').attr('dy', '1.2em'));
        this.updateInfoLabels(layerEnter.append('tspan').attr('id', 'info').attr('dy', '1.2em'));
        this.updateSizeLabels(layerEnter.append('tspan').attr('id', 'size').attr('dy', '1.2em'));

        // Exit…
        layerGroup.exit().remove();
    }

    private updateLayers(layerRect: Selection<BaseType, LayerViewModel, BaseType, {}>) {
        return layerRect
            .attr('width', l => l.width * this.state.scale)
            .attr('height', l => l.height * this.state.scale)
            .attr('x', l => this.convertX(l.x))
            .attr('y', l => this.convertY(l.y))
            .style('fill', l => l.isSelected ? 'lightgray' : 'white')
            .style('cursor', l => l.isSelected && this.state.isEdit ? 'move' : 'pointer');
    }

    private updateLayerLabels(layerLabel: Selection<BaseType, LayerViewModel, BaseType, {}>) {
        return layerLabel
            .attr('x', l => this.convertX(l.x))
            .attr('y', l => this.convertY(l.y - 60))
            .attr('font-size', () => labelFontSize * this.state.scale);
    }

    private convertX(x: number) {
        return x * this.state.scale + this.state.translate.x;
    }

    private convertY(y: number) {
        return y * this.state.scale + this.state.translate.y;
    }

    private updateNameLabels(label: Selection<BaseType, LayerViewModel, BaseType, {}>) {
        return label
            .attr('x', l => this.convertX(l.x))
            .text(l => l.model.name);
    }

    private updateInfoLabels(label: Selection<BaseType, LayerViewModel, BaseType, {}>) {
        return label
            .attr('x', l => this.convertX(l.x))
            .text(l => l.info);
    }

    private updateSizeLabels(label: Selection<BaseType, LayerViewModel, BaseType, {}>) {
        return label
            .attr('x', l => this.convertX(l.x))
            .text(l => l.size);
    }

    private drawConnections(svg: Selection<BaseType, {}, HTMLElement, any>) {
        const line = this.updateLines(svg.selectAll('line')
            .data(this.state.network.connections, l => (l as ConnectionViewModel).model.id.toString()));

        this.updateLines(line.enter().append('line')
            .style('cursor', 'pointer')
            .on('click', c => this.selectConnection(c)));

        line.exit().remove();
    }

    private updateLines(connection: Selection<BaseType, ConnectionViewModel, BaseType, {}>) {
        const layersMap = new Map<number, LayerViewModel>();
        for (let layer of this.state.network.layers) {
            layersMap[layer.model.id] = layer;
        }

        return connection
            .attr('x1', c => this.convertX(layersMap[c.model.fromId].x + layersMap[c.model.fromId].width))
            .attr('y1', c => this.convertY(layersMap[c.model.fromId].y + layersMap[c.model.fromId].height / 2))
            .attr('x2', c => this.convertX(layersMap[c.model.toId].x))
            .attr('y2', c => this.convertY(layersMap[c.model.toId].y + layersMap[c.model.toId].height / 2))
            .style('stroke', c => c.isSelected ? 'red' : 'black')
            .style('stroke-width', 5)
    }

    private selectConnection(connection: ConnectionViewModel) {
        d3.event.stopPropagation();

        this.setState(prevState => new State(
            prevState.network.selectConnection(connection),
            prevState.translate,
            prevState.scale,
            prevState.grabbing,
            prevState.isEdit));
    }

    private updateScale(event): void {
        event.stopPropagation();
        event.preventDefault();
        const scrollAmount = event.deltaY;
        const scaleUpdate = -scrollAmount / 1000;
        this.setState(prevState => new State(
            prevState.network,
            prevState.translate,
            prevState.scale + scaleUpdate > 0
            ? prevState.scale + scaleUpdate
                : 0.01,
            prevState.grabbing,
            prevState.isEdit));
    }

    private startGrabbing(x, y) {
        this.setState(prevState => new State(
            prevState.network,
            prevState.translate,
            prevState.scale,
            new GrabbingState(true, x, y, '-webkit-grabbing'),
            prevState.isEdit));
    }

    private translate(newX, newY) {
        if (this.state.grabbing.isActive) {
            const deltaX = newX - this.state.grabbing.prevX;
            const deltaY = newY - this.state.grabbing.prevY;

            this.setState(prevState => new State(
                prevState.network,
                { x: prevState.translate.x + deltaX, y: prevState.translate.y + deltaY },
                prevState.scale,
                new GrabbingState(prevState.grabbing.isActive, newX, newY, prevState.grabbing.cursor),
                prevState.isEdit));
        }
    }

    private endGrabbing() {
        this.setState(prevState => new State(
            prevState.network,
            prevState.translate,
            prevState.scale,
            new GrabbingState(false, 0, 0, '-webkit-grab'),
            prevState.isEdit));
    }

    private selectLayer(layer) {
        d3.event.stopPropagation();

        this.setState(prevState => new State(
            prevState.network.selectLayer(layer),
            prevState.translate,
            prevState.scale,
            prevState.grabbing,
            prevState.isEdit));
    }

    private deselectAll() {
        this.setState(prevState => new State(
            prevState.network.deselectAll(),
            prevState.translate,
            prevState.scale,
            prevState.grabbing,
            prevState.isEdit));
    }

    private startLayerDragging(layer: LayerViewModel) {
        if (layer.isSelected && this.state.isEdit) {
            d3.event.stopPropagation();

            this.setState(prevState => new State(
                prevState.network.startLayerDragging(layer),
                prevState.translate,
                prevState.scale,
                prevState.grabbing,
                prevState.isEdit))
        }
    }

    private dragLayer() {
        const layer = this.state.network.layers.find(l => l.isDragged);

        if (layer) {
            d3.event.stopPropagation();

            this.setState(prevState => new State(
                prevState.network.dragLayer(layer, d3.event.movementX / prevState.scale, d3.event.movementY / prevState.scale),
                prevState.translate,
                prevState.scale,
                prevState.grabbing,
                prevState.isEdit))
        }
    }

    private dropLayer() {
        const layer = this.state.network.layers.find(l => l.isDragged);

        if (layer) {
            d3.event.stopPropagation();

            this.setState(prevState => new State(
                prevState.network.dropLayer(layer),
                prevState.translate,
                prevState.scale,
                prevState.grabbing,
                prevState.isEdit))
        }
    }

    public render(): React.ReactNode {
        return (
            <div className="display-area"
                style={{ borderTop: this.state.isEdit ? 'none' : '1px solid #BDBDBD' }}>
                <svg id={d3RootId}
                    onWheel={e => this.updateScale(e)}
                    onMouseDown={e => this.startGrabbing(e.clientX, e.clientY)}
                    onMouseMove={e => this.translate(e.clientX, e.clientY)}
                    onMouseUp={e => this.endGrabbing()}
                    onClick={() => this.deselectAll()}
                    style={{ cursor: this.state.grabbing.cursor }}></svg>
            </div>
        );
    }
}