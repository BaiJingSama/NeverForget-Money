<template>
    <div>
        <label class="notes">
            <span class="name">{{ fieldName }}</span>
            <template v-if="type === 'date'">
                <input :type="type || 'text'" :value="x(value)" @input="onValueChanged($event.target.value)"
                    :placeholder="placeholder">
            </template>
            <template v-else>
                <input :type="type || 'text'" :value="value" @input="onValueChanged($event.target.value)"
                    :placeholder="placeholder">
            </template>

            <!-- :value="value" @input="oninput" 可以简化成v-model -->
        </label>
    </div>
</template> 

<script lang="ts">
import dayjs from 'dayjs';
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Notes extends Vue {
    @Prop({ default: '' }) readonly value!: string;

    @Prop({ required: true }) fieldName!: string
    @Prop(String) placeholder?: string
    @Prop(String) type?: string

    onValueChanged(value: string) {
        this.$emit('update:value', value)
    }

    x(isoString: string) {
        return dayjs(isoString).format('YYYY-MM-DD')
    }
}
</script>

<style lang="scss" scoped>
.notes {
    // background: #f5f5f5;
    display: block;
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;


    .name {
        padding-right: 16px;

    }

    input {
        height: 20px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding-right: 16px;
    }
}
</style>