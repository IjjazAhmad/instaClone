import Toast from "react-native-toast-message";
import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { ToastType } from "./AllTypes";
import { Fonts } from "./Fonts";



const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        fontFamily: "Roboto",
        backgroundColor: Colors.white,
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
    },
    verticalyCenter: {
        justifyContent: "center",
    },
    horizantalyCenter: {
        alignItems: "center",
    },
    horizantalyBetween: {
        justifyContent: "space-between",
    },
    flexEnd: {
        alignItems: "flex-end",
    },

    formControl: {
        fontFamily:Fonts.REGULER,
        width: "90%",
        backgroundColor: Colors.inputbg,
        marginVertical: 5,
        borderWidth: 0.5,
        borderColor: Colors.borderColor,
        borderRadius: 5,
        color: "#000",
        height: 44,
        paddingHorizontal:10,
    },
    
    fontExSm: {
        fontSize: 11,
    },
    fontSm: {
        fontSize: 12,
        
    },
    fontM: {
        fontSize: 13,
        
    },
    fontL: {
        fontSize: 14,
        
    },
    fontXl: {
        fontSize: 15,
        
    },
    fontXxl: {
        fontSize: 16,
        
    },
    fontWeightM: {
        fontWeight: "400",
        fontFamily:Fonts.REGULER,
        
    },
    fontWeightL: {
        fontWeight: "500",
        fontFamily:Fonts.MEDIUM,
    },
    fontWeightXl: {
        fontWeight: "600",
        fontFamily:Fonts.BOLD
    },
    lineHightFirst: {
        lineHeight: 17,
    },
    lineHightSec: {
        lineHeight: 18,
    },
    SpacingExSm: {
        letterSpacing: -0.33,
    },
    SpacingSm: {
        letterSpacing: -0.25,
    },
    SpacingM: {
        letterSpacing: -0.1,
    },
    SpacingL: {
        letterSpacing: 0,
    },
    SpacingXl: {
        letterSpacing: 0.15,
    },
})





const notify = (msg1: string, msg2: string, type?: ToastType): void => {
    switch (type) {
        case "success":
            Toast.show({
                type: 'success',
                text1: msg1,
                text2: msg2,
            });
            break;
        case "error":
            Toast.show({
                type: 'error',
                text1: msg1,
                text2: msg2,
            });
            break;
        case "info":
            Toast.show({
                type: 'info',
                text1: msg1,
                text2: msg2,
            });
            break;
        default:
            Toast.show({
                text1: msg1,
                text2: msg2,
            });
    }
};


export { styles, notify };