<template>
    <div class="fix-bottom">

      <router-link tag="div" class="tag-item" to="/dashboard/boss">
        <i class="iconfont icon-qiyejianjie"></i>
        <span class="tag-link">{{getSeeType}}</span>
      </router-link>
      <router-link tag="div" class="tag-item" to="/dashboard/message">
        <i class="iconfont icon-xiaoxi1"></i>
        <span class="number" v-if="unReadNum">{{unReadNum}}</span>
        <span class="tag-link">消息</span>
      </router-link>
      <router-link tag="div" class="tag-item" to="/dashboard/center">
        <i class="iconfont icon-user1"></i>
        <span class="tag-link">我的</span>
      </router-link>
    </div>
</template>
<script>
  import { Tabbar, TabItem } from 'mint-ui';
  import {mapGetters,mapMutations} from 'vuex'
    export default {
    name:'tag',
        data() {
            return {
              selected:'bossId'
            }
        },
      mounted(){
          this.getUnreadNum();
      },
      computed: {
          getSeeType() {
            const type = this.getUser.type;
            return type === 'boss' ? '牛人':'Boss'
          },
          ...mapGetters([
            'getUser',
            'unReadNum'
          ])
      },
      methods: {
        bgStyle(bg){
          return `background:${bg}`;
        },
        getUnreadNum(){
          this.axios.get('/user/unReadNum').then(res=>{
            this.setUnread(res.data.num)
          })
        },
        ...mapMutations({
          setUnread: 'UNREAD'
        })
      }
    }
</script>
<style lang="stylus" scoped>
.tag-item
  position: relative
.number
  position: absolute;
  display: inline-block;
  background: red;
  border-radius: 50%;
  color: #fff;
  width: 18px;
  height: 18px;
  line-height: 18px;
  left: 58%;
  font-size: 12px;
.fix-bottom
  position: fixed
  bottom: 0
  left:0;
  width : 100%
  display: flex
  border-top: 1px solid #ddd;
  color: rgb(148, 148, 148);
  background-color:#fff
  >div
    flex: 1
    text-align: center
    padding: 8px 0
    flex-direction: column;
    display: flex;
    &.router-link-active
      color: #26a2ff;
      background: #fafafa;
    .tag-link
      font-size: 12px
      padding-top: 8px

</style>
