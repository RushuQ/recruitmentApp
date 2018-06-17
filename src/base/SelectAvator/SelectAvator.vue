<template>
  <div>
    <div class="select-avator">请选择头像：<span v-show="avator"><img :src="avator" alt=""></span></div>
    <ul class="grid-column">
      <li v-for="item in headlists" @click="selectItem(item)">
        <img :src="item.icon" alt="">
        <p>{{item.text}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        avator: '',
        headlists: 'boy,girl,man,woman,bull,chick,crab,hedgehog,koala,hippopotamus,lemur,pig,tiger,whale,zebra'
          .split(',').map(v => ({
            text: v,
            icon: require(`@/common/img/${v}.png`)
          }))
      }
    },
    methods: {
      selectItem(item) {
        this.avator = item.icon;
        this.$emit('avator',item.text);
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .select-avator
    color: #888;
    font-size: 14px;
    padding: 15px 0 9px 15px;
    span
      display: inline-block;
      border: 1px solid #ddd;
      border-radius: 38%;
      padding: 6px 4px;
      box-shadow: 1px 1px 5px rgba(38, 162, 255, .3);
  .grid-column
    column-count: 5;
    column-gap: 0;
    text-align: center;
    border: 1px solid #ddd
    border-right: none
    li
      padding: 14px 0
      border-bottom: 1px solid #ddd
      border-right: 1px solid #ddd
      &:nth-child(3n)
        border-bottom none
      img
        width: 28px
        height: 28px
        padding-bottom: 6px
</style>
