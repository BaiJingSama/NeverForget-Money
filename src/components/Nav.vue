<template>
    <nav>
        <router-link to="/money" class="item" active-class="selected">
            <Icon name="money" />
            记账
        </router-link>
        <router-link to="/labels" class="item" active-class="selected">
            <Icon name="label" />
            标签
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <Icon name="statistics" />
            统计
        </router-link>
    </nav>
</template>

<script lang="ts">

import Vue from 'vue'



export default Vue.extend({
    name: 'Nav'
})
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";
// scoped 只在当前组件范围的样式
// vue会在div上加一个data-v-xxx的属性
// .nav[data-v-xxx{样式}]

nav {
    display: flex;
    @extend %outerShadow;
    // box-shadow: 0 0 3px rgba(0, 0, 0, .3);  阴影效果
    flex-direction: row;

    >.item {
        padding: 2px 0;
        width: 33.33333%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .icon {
        width: 32px;
        height: 32px;
    }

    >.item.selected {
        color: $color-heighlight;
        font-size: 1.2em;
    }
}
</style>
