import * as React from 'react';
import * as d3 from 'd3';

import Network from './models/Network';
import { select, Selection, BaseType } from 'd3';
import Layer from './models/Layer';

const d3RootId: string = 'd3-root';

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
    public network: Network;
    public translate: { x: number, y: number };
    public scale: number;
    public grabbing: GrabbingState;

    constructor(
        network: Network,
        translate: { x: number, y: number },
        scale: number,
        grabbing: GrabbingState) {
        this.network = network;
        this.translate = translate;
        this.scale = scale;
        this.grabbing = grabbing;
    }

    public static createInitial(network: Network): State {
        return new State(network, { x: 0, y: 0 }, 1, new GrabbingState(false, 0, 0, '-webkit-grab'));
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

        this.state = State.createInitial(props.network);
    }

    componentDidMount() {
        this.drawLayers();
    }

    componentDidUpdate() {
        this.drawLayers();
    }

    private drawLayers(): void {
        const rect = this.updateLayers(
            d3.select(`#${d3RootId}`)
                .selectAll('rect')
                .data(this.state.network.layers));

        // Enter…
        this.updateLayers(
            rect.enter().append('rect')
                .style('stroke', 'black')
                .style('stroke-width', 2)
                .on('click', l => this.selectLayer(l)));

        // Exit…
        rect.exit().remove();
    }

    private updateLayers(layerRect: Selection<BaseType, Layer, BaseType, {}>) {
        return layerRect
            .attr('width', l => l.width * this.state.scale)
            .attr('height', l => l.height * this.state.scale)
            .attr('x', l => l.x * this.state.scale + this.state.translate.x)
            .attr('y', l => l.y * this.state.scale + this.state.translate.y)
            .style('fill', l => l.isSelected ? 'lightgray' : 'white')
            .style('cursor', l => l.isSelected ? 'move' : 'pointer');
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