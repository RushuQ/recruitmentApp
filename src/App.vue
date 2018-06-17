<template>
  <div id="app">
    <keep-alive :include="['tag']">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus" scoped>
#app
  overflow: hidden
</style>
