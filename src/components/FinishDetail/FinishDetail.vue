<template>
  <div class="finishDetail">
    <mt-header fixed title="完善信息页"></mt-header>
    <div class="header-top">
      <select-avator @avator="getAvator"></select-avator>
      <form-table :text="areaText" :detail="detailText" :inputLists="list" :avator="avator"></form-table>
    </div>
  </div>
</template>
<script>
  import {Header, Button} from 'mint-ui';
  import selectAvator from '../../base/SelectAvator/SelectAvator.vue'
  import FormTable from '../../base/FormTable/FormTable.vue'

  export default {
    data() {
      return {
        bossList: [
          {
            name: 'title',
            text: '招聘岗位'
          },
          {
            name: 'company',
            text: '公司名称'
          },
          {
            name: 'money',
            text: '职位薪资'
          }
        ],
        geniusList: [
          {
            name: 'title',
            text: '求职岗位'
          },
          {
            name: 'money',
            text: '期望薪资'
          }
        ],
        avator: '',
        type: ''
      }
    },
    created() {
      this.type = this.$route.query.type;
    },
    computed: {
      list() {
        return this.type === 'boss' ? this.bossList : this.geniusList;
      },
      areaText() {
        return this.type === 'boss' ? '招聘要求' : '自我介绍';
      },
      detailText() {
        return this.type === 'boss' ? '企业详情' : '工作经验';
      }
    },
    methods: {
      getAvator(icon) {
        this.avator = icon;
      }
    },
    components: {
      selectAvator,
      FormTable
    }
  }
</script>
<style lang="stylus" scoped>

</style>
