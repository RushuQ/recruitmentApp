<template>
  <div>
    <mt-header fixed title="招聘网"></mt-header>
    <div class="header-top">
      <router-view></router-view>
      <tag></tag>
    </div>
  </div>
</template>
<script>
  import Tag from '@/base/SwitchTag/SwitchTag'
  import {mapActions,mapGetters} from 'vuex'

  export default {
    mounted(){
      this.insertChat();
      this.checkUser()
    },
    computed:{
      ...mapGetters(([
        'getUser'
      ]))
    },
    methods: {
      checkUser(){
        //刷新后vuex的数据会消息，那么此时要重新登录获取信息
        const name = this.getUser.username
        if(!(name && name.length)){
          //this.$router.push('/')
        }
      },
      ...mapActions([
        'insertChat'
      ])
    },
    components: {
      Tag
    }
  }
</script>
<style>

</style>
