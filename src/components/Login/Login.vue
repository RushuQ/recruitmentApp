<template>
  <div class="loginPage">
    <mt-header fixed title="招聘网登陆"></mt-header>
    <div class="header-top">
      <div class="fromTab">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
      </div>
      <mt-button type="primary" size="large" @click="login">登陆</mt-button>
      <div class='centerTip'>没有账号？
        <router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import {Header,Button,MessageBox} from 'mint-ui';
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        username: 'admin',
        pwd: '1'
      }
    },
    methods: {
      login(){
        this.axios.post('/user/loginUser',{
          username: this.username,
          pwd: this.pwd
        }).then(res => {
          const response = res.data;
          if(response.code){
            MessageBox('提示', response.msg);
          }else {
            const data = res.data.data;
            this.setUserData(data);
            this.$router.push(`/dashboard/boss`)
          }
        })
      },
      ...mapMutations({
        setUserData: 'AUTO_SUCCESS'
      })
    }
  }
</script>
<style lang="stylus" scoped>

  .mint-field .mint-cell-title
    width: 80px
    text-align: center
  .fromTab
    margin-bottom: 40px

  .centerTip
    text-align: center
    margin-top: 40px
    a
      color: red
      text-decoration: underline
</style>
