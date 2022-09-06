import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
      state.recordList?.push(record2);
      // recordStore.saveRecords();
      store.commit("saveRecords");
    },
    saveRecords(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    fetchTags(state) {
      return (state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      ));
    },
    createTag(state, name: string) {
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        return window.alert("标签名已存在");
      } else if (names.length >= 8) {
        return window.alert("创建的标签名大于8个字符，创建失败");
      } else {
        const id = createId().toString();
        state.tagList.push({ id, name: name });
        store.commit("saveTags");
        return window.alert("创建标签" + name + "成功！");
      }
    },
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
  },
});

export default store;
