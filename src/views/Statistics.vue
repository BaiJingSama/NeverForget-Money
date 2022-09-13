<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="typeList" :value.sync="type" />
        <ol v-if="groupedList.length > 0">
            <li v-for="(group, index) in groupedList" :key="index">
                <h3 class="title"> {{ beautify(group.title) }}
                    <span class="title-text"> ￥{{ group.total }}</span>
                </h3>
                <ol>
                    <li class="record" v-for="item in group.items" :key="item.createdAt">
                        <span>{{ tagString(item.newTag) }}</span>
                        <span class="notes" :style="{ marginRight: 'auto' }">{{ item.notes }}</span>
                        <span> ￥{{ item.amount }}</span>
                    </li>
                </ol>
            </li>
        </ol>
        <div v-else class="noResult">
            目前没有相关记录
        </div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Tabs from '../components/Tabs.vue'
import typeList from '@/constants/typeList'
import dayjs from 'dayjs'
import clone from '@/lib/clone'


type Tag = {
    id: string;
    name: string;
};

type newTag = {
    name: string;
    value: string;
};

type RootState = {
    recordList: RecordItem[];
    tagList: Tag[];
    currentTag?: Tag;
    newTagList: newTag[];
};

@Component({
    components: {
        Tabs
    }
})
export default class Statistics extends Vue {
    type = '-'
    typeList = typeList

    beforeCreate() {
        this.$store.commit('fetchRecords')
    }

    get recordList() {
        return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
        const { recordList } = this;
        if (recordList.length === 0) { return [] }
        const newList = clone(recordList)
            .filter(r => r.type === this.type)
            .sort((a, b) => dayjs(b.createdAt)
                .valueOf() - dayjs(a.createdAt).valueOf())


        if (newList.length === 0) { return [] as Result }
        type Result = { title: string, total?: number, items: RecordItem[] }[]
        const result: Result = [{ title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]] }]


        for (let i = 1; i < newList.length; i++) {
            const current = newList[i]
            const last = result[result.length - 1];
            if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
                last.items.push(current)
            } else {
                result.push({ title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current] })
            }
        }
        result.map(group => {
            group.total = group.items.reduce((sum, item) => sum + item.amount, 0)
        })
        return result
    }

    // eslint-disable-next-line no-undef
    tagString(tags: newTag[]) {
        if (tags) {
            return tags.length === 0 ? '无' : tags.map(t => t.value).join('，')
        }
    }

    beautify(string: string) {
        const day = dayjs(string)
        const now = dayjs()
        if (day.isSame(now, 'day')) {
            return '今天'
        } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
            return '昨天'
        } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
            return '前天'
        } else if (day.isSame(now, 'year')) {
            return day.format('M月D日')
        } else {
            return day.format('YYYY年MM月DD日')
        }

        /* const d = new Date(Date.parse(string))
        console.log(d);
        const y = d.getFullYear()
        const m = d.getMonth()
        const dd = d.getDate()
        const now = new Date()
        if (now.getFullYear() === y && now.getMonth() === m && now.getDate() === dd) {
            return '今天'
        } return string */
    }

}
</script>

<style lang="scss" scoped>
.noResult {
    padding: 16px;
    padding-top: 32px;
    text-align: center;
    font-size: 18px;
}

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
    font-size: 22px;
    color: skyblue;

    >.title-text {
        font-size: 18px;
        color: skyblue;
    }
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