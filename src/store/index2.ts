import tagListModel from "@/models/tagList";
import recordListModel from "@/models/recordList";

const store = {
  // record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => {
    recordListModel.create(record);
  },
  // tag store
  tagList: tagListModel.fetch(),
  findTag(id: string) {
    return this.tagList.filter((t) => t.id === id)[0];
  },
  createTag: (name: string) => {
    const success = tagListModel.create(name);
    window.alert(success);
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },
};

export default store;
