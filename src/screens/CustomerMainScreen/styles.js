import colors from "../../constants/colors";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.white,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        marginLeft: 10,
    },
    hoursContainer: {
        alignItems: 'stretch',
    },
    hourBox: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: colors.primary500,
        borderRadius: 5,
        alignItems: 'center',
    },
    hourText: {
        color: colors.white,
    },
    
  appointButton: {
    marginTop: 20,
    backgroundColor: colors.secondary500,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  instructionText: {
    textAlign: 'center',
    backgroundColor: colors.primary500,
    color: colors.gold,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default styles; 