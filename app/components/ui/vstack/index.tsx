import { View } from "react-native"
import { tva } from "@gluestack-ui/nativewind-utils/tva"

const vstackStyle = tva({
  base: "flex-col",
  variants: {
    space: {
      "xs": "gap-1",
      "sm": "gap-2",
      "md": "gap-3",
      "lg": "gap-4",
      "xl": "gap-5",
      "2xl": "gap-6",
      "3xl": "gap-7",
      "4xl": "gap-8",
    },
    reversed: {
      true: "flex-col-reverse",
    },
  },
})

export const VStack = ({ className, space, reversed, ...props }: any) => {
  return <View className={vstackStyle({ space, reversed, className })} {...props} />
}
