import colors from "../../constants/colors";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    appointmentContainer: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: colors.black,
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.primary500,
        paddingVertical: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius:15,
        marginLeft:5,
        marginRight:5
    },
    activeTab: {
        backgroundColor: colors.primary400,
    },
    tabText: {
        color: colors.gold,
        fontSize: 16,
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
});

export default styles; 