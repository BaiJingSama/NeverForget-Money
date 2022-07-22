<template>
    <div class="nav">
        <router-link to="/money">
            <Icon name="money" />
            记账
        </router-link> |
        <router-link to="/labels">
            <Icon name="label" />
            标签
        </router-link> |
        <router-link to="/statistics">
            <Icon name="statistics" />
            统计
        </router-link> |
    </div>
</template>

<script lang=" ts">
import Vue from 'vue'



export default Vue.extend({

})
</script>

                <style lang="scss" scoped>
                // scoped 只在当前组件范围的样式
                // vue会在div上加一个data-v-xxx的属性
                // .nav[data-v-xxx{样式}]
                
                .nav {
                    border: 1px solid red
                }
                </style>
