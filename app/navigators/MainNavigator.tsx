import { Image, ImageStyle, TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { HomeScreen } from "@/screens/HomeScreen"
import { MyPageScreen } from "@/screens/MyPageScreen/MyPageScreen"
import { SafeBoardScreen } from "@/screens/SafeBoardScreen/SafeBoardScreen"
import { SafeHealthMainScreen } from "@/screens/SafeHealthScreen/SafeHealthMainScreen"
import { typography } from "@/theme/typography"

import type { MainTabParamList } from "./navigationTypes"

const Tab = createBottomTabNavigator<MainTabParamList>()

const ACTIVE_BLUE = "#214ACC"
const INACTIVE = "#9AA0AD"
const ICON_ACTIVE_BG = "#EEF3FC"

const navIcons = {
  Home: require("@assets/icons/nav/nav_home.png"),
  SafeBoard: require("@assets/icons/nav/nav_board.png"),
  SafeHealthMain: require("@assets/icons/nav/nav_safety.png"),
  MyPage: require("@assets/icons/nav/nav_worker.png"),
}

function TabIcon({ source, focused }: { source: number; focused: boolean }) {
  return (
    <View style={focused ? $iconWrapActive : $iconWrap}>
      <Image source={source} style={[$tabIcon, { tintColor: focused ? ACTIVE_BLUE : INACTIVE }]} />
    </View>
  )
}

export function MainNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [$tabBar, { paddingBottom: Math.max(bottom, 8) }],
        tabBarActiveTintColor: ACTIVE_BLUE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarLabelStyle: $tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ focused }) => <TabIcon source={navIcons.Home} focused={focused} />,
        }}
      />

      <Tab.Screen
        name="SafeBoard"
        component={SafeBoardScreen}
        options={{
          tabBarLabel: "안전게시판",
          tabBarIcon: ({ focused }) => <TabIcon source={navIcons.SafeBoard} focused={focused} />,
        }}
      />

      <Tab.Screen
        name="SafeHealthMain"
        component={SafeHealthMainScreen}
        options={{
          tabBarLabel: "안전관리",
          tabBarIcon: ({ focused }) => (
            <TabIcon source={navIcons.SafeHealthMain} focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarLabel: "마이페이지",
          tabBarIcon: ({ focused }) => <TabIcon source={navIcons.MyPage} focused={focused} />,
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#E9ECF0",
  paddingTop: 8,
  elevation: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
}

const $iconWrap: ViewStyle = {
  width: 36,
  height: 36,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
}

const $iconWrapActive: ViewStyle = {
  ...$iconWrap,
  backgroundColor: ICON_ACTIVE_BG,
}

const $tabIcon: ImageStyle = {
  width: 22,
  height: 22,
  resizeMode: "contain",
}

const $tabBarLabel: TextStyle = {
  fontSize: 11,
  fontFamily: typography.primary.normal,
}
