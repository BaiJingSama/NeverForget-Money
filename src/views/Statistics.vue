<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="typeList" :value.sync="type" />
        <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
        <ol>
            <li v-for="(group, index) in result" :key="index">
                <h3 class="title">{{ group.title }}</h3>
                <ol>
                    <li class="record" v-for="item in group.items" :key="item.id">
                        <span>{{ tagString(item.tags) }}</span>
                        <span class="notes" :style="{ marginRight: 'auto' }">{{ item.notes }}</span>
                        <span>￥{{ item.amount }}</span>

                    </li>

                </ol>
            </li>
        </ol>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Tabs from '../components/Tabs.vue'
import intervalList from '@/constants/intervalList'
import typeList from '@/constants/typeList'

type Tag = {
    id: string;
    name: string;
};

type RootState = {
    recordList: RecordItem[];
    tagList: Tag[];
    currentTag?: Tag;
};

@Component({
    components: {
        Tabs
    }
})
export default class Statistics extends Vue {
    type = '-'
    interval = 'day'
    typeList = typeList
    intervalList = intervalList

    beforeCreate() {
        this.$store.commit('fetchRecords')
    }

    get recordList() {
        return (this.$store.state as RootState).recordList;
    }

    get result() {
        const { recordList } = this;
        type HashTableValue = { title: string, items: RecordList[] }

        const hashTable: { [key: string]: HashTableValue } = {};
        for (let i = 0; i < recordList.length; i++) {
            const [date, time] = recordList[i].createdAt!.split('T')
            hashTable[date] = hashTable[date] || { title: date, items: [] };
            hashTable[date].items.push(recordList[i]);
        }
        return hashTable
    }

    tagString(tags: Tag[]) {
        return tags.length === 0 ? '无' : tags.jojn(',')
    }

}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
    background: white;

    &.selected {
        background: #6da4ca;
        ;
        color: white;

        &::after {
            display: none;
        }
    }
}

::v-deep li.interval-tabs-item {
    font-size: 18px;
    height: 48px;
    background: #8abdd2;
    color: white;

    &::after {
        color: white;
        background: white;
    }
}

%item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
}

.title {
    @extend %item;
}

.record {
    background: white;
    @extend %item
}

.notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999
}
</style>