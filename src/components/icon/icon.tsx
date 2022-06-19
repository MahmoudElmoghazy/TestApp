import React from "react"
import { Platform, TouchableOpacity, View, StyleSheet, I18nManager } from "react-native"

import getIconType from "./getIconType"
import IconProps from "./icon.props"

export const Icon = ({
  type,
  name,
  size = 24,
  color,
  iconStyle,
  reverse,
  raised,
  containerStyle,
  reverseColor,
  disabled,
  disabledStyle,
  onPress,
  flip = false,
  ...attributes
}: IconProps) => {
  const IconComponent = getIconType(type)
  const getBackgroundColor = () => {
    if (reverse) {
      return color
    }

    return raised ? "white" : "transparent"
  }

  return (
    <View style={containerStyle && containerStyle}>
      <TouchableOpacity
        {...attributes}
        style={StyleSheet.flatten([
          (reverse || raised) && styles.button,
          (reverse || raised) && {
            borderRadius: size + 4,
            height: size * 2 + 4,
            width: size * 2 + 4,
          },
          raised && styles.raised,
          {
            backgroundColor: getBackgroundColor(),
            alignItems: "center",
            justifyContent: "center",
          },
          disabled && disabledStyle,
        ])}
        {...(onPress && { disabled })}
        onPress={onPress}
        disabled={!onPress}
      >
        <IconComponent
          testID="iconIcon"
          style={StyleSheet.flatten([
            {
              backgroundColor: "transparent",
            },
            I18nManager.isRTL &&
              flip && {
                transform: [{ scaleX: -1 }],
              },
            iconStyle && iconStyle,
          ])}
          size={size}
          name={name}
          color={reverse ? reverseColor : color}
        />
      </TouchableOpacity>
    </View>
  )
}

Icon.defaultProps = {
  reverse: false,
  raised: false,
  size: 24,
  color: "black",
  reverseColor: "white",
  disabled: false,
  type: "feather",
}

const styles = StyleSheet.create({
  button: {
    margin: 7,
  },
  raised: {
    ...Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: "rgba(0,0,0, .4)",
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
})
