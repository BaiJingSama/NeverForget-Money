<template>
    <svg class="icon" @click="$emit('click', $event)">
        <use v-bind:xlink:href="'#' + name" />
        <!-- v-bind绑定把这个属性给外面可以编辑 -->
    </svg>
</template>

<script lang="ts">
import Vue from 'vue'

// eslint-disable-next-line no-undef
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)
//声明一个importAll函数 后面时ts指定类型
try { importAll(require.context('../assets/icons', true, /\.svg$/)) }
//try catch是因为怕单元测试出现问题
catch (error) { console.log(error); }
// 这两行代码可以把整个icons的svg文件都引入进来，记住这个API

export default Vue.extend({
    props: ['name']

})
</script>

<style lang="scss" scoped>
.icon {
    width: 1em;
    height: 1em;
    // vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>