export const getUser = state => state.user//当前用户信息

export const getChatUser = state => state.userChatTo;//聊天对象

export const getChatList = state => state.chatList;//聊天记录

export const unReadNum = state => state.unRead;//消息未读数量

export const chatlist = state => state.userChatList;//有消息往返的用户列表

export const historylist = state => state.historyChats;

