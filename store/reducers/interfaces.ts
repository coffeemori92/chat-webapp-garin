export interface Action {
  type: string;
  error: any;
  data?: {
    email?: string,
    password?: string,
    nickname?: string,
    chatRoomId?: string,
  }
}