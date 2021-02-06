<template>
  <div>
  <div v-for="item in groupList">
    <van-panel :title="item.group_name" :desc="item.describe" :status="item.status">
      <div style="text-align: right">
        <van-button size="small" type="info" @click="jump(item.id)">开始答题</van-button>
      </div>
    </van-panel>
  </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from "../../../dist/wx/vant-weapp/dist/toast/toast";
import {mapState} from "vuex";

export default {
  data () {
    return {
      openid: "",
      groupList: []
    }
  },
  computed: {
    ...mapState(['openid'])
  },
  methods: {
    jump(id){
      this.openid = this.$store.state.openid
      if(this.openid===""){
        Toast({message :'请先使用微信登陆再回答问题', duration:2000, mask: true,forbidClick:true});

        new Promise((resolve) => setTimeout(resolve, 2000)).then(
          ()=>{
          wx.switchTab({
            url: '/pages/personal/main'
          })
        })

      }else{
        wx.navigateTo({
          url: '/pages/answerDetail/main?groupId=' + id
        })
      }
    }
  },
  onShow(){
    this.openid = this.$store.state.openid
    this.$get({
      url: "/groupList/index", //连接的网址
      data: {
        wx_id: this.openid
      } //需要的参数
    }).then(res => {
      if(res.status===200){
        this.groupList = res.data
      }
      console.log(res);
    });
  },
  beforeMount () {

  }
}
</script>



