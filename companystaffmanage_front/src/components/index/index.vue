<template>
    <div>
        <p>{{ this.userName }}登陆成功</p>
    </div>
</template>
<script>
export default {
    name: "index",
  data() {
    return {
      userName:''
    }
  },
  created(){
      this.userName = this.$route.params.userName
  }
}
</script>
<style scoped>

</style>
