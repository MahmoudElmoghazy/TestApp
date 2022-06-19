import { IconType } from "./getIconType"
import { ComponentType } from "react"
import { StyleProp, ViewStyle, TextStyle } from "react-native"

export default interface IconProps {
  type?: IconType
  name: string
  size?: number
  color?: string
  Component?: ComponentType
  underlayColor?: string
  reverse?: boolean
  raised?: boolean
  containerStyle?: StyleProp<ViewStyle>
  iconStyle?: StyleProp<TextStyle>
  onPress?: (() => void | undefined) | undefined
  reverseColor?: string
  disabled?: boolean
  disabledStyle?: StyleProp<TextStyle>
  flip?: boolean
  testID?: string
}
