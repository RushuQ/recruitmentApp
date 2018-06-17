<template>
  <transition name="slider">
    <ul>
      <li v-for="item in userLists" @click="enterChat(item.userDesc)">
        <span><img :src="getImgs(item.userDesc.avator)" alt=""></span>
        <div>
          <h3>{{item.userDesc.username}}<span class="time">{{formatTime(item.userInfos.create_time)}}</span></h3>
          <div>
            <p>{{item.userInfos.content}}</p>
            <span class="number" v-if="item.count">{{item.count}}</span>
          </div>
        </div>
      </li>
    </ul>
  </transition>
</template>
<script>
  import {format} from '@/common/js/util'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        userLists: [],
        chatLists: []
      }
    },
    computed: {
      ...mapGetters([
        'chatlist',
        'historylist'
      ])
    },
    mounted() {
      this.utilChatList()
    },
    methods: {
      getImgs(img) {
        return require(`../../common/img/${img}.png`)
      },
      enterChat(item) {
        this.$router.push({path: `/chat`})
        const chatUser = {
          name: item.username,
          id: item.id,
          avator: item.avator
        }
        this.toChat(chatUser)
      },
      utilChatList() {
        this.axios.get('/user/getmsglist').then(res => {
          const msgs = res.data.msg
          this.historyList(msgs)
          this.userLists = this.dishUserInfo(msgs)
        })
      },
      dishUserInfo(msgs){
        const chats = Object.values(msgs)
        const ids = Object.keys(msgs)
        chats.map((v,index)=>{
          v.userDesc = []
          const chatid = ids[index]
          const chatObj = this.chatlist[chatid]
          chatObj ? v.userDesc={
            username: chatObj.username,
            avator: chatObj.avator,
            id: chatObj._id
          } : ''
        })
        chats.sort(function (x,y) {
          return y.count - x.count
        })
        chats.sort(function (x,y) {
          return y.userInfos.create_time - x.userInfos.create_time
        })
        return chats
      },
      formatTime(time){
        return format(time);
      },
      ...mapMutations({
        toChat: 'USER_CHAT_TO',
        historyList: 'HISTORY_CHAT'
      })
    },
    watch: {
      "$store.state.unRead": function () {
        this.userLists = this.dishUserInfo(this.historylist)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  $little-width = 18px
  li
    display: flex
    border-bottom: 1px solid #e8e8e8;
    padding: 8px 0
    > span
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 12px 0 10px
    div
      flex: 1
      margin-left: 4px
      h3
        margin: 8px 0;
        .time
          font-size: 10px;
          float: right;
          color: #999;
          padding-top: 4px;
      div
        display: flex
        align-items: center;
        p
          line-height: 1.8
          flex: 1
        .number
          width: $little-width
          height: $little-width
          line-height: $little-width
          background: red
          color: #fff
          border-radius: 50%
          text-align: center
          font-size: 12px
          margin: 0 8px
</style>
