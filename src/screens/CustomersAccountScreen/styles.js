import colors from "../../constants/colors";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        backgroundColor: colors.primary500,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: colors.secondary500,
        padding: 10,
        borderRadius: 50,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: -75,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: colors.white,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary500,
        marginVertical: 10,
    },
    email: {
        fontSize: 18,
        color: colors.grey,
    },
    section: {
        marginBottom: 30,
        paddingTop: 10,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary500,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: colors.primary100,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
        paddingHorizontal: 20,
    },
    infoText: {
        fontSize: 16,
        color: colors.primary500,
        marginLeft: 10,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondary500,
        padding: 15,
        justifyContent: 'center',
        margin: 20,
        borderRadius: 10,
    },
    logoutButtonText: {
        color: colors.white,
        fontSize: 16,
        marginLeft: 10,
    },
});

export default styles;
