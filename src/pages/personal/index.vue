<template>
  <div class="page">
    <van-card
      :centered="true"
      desc="欢迎使用计网答题小程序"
      :title=userInfo.nickName
      :thumb=userInfo.avatarUrl
    >
      <view slot="bottom" style="text-align: right">
      <van-button  v-if="!isShow" open-type="getUserInfo" @getuserinfo="getUserInfo"  plain type="info">授权微信登陆信息</van-button>
      </view>
    </van-card>

    <div class="cell">
    <van-cell-group >
      <van-field
        :value=name
        required
        clearable
        label="姓名"
        placeholder="请输入姓名"
        :border=true
        @change="nChange"
      />

      <van-field
        :value=studentId
        label="学号"
        placeholder="请输入学号"
        required
        :border=true
        @change="sChange"
      />

      <van-field
        :value=className
        label="班级"
        placeholder="请输入班级"
        required
        :border=true
        @change="cChange"
      />
    </van-cell-group>
    <div style="text-align: right">
      <van-button v-if="!isRegister" type="info" size="large" @click="register">首次使用请点击此处注册个人信息</van-button>
      <van-button v-if="isRegister" type="info" size="large" @click="update">修改个人信息</van-button>
    </div>
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
      userInfo: {},
      isShow : false,
      isRegister: false,
      openid: '',
      name: '',
      studentId: '',
      className: ''
    }
  },
  beforeMount(){
    this.openid = this.$store.state.openid
    if(this.openid!==""){
      this.$get({
        url: "/users/index", //连接的网址
        data: {
          wx_id: this.openid
        } //需要的参数
      }).then(res => {
          console.log(res);
      });
    }
  },
  computed: {
    ...mapState(['openid'])
  },
  methods: {
    getUserInfo(data) {
      //判断是否授权
      var _this = this
      wx.login({
        success (res) {
          function callbackLogin(openid) {
            _this.$store.state.openid = openid
            _this.openid=openid
            _this.isExist()
          }
          if (res.code) {
            //发起网络请求
            //console.log(res.code)
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session',
              data: {
                js_code: res.code,
                appid: "wx07832e824732556a",
                secret: "ab1543c761e53663156cc8ae9ab837aa",
                grant_type: "authorization_code"
              },
              success (res) {
                //console.log(res.data)
                callbackLogin(res.data.openid)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
      if(data.mp.detail.rawData){
        console.log(data)
        this.isShow = !this.isShow
        this.userInfo = data.mp.detail.userInfo
      }
    },
    isExist(){
      if(this.openid!==""){
        this.$get({
          url: "/users/index", //连接的网址
          data: {
            wx_id: this.openid
          } //需要的参数
        }).then(res => {
          if(res.status===200){
            this.name = res.data.name
            this.studentId = res.data.student_id
            this.className = res.data.class_name
            this.isRegister = !this.isRegister
          }
          //console.log(res);
        });
      }
    },
    register(){
      if(this.openid===""||this.name===""||this.studentId===""||this.className===""){
        Toast({message :'请使用微信登陆并完善个人信息',
                            mask: true,forbidClick:true});
        return
      }else{
        this.$post({
          url: "/users", //连接的网址
          data: {
            openId: this.openid,
            name: this.name,
            studentId: this.studentId,
            className: this.className
          } //需要的参数
        }).then(res => {
          if(res.status===200){
            Toast.success('注册成功');
            this.isRegister = !this.isRegister
          }else{
            Toast.fail('注册失败');
          }
          //console.log(res);
        });
      }
    },
    update(){
      if(this.name===""||this.studentId===""||this.className===""){
        Toast({message :'请完善个人信息',
          mask: true,forbidClick:true});
        return
      }else{
        this.$post({
          url: "/users", //连接的网址
          data: {
            openId: this.openid,
            name: this.name,
            studentId: this.studentId,
            className: this.className
          } //需要的参数
        }).then(res => {
          if(res.status===200){
            Toast.success('更新成功');
          }else{
            Toast.fail("更新失败")
          }
          //console.log(res);
        });
      }
    },
    nChange(e){
      this.name = e.mp.detail
    },
    sChange(e){
      this.studentId = e.mp.detail
    },
    cChange(e){
      this.className = e.mp.detail
    }
  },

  created () {
  }
}
</script>

<style>
  .page{
    margin-top: 50rpx;
  }

  .cell{
    margin-top: 100rpx;
  }
</style>
