/* import { model } from '@/model.js'
console.log(model); */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; // 数据类型
  createdAt?: Date; // 类 / 构造函数
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Tag = {
  id: string;
  name: string;
};
