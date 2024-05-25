import { StyleSheet } from 'react-native'

const useStyles = () => {
    return StyleSheet.create({
        root: {
            flex: 1,
            paddingHorizontal: 15,
            paddingVertical: 20
        },
        rootLoading: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        rootInput: {
            marginBottom: 20,
        },
    })
}

export default useStyles