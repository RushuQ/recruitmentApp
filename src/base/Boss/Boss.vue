<template>
  <transition name="slider">
    <ul v-if="userlist">
      <li v-for="item in userlist" class="listItem" @click="enterChat(item)">
        <span class="avator">
          <img :src="getImgs(item.avator)" width="32" height="32" alt="">
        </span>
        <div class="cMiddle">
          <h3>{{item.username}}</h3>
          <p class="title">{{item.title}}</p>
          <p class="time">{{formatTime(item.create_time)}}</p>
        </div>
        <span class="money">{{item.money}}</span>
      </li>
    </ul>
  </transition>
</template>
<script>
  import {getUserList} from '@/common/js/mixin'
  import {format} from '@/common/js/util'
  import {mapMutations} from 'vuex'

  export default {
    mixins: [getUserList],
    data() {
      return {}
    },
    methods: {
      getImgs(img) {
        return require(`../../common/img/${img}.png`)
      },
      formatTime(time) {
        return format(time)
      },
      enterChat(item) {
        this.$router.push({path:`/detail?userId=${item._id}`})
        const chatUser = {
          name: item.username,
          id: item._id,
          avator: item.avator
        }
        this.toChat(chatUser)
      },
      ...mapMutations({
        toChat: 'USER_CHAT_TO'
      })
    }
  }
</script>
<style lang="stylus" scoped>
  .listItem
    display: flex
    padding: 8px 0
    border-bottom: 1px solid #e8e8e8;
    > span
      display: flex;
      justify-content: center;
      align-items: center;
      &.avator
        padding: 0 12px 0 10px
    .cMiddle
      line-height: 1.7
      flex: 1

      .title
        font-size: 13px
        color: #000
      .time
        font-size: 11px
    .money
      color: #22a5ff
      font-size: 15px
</style>
