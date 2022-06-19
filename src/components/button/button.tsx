import React from 'react';
import { Button as RNButton } from 'react-native';

import Props from './button-props';

const Button = (props: Props) => {
    return (
        <RNButton {...props}  />
    )
}

export {
    Button
};