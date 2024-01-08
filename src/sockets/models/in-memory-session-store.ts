import { Session } from './session';

export class InMemorySessionStore {
    private sessions: Map<string, Session>;

    constructor() {
        this.sessions = new Map();
    }

    findSession(id: string) {
        return this.sessions.get(id);
    }

    saveSession(id: string, session: Session) {
        this.sessions.set(id, session);
    }

    findAllSessions(): Session[] {
        return [...this.sessions.values()];
    }
}
