import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
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
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'gold',
        fontStyle: 'italic',
        marginBottom: 20,
    },
});

export default styles;
