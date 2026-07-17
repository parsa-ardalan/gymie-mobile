import { StyleSheet } from "react-native";

export default StyleSheet.create({
    page: {
        flex: 1,
        paddingTop: 32,
        backgroundColor: "#000",
    },

    header: {
        height: "16%",
        flexDirection: "row",
        gap: 10,
    },

    headerSide: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    headerCenter: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
    },

    avatarCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#a855f7",
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },

    avatarIcon: {
        width: 35,
        height: 35,
    },

    headerBox: {
        width: "100%",
        height: 56,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#a855f7",
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },

    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },

    headerStatus: {
        fontSize: 12,
        marginTop: 3,
        color: "#a855f7",
    },

    backBtn: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#a855f7",
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },

    backText: {
        width: 20,
        height: 20,
        color: "#fff",
    },

    chatContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },

    userMessage: {
        alignSelf: "flex-end",
        width: "80%",
        backgroundColor: "rgba(168,85,247,0.1)",
        padding: 12,
        marginVertical: 10,
        borderRadius: 12,
    },

    userText: {
        fontSize: 14,
        color: "#fff",
    },

    botMessage: {
        alignSelf: "center",
        width: "80%",
        borderWidth: 1,
        borderColor: "#a855f7",
        padding: 12,
        marginVertical: 10,
        borderRadius: 12,
    },

    botText: {
        fontSize: 14,
        color: "#a855f7",
    },

    inputContainer: {
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 12,
        paddingBottom: 10,
    },

    inputWrapper: {
        flex: 1,
    },

    input: {
        writingDirection: "rtl",
        height: 50,
        borderWidth: 1,
        borderColor: "#a855f7",
        borderRadius: 25,
        paddingHorizontal: 16,
        color: "#fff",
        fontSize: 14,
        backgroundColor: "rgba(255,255,255,0.03)",
        outlineWidth: 0
    },

    sendBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "rgba(168,85,247,0.1)",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
    },

    sendText: {
        color: "#fff",
        width: 20,
        height: 20,
        fontWeight: "bold",
    },
});