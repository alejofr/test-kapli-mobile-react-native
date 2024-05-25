import { StyleSheet } from 'react-native'

const useStyles = () => {
    return StyleSheet.create({
        containerCollapse: {
            marginTop: 10,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#f1f3fd',
            borderRadius: 6,
        },
        collapseButton: {
            flexDirection: 'row',
            paddingHorizontal: 12,
            paddingVertical: 10,
        },
        collapseBody: {
            paddingHorizontal: 15,
            paddingVertical: 10
        },
    })
}

export default useStyles