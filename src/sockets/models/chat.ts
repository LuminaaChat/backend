export class Chat {
  id: string;
  members: string[];

  constructor(id: string) {
    this.id = id;
    this.members = [];
  }
}
