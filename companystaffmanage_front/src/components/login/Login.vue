<template>

    <div class="login_div">
      <!-- <p>物流公司员工管理系统</p> -->
    <form class="login_form">
      用户名: <el-input name="userName" placeholder="请输入用户名" v-model="username" clearable> </el-input><br/><br/>
      密 码: <el-input style="margin-left:10px" name="password" placeholder="请输入密码" show-password v-model="password"> </el-input>
      <br><br><br>
      <el-button type="success" @click="send">登录</el-button>
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
  },
  methods: {

    send() {
       let that = this
       that.password = this.$md5(this.$md5(this.password))
       let params = {
          userName:this.username,
          password:that.password
        }
      
      this.axios({
        method: "post",
        url: "/api/login",
        dataType:'json',
        contentType:"application/json charset=utf-8",
        data:params
      }).then((response) => {
       if(response.data){
         localStorage.setItem("islogin", 1); // 指定登录状态
         this.$router.push({
           name:'index',
           params:{
             userName:this.username
           }
         })
       }else{
         alert("登录失败")
       }
      }).catch(function (response) {
          console.error(response);
      }); 
    }
    
  }
};
</script>

<style scoped>

.login_div{
text-align: center;
width: 600px;
height: 100%;
background-color: aquamarine
}
.login_form{
  margin: 10px 20px;
  padding:50% 0px;
  text-align: center;
}
.el-input{
  width: 200px
}
</style>



