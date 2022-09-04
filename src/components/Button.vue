<template>


  <button class="button" @click="$emit('click', $event)">
    <!-- 如果这个button被点击了就触发外面的click事件，把event参数传出去 -->
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component
export default class Button extends Vue {

}
</script >

<style  lang="scss" scoped>
.button {
  background: #66a9c9;
  color: white;
  border-radius: 4px;
  padding: 0px 16px;
  border: none;
  height: 40px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>