export class Session {
  userID: string;
  userName: string;
  connected: boolean;

  constructor(userID: string, userName: string) {
    this.userID = userID;
    this.userName = userName;
    this.connected = true;
  }
}
