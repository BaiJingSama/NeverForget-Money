type RootState = {
  recordList: RecordItem[];
  createRecordError: Error | null;
  tagList: Tag[];
  currentTag?: Tag;
  newTag: newTag[];
};

type RecordItem = {
  id: () => number;
  tags: Tag[];
  newTag: newTag[];
  notes: string;
  type: string;
  amount: number; // 数据类型
  createdAt?: string; // 类 / 构造函数
};

type Tag = {
  id: string;
  name: string;
};

type newTag = {
  name: string;
  value: string;
};

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => string; // success | duplicated 联合类型
  update: (id: string, name: string) => "success" | "没找到" | "名字重复";
  remove: (id: string) => boolean;
  save: () => void;
};

type groupList = {
  title: string;
  total?: number;
  items: RecordItem[];
}[];

/* interface Window {
  store: {
    tagList: Tag[];
    createTag: (name: string) => void;
    findTag: (id: string) => Tag;
    removeTag: (id: string) => boolean;
    updateTag: (id: string, name: string) => "success" | "没找到" | "名字重复";
    recordList: RecordItem[];
    createRecord: (record: RecordItem) => void;
  };
}
 */
