<template> 
    <div>
      <van-button type="primary" @click="test()">测试</van-button>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  methods: {
    test(){
     this.$get({
                    url: "/users/index", //连接的网址
                    data: {
                       wx_id:"x"
                    } //需要的参数
                })
                .then(res => {
                    console.log(res);
                });

    }
  },

  created () {
  }
}
</script>

