import { StyleSheet } from "react-native";

export const dietPageStyles = StyleSheet.create({

    page: {
        width: "100%",
        paddingVertical: 32,
        paddingHorizontal: 32,
        backgroundColor: "#000000",
    },

    nutritionBox: {
        width: "100%",
        height: "auto",
        padding: 12,
        borderRadius: 12,

        shadowColor: "#ffffff",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },

    logo: {
        width: 50,
        height: 50
    },

    boxText: {
        width: "100%",
        height: "auto",
        fontSize: 14,
        color: "#ffffff",

    },

    infoBox: {
        width: "100%",
        height: "auto",
        flexDirection: "row",
        marginTop: 20
    },

    infoItem: {
        flex: 1,
        height: 80,
        paddingTop: 12,
    },

    itemTitle: {
        fontSize: 12,
        color: "#ffffff5e",
        textAlign: "center"
    },

    itemValue: {
        fontSize: 18,
        color: "#ffffff",
        textAlign: "center",
        marginTop: 6
    },


    card: {
        width: "100%",
        height: 80,
        flexDirection: "row",
        marginTop: 20,
        borderRadius: 12,

        shadowColor: "#ffffff",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },


    cardContent: {
        width: "80%",
        height: "100%",
        flexDirection: "row",
    },


    iconContainer: {
        width: "25%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },


    icon: {
        width: 35,
        height: 35,
    },


    titleContainer: {
        width: "75%",
        height: "100%",
        alignItems: "flex-start",
        justifyContent: "center",
    },


    title: {
        fontSize: 16,
        color: "#ffffff",
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32
    },

    blurBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,

        justifyContent: 'center',
        alignItems: 'center',
    },

});