<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
  <!-- <el-form-item
    prop="email"
    label="邮箱"
    :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
  >
    <el-input v-model="dynamicValidateForm.email"></el-input>
  </el-form-item>
  <el-form-item
    v-for="(domain, index) in dynamicValidateForm.domains"
    :label="'域名' + index"
    :key="domain.key"
    :prop="'domains.' + index + '.value'"
    :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
  >
    <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
  </el-form-item> -->
  <el-form-item>
    <!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button> -->
    <el-button @click="testSub">新增域名</el-button>
    <!-- <el-button @click="resetForm('dynamicValidateForm')">重置</el-button> -->
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  data() {
    return {
      fileList: [
      ],
      model:{
          name:'',
          body:'',
          list:[]
      },
      otherModel:{
          a:'',
          b:'',
          file:''
      },
      dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        },
    };
  },
  methods: {
      testSub(){
      let model = {};
      model.name = "test";
      model.hobby = "hobby";
      let str1 = "1";
      let str2 = "2";
      let arr = [];
      arr.push(str1);
      arr.push(str2);
      model.strArr = arr;
      this.axios({
        method: "post",
        url: "/api/home/addList",
        dataType: "json",
        contentType: "application/json charset=utf-8",
        data: model
      }).then(response => {});
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      },


    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style>
</style>