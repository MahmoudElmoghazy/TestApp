import * as React from "react"
import { Text as ReactNativeText, StyleSheet } from "react-native"

import colors from "src/theme/colors";
import Props from './text-props';

export const Text = ({ children, ...props }: Props) => {
  return (
    <ReactNativeText style={styles.defaultStyle} {...props}>
      {children}
    </ReactNativeText>
  )
}

const styles = StyleSheet.create({
  defaultStyle: {
    color: colors.black
  }
})
