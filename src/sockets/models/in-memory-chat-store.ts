import { Chat } from './chat';

export class InMemoryChatStore {
    private chats: Map<string, Chat>;

    constructor() {
        this.chats = new Map();
    }

    findChat(id: string) {
        return this.chats.get(id);
    }

    saveChat(id: string, chat: Chat) {
        this.chats.set(id, chat);
    }

    findAllChats(): Chat[] {
        return [...this.chats.values()];
    }
}
