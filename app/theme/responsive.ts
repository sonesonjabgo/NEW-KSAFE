import { useWindowDimensions } from "react-native"

export type Breakpoint = "smallPhone" | "basePhone" | "largePhone" | "tablet"

export interface ResponsiveInfo {
  width: number
  height: number
  isSmallPhone: boolean
  isBasePhone: boolean
  isLargePhone: boolean
  isTablet: boolean
  isShortHeight: boolean
  breakpoint: Breakpoint
}

export function useResponsive(): ResponsiveInfo {
  const { width, height } = useWindowDimensions()

  const isSmallPhone = width < 360
  const isBasePhone = width >= 360 && width < 430
  const isLargePhone = width >= 430 && width < 600
  const isTablet = width >= 600
  const isShortHeight = height < 700

  let breakpoint: Breakpoint
  if (isTablet) {
    breakpoint = "tablet"
  } else if (isLargePhone) {
    breakpoint = "largePhone"
  } else if (isBasePhone) {
    breakpoint = "basePhone"
  } else {
    breakpoint = "smallPhone"
  }

  return {
    width,
    height,
    isSmallPhone,
    isBasePhone,
    isLargePhone,
    isTablet,
    isShortHeight,
    breakpoint,
  }
}
