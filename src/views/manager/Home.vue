<template>
  <div>
    <img src="http://192.168.31.169:9090/finalDesignPic/pic1.jpg" style="height: auto;width: 100%">
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Home",
  components: {

  },
  data() {
    return {
      users: []
    }
  },
  mounted() {
    // 页面加载完成之后触发
    // axios.get('http://localhost:9090/user/selectAll').then(res => {
    //   console.log(res.data)   // 后台返回的数据
    //   // res.data = {   // 数据格式
    //   //   code: '200',
    //   //   msg: '请求成功',
    //   //   data: {
    //   //
    //   //   }
    //   // }
    //   })
    request.get('/user/selectAll').then(res=>{
      this.users = res.data
    })
  },

}
</script>

<style scoped>

</style>