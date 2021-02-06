<template>
  <van-tabs animated swipeable color="#1989fa">

    <van-tab v-for="(item,index) in questionList" :key="index" :title="'问题' + (index+1)">
      内容 {{item.question_title}}
    </van-tab>
  </van-tabs>
</template>

<script>
import {mapState} from "vuex";
export default {
  data () {
    return {
      s:[],
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
        group_id: this.groupId
      } //需要的参数
    }).then(res => {
      if (res.status === 200) {
        console.log(res)
        this.questionList = res.data
      }
    })
  }
}
</script>

<style scoped>

</style>
