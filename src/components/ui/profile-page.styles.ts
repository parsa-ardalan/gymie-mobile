import { StyleSheet } from "react-native";

export default StyleSheet.create({

    page: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },

    card: {
        width: "100%",
        borderRadius: 24,
        backgroundColor: "#0b0b0b",
        padding: 16,
    },

    /* PROFILE */
    profileSection: {
        alignItems: "center",
        paddingVertical: 20,
    },

    avatar: {
        width: 65,
        height: 65,
        marginBottom: 10,
    },

    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },

    bio: {
        fontSize: 13,
        color: "#aaa",
        textAlign: "center",
        marginTop: 10,
        lineHeight: 20,
        paddingHorizontal: 10,
    },

    /* GRID */
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 20,
        gap: 10,
    },

    boxBlue: {
        width: "31%",
        height: 90,
        borderRadius: 12,
        backgroundColor: "#111",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#3b82f6",
    },

    boxPurple: {
        width: "48%",
        height: 90,
        borderRadius: 12,
        backgroundColor: "#111",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#a855f7",
    },

    boxOrange: {
        width: "48%",
        height: 90,
        borderRadius: 12,
        backgroundColor: "#111",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#f97316",
    },

    numberBlue: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#3b82f6",
    },

    numberPurple: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#a855f7",
    },

    numberOrange: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#f97316",
    },

    label: {
        fontSize: 12,
        color: "#aaa",
        marginTop: 6,
    },

    /* BUTTON */
    buttonWrapper: {
        marginTop: 20,
        height: 50,
    },

    button: {
        flex: 1,
        backgroundColor: "rgba(59,130,246,0.1)",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
});