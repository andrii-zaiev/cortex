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


import { Message, MessageType } from "./Message";

export default class EventBus {
    private static listeners: Map<MessageType, Function[]> = new Map<MessageType, Function[]>();

    public static subscribe(messageType: MessageType, listener: Function) {
        let functions = EventBus.listeners.get(messageType);
        if (!functions) {
            functions = [];
        }
        functions.push(listener);
        EventBus.listeners.set(messageType, functions);
    }

    public static unsubscribe(messageType: MessageType, listener: Function) {
        let functions = EventBus.listeners.get(messageType);
        if (!functions) {
            throw new Error('Listener does not exist');
        }

        functions = functions.filter(f => f != listener);
        EventBus.listeners.set(messageType, functions);
    }

    public static emit<T>(message: Message<T>) {
        const functions = EventBus.listeners.get(message.type);
        if (functions) {
            for (let f of functions) {
                f(message.data);
            }
        }
    }
}
