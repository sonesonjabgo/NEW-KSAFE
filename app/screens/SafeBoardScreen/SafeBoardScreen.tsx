import { FC } from "react"
import { View, FlatList } from "react-native"
import { Text } from "@/components/Text"
import { SafeBoardCard } from "./components/SafeBoardCard"
import { mockSafeBoardData } from "./mock/mockSafeBoardData"
import type { SafeBoardScreenProps } from "./types"
import * as S from "./styles"

export const SafeBoardScreen: FC<SafeBoardScreenProps> = () => {
  return (
    <View style={S.$screenContainer}>
      <View style={S.$headerContainer}>
        <Text text="안전게시판" style={S.$headerTitle} />
      </View>

      <View style={S.$contentContainer}>
        <FlatList
          data={mockSafeBoardData}
          renderItem={({ item }) => <SafeBoardCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={S.$listContainer}
          scrollEnabled={true}
          ListEmptyComponent={
            <View style={S.$emptyContainer}>
              <Text text="게시물이 없습니다" style={S.$emptyText} />
            </View>
          }
        />
      </View>
    </View>
  )
}
