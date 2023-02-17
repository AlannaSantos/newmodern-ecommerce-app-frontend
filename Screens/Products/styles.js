import { StyleSheet } from "react-native";
import { COLORS, SIZES } from './theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
    item: {
        marginVertical: 10,
    },
    title: {
        color: COLORS.title,
        fontWeight: 'bold',
        fontSize: SIZES.h3,
        marginVertical: 5,
    },
    input: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: COLORS.blue,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin:5
        },
    subtitle: {
        color: COLORS.grey,
        fontWeight: '700',
        fontSize: SIZES.h4,
    },
    category: {
        margin: 4,
        borderRadius: 15,
        borderWidth: 2,
        padding: 5,
        paddingHorizontal: 10,
    },
    text: {
        color: COLORS.title,
        fontSize: SIZES.h4,
    },
    line: {
        backgroundColor: COLORS.lightGrey,
        height: 1,
        marginVertical: 10,
    },
    rowFilter: {
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#1a5a7f',
        borderRadius: 20,
        padding: 20,
        marginHorizontal:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTxt: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: SIZES.h4,
    }

});

export default styles;