const localStorageKeyName = "tagList";
type Tag = {
  id: string;
  name: string;
};

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => string; // success | duplicated 联合类型
  update: (id: string, name: string) => "success" | "没找到" | "名字重复";
  remove: (id: string) => boolean;
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
  update(id, name) {
    const idList = this.data.map((item) => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        return "名字重复";
      } else {
        const tag = this.data.filter((item) => item.id === id)[0];
        tag.name = name;
        tag.id = name;
        this.save();
        return "success";
      }
    } else {
      return "没找到";
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

export default tagListModel;
