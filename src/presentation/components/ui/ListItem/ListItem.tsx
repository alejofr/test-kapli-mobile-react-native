import React from 'react';
import { View, TouchableHighlight, ViewStyle, StyleProp } from 'react-native';
import { Skeleton } from 'native-base';

import useStyles from './style';




export interface ListItemUIProps{
    style?:  StyleProp<ViewStyle>;
    children:   React.ReactNode;
    onPress?:   () => void;
    isLoading?:  boolean;
    right?:      React.ReactNode;
}

export const ListItemUI = ({
    children,
    onPress,
    style,
    isLoading = false,
    right = true
}: ListItemUIProps) => {

    const styles = useStyles();

    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor={styles.underlayColor.color}
            style={{borderRadius: 6}}
            disabled={isLoading}
        >
            <View style={[styles.root, style]} >
                <View style={styles.main} >
                    <Skeleton.Text
                        lines={1}
                        flex={1}
                        isLoaded={isLoading === false}
                    >
                        { children }
                    </Skeleton.Text>
                </View>
                {
                    right &&
                    <View style={styles.right} >
                        <Skeleton 
                            style={{
                                height: 24,
                                width: 24,
                                borderRadius: 24
                            }}
                            isLoaded={isLoading === false}
                        >
                           { right }
                        </Skeleton>
                    </View>
                }
            </View>
        </TouchableHighlight>
    )
}
