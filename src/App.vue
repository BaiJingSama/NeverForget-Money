<template>
  <div>
    <router-view /><!-- 内容要显示在这里 -->
  </div>
</template>

<style lang="scss">
// App.vue的style 不需要加scoped 因为就是需要影响全局
// 一般加body样式都在App.vue里加
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
