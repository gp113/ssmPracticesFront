<template>
  <div id="app">
    <el-container>
      <!-- <el-header style="text-align:center;">登录</el-header> -->
      <!-- <router-link to="/SignUp">SignUp</router-link> -->
      <!-- <img src="./assets/logo.png"> -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
