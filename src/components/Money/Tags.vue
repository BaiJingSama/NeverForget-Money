<template>
    <div class="tags">
        <div class="new">
            <button @click="create">新增标签</button>
        </div>
        <ul class="current">
            <li v-for="tag in dataSource" :key="tag.id" :class="{ selector: selectedTags.indexOf(tag) >= 0 }"
                @click="toggle(tag)">{{ tag.name }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component

export default class Tags extends Vue {
    @Prop(Array) dataSource: string[] | undefined;
    selectedTags: string[] = []
    toggle(tag: string) {
        const index = this.selectedTags.indexOf(tag)
        if (index >= 0) {
            //如果选中的tag在selectedTags数组内，就删除这个tag，这样它就没有类名了
            this.selectedTags.splice(index, 1)
        } else {
            this.selectedTags.push(tag)
        }
        this.$emit('update:value', this.selectedTags)
    }

    create() {
        const name = window.prompt('请输入标签名')
        if (name === '') {
            window.alert('标签名不能为空')
        }
        else if (this.dataSource) {
            //this.dataSource.push(name!)  不能改外部数据
            this.$emit('update:dataSource', [...this.dataSource, name])
        }
    }

}

</script>

<style lang="scss" scoped>
.tags {
    background: white;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
    flex-grow: 1;


    >.current {
        // tags里面的current
        display: flex;
        flex-wrap: wrap;

        >li {
            $bg: #d9d9d9;
            background: $bg;
            $h: 24px;
            height: $h;
            border-radius: $h/2;
            padding: 0 18px;
            margin-right: 12px;
            margin-top: 10px;
            // line-height: $h;
            // 确定只有一行字的时候才能用line-height来居中
            display: flex;
            align-items: center;

            &.selector {
                background: darken($bg, 50%);
                color: #fff;
            }
        }
    }

    >.new {
        padding-top: 16px;

        button {
            background: transparent;
            border: none;
            border-bottom: 1px solid;
            color: #999;
            padding: 0 4px;
        }
    }


    // &.selected {}
    // tags被选中了
}
</style>