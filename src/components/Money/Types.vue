<!-- eslint-disable @typescript-eslint/explicit-module-boundary-types -->

<template>
    <div>
        <ul class="types">
            <li :class="{ [classPrefix + '-item']: classPrefix, selected: value === '-' }" @click="selectType('-')">支出
            </li>
            <li :class="{ [classPrefix + '-item']: classPrefix, selected: value === '+' }" @click="selectType('+')">收入
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
// 必须从这里引入


// ts的好处
// 1.文档自动提示更智能
// 2.不能随便写 .toString之类的调用
// 3.编译报错，无法编程js 非常严谨
@Component
export default class Types extends Vue {
    type = '-'; // '-'代表支出，'+'代表收入

    @Prop(String) value!: string
    // @Prop的作用是告诉Vue 后面的xxx不是data
    // @Prop的类型是告诉vue 这个属性是Number类型
    // xxx的类型是告诉ts 这个属性是Number或undefined类型

    @Prop(String) classPrefix?: string
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    selectType(value: string) { // type只能是'-' 或 '+'的其中一个
        /* if (type !== '-' && type !== '+') {
            throw new Error('type is unkonwn')
        } */
        this.$emit('update:value', value)
    }
    /* @Watch('type')
    onTypeChanged(value: string) {
        this.$emit('update:value', value)
    } */
}
/* js代码 export default {
    data() {
        return {
            type: '-' // '-'代表支出，'+'代表收入
        }
    },
    props: ['xxx'],
    mounted() {
        console.log(this.xxx);
    },
    methods: {
        selectType(type) { // type只能是'-' 或 '+'的其中一个
            // if (type !== '-' && type !== '+') {
            //     throw new Error('type is unkonwn')
            // }
            this.type = type
        }
    }
} */
</script>

<style lang="scss" scoped>
.types {
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;

    >li {
        width: 50%;
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        &.selected::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: #333;
        }
    }
}
</style>