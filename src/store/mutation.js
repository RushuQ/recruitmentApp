import * as types from './mutation-type'

const mutation = {
  [types.AUTO_SUCCESS](state, user) {
    state.user = user;
  },
  [types.USER_CHAT_TO](state, data) {//用户当前的聊天对象
    state.userChatTo = data;
  },
  [types.CHAT_LIST](state, list) {//聊天记录
    state.chatList = list
  },
  [types.UNREAD](state, num) {//消息未读数量
    state.unRead = num
  },
  [types.USER_CHAT](state, list) {//有消息往返的用户列表
    state.userChatList = list
  },
  [types.HISTORY_CHAT](state, list) {//有消息往返的用户列表
    state.historyChats = list
  }
}
export default mutation;
