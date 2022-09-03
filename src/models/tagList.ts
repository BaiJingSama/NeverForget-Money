const localStorageKeyName = "tagList";
type Tag = {
  id: string;
  name: string;
};

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => string; // success | duplicated 联合类型
  save: () => void;
};
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    );
    return this.data;
  },
  create(name) {
    const names = this.data.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      return "创建的名字已存在，创建失败";
    } else if (names.length >= 8) {
      return "创建的标签名大于8个字符，创建失败";
    }
    this.data.push({ id: name, name: name });
    this.save();
    return "创建" + name + "标签成功！";
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

export default tagListModel;
