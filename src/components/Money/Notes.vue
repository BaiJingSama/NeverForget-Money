<template>
    <div>
        <label class="notes">
            <span class="name">{{ fieldName }}</span>
            <input type="text" v-model="value" :placeholder="placeholder">
            <!-- :value="value" @input="oninput" 可以简化成v-model -->
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Notes extends Vue {
    value = '';

    @Prop({ required: true }) fieldName!: string
    @Prop(String) placeholder?: string
}
</script>

<style lang="scss" scoped>
.notes {
    background: #f5f5f5;
    display: block;
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;

    .name {
        padding-right: 16px;

    }

    input {
        height: 64px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding-right: 16px;
    }
}
</style>