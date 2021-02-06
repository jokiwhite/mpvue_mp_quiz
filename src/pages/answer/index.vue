<template> 
    <div>
     <!-- <van-button type="primary" @click="jump">路由跳转</van-button> -->
     <van-cell-group>
      <van-field value="答题进度" input-align=center readonly />
    </van-cell-group>
     <van-progress :percentage="50" />


    <van-form @submit="onSubmit">
        <van-field
  label="题目说明"
  
  autosize
  type="textarea"
  readonly 
  value="请简要说明域名解析系统的工作过程（简述DNS提供的一些重要服务，以及整个DNS系统有哪几类域名服务器组成？）简述DNS应用系统的主要作用,系统组成，以及工作原理"
/>
    </van-form>


    </div>
    
</template>

<script>
export default {
  data () {
    return {
    }
  },

  methods: {
  jump(){
      this.$router.push('/pages/logs/main')

    }
  },

  created () {
  }
}
</script>



