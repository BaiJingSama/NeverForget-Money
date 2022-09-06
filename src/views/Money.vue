<template>
    <div>
        <layout class-prefix="layout">
            <NumberPad :value.sync="record.amount" @submit="saveRecord" />
            <Types :value.sync="record.type" />
            <div class="notes-bar">
                <Notes @update:value="onUpdateNotes" field-name="备注" placeholder="请输入内容" />
            </div>
            <Tags />
        </layout>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Tags from '@/components/Money/Tags.vue'
import Types from '@/components/Money/Types.vue'
import NumberPad from '@/components/Money/NumberPad.vue'
import Notes from '@/components/Money/Notes.vue'
import { Component } from 'vue-property-decorator'


@Component({
    components: { Tags, Types, NumberPad, Notes },
})

export default class Money extends Vue {
    record: RecordItem = {
        tags: [],
        notes: '',
        type: '-',
        amount: 0
    };

    get recordList() {
        return this.$store.state.recordList
    }

    created() {
        this.$store.commit('fetchRecords')
    }

    onUpdateNotes(value: string) {
        this.record.notes = value;
    }

    onUpdateAmount(value: number) {
        this.record.amount = value;
    }
    saveRecord() {
        this.$store.commit('createRecord', this.record)
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
</style>