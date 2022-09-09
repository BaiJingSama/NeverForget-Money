<template>
    <div class="tags">
        <!-- <div class="new">
            <button @click="create">新增标签</button>
        </div> -->
        <ul v-if="type === '-'" class="current">
            <li v-for="tag in newTagList" :key="tag.name" @click="toggle(tag)">
                <div class="iconBox" :class="{ selector: selectedTags.indexOf(tag) >= 0 }">
                    <icon :name="tag.name"></icon>
                </div>
                <span class="tagBox" :class="{ selector: selectedTags.indexOf(tag) >= 0 }">{{ tag.value }}</span>
            </li>
            <li>
                <router-link class="router" to="/createTags">
                    <div class="iconBox">
                        <icon name="set"></icon>
                    </div>
                    <span class="tagBox">标签管理</span>
                </router-link>
            </li>
        </ul>
        <ul v-else class="current">
            <li v-for="tag in incomeList" :key="tag.name" @click="toggle(tag)">
                <div class="iconBox" :class="{ selector: selectedTags.indexOf(tag) >= 0 }">
                    <icon :name="tag.name"></icon>
                </div>
                <span class="tagBox" :class="{ selector: selectedTags.indexOf(tag) >= 0 }">{{ tag.value }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import incomeList from '@/constants/incomeList'

@Component({
})


export default class Tags extends Vue {
    

    incomeList = incomeList[0].tags

    get newTagList() {
        return this.$store.state.tagList
    }



    @Prop(String) type?: string = '-'
    selectedTags: string[] = []

    created() {
        this.$store.commit('fetchTags')
    }

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

    /*     create() {
            const name = window.prompt('请输入标签名')
            if (!name) {
                return window.alert('标签名不能为空')
            }
            else if (this.$store.state.tagList) {
                this.$store.commit('createTag', name)
            }
        } */

}

</script>

<style lang="scss" scoped>
.tags {
    background: white;
    font-size: 14px;
    padding: 16px;
    padding-top: 32px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;




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

            >.router {
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
                    color: #6da4ca;
                }

                >.tagBox {
                    padding: 8px 0;
                    text-align: center;
                    font-size: 16px;
                    color: #6da4ca;
                }
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