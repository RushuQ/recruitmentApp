<template>
  <div>
    <mt-header fixed :title="text">
      <a slot="left" @click="goBack()">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
  </div>
</template>
<script>
  import {Header} from 'mint-ui';

  export default {
    data() {
      return {}
    },
    props: {
      text: {
        type: String,
        default: '标题'
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style>

</style>
