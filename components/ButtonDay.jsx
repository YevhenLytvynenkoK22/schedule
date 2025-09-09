import {StyleSheet, TouchableOpacity, Text} from "react-native";
import {COLORS} from "../constans/ui";



const ButtonDay = ({title})=>{
    return(
        <TouchableOpacity style={styles.customButton} onPress={() => {}}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>

    );
};
const styles = StyleSheet.create({
    customButton: {
        backgroundColor: COLORS.SECONDARY_COLOR,
        borderRadius: 50,
        alignItems: "center",
        width:50,
        height:50,
    },
    buttonText: {
        color: COLORS.PRIMARY_COLOR,
        fontWeight: "bold",
        
    },
})

export default ButtonDay;