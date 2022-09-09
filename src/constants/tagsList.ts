/* const list = [
  // Object.freeze方法可以让对象或数组完全不能变，包括里面的参数or值
  { name: "food", value: "餐饮" },
  { name: "takeout", value: "外卖" },
  { name: "vegetables", value: "买菜" },
  { name: "snacks", value: "零食" },
  { name: "restaurant", value: "就餐" },
]; */

export default Object.freeze([
  {
    title: "餐饮",
    tags: [
      { name: "food", value: "餐饮" },
      { name: "takeout", value: "外卖" },
      { name: "vegetables", value: "买菜" },
      { name: "snacks", value: "零食" },
      { name: "restaurant", value: "就餐" },
    ],
  },
  {
    title: "购物",
    tags: [
      { name: "shopping", value: "购物" },
      { name: "clothes", value: "衣服" },
      { name: "commodity", value: "日用品" },
      { name: "phone", value: "数码" },
      { name: "cosmetics", value: "化妆品" },
    ],
  },
  {
    title: "交通",
    tags: [
      { name: "transportation", value: "交通" },
      { name: "bus", value: "公交地铁" },
      { name: "taxi", value: "出租车" },
      { name: "train", value: "火车" },
      { name: "airplane", value: "飞机" },
      { name: "traffic", value: "私家车" },
    ],
  },
  {
    title: "日常",
    tags: [
      { name: "house", value: "居住" },
      { name: "phone-money", value: "话费网费" },
      { name: "water-electricity", value: "水电费" },
      { name: "maintain", value: "维修费" },
    ],
  },
  {
    title: "娱乐",
    tags: [
      { name: "disport", value: "娱乐" },
      { name: "game", value: "游戏" },
      { name: "love", value: "约会" },
      { name: "run", value: "运动" },
      { name: "tour", value: "旅游" },
    ],
  },
  {
    title: "医疗",
    tags: [
      { name: "treat", value: "医疗" },
      { name: "hospital", value: "就医" },
      { name: "medicine", value: "买药" },
    ],
  },
]);
