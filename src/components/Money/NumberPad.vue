<template>
    <div class="numberPad">
        <div class="output">{{ output }}</div>
        <div class="buttons clearfix">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="remove">删除</button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="clear">清空</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button @click="ok" class="ok">OK</button>
            <button @click="inputContent" class="zero">0</button>
            <button @click="inputContent">.</button>
        </div>
    </div>
</template>



<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';


@Component
export default class NumberPad extends Vue {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    @Prop(Number) value!: number

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    output: string = this.value.toString()

    inputContent(event: MouseEvent) {
        const button = (event.target as HTMLButtonElement)
        const input = button.textContent!;
        if (this.output.length >= 10) {
            return
        }
        if (this.output === '0') {
            if ('1234567890'.indexOf(input) >= 0) {
                this.output = input
                return
            }
        }
        if (this.output.indexOf('.') >= 0 && input === '.') {
            return
        }
        this.output += input
    }
    remove() {
        this.output = this.output.slice(0, -1)
        if (this.output.length < 1) {
            this.output = '0'
        }

    }
    clear() {
        this.output = '0'
    }

    ok() {
        if (this.output === '0' || this.output === '0.') {
            return
        }
        this.$emit('update:value', parseFloat(this.output))
        this.$emit('submit', parseFloat(this.output))
        this.output = '0'
    }
}
</script>


<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.numberPad {
    .output {
        @extend %clearFix;
        @extend %innerShadow;
        font-size: 36px;
        font-family: Consolas, monospace;
        // monospace 是编程字体 等宽的
        padding: 3px 16px;
        text-align: right;

        // box-shadow: inset 0 -5px 5px -5px fade_out(black, .5),
        // inset 0 5px 5px -5px fade_out(black, .5);
        // fade_out把黑色半透明
    }

    .buttons {
        // display: flex;
        flex-wrap: wrap;
        @extend %clearFix;


        >button {
            width: 25%;
            height: 64px;
            float: left;
            background: transparent;
            border: none;


            &.ok {
                height: 64*2px;
                float: right;
            }

            &.zero {
                width: 25*2%;
            }

            $bg: #f2f2f2;

            &:nth-child(1) {
                background: $bg;
            }

            &:nth-child(2),
            &:nth-child(5) {
                background: darken($bg, 4%);
                // darken变暗
            }

            &:nth-child(3),
            &:nth-child(6),
            &:nth-child(9) {
                background: darken($bg, 4*2%);
            }

            &:nth-child(4),
            &:nth-child(7),
            &:nth-child(10) {
                background: darken($bg, 4*3%);
            }

            &:nth-child(8),
            &:nth-child(11),
            &:nth-child(13) {
                background: darken($bg, 4*4%);
            }

            &:nth-child(14) {
                background: darken($bg, 4*5%);
            }

            &:nth-child(12) {
                background: darken($bg, 4*6%);
            }
        }
    }
}
</style>