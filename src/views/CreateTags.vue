<template>
  <layout>
    <div class="CreateTags">
      <div class="title">
        <router-link to="/money">
          <icon name="left" class="title-icon"></icon>
        </router-link>
        <span class="title-left">添加支出类别</span>
        <span class="title-width" @click=createTags()>完成</span>
      </div>
      <div class="selected">
        <span class="selected-left">选中标签：</span>
        <span class="selected-right">{{ now }}</span>
      </div>
      <div class="tagListBox">
        <div class="tagList" v-for="obj in tagList" :key="obj.title">
          <div class="tagList-title">{{ obj.title }}</div>
          <ul class="tagList-ul">
            <li v-for="tag in obj.tags" :key="tag.name" class="tagList-li" @click="selectorTag(tag)">
              <div class="iconBox" :class="{ selector: selectorClass === tag.name }">
                <icon :name="tag.name"></icon>
              </div>
              <span class="tagBox">{{ tag.value }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from 'vue-property-decorator';
import tagList from '@/constants/tagsList'


@Component
export default class CreateTags extends Vue {
  tagList = tagList

  selectorClass: string | undefined = ''

  selector = {}

  now: string | undefined = '未选中标签'

  selectorTag(tag: { name?: string; value?: string; }) {
    this.selectorClass = tag.name
    this.selector = tag
    this.now = tag.value
  }


  createTags() {
    if (this.now === '未选中标签') {
      window.alert('请选择标签后再点击完成')
      return
    } else {
      this.$store.commit('addTag', this.selector)
      
    }
  }
}
</script>

<style lang="scss" scoped>
.CreateTags {
  display: flex;
  flex-direction: column;

  .title {
    padding: 10px 16px;
    background: #6da4ca;
    color: white;
    position: relative;

    >.title-icon {
      font-size: 18px;
    }

    >.title-left {
      font-size: 20px;
      margin-left: 8px;
    }

    >.title-width {
      font-weight: 700;
      position: absolute;
      top: 25%;
      right: 10px;
    }
  }

  .selected {
    display: flex;
    justify-content: space-between;
    padding: 6px 12px;

    >.selected-right {
      color: #6da4ca;
    }
  }

  .tagListBox {
    overflow: auto;
    height: 85vh;

    .tagList {


      >.tagList-title {
        text-align: center;
        color: #999;
        padding: 8px 0;
      }

      >.tagList-ul {
        padding: 16px;
        // tags里面的current
        display: flex;
        flex-wrap: wrap;

        >li {
          $bg: #d9d9d9;
          padding-top: 12px 0;
          width: 25%;
          display: flex;
          flex-direction: column;
          align-content: center;
          align-items: center;

          >.iconBox {
            // background: #999;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            // line-height: 40px; // padding: 8px 0;
            font-size: 40px;
            text-align: center;

            &.selector {
              background: #6da4ca;
              color: #fff;
            }
          }

          >.tagBox {
            padding: 8px 0;
            text-align: center;
            font-size: 16px;
          }
        }
      }
    }
  }

}
</style>