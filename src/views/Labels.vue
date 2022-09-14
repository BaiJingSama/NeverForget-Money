<template>
    <div>
        <div class="title">
            <span class="title-left">点击对应标签删除</span>
            <router-link class="title-width" to="/money">返回记账页</router-link>
            <!-- <span class="title-width" @click=createTags()></span> -->
        </div>
        <div class="tags" v-if="newTagList.length !== 0">
            <ul class="current">
                <li v-for="tag in newTagList" :key="tag.name" @click="removeTag(tag.name)">
                    <div class="iconBox">
                        <icon :name="tag.name"></icon>
                    </div>
                    <span class="tagBox">{{ tag.value }}</span>
                </li>
            </ul>
        </div>
        <div class="tags" v-else>
            <span class="nullClass">目前还没有选择标签</span>
        </div>
    </div>
    <!--<div class="tags">
            <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
                <span class="tag-name">{{ tag.name }}</span>
                <Icon name="right" />
            </router-link>
        </div>
         <div class="createTag-wrapper">
            <Button class="createTag" @click="createTag">新建标签</Button>
             @click.native="createTag"
        </div> -->
</template>

<script lang="ts">

import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import Button from '@/components/Button.vue'



@Component({
    components: { Button },
})

export default class Labels extends Vue {

    get tags() {
        return this.$store.state.tagList
    }

    // 知识点1：读的时候去window读
    // 知识点2：写的时候要用tagListModel写
    // 最小知识原则：简化，不需要咋tagListModel写
    beforeCreate() {
        this.$store.commit('fetchTags')
    }

    removeTag(tag: string) {
        this.$store.commit('removeTag', tag)
    }


    get newTagList() {
        return this.$store.state.newTagList
    }


}
</script>

<style lang="scss" scoped>
.title {
    padding: 10px 16px;
    background: #6da4ca;
    color: white;
    position: relative;

    >.title-left {
        font-size: 20px;
        margin-left: 2px;
    }

    >.title-width {
        font-weight: 700;
        position: absolute;
        top: 25%;
        right: 10px;
    }
}

.tags {
    font-size: 14px;
    padding: 16px;
    padding-top: 32px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    >.nullClass {
        text-align: center;
        margin-left: 50%;
        margin-top: 25%;
        transform: translateX(-50%);
        font-size: 18px;
    }

    >.current {
        // padding: 16px;
        // tags里面的current
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        max-height: 38vh;

        >li {
            $bg: #d9d9d9;
            padding-top: 12px 0;
            width: 25%;
            display: flex;
            flex-direction: column;
            align-content: center;
            align-items: center;
            // margin-right: 10px;



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

                &.selector {
                    color: #6da4ca;
                }
            }

        }

    }
}
</style>