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
        for (let f of functions) {
            f(message.data);
        }
    }
}