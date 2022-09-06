<template>
    <Layout>
        <div class="tags">
            <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
                <span class="tag-name">{{ tag.name }}</span>
                <Icon name="right" />
            </router-link>
        </div>
        <div class="createTag-wrapper">
            <Button class="createTag" @click="createTag">新建标签</Button>
            <!-- @click.native="createTag" -->
        </div>
    </Layout>
</template>

<script lang="ts">

import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import Button from '@/components/Button.vue'



@Component({
    components: { Button },
    computed: {
        tags() {
            return this.$store.state.tagList
        }
    }
})

export default class Labels extends Vue {


    // 知识点1：读的时候去window读
    // 知识点2：写的时候要用tagListModel写
    // 最小知识原则：简化，不需要咋tagListModel写
    beforeCreate() {
        this.$store.commit('fetchTags')
    }

    createTag() {
        const name = window.prompt('请输入标签名，不要超过8个字符')
        if (!name) {
            return window.alert('标签名不能为空')
        }
        else if (this.$store.state.tagList) {
          this.$store.commit('createTag', name)

        }
    }
}
</script>

<style lang="scss" scoped>
.tags {
    background: #fff;
    font-size: 16px;
    padding: 0 16px;

    >.tag {
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;
        font-weight: 500;
        color: skyblue;
        font-weight: 700;
        font-size: 16px;
    }

    svg {
        width: 20px;
        height: 20px;
        color: skyblue;
    }
}

.createTag {
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