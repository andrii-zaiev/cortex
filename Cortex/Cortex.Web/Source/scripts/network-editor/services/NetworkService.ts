import BaseService from '../../shared/BaseService';
import VersionDto from './dtos/VersionDto';
import Network from '../models/Network';

export default class NetworkService extends BaseService {
    public async getVersion(versionId: string): Promise<Network> {
        const response = await this.sendRequest(`networks/${versionId}`, 'GET');
        const network = <Network>await response.json();
        return network;
    }

    public async saveVersion(version: VersionDto): Promise<boolean> {
        const response = await this.sendRequest('networks', 'POST', null, version);
        return response.ok;
    }
}