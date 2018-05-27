import * as React from 'react';
import * as d3 from 'd3';

import Network from './models/Network';
import { select, Selection, BaseType } from 'd3';
import Layer from './models/Layer';
import NetworkViewModel from './view-models/NetworkViewModel';
import LayerViewModel from './view-models/LayerViewModel';

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

    constructor(
        network: NetworkViewModel,
        translate: { x: number, y: number },
        scale: number,
        grabbing: GrabbingState) {
        this.network = network;
        this.translate = translate;
        this.scale = scale;
        this.grabbing = grabbing;
    }

    public static createInitial(network: Network): State {
        return new State(
            NetworkViewModel.fromModel(network),
            { x: 0, y: 0 },
            1,
            new GrabbingState(false, 0, 0, '-webkit-grab'));
    }
}

export default class NetworkDisplayArea
    extends React.Component<{ network: Network }, State> {

    constructor(props: { network: Network }) {
        super(props);

        this.updateScale = this.updateScale.bind(this);
        this.startGrabbing = this.startGrabbing.bind(this);
        this.translate = this.translate.bind(this);
        this.endGrabbing = this.endGrabbing.bind(this);
        this.selectLayer = this.selectLayer.bind(this);
        this.deselectLayers = this.deselectLayers.bind(this);
        this.startLayerDragging = this.startLayerDragging.bind(this);
        this.dragLayer = this.dragLayer.bind(this);
        this.dropLayer = this.dropLayer.bind(this);

        this.state = State.createInitial(props.network);
    }

    public static getDerivedStateFromProps(nextProps: { network: Network }, prevState: State) {
        return new State(
            NetworkViewModel.fromModel(nextProps.network),
            prevState.translate,
            prevState.scale,
            prevState.grabbing);
    }

    componentDidMount() {
        this.drawLayers();
    }

    componentDidUpdate() {
        this.drawLayers();
    }

    private drawLayers(): void {
        const svg = d3.select(`#${d3RootId}`)
            .on('mousemove', this.dragLayer)
            .on('mouseup', this.dropLayer);

        const layerGroup = svg.selectAll('g').data(this.state.network.layers, l => (l as LayerViewModel).model.id.toString());
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
            .attr('x', l => l.x * this.state.scale + this.state.translate.x)
            .attr('y', l => l.y * this.state.scale + this.state.translate.y)
            .style('fill', l => l.isSelected ? 'lightgray' : 'white')
            .style('cursor', l => l.isSelected ? 'move' : 'pointer');
    }

    private updateLayerLabels(layerLabel: Selection<BaseType, LayerViewModel, BaseType, {}>) {
        return layerLabel
            .attr('x', l => l.x * this.state.scale + this.state.translate.x)
            .attr('y', l => (l.y - 60) * this.state.scale + this.state.translate.y)
            .attr('font-size', () => labelFontSize * this.state.scale);
    }

    private updateNameLabels(label: Selection<BaseType, LayerViewModel, BaseType, {}>) {
        return label
            .attr('x', l => l.x * this.state.scale + this.state.translate.x)
            .text(l => l.model.name);
    }

    private updateInfoLabels(label: Selection<BaseType, LayerViewModel, BaseType, {}>) {
        return label
            .attr('x', l => l.x * this.state.scale + this.state.translate.x)
            .text(l => l.info);
    }

    private updateSizeLabels(label: Selection<BaseType, LayerViewModel, BaseType, {}>) {
        return label
            .attr('x', l => l.x * this.state.scale + this.state.translate.x)
            .text(l => l.size);
    }

    private updateScale(scrollAmount: number): void {
        const scaleUpdate = -scrollAmount / 1000;
        this.setState(prevState => new State(
            prevState.network,
            prevState.translate,
            prevState.scale + scaleUpdate > 0
            ? prevState.scale + scaleUpdate
                : 0.01,
            prevState.grabbing));
    }

    private startGrabbing(x, y) {
        this.setState(prevState => new State(
            prevState.network,
            prevState.translate,
            prevState.scale,
            new GrabbingState(true, x, y, '-webkit-grabbing')));
    }

    private translate(newX, newY) {
        if (this.state.grabbing.isActive) {
            const deltaX = newX - this.state.grabbing.prevX;
            const deltaY = newY - this.state.grabbing.prevY;

            this.setState(prevState => new State(
                prevState.network,
                { x: prevState.translate.x + deltaX, y: prevState.translate.y + deltaY },
                prevState.scale,
                new GrabbingState(prevState.grabbing.isActive, newX, newY, prevState.grabbing.cursor)));
        }
    }

    private endGrabbing() {
        this.setState(prevState => new State(
            prevState.network,
            prevState.translate,
            prevState.scale,
            new GrabbingState(false, 0, 0, '-webkit-grab')));
    }

    private selectLayer(layer) {
        d3.event.stopPropagation();

        this.setState(prevState => new State(
            prevState.network.selectLayer(layer),
            prevState.translate,
            prevState.scale,
            prevState.grabbing))
    }

    private deselectLayers() {
        this.setState(prevState => new State(
            prevState.network.deselectLayers(),
            prevState.translate,
            prevState.scale,
            prevState.grabbing))
    }

    private startLayerDragging(layer: LayerViewModel) {
        if (layer.isSelected) {
            d3.event.stopPropagation();

            this.setState(prevState => new State(
                prevState.network.startLayerDragging(layer),
                prevState.translate,
                prevState.scale,
                prevState.grabbing))
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
                prevState.grabbing))
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
                prevState.grabbing))
        }
    }

    public render(): React.ReactNode {
        return (
            <div className="display-area">
                <svg id={d3RootId}
                    onWheel={e => this.updateScale(e.deltaY)}
                    onMouseDown={e => this.startGrabbing(e.clientX, e.clientY)}
                    onMouseMove={e => this.translate(e.clientX, e.clientY)}
                    onMouseUp={e => this.endGrabbing()}
                    onClick={() => this.deselectLayers()}
                    style={{ cursor: this.state.grabbing.cursor }}></svg>
            </div>
        );
    }
}