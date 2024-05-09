import { StyleSheet } from "react-native";
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black,
    },
    loginHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.gold,
        fontStyle: 'italic',
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: colors.primary200,
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    loginButton: {
        width: 100,
        height: 50,
        backgroundColor: colors.secondary400,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: colors.white, 
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        color: colors.white, 
        marginBottom: 10,
    },
    registerText: {
        color: colors.gold,
        fontSize: 16,
    },
    logoImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
});

export default styles;
