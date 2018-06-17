import * as types from './mutation-type'
import io from 'socket.io-client';
const socket = io('ws://localhost:9292');

export const insertChat = function ({commit,state}) {
  if(socket._callbacks.$chatMsg===undefined){
  socket.on('chatMsg',(chat)=> {
    state.chatList.push(chat);
    state.historyChats[chat.from].userInfos = chat
    state.historyChats[chat.from].count += 1;
    commit(types.CHAT_LIST,state.chatList);
    commit(types.HISTORY_CHAT,state.historyChats);
    if(state.user._id !== chat.from){
      commit(types.UNREAD,state.unRead + 1)
    }
  })}
}

