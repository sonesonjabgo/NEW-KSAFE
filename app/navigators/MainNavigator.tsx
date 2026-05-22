import { ViewStyle, TextStyle, View, TouchableOpacity } from "react-native"
import { createBottomTabNavigator, BottomTabBarProps } from "@react-navigation/bottom-tabs"
import type { SvgProps } from "react-native-svg"

import { useResponsive } from "@/theme/responsive"

import NavBoard from "@assets/icons/nav/nav_board.svg"
import NavHome from "@assets/icons/nav/nav_home.svg"
import NavSafety from "@assets/icons/nav/nav_safety.svg"
import NavWorker from "@assets/icons/nav/nav_worker.svg"

import { Text } from "@/components/Text"
import { HomeScreen } from "@/screens/HomeScreen"
import { SafeBoardScreen } from "@/screens/SafeBoardScreen/SafeBoardScreen"
import { SafeHealthMainScreen } from "@/screens/SafeHealthScreen/SafeHealthMainScreen"
import { WorkerParticipationScreen } from "@/screens/WorkerParticipationScreen/WorkerParticipationScreen"
import { typography } from "@/theme/typography"

import type { MainTabParamList } from "./navigationTypes"

const Tab = createBottomTabNavigator<MainTabParamList>()

const ACTIVE_BLUE = "#214ACC"
const INACTIVE = "#000000"

function TabIcon({ Icon, focused }: { Icon: React.FC<SvgProps>; focused: boolean }) {
  return <Icon width={35} height={35} color={focused ? ACTIVE_BLUE : INACTIVE} />
}

function CustomTabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {
  const bottom = insets.bottom
  const { isSmallPhone, isLargePhone, isTablet } = useResponsive()

  const tabGap = isSmallPhone ? 4 : isLargePhone ? 18 : isTablet ? 22 : 12

  return (
    <View style={[$tabBarOuter, { paddingBottom: bottom, height: 82 + bottom }]}>
      <View style={[$tabBarRow, { gap: tabGap }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const focused = state.index === index
          const color = focused ? ACTIVE_BLUE : INACTIVE
          const label =
            typeof options.tabBarLabel === "string" ? options.tabBarLabel : route.name

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            })
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={$tabItem}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityState={{ selected: focused }}
            >
              {options.tabBarIcon?.({ focused, color, size: 35 })}
              <Text style={[$tabLabel, { color }]} numberOfLines={1}>
                {label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export function MainNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ focused }) => <TabIcon Icon={NavHome} focused={focused} />,
        }}
      />

      <Tab.Screen
        name="SafeBoard"
        component={SafeBoardScreen}
        options={{
          tabBarLabel: "안전게시판",
          tabBarIcon: ({ focused }) => <TabIcon Icon={NavBoard} focused={focused} />,
        }}
      />

      <Tab.Screen
        name="SafeHealthMain"
        component={SafeHealthMainScreen}
        options={{
          tabBarLabel: "안전관리",
          tabBarIcon: ({ focused }) => <TabIcon Icon={NavSafety} focused={focused} />,
        }}
      />

      <Tab.Screen
        name="WorkerParticipation"
        component={WorkerParticipationScreen}
        options={{
          tabBarLabel: "근로자 참여",
          tabBarIcon: ({ focused }) => <TabIcon Icon={NavWorker} focused={focused} />,
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBarOuter: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#E9ECF0",
  elevation: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
}

const $tabBarRow: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  // gap은 breakpoint별로 동적 적용
  // translateX -4: 텍스트 길이 차이로 인한 시각 편중 보정
  transform: [{ translateX: -4 }],
}

const $tabItem: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 8,
  minWidth: 70,
}

const $tabLabel: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
  marginTop: 2,
  width: "100%",
  textAlign: "center",
}
