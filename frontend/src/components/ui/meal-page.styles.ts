import { StyleSheet } from "react-native";

export const mealPageStyles = StyleSheet.create({

    container: {
        paddingBottom: 0,
    },


    page: {
        flex: 1,
        paddingTop: 32,
    },


    headerCard: {
        width: "100%",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },


    title: {
        fontSize: 22,
        color: "#ffffff",
        fontWeight: "700",
    },


    ingredientsWrapper: {
        width: "100%",
    },


    ingredientCard: {
        width: "100%",
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
        marginBottom: 16,
    },


    ingredientText: {
        fontSize: 16,
        color: "#ffffff",
        lineHeight: 24,
    },

});