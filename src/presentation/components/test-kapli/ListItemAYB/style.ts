import { StyleSheet } from 'react-native'

const useStyles = () => {
    return StyleSheet.create({
        label: {
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 20,
            marginBottom:15,
            color: '#737791'
        },
        title: {
            fontSize: 15,
            fontWeight: '500',
            lineHeight: 20,
        },
        actions: {
            flexDirection: 'row',
        },
        actionsEditAndDelete: {
            flexDirection: 'row',
            flex: 1
        }
    })
}

export default useStyles