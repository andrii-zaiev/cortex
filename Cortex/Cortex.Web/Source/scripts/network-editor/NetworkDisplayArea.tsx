import * as React from 'react';
import * as d3 from 'd3';

import Network from './models/Network';

const d3RootId: string = 'd3-root';

export default class NetworkDisplayArea
    extends React.Component<{ network: Network }, { network: Network }> {

    constructor(props: { network: Network }) {
        super(props);

        this.state = { network: props.network };
    }

    componentDidMount() {
        const p = d3.select(`#${d3RootId}`)
            .selectAll('rect')
            .data([4, 8, 15, 16, 23, 42]);

        // Enter…
        p.enter().append('rect')
            .attr('width', 10)
            .attr('height', 50)
            .attr('x', d => d);

        // Exit…
        p.exit().remove();
    }

    public render(): React.ReactNode {
        return (
            <div className="display-area">
                <svg id={d3RootId}></svg>
            </div>
        );
    }
}