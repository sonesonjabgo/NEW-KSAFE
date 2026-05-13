import { forwardRef } from "react"
// eslint-disable-next-line no-restricted-imports
import { Pressable, Text } from "react-native"
import { tva } from "@gluestack-ui/nativewind-utils/tva"
import { withStates } from "@gluestack-ui/nativewind-utils/withStates"
import { withStyleContext, useStyleContext } from "@gluestack-ui/nativewind-utils/withStyleContext"

const SCOPE = "BUTTON"

const buttonStyle = tva({
  base: "group/button rounded-md bg-primary-500 items-center justify-center data-[focus=true]:outline-none data-[focus-visible=true]:ring-2 data-[focus-visible=true]:ring-primary-300",
  variants: {
    action: {
      primary: "bg-primary-500 data-[hover=true]:bg-primary-600 data-[active=true]:bg-primary-700",
      secondary:
        "bg-secondary-500 data-[hover=true]:bg-secondary-600 data-[active=true]:bg-secondary-700",
      positive: "bg-success-500 data-[hover=true]:bg-success-600 data-[active=true]:bg-success-700",
      negative: "bg-error-500 data-[hover=true]:bg-error-600 data-[active=true]:bg-error-700",
      default: "bg-transparent",
    },
    variant: {
      solid: "",
      outline:
        "border border-primary-500 bg-transparent data-[hover=true]:bg-primary-50 data-[active=true]:bg-primary-100",
      link: "bg-transparent data-[hover=true]:underline",
    },
    size: {
      xs: "px-3.5 h-8",
      sm: "px-4 h-9",
      md: "px-5 h-10",
      lg: "px-6 h-11",
      xl: "px-7 h-12",
    },
  },
})

const buttonTextStyle = tva({
  base: "text-white font-medium",
  parentVariants: {
    action: {
      primary: "text-white",
      secondary: "text-white",
      positive: "text-white",
      negative: "text-white",
      default: "text-primary-500",
    },
    variant: {
      link: "text-primary-500",
      outline: "text-primary-500",
      solid: "text-white",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
})

const Root = withStates(withStyleContext(Pressable, SCOPE))

const Button = forwardRef(
  ({ className, variant = "solid", size = "md", action = "primary", states = {}, ...props }: any, ref: any) => {
    return (
      <Root
        ref={ref}
        {...props}
        states={states}
        className={buttonStyle({ variant, size, action, className })}
        context={{ variant, size, action }}
      />
    )
  },
)

const ButtonText = forwardRef(({ className, variant, size, action, ...props }: any, ref: any) => {
  const { variant: parentVariant, size: parentSize, action: parentAction } = useStyleContext(SCOPE)

  return (
    <Text
      ref={ref}
      className={buttonTextStyle({
        variant: parentVariant || variant,
        size: parentSize || size,
        action: parentAction || action,
        className,
      })}
      {...props}
    />
  )
})

Button.displayName = "Button"
ButtonText.displayName = "ButtonText"

export { Button, ButtonText }
