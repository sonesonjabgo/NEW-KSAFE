import { FC, useCallback, useRef, useState } from "react"
import { FlatList, TouchableOpacity, View, ViewToken } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text } from "@/components/Text"
import { HAS_LAUNCHED_KEY } from "@/constants/storageKeys"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useResponsive } from "@/theme/responsive"
import { saveString } from "@/utils/storage"

import { IntroPagination } from "./components/IntroPagination"
import { IntroSlide } from "./components/IntroSlide"
import { INTRO_SLIDES, IntroSlideData } from "./mockData"
import * as S from "./styles"

export const WelcomeIntroScreen: FC<AppStackScreenProps<"WelcomeIntro">> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList<IntroSlideData>>(null)
  const {
    width,
    height: _height,
    isSmallPhone,
    isBasePhone: _isBasePhone,
    isLargePhone: _isLargePhone,
    isTablet,
    isShortHeight,
    breakpoint: _breakpoint,
  } = useResponsive()

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index ?? 0)
    }
  }).current

  const handleDotPress = useCallback((index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true })
    setCurrentIndex(index)
  }, [])

  const goToLogin = () => {
    saveString(HAS_LAUNCHED_KEY, "true")
    navigation.replace("Login")
  }

  return (
    <View style={[S.$screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View
        style={[
          S.$header,
          isSmallPhone && S.$headerSmallPhone,
          isShortHeight && S.$headerShortHeight,
        ]}
      >
        <Text text="K-SAFEONE" style={S.$logoText} />
        <TouchableOpacity style={S.$skipBtn} activeOpacity={0.7} onPress={goToLogin}>
          <Text text={translate("welcomeIntroScreen:skip")} style={S.$skipLabel} />
        </TouchableOpacity>
      </View>

      {/* slideArea: 헤더~버튼 사이 남은 공간, slideGroup을 세로 중앙 정렬 */}
      <View style={S.$slideArea}>
        {/* slideGroup: FlatList + pagination을 하나의 콘텐츠 묶음으로 통합 */}
        <View style={S.$slideGroup}>
          <FlatList
            ref={flatListRef}
            data={INTRO_SLIDES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <IntroSlide
                slide={item}
                screenWidth={width}
                isSmallPhone={isSmallPhone}
                isTablet={isTablet}
                isShortHeight={isShortHeight}
              />
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            style={S.$slideList}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged}
          />

          {/* Pagination — slideGroup 안 FlatList 바로 아래, 슬라이드와 좌우로 움직이지 않음 */}
          <View style={[S.$paginationWrapper, isShortHeight && S.$paginationWrapperShortHeight]}>
            <IntroPagination
              total={INTRO_SLIDES.length}
              currentIndex={currentIndex}
              onDotPress={handleDotPress}
            />
          </View>
        </View>
      </View>

      {/* Bottom button */}
      <View
        style={[S.$bottomContainer, { paddingBottom: insets.bottom + (isShortHeight ? 16 : 24) }]}
      >
        <TouchableOpacity
          style={[S.$startBtn, (isSmallPhone || isShortHeight) && S.$startBtnCompact]}
          activeOpacity={0.85}
          onPress={goToLogin}
        >
          <Text text={translate("welcomeIntroScreen:start")} style={S.$startBtnLabel} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
