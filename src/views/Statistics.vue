<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="typeList" :value.sync="type" />
        <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
        <div>
            type: {{ type }}
            <br />
            interval: {{ interval }}
        </div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Types from '@/components/Money/Types.vue'
import { Component } from 'vue-property-decorator'
import Tabs from '../components/Tabs.vue'
import intervalList from '@/constants/intervalList'
import typeList from '@/constants/typeList'

@Component({
    components: {
        Types,
        Tabs
    }
})
export default class Statistics extends Vue {
    type = '-'
    interval = 'day'
    typeList = typeList
    intervalList = intervalList


}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
    background: white;

    &.selected {
        background: skyblue;
        color: white;

        &::after {
            display: none;
        }
    }
}
</style>