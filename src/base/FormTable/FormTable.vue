<template>
  <div>
    <mt-field v-for="item in inputLists" :label="item.text" @change="submitVal($event,item.name)"></mt-field>
    <mt-field :label="text" type="textarea" rows="4" v-model="desc"></mt-field>
    <mt-field :label="detail" type="textarea" rows="4" v-model="aspect"></mt-field>
    <mt-button type="primary" size="large" @click="register" class="submitBtn">注册</mt-button>
  </div>
</template>
<script>
  import {Field,Button} from 'mint-ui';
  import { mapGetters,mapMutations } from 'vuex'

  export default {
    data() {
      return {
        desc: '',
        aspect: '',
        submitStr: {}
      }
    },
    props: {
      text: {
        type: String,
        default: '自我介绍'
      },
      detail: {
        type: String,
        default: '介绍详情'
      },
      inputLists: {
        type: Array,
        default: []
      },
      avator: {
        type:String,
        default: ''
      }
    },
    computed: {
      ...mapGetters([
        'getUser'
      ])
    },
    methods: {
      submitVal(event,item) {
        this.submitStr[item] = event
      },
      register() {
        var oMsg = Object.assign({},{
          avator: this.avator,
          desc: this.desc,
          aspect: this.aspect
        },this.getUser,this.submitStr)
        this.axios.post('/user/updateUserMsg',oMsg).then(res=>{
          this.setUserData(res.data.data);
          this.$router.push(`/dashboard/boss`)
        })
      },
      ...mapMutations({
        setUserData: 'AUTO_SUCCESS'
      })
    }
  }
</script>
<style lang="stylus" scoped>
.submitBtn
  width: 80%;
  margin: 20px auto;
</style>
