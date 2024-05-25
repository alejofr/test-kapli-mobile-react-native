import { Button, Text } from 'native-base';
import React from 'react'
import { ScrollView, View } from 'react-native'

interface Props{
    children: React.ReactNode;
    actionNew?: {
        title: string;
        onNew: () => void;
    }
}

export const LayoutListAYB = ({
    children,
    actionNew
}: Props) => {
  return (
    <View style={{flex: 1, paddingHorizontal: 15, paddingVertical: 20}}>
        {
            actionNew && 
            <View style={{alignItems: 'flex-end', marginBottom: 20}}>
                <Button onPress={actionNew.onNew}>
                    <Text 
                        children={actionNew.title}
                        fontWeight='medium'
                        fontSize={15}
                        color={'white'}
                    />
                </Button>
            </View>
        }
        <ScrollView>
            { children }
        </ScrollView>
    </View>
  )
}
