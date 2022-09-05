import clone from "@/lib/clone";

const localStorageKeyName = "recordList";

const recordStore = {
  // record store
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.recordList)
    );
  },
  createRecord(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.recordList?.push(record2);
    // ES2020 等同于this.recordList && this.recordList.push()
    // 可选链语法 
    recordStore.saveRecords();
  },
};
// 先初始化这个对象
recordStore.fetchRecords();

export default recordStore;
