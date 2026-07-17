import { StyleSheet } from "react-native";

export default StyleSheet.create({

    page: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center"
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
        width: 75,
        height: 75,
        borderRadius: 50,
        marginBottom: 12,
    },

    name: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff",
        textAlign: "center",
    },

    bio: {
        fontSize: 13,
        color: "#888",
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
    },

    boxBlue: {
        width: "31%", // سن، وزن، قد کنار هم
        height: 90,
        marginBottom: 10,
        borderRadius: 12,
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#3b82f6",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },

    boxPurple: {
        width: "48%", // حساب کاربری
        height: 90,
        marginBottom: 10,
        borderRadius: 12,
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#a855f7",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },

    boxOrange: {
        width: "48%", // روزهای فعال کنار حساب کاربری
        height: 90,
        marginBottom: 10,
        borderRadius: 12,
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#f97316",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
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
        fontSize: 15,
    },
});