type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; // 数据类型
  createdAt?: Date; // 类 / 构造函数
};

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

interface Window {
  tagList: Tag[];
  createTag: (name: string) => void;
}
