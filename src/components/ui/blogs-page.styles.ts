import { StyleSheet } from "react-native";

export default StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#000",
        paddingTop: 32,
    },

    list: {
        paddingBottom: 32,
    },

    card: {
        width: "100%",
        borderRadius: 12,
        backgroundColor: "#111",
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 16,

        shadowColor: "#fff",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    titleBox: {
        height: 50,
        justifyContent: "center",
    },

    title: {
        fontSize: 16,
        color: "#fff",
    },

    contentBox: {
        height: 90,
        justifyContent: "flex-start",
    },

    content: {
        fontSize: 13,
        color: "rgba(255,255,255,0.5)",
        lineHeight: 20,
    },

    footer: {
        height: 50,
        borderTopWidth: 1,
        borderTopColor: "#fff",
        justifyContent: "center",
    },

    time: {
        fontSize: 13,
        color: "#fff",
    },
});