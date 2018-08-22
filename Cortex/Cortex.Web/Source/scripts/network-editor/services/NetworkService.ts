// Cortex - web application for creating and managing neural networks diagrams.
// Copyright (C) 2018  Andrii Zaiev <andrii.zaiev@gmail.com>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


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
