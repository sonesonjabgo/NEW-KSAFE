import React, { forwardRef } from "react"
import { TextInput, View } from "react-native"
import { tva } from "@gluestack-ui/nativewind-utils/tva"
import { withStyleContext, useStyleContext } from "@gluestack-ui/nativewind-utils/withStyleContext"
import { withStates } from "@gluestack-ui/nativewind-utils/withStates"

const SCOPE = "INPUT"

const inputStyle = tva({
  base: "flex-row align-center border rounded border-outline-300 data-[focus=true]:border-primary-500 data-[invalid=true]:border-error-700 data-[hover=true]:border-outline-400 data-[disabled=true]:opacity-40",
  variants: {
    size: {
      sm: "h-8",
      md: "h-9",
      lg: "h-10",
    },
    variant: {
      outline: "border",
      underlined: "border-b rounded-none",
      rounded: "border rounded-full",
    },
  },
})

const inputFieldStyle = tva({
  base: "flex-1 text-typography-900 py-auto px-3 placeholder:text-typography-500",
  parentVariants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
})

const Root = withStates(withStyleContext(View, SCOPE))

export const Input = forwardRef(({ className, variant = "outline", size = "md", states = {}, ...props }: any, ref: any) => {
  return (
    <Root
      ref={ref}
      {...props}
      states={states}
      className={inputStyle({ variant, size, className })}
      context={{ variant, size }}
    />
  )
})

export const InputField = forwardRef(({ className, ...props }: any, ref: any) => {
  const { size: parentSize } = useStyleContext(SCOPE)
  return (
    <TextInput
      ref={ref}
      className={inputFieldStyle({ size: parentSize, className })}
      {...props}
    />
  )
})
