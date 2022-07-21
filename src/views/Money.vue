<template>
    <div class="nav-wrapper">
        <div class="content">
            Money.vue
        </div>
        <Nav />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

})
</script>

<style lang="scss" scoped>
.nav-wrapper {
    border: 1px solid green;
    display: flex;
    flex-direction: column;
    height: 100vh
}

.content {
    flex-grow: 1;
    overflow: auto;
    // 上面部分如果内容太多导致超出页面 让这个content自己加滚动条不影响导航栏
}
</style>