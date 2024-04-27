import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    loginHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'gold',
        fontStyle: 'italic',
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#758fd1',
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
        backgroundColor: '#005B41',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        color: 'white',
        marginBottom: 10,
    },
    registerText: {
        color: 'gold',
        fontSize: 16,
    },
    logoImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
});

export default styles;
