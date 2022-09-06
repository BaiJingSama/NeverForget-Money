<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon" />
    </div>
    <div class="from-wrapper">
      <Notes :value="tag.name" @update:value="update" fieldName="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>

  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Notes from '@/components/Money/Notes.vue'
import Button from '@/components/Button.vue'


@Component({
  components: { Notes, Button },

})
export default class EditLabel extends Vue {
  // eslint-disable-next-line no-undef
  get tag() {
    return this.$store.state.currentTag
  }


  created() {
    const id = this.$route.params.id
    this.$store.commit('setCurrentTag', id)
    if (!this.tag) {
      //一般跳转到404都是用replace不用push
      this.$router.replace('/404')
    }
  }

  update(name: string) {
    if (this.tag) {
      // TODO
      // store.updateTag(this.tag.id, name)
    }
  }

  remove() {
    if (this.tag) {

      // TODO
      return
      /* if (store.removeTag(this.tag.id)) {
        window.alert('删除成功')
        this.$router.back()
      } else {
        window.alert('删除失败')
      } */

    }
  }
  goBack() {
    this.$router.back()
  }

}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;


  >.leftIcon {
    color: skyblue;
    width: 24px;
    height: 24px;
  }

  >.rightIcon {
    width: 24px;
    height: 24px;
  }
}

.from-wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px
}
</style>