<template>
  <div>
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="80px"
      class="login-form"
    >
      <p style="margin-bottom:1vw">
        <strong>员工管理系统</strong>
      </p>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 16, message: "长度在 5 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      },
    };
  },
  methods: {
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.loginForm.password = this.$md5(this.loginForm.password);
          let params = {
            userName: that.loginForm.username,
            password: that.loginForm.password
          };
          this.axios({
            method: "post",
            url: "/api/login",
            dataType: "json",
            contentType: "application/json charset=utf-8",
            data: params
          })
            .then(response => {
              if (response.data) {
                localStorage.setItem("islogin", 1); // 指定登录状态
                this.$router.push({
                  name: "index",
                  params: {
                    userName: this.username
                  }
                });
              } else {
                localStorage.removeItem("islogin")// 指定登录状态
                alert("登录失败");
              }
            })
            .catch(function(response) {
              console.error(response);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created(){
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.submitForm('loginForm');// 登录方法名
        return false;
      }
    };
  }
};
</script>
<style scoped>
.login-form {
  width: 20%;
  margin-top: 10%;
}
</style>