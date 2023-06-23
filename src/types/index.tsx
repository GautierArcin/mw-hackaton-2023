export type MessageChatGpt = {
  role: string;
  content: string;
}[];

export type ContentType = {
  title: string;
  code: MessageChatGpt;
};
