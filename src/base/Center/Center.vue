<template>
  <div class="centerPage">
    <header>
      <div><img :src="getImgs" alt="用户头像"></div>
      <p>{{getUser.title}}</p>
      <h3>{{getUser.username}}</h3>
    </header>
    <section>
      <div class="sub-title">简历</div>
      <mt-cell :title="getUser.type==='boss'?'岗位薪资':'期待薪资'" :value="getUser.money"></mt-cell>
      <mt-cell v-if="getUser.company" title="所在企业" :value="getUser.company"></mt-cell>
      <mt-field :label="getUser.type==='boss'?'岗位详情':'自我介绍'" type="textarea" rows="4" :value="getUser.desc" readonly></mt-field>
      <mt-button class="btnOut" type="primary" size="large" @click="logout">注销</mt-button>
    </section>
  </div>
</template>
<script>
  import {mapGetters,mapMutations} from 'vuex'
  import {Cell,MessageBox } from 'mint-ui';
  import browserCookie from 'browser-cookies'

  export default {
    data() {
      return {}
    },
    computed: {
      getImgs() {
        return require(`../../common/img/${this.getUser.avator}.png`)
      },
      ...mapGetters([
        'getUser'
      ])
    },
    methods: {
      logout(){
        MessageBox.confirm('确定要退出当前账号?').then(action => {
          browserCookie.erase('userid');
          this.clearUser('')
          this.$router.push('/login')
        });
      },
      ...mapMutations({
        clearUser: 'AUTO_SUCCESS'
      })
    }
  }
</script>
<style lang="stylus" scoped>
  .centerPage
    line-height: 1.8

  header
    text-align: center
    margin: 5px 0
    > div
      margin: 6px auto;
      width: 54px;
      height: 54px
      border: 1px solid #addfff
      box-shadow: 0px 2px 8px rgba(208, 237, 255, .3)
      border-radius: 50%
      display: flex
      align-items: center
      justify-content: center

  section
    .sub-title
      color: #888
      font-size: 14px
      padding: 30px 0 18px 0
      margin-left: 15px
    .mint-cell-wrapper .mint-cell-title
      flex: none !important;
      width: 80px;
      font-size: 14px
    .mint-cell-wrapper .mint-cell-value
      flex: 1
    .btnOut
      margin: 20px 0;
</style>
