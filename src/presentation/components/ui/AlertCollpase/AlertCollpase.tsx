import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { Alert, Box, CloseIcon, Collapse, HStack, IconButton, Text, VStack, } from 'native-base';
import useStyles from './styles';

interface Props{
    isOpened:       boolean;
    typeAlert?:     TypeAlertCollapseUI;
    showIcon?:      boolean; 
    closeaAlert?:   () => void;
    title?:         string;
    content?:       any;
    style?:        StyleProp<ViewStyle>
    styleAlert?:        StyleProp<ViewStyle>
}

export type TypeAlertCollapseUI = "success" | "warning" | "info" | "error";

export const AlertCollpaseUI = ({
    isOpened,
    typeAlert,
    showIcon = false,
    closeaAlert,
    title,
    content,
    style,
    styleAlert
}: Props) => {
    const styles = useStyles();

    return (
        <Collapse
        isOpen={isOpened}
        style={[style]}
    >
        <Alert
            status={typeAlert}
            colorScheme={typeAlert}
            style={[styleAlert]}
        >
            <VStack space={1} flexShrink={1} w="100%">
                <HStack flexDirection='row' space={2} >
                    <HStack flexShrink={1} space={2} flex={1} >
                        { showIcon && <Alert.Icon size={5} mt={2} /> }
                        {
                            title &&
                            <Text fontSize="md"
                                
                                style={[
                                    typeAlert == 'error' && styles.clDanger,
                                    typeAlert == 'success' && styles.clSuccess,
                                    typeAlert == 'warning' && styles.clWarning,
                                    closeaAlert == undefined && { flex: 1 }
                                ]}
                            >
                                { title }
                            </Text>
                        }
                    </HStack>
                    {
                        closeaAlert &&
                        <IconButton onPress={closeaAlert} alignItems='flex-start' variant="unstyled" _focus={{
                            borderWidth: 0
                        }} icon={<CloseIcon size="3" />} _icon={{
                            color: "coolGray.600"
                        }} />
                    }
                        
                    
                </HStack>
                {
                    content &&
                    <Box pl="6" _text={{
                        style: [
                            typeAlert == 'error' && styles.clDanger,
                            typeAlert == 'success' && styles.clSuccess,
                            typeAlert == 'warning' && styles.clWarning
                        ]
                    }}>
                        {content}
                    </Box>
                }
            </VStack>
        </Alert>
    </Collapse>
    )
}
