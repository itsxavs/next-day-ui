export interface Message {
  sender: String;
  receiver: String;
  text: String;
  createAt: Date;
}

export interface MessageChat {
  message: String;
  right: boolean;
}
