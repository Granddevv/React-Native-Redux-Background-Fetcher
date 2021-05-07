import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1
    },
    headerContainer: {
        marginTop: 30
    },
    headerTitle: {
        fontSize: 26,
        textAlign: 'center'
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: 20
    },
    thumbnail: {
        width: 50,
        height: 50
    },
    cardContainer: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 4,
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10
    },
    cardContent: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default styles;