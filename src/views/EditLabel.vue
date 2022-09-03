<template>
  <Layout>
    <div>
      <Icon name="left" />
      <span>编辑标签</span>
    </div>
    <Notes fieldName="标签名" placeholder="请输入标签名" />
    <Button>删除标签</Button>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import tagListModel from '@/models/tagList'
import Icon from '@/components/Icon.vue'
import Notes from '@/components/Money/Notes.vue'
import Button from '@/components/Button.vue'


@Component({
  components: { Notes, Icon, Button }
})
export default class EditLabel extends Vue {


  created() {
    const id = this.$route.params.id
    tagListModel.fetch()
    const tags = tagListModel.data
    const tag = tags.filter(t => t.id === id)[0]
    if (tag) {
      console.log(tag);
    } else {
      //一般跳转到404都是用replace不用push
      this.$router.replace('/404')
    }
  }
}
</script>

<style scoped>
</style>