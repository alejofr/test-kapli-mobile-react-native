import { StyleSheet } from 'react-native'

const useStyles = () => {
    return StyleSheet.create({
        root: {
            flexDirection: 'row'
        },
        main: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingVertical: 8,
            paddingHorizontal: 6
        },
        icon: {
            height: 32,
            width: 36,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#f1f3fd',
            marginRight: 12,
            borderRadius: 4
        },
        right: {
            justifyContent: 'center',
            alignItems: 'flex-end'
        },
        underlayColor: {
            color: 'rgba(0,0,0,0.03)'
        }
    })
}

export default useStyles