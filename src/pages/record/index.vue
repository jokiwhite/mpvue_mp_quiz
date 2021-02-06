<template>
  <div>
    <div v-for="item in groupRecordList">
      <van-panel :title="item.group_name" :desc="item.describe" :status="item.status">
        <div style="text-align: right">
          <van-button size="small" type="info" @click="toDetail(item.id)">查看详情</van-button>
        </div>
      </van-panel>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Toast from "../../../dist/wx/vant-weapp/dist/toast/toast";

export default {
  data () {
    return {
      openid:"",
      groupRecordList: []
    }
  },
  computed: {
    ...mapState(['openid'])
  },
  methods: {
    toDetail(id){
      wx.navigateTo({
        url: '/pages/recordDetail/main?groupId=' + id
      })
      }
  },

  onShow () {
    this.openid = this.$store.state.openid
    if(this.openid===""){
      wx.switchTab({
              url: '/pages/personal/main'
            })
    }else{
      this.$get({
        url: "/recordList/index", //连接的网址
        data: {
          wx_id: this.openid
        } //需要的参数
      }).then(res => {
        if(res.status===200){
          this.groupRecordList = res.data
        }
        console.log(res);
      });
    }
  }
}
</script>

