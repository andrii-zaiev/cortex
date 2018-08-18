import NetworkDto from "./NetworkDto";

export default class VersionDto {
    public network: NetworkDto;
    public comment: string;
    public baseVersionId: string;
    public networkId: string;

    constructor(network: NetworkDto, comment: string, baseVersionId: string, networkId: string) {
        this.network = network;
        this.networkId = networkId;
        this.baseVersionId = baseVersionId;
        this.comment = comment;
    }
} 