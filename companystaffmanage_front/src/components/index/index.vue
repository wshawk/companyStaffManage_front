<template>
  <div>
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>
<script>
import MyHeader from "@/components/header/header";
export default {
  name: "index",
  components: {
    MyHeader
  },
  data() {
    return {
      userName: ""
    };
  },
  created() {
    this.userName = this.$route.params.userName;
  }
};
</script>
<style scoped>
</style>
