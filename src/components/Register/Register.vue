<template>
  <div>
    <mt-header fixed title="账号注册">
      <router-link to="/login" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="header-top">
      <div class="fromTab">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
        <mt-field label="确认密码" :state="isSave" placeholder="请再输入密码" type="password" v-model="repwd"></mt-field>
        <mt-radio
          align="right"
          title="选择身份"
          v-model="type"
          :options="types">
        </mt-radio>
        <!--<mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4" v-model="desc"></mt-field>-->
      </div>
      <mt-button type="primary" size="large" @click="register">下一步</mt-button>
    </div>
  </div>
</template>
<script>
  import {Header, Button, Radio,MessageBox } from 'mint-ui';
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        username: '',
        pwd: '',
        repwd: '',
        desc: '',
        type: '',
        isSavePwd: true,
        types: [
          {
            label: 'Boss',
            value: 'boss'
          },
          {
            label: '牛人',
            value: 'genius'
          }
        ]
      }
    },
    computed: {
      isSave(){//判断密码和确认密码的输入是否相同
        this.isSavePwd = this.repwd === this.pwd
          return this.isSavePwd ? '':'error'
      }
    },
    beforeRouter(){},
    methods: {
      register(){
        if(!this.isSavePwd){
          MessageBox('提示', '两次密码需相同！');
          return;
        }
        const data = {
          username:this.username,
          pwd: this.pwd,
          type: this.type
        }
        for(let k in data) {
          if(!data[k]){
            MessageBox('提示', '不能為空！');
            return;
          }
        }
        this.axios.post('/user/registerUser',data).then(res=>{
          this.setUserData(res.data.data);
          this.$router.push({path:'finishDetail',query:{type:this.type}})
        })
      },
      ...mapMutations({
        setUserData: 'AUTO_SUCCESS'
      })
    }
  }
</script>
<style lang="stylus" scoped>
  .fromTab
    margin-bottom: 40px
</style>
