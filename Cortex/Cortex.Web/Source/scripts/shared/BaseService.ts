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


export default abstract class BaseService {
    protected sendRequest(route: string, method: string, queryParams: object = null, body: object = null) {
        const url = new URL(`${location.origin}/api/${route}`);
        const params = new URLSearchParams();

        if (queryParams) {
            for (const prop in queryParams) {
                if (queryParams.hasOwnProperty(prop)) {
                    params.append(prop, queryParams[prop]);
                }
            }
        }
        url.search = params.toString();

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const request = new Request(url.toString(), {
            method: method,
            mode: 'same-origin',
            credentials: 'same-origin',
            body: body ? JSON.stringify(body) : null,
            headers: headers
        });

        return fetch(request);
    }
}
