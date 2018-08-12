import Network from "../../models/Network";

export default class VersionDto {
    public network: Network;
    public comment: string;
    public baseVersionId: string;
    public networkId: string;

    constructor(network: Network, comment: string, baseVersionId: string, networkId: string) {
        this.network = network;
        this.networkId = networkId;
        this.baseVersionId = baseVersionId;
        this.comment = comment;
    }
} 