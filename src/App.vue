<template>
  <div id="app">
    <router-view /><!-- 内容要显示在这里 -->
  </div>
</template>

<style lang="scss">
@import "@/assets/style/reset.scss";
@import "@/assets/style/helper.scss";
// App.vue的style 不需要加scoped 因为就是需要影响全局
// 一般加body样式都在App.vue里加


body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  line-height: 1.5;
  font-family: $font-hei;
  font-size: 16px;
  background: #f5f5f5;
}

.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

// 清除父元素浮动

//如果页面是不同团队合作 那最好只把样式写在#app里
//如果页面是自己一个人做 那无所谓写body或app里


#app {}
</style>
