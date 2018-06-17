import {mapGetters,mapMutations} from 'vuex'

export const getUserList = {
  data() {
    return {
      userlist : []
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  created() {
    this.getTypeUser();
  },
  methods: {
    getTypeUser(){
      const type = this.getUser.type === 'boss' ? 'genius':'boss'
      this.axios.get('/user/typeList?type=' + type).then(res=>{
        this.userlist = res.data.data;
        this.formatData(this.userlist)
      })
    },
    formatData(list){
      const userlists = {}
      list.map(user=>{
        userlists[user._id] = user;
      })
      this.userChatList(userlists)
    },
    ...mapMutations({
      userChatList: 'USER_CHAT'
    })
  }
}
