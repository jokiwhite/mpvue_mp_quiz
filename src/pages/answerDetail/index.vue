  
<template>
<div>
    <van-tabs type="card" animated swipeable color="#1989fa">
    <van-tab v-for="(item,index) in questionList" :key="index" :title="'问题' + (index+1)">
      <van-form @submit="onSubmit" >
        <van-field 
         
          v-model='titleList[index]'
          autosize
          readonly 
          label="题目描述"
          type="textarea"
          />
         <van-tag type="primary" size="large">选择题</van-tag>
        
          <van-radio-group  v-model="radio[index]" @click="handleChange()">
  <van-cell-group >
    <van-cell :title="titleA[index]"  size="large" clickable @click="changeRadio0(index)">
      <van-toast id="van-toast" />
        
        <van-radio name="A"  slot="right-icon"  />
     
         
    </van-cell>
    <van-cell :title="titleB[index]" size="large" clickable @click="changeRadio1(index)">
     <!-- <van-icon name="chat-o" /> -->

        <van-radio name="B" slot="right-icon" />
        
    </van-cell>
    <van-cell :title="titleC[index]" size="large" clickable @click="changeRadio2(index)">
       <!-- <van-icon name="chat-o" /> -->
       
     
        <van-radio name="C" slot="right-icon" />
        
    </van-cell>
    <van-cell :title="titleD[index]" size="large" clickable @click="changeRadio3(index)">
        <!-- <van-icon name="chat-o" /> -->
       
       
        <van-radio name="D" slot="right-icon" />
     
    </van-cell>
  </van-cell-group>
</van-radio-group>
<van-goods-action>
  <van-goods-action-icon icon="chat-o"  />
   <van-goods-action-icon  text="联系我们" />
  <van-goods-action-icon   />
  <van-goods-action-button
    type="danger"
    text="质疑该题目"
    @click="onClickButton"
  />
</van-goods-action>

     <van-button round block type="info" :disabled="index<questionList.length-1?true:false" @click="submitMine()"> {{options[index]['label']}}</van-button>
      </van-form>

      <van-button type="primary" @click="test()">测试</van-button>
    </van-tab>
  </van-tabs>

  </div>
</template>

<script>
import {mapState} from "vuex";
import Toast from "../../../dist/wx/vant-weapp/dist/toast/toast";
export default {
  data () {
    return {
      questionList:[],
      openid:"",
      groupId: null,
      titleList:[],
       radio: [],
       titleA:[],
       titleB:[],
       titleC:[],
       titleD:[],
      question_id:[],
      answer:[],
       options: [],
       question_num:0
    }
  },
  computed: {
    ...mapState(['openid']),


  },
//   onUnload () { 
//     this.questionList=[],
//      this.openid="",
//       this.groupId= null,
//       this.titleList=[],
//        this.radio= [],
//        this.titleA=[],
//        this.titleB=[],
//        this.titleC=[],
//        this.titleD=[],
//        this.question_id=[],
//       this.answer=[],
//        this.options= [],
//        this.question_num=0
// },
  methods: {
     submitMine() {
      var ChooseAnswer = JSON.parse(JSON.stringify(this.question_id))
      console.log(ChooseAnswer)
       this.$post({
         url: "/questionList/questionIdList", //连接的网址
          data: {
            ChooseAnswer: ChooseAnswer,
            group_id: this.groupId,
            openId: this.openid
          }
      }).then(response =>{
          if(response.code===200){
            // Toast.success('提交成功');
          }
      })
    },
    test(){
     
    },
    changeRadio0(index){
      
      // Toast.success({message:'选中答案A',duration:500,position: 'bottom'});
      this.radio[index]="A";
      this.question_id.splice(index,1,this.radio[index])
 
      //  this.question_id.push(this.radio[index])
    },
    changeRadio1(index){
     
    //  Toast.success({message:'选中答案B',duration:500,position: 'bottom'});
      this.radio[index]="B";
       this.question_id.splice(index,1,this.radio[index])
 
      //  this.question_id.splice(index,0,this.radio[index])
      
    },
    changeRadio2(index){
     
    //  Toast.success({message:'选中答案C',duration:500,position: 'bottom'});
      this.radio[index]="C";
       this.question_id.splice(index,1,this.radio[index])
     
      //  this.question_id.splice(index,0,this.radio[index])
      
    },
    changeRadio3(index){
     
    //  Toast.success({message:'选中答案D',duration:500,position: 'bottom'});
      this.radio[index]="D";
       this.question_id.splice(index,1,this.radio[index])
      
      //  this.question_id.splice(index,0,this.radio[index])
    },
    handleChange(){
	    this.$forceUpdate();
    }
        
  },
  beforeMount () {
    this.openid = this.$store.state.openid
    this.groupId = this.$mp.query.groupId
    this.$get({
      url: "/questionList/detail", //连接的网址
      data: {
        group_id: this.groupId
      } //需要的参数
    }).then(res => {
      if(res.code === 201){
      wx.navigateTo({
          url: '/pages/empty/main'
        })
      }
      if (res.code === 200) {
        
        this.questionList = res.data.list
       for(var i=0;i<this.questionList.length; i++){
         this.titleList.push(this.questionList[i].question_title)
         this.titleA.push(this.questionList[i].titleA)
         this.titleB.push(this.questionList[i].titleB)
         this.titleC.push(this.questionList[i].titleC)
         this.titleD.push(this.questionList[i].titleD)
         if(i<this.questionList.length-1){
           this.options.push({"value":(this.questionList[i].question_id)-1,"label":"左右滑动切换题目"})
         }
         if(i==this.questionList.length-1){
           this.options.push({"value":(this.questionList[i].question_id)-1,"label":"提交"})
           this.question_num = this.questionList.length
         }
        //  this.options.push({"value":(this.questionList[i].question_id)-1,"label":"123"})
       }
       console.log(this.question_num)
  
      }
      
    })
  }
}
</script>
