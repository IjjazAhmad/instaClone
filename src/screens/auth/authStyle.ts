import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

const authstyles = StyleSheet.create({
    forget: {
        color: Colors.primary,
        marginBottom: 30,
        marginTop:10,
        marginHorizontal: 20,
    },
    textLogo: {
        width: "90%",
        height: 52,
        marginVertical: 50,
    },
    line: {
        width: 120,
        height: 1,
        borderWidth: 0.33,
        borderColor: Colors.lineColor,
        marginTop: 7,
        marginHorizontal: 30,
    },
})

export { authstyles };