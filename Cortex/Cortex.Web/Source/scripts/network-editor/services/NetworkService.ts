import BaseService from '../../shared/BaseService';
import VersionDto from './dtos/VersionDto';
import NetworkDto from './dtos/NetworkDto';

export default class NetworkService extends BaseService {
    public async getVersion(versionId: string): Promise<NetworkDto> {
        const response = await this.sendRequest(`networks/${versionId}`, 'GET');
        const network = <NetworkDto>await response.json();
        return network;
    }

    public async saveVersion(version: VersionDto): Promise<string> {
        const response = await this.sendRequest('networks', 'POST', null, version);
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();

            throw new Error(errorMessage ? errorMessage : response.statusText);
        }
    }
}