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


import * as ReactDOM from 'react-dom';
import * as React from 'react';
import AccessesEditor from './AccessesEditor';
import User from './models/User';

function getUsers(elementId): User[] {
    const usersElement = document.getElementById(elementId);
    const users: User[] = [];

    for (let i = 0; i < usersElement.children.length; i++) {
        const element = usersElement.children.item(i);

        const id = element.attributes['data-id'].value;
        const name = element.attributes['data-name'].value;
        const userName = element.attributes['data-user-name'].value;

        users.push(new User(id, `${name} <${userName}>`))
    }

    return users;
}

const element = document.getElementById('access-editor');

if (element) {
    const viewMode = Number(element.attributes['data-view-mode'].value);
    const editMode = Number(element.attributes['data-edit-mode'].value);
    const viewUsersElementId = element.attributes['data-view-users-id'].value;
    const editUsersElementId = element.attributes['data-edit-users-id'].value;
    const viewUsers = getUsers(viewUsersElementId);
    const editUsers = getUsers(editUsersElementId);

    ReactDOM.render(<AccessesEditor viewMode={viewMode} editMode={editMode} viewUsers={viewUsers} editUsers={editUsers} />, element);
}
