<template>
    <div>
        <layout class-prefix="layout">
            <NumberPad :value.sync="record.amount" @submit="saveRecord" />
            <div class="createdAt">
                <Notes :value.sync="record.createdAt" field-name="日期" placeholder="在这里输入日期" type='date' />
            </div>
            <div class="notes-bar">
                <Notes :value.sync="record.notes" field-name="备注" placeholder="请输入内容" />
            </div>
            <Tags :value.sync="record.newTag" :type="record.type" :selectedTags="record.newTag" />
            <Tabs :data-source="typeList" :value.sync=record.type class-prefix="forget" />
        </layout>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Tags from '@/components/Money/Tags.vue'
import NumberPad from '@/components/Money/NumberPad.vue'
import Notes from '@/components/Money/Notes.vue'
import { Component } from 'vue-property-decorator'
import Tabs from '../components/Tabs.vue'
import typeList from '@/constants/typeList'
import createId from '@/lib/createId'

@Component({
    components: { Tags, NumberPad, Notes, Tabs },
})

export default class Money extends Vue {
    record: RecordItem = {
        id: createId,
        tags: [],
        newTag: [],
        notes: '',
        type: '-',
        amount: 0,
        createdAt: new Date().toISOString()
    };

    typeList = typeList

    get recordList() {
        return this.$store.state.recordList
    }



    created() {
        this.$store.commit('fetchRecords')
    }

    onUpdateNotes(value: string) {
        this.record.notes = value;
    }


    saveRecord() {
        if (!this.record.newTag || this.record.newTag.length === 0) {
            return window.alert('请至少选择一个标签')
        }
        this.$store.commit('createRecord', this.record)
        this.record.notes = '';
        this.record.newTag = [];
        if (this.$store.state.createRecordError === null) {
            window.alert('记账成功')
            console.log(this.record.newTag);
        }

    }

}
</script>

<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}

.notes-bar {
    padding: 12px 0;
}
</style>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

::v-deep .forget-tabs-item {
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
</style>