export interface Message {
  sender: string;
  receiver: string;
  text: string;
  createAt: Date;
}

export interface MessageChat {
  message: string;
  right: boolean;
}
