<template>
    <!-- css重复所以用一个组件全局声明用Vue的插槽 把重要的内容插入进来 -->
    <div class="nav-wrapper">
        <div class="content" :class="classPrefix && `${classPrefix}-content`">
            <!-- 这个slot标签会被其他组件的Layout标签内的内容替换 -->
            <slot />
        </div>
        <Nav />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Layout',
    props: ['classPrefix']

})
</script>

<style lang="scss" scoped>
.nav-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh
    
}

.content {
    flex-grow: 1;
    overflow: auto;
    // 上面部分如果内容太多导致超出页面 让这个content自己加滚动条不影响导航栏
}
</style>