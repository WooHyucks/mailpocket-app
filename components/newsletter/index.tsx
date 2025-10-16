import React from "react";
import { View, FlatList, ListRenderItem } from "react-native";
import { Category, Newsletter, Row } from "../types";
import CategoryBar from "../categoryBar";
import NewsletterItem from "./Item";

interface NewsletterListProps {
  categories: Category[];
  newsletters: Newsletter[];
  selectedCategory: Category["id"];
  onCategorySelect: (categoryId: Category["id"]) => void;
  onSubscribe: (id: string) => void;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  contentContainerStyle?: any;
  showsVerticalScrollIndicator?: boolean;
  stickyHeaderIndices?: number[];
}

export default function NewsletterList({
  categories,
  newsletters,
  selectedCategory,
  onCategorySelect,
  onSubscribe,
  ListHeaderComponent,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  stickyHeaderIndices,
}: NewsletterListProps) {
  // 선택된 카테고리의 뉴스레터만 필터링하고, 맨 앞에 category row를 삽입
  const rows: Row[] = React.useMemo(() => {
    const filtered = newsletters
      .filter((newsletter) => newsletter.categoryId === selectedCategory)
      .map<Row>((newsletter) => ({
        kind: "item",
        ...newsletter,
      }));
    return [{ kind: "category" }, ...filtered];
  }, [newsletters, selectedCategory]);

  const renderItem: ListRenderItem<Row> = ({ item }) => {
    if (item.kind === "category") {
      return (
        <CategoryBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={onCategorySelect}
        />
      );
    }

    return <NewsletterItem newsletter={item} onSubscribe={onSubscribe} />;
  };

  return (
    <FlatList<Row>
      data={rows}
      keyExtractor={(item, index) =>
        item.kind === "category" ? "category-bar" : `n-${item.id}-${index}`
      }
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={() => (
        <View className="h-[1px] bg-gray-100 mx-6 mt-2" />
      )}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      stickyHeaderIndices={stickyHeaderIndices}
    />
  );
}

// NewsletterItem export
export { default as NewsletterItem } from "./Item";
