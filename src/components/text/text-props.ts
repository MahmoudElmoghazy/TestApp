import { TextProps, ViewStyle } from 'react-native'
import React from 'react';

export default interface Props extends TextProps {
    children?: React.ReactNode
    numberOfLines?: number;
    style?: ViewStyle
}