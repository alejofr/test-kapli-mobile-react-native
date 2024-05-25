import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

export interface ButtonUIProps{
    children?: React.ReactNode;
    propsTouchOpacity?: TouchableOpacityProps;
    onPress?: () => void;
}

export const ButtonUI = ({
    children,
    propsTouchOpacity,
    onPress
}: ButtonUIProps) => {
  return (
    <TouchableOpacity
        {...propsTouchOpacity}
        onPress={onPress}
    >
        { children }
    </TouchableOpacity>
  )
}
