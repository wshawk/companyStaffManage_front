<template>

    <!-- <div class="login_div">
      
    <div style="width:300px">
    <el-form size="small" class="login_form" label-position="right" label-width="80px" :rules="rules" ref="ruleForm"> 
      <el-form-item label="用户名：" prop="userName">
      <el-input name="userName" placeholder="请输入用户名" v-model="username" clearable> </el-input>
      </el-form-item>
      <el-form-item label="密码：">
      <el-input  name="password" placeholder="请输入密码" show-password v-model="password"> </el-input>
      </el-form-item>
      
      <el-button type="success" @click="send">登录</el-button>
    </el-form>
    </div>
  </div> -->
<div style="background-color: aquamarine;width:700px;height:600px;margin-top:200px">
  <div style="width:500px;padding-top:200px;text-align:center">
<el-form style="width:300px" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="用户名">
    <el-input v-model="userName" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="success" @click="send">
      <label>登录</label>
    </el-button>
  </el-form-item>
</el-form>
  </div>
</div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username:'',
      password:'',
      ruleForm:{
        userName:''
      },
      rules:{
        userName:[
           { required: true, message: '请输入活动名称', trigger: 'blur' },
           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
       labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
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
width: 600px;
height: 450px;
margin-top:100px;
vertical-align:middle;
background-color: aquamarine
}
.login_form{
  margin: 10px 20px;
  padding:50% 0px;
  text-align: center;
} 
</style>



