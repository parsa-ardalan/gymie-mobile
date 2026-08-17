import { StyleSheet } from "react-native";

export const dietMealsStyles = StyleSheet.create({

    container: {
        flexGrow: 1,
        paddingBottom: 30,
        backgroundColor: "#000000",
    },


    page: {
        width: "100%",
        paddingTop: 44,
        paddingHorizontal: 32,
    },


    dayTitle: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
    },


    dayIndex: {
        color: "#5a5a5aff",
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 28,
        marginRight: 8,
    },


    mealBox: {
        width: "100%",
        borderRadius: 14,
        marginBottom: 18,
        overflow: "hidden",

        shadowColor: "#ffffff",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },


    mealHeader: {
        height: 65,
        paddingHorizontal: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },


    mealTitle: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "700",
    },


    arrow: {
        color: "#ffffff",
        fontSize: 22,
    },


    ingredientsBox: {
        padding: 14,
    },


    ingredientRow: {
        width: "100%",
        minHeight: 55,
        flexDirection: "row",
        backgroundColor: "#0b0b0b",
        borderRadius: 14,

        justifyContent: "center",
        alignItems: "center",

        paddingRight: 12,
        paddingLeft: 12,
        marginBottom: 12,

        position: "relative",
    },


    ingredientInput: {
        flex: 1,
        color: "#ffffff",
        fontSize: 14,
        borderRadius: 10,
        paddingRight: 6,
    },


    ingredientText: {
        flex: 1,
        color: "#ffffff",
        fontSize: 14,
    },


    actions: {
        position: "absolute",
        left: 0,
        top: "50%",
        transform: [{ translateY: -18 }],
        flexDirection: "row",
        alignItems: "center",
    },


    successButton: {
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },


    editButton: {
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },


    deleteButton: {
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },


    SuccessButtonIcon: {
        height: 20,
        width: 20,
        color: "#00ca54ff",
    },


    deleteButtonIcon: {
        height: 20,
        width: 20,
        color: "#ff5555ff",
    },


    editButtonIcon: {
        height: 18,
        width: 18,
        color: "#ffffffff",
    },


    buttonText: {
        color: "#ffffff",
        fontSize: 12,
    },


    addButton: {
        height: 55,
        borderRadius: 14,
        backgroundColor: "#00ca5415",
        justifyContent: "center",
        alignItems: "center",
    },


    addText: {
        color: "#ffffff",
        fontSize: 14,
    },

});