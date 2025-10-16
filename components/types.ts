export type Category = {
  id: string;
  label: string;
};

export type Newsletter = {
  id: string;
  name: string;
  title: string;
  categoryId: string;
  logo?: string;
};

// FlatList에 "카테고리바"를 첫 아이템으로 넣기 위한 유니온 타입
export type Row = { kind: "category" } | ({ kind: "item" } & Newsletter);
