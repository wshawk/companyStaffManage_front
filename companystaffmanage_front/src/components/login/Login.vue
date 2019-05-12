<template>
  <div class="login_div">
    <form>
      用户名:
      <input name="userName" type="text" v-model="username">
      <br>
      密 码:
      <input name="password" type="password" v-model="password">
      <br>
      <input type="button" value="登录" @click="send">
    </form>
  </div>

</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username:'',
      password:''
    }
  },
  created(){
    this.test()
  },
  methods: {
    send() {
      this.axios({
        method: "get",
        url: "/api/login",
        params: {
          userName:this.username,
          password:this.password
        }
      }).then(function(res) {
        debugger
        if(res.data){
          alert("登录成功")
        }
        alert("登录失败")
      });
    }
    
  }
};
</script>

<style scoped>
*{
margin: 0;
padding:0%
}
.login_div{
text-align: center;
width: 100%;
height: 100%;
background-color: aquamarine
}
</style>



