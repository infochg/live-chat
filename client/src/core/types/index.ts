export interface Sender {
  id: number;
  name: string;
}

export interface Message {
  id: number;
  user: string;
  userId: number;
  text: string;
}