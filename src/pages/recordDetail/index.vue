<template>
  <van-tabs animated swipeable color="#1989fa">
    <van-tab v-for="(item,index) in recordList" :key="index" :title="'问题' + (index+1)">内容 {{item.question_title}}
    </van-tab>
  </van-tabs>
</template>

<script>
import {mapState} from "vuex";
import Toast from "../../../dist/wx/vant-weapp/dist/toast/toast";
export default {
  data () {
    return {
      recordList:[],
      openid:"",
      groupId: null,
    }
  },
  computed: {
    ...mapState(['openid'])
  },
  methods: {
  },
  beforeMount () {
    this.openid = this.$store.state.openid
    this.groupId = this.$mp.query.groupId
    this.$get({
      url: "/questionList/index", //连接的网址
      data: {
        wx_id: this.openid,
        group_id: this.groupId
      } //需要的参数
    }).then(res => {
      if (res.status === 200) {
        console.log(res)
        this.recordList = res.data
      }
    })
  }
}
</script>

<style scoped>

</style>
