import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";

Vue.use(Vuex);

type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
  newTagList: newTag[];
};

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    tagList: [],
    currentTag: undefined,
    newTagList: [],
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString();
      state.recordList?.push(record2);
      store.commit("saveRecords");
    },
    saveRecords(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    fetchTags(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
      state.tagList = JSON.parse(
        window.localStorage.getItem("newTagList") || "[]"
      );
      if (!state.tagList || state.tagList.length === 0) {
        store.commit("initTag", "衣");
        store.commit("initTag", "食");
        store.commit("initTag", "住");
        store.commit("initTag", "行");
      }
    },
    createTag(state, name: string) {
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("标签名已存在");
      } else if (name.length >= 8) {
        window.alert("创建的标签名大于8个字符，创建失败");
      } else {
        const id = createId().toString();
        state.tagList.push({ id, name: name });
        store.commit("saveTags");
        window.alert("创建标签成功");
      }
    },
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
      window.localStorage.setItem(
        "newTagList",
        JSON.stringify(state.newTagList)
      );
    },
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload;
      const idList = state.tagList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert("标签名重复");
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit("saveTags");
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit("saveTags");
      window.alert("删除成功，回到标签页");
    },
    initTag(state, name) {
      const id = createId().toString();
      state.tagList.push({ id, name: name });
      store.commit("saveTags");
    },
    addTag(state, payload: { name: string; value: string }) {
      const { name, value } = payload;
      const nameList = state.newTagList.map((item) => item.name);
      if (nameList.indexOf(name) >= 0) {
        window.alert("标签已经选择过了");
      } else {
        state.newTagList.push({ name: name, value: value });
        store.commit("saveTags");
        window.alert("标签添加成功");
      }
    },
  },
});

export default store;
