<template> 
    <div>
     <van-button type="primary" @click="jump">路由跳转</van-button>
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

