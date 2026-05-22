import { FC, useCallback, useRef, useState } from "react"
import { FlatList, TouchableOpacity, View, ViewToken } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useResponsive } from "@/theme/responsive"

import { IntroSlide } from "./components/IntroSlide"
import { INTRO_SLIDES, IntroSlideData } from "./mockData"
import * as S from "./styles"

export const WelcomeIntroScreen: FC<AppStackScreenProps<"WelcomeIntro">> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList<IntroSlideData>>(null)
  const { width, isSmallPhone, isTablet } = useResponsive()

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
    navigation.replace("Login")
  }

  return (
    <View style={[S.$screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[S.$header, isSmallPhone && { marginBottom: 24 }]}>
        <Text text="K-SAFEONE" style={S.$logoText} />
        <TouchableOpacity style={S.$skipBtn} activeOpacity={0.7} onPress={goToLogin}>
          <Text text={translate("welcomeIntroScreen:skip")} style={S.$skipLabel} />
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <View style={S.$slideArea}>
        <FlatList
          ref={flatListRef}
          data={INTRO_SLIDES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <IntroSlide
              slide={item}
              currentIndex={currentIndex}
              total={INTRO_SLIDES.length}
              onDotPress={handleDotPress}
              screenWidth={width}
              isSmallPhone={isSmallPhone}
              isTablet={isTablet}
            />
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          extraData={currentIndex}
          style={S.$slideList}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      </View>

      {/* Bottom button */}
      <View style={[S.$bottomContainer, { paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity
          style={[S.$startBtn, isSmallPhone && { height: 50 }]}
          activeOpacity={0.85}
          onPress={goToLogin}
        >
          <Text text={translate("welcomeIntroScreen:start")} style={S.$startBtnLabel} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
