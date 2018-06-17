<template>
  <transition name="slider">
    <div class="chatWrap">
      <headTop :text="chatUser.name"></headTop>
      <section ref="chatlist">
        <ul class="chatLists" ref="scrollList">
          <li v-for="item in chatList" class="left" :class="{'right':item.from !== curUser._id}">
            <span class="avator"><img :src="getAvator(item.from)" alt=""></span>
            <span class="text">{{item.content}}</span>
          </li>
        </ul>
      </section>
      <footer>
        <div class="mint-searchbar">
          <div class="mint-searchbar-inner">
            <!--<i class="mintui mintui-search"></i>-->
            <input type="text" class="mint-searchbar-core" v-model="value">
          </div>
          <a class="mint-searchbar-cancel" @click="chatUpload">发送</a></div>
      </footer>
    </div>
  </transition>
</template>
<script>
  import headTop from '@/base/Header/Header'
  import {mapGetters, mapActions,mapMutations} from 'vuex'
  import io from 'socket.io-client';
  import BScroll from 'better-scroll'
  import {getUser} from "../../store/getter";

  const socket = io('ws://localhost:9292');

  export default {
    data() {
      return {
        value: ''
      }
    },
    mounted() {
      this.axios.get('/user/getChatList?id='+this.chatUser.id).then(res=>{
        this.getHistoryList(res.data.data)
        this.$nextTick(()=>{
          this._initScroll()
        })
      })
    },
    computed: {
      ...mapGetters({
        chatUser: 'getChatUser',
        curUser: 'getUser',
        chatList: 'getChatList'
      })
    },
    beforeRouteLeave(to,from,next){//退出聊天页面后更新未读信息数量
      this.axios.post('/user/updateRead',{
        'from':this.chatUser.id
      }).then(res => {})
      next()
    },
    methods: {
      _initScroll(){
          this.scroll = new BScroll(this.$refs.chatlist, {})
      },
      getAvator(id){
        const img = id === this.curUser._id ? this.curUser.avator : this.chatUser.avator
        return require(`../../common/img/${img}.png`)
      },
      chatUpload() {
        if (!this.value.length) {
          return;
        }
        const msg = {
          content: this.value,
          from: this.curUser._id,
          to: this.chatUser.id
        }
        socket.emit('sendMsg', msg)
        this.value = '';
      },
      scrollTo(){
        this.scroll && this.scroll.refresh()
        this.scroll && this.scroll.scrollTo(0,this.scroll.maxScrollY)
      },
      ...mapActions([
        'insertChat'
      ]),
      ...mapMutations({
        getHistoryList: 'CHAT_LIST'
      })
    },
    components: {
      headTop
    },
    watch: {
      '$store.state.chatList':function (oldV,newV) {
        //监听信息变化重滚动消息信息到当前位置
        this.$nextTick(()=>{
          this.scrollTo()
        })
        if(this.scroll){
          this.$refs.scrollList.style.paddingBottom = '60px';
        }
      }
    }
  }

</script>
<style lang="stylus" scoped>
  .chatWrap

  section
    position: fixed;
    width: 100%;
    top: 50px;
    bottom: 0;
    /*padding: 50px 0
    overflow: hidden;*/
    box-sizing border-box
  .chatLists
    overflow: hidden;
    /*padding-bottom: 60px
    padding: 60px 0*/
    li
      clear: both
      max-width: 70%
      width: auto
      color: #000
      margin: 6px 0
      display: flex
      align-items: center;
      .avator
        width: 46px
        height: 46px
        display: flex
        justify-content: center
        align-items: center
      .text
        padding: 7px 10px
        border-radius: 10px
        position: relative
        flex :1
        line-height: 1.5
      &.left
        float: left
        text-align: left
        .text
          background: #eee
          &:before
            content: ''
            display: inline-block
            border-width:7px;
            border-style:solid;
            border-color:transparent #eee transparent transparent;
            position: absolute
            top: 50%;
            left: -11px;
            margin-top: -7px;
      &.right
        float: right
        text-align: right
        flex-direction: row-reverse
        .text
            background: #c6e1ef
            text-align: left
            &:before
              border-color:transparent #c6e1ef transparent transparent;
              transform: rotateY(180deg);
              left: auto;
              right: -12px;

  footer
    position: fixed;
    width: 100%;
    bottom: 0;
    background: #efeff4
    .mint-searchbar-cancel
      color: #000
</style>
