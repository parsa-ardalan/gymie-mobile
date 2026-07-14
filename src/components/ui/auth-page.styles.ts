import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
    },

    inner: {
        flex: 1,
        justifyContent: "center",
    },

    welcomeContainer: {
        width: '100%',
        height: 'auto',
    },

    logoSection: {
        width: '100%',
        height: 176,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    logo: {
        width: 120,
        height: 120,
    },

    titleSection: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    title: {
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff',
    },

    subtitle: {
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
        color: '#ffffff',
    },

    form: {
        gap: 15,
    },

    input: {
        borderRadius: 12,
        writingDirection: "rtl",
        padding: 16,
        fontSize: 15,
        color: "#fff",
        borderWidth: 1,
        borderColor: "#2a2a2a",
    },

    btn: {
        backgroundColor: "#3b83f638",
        padding: 16,
        borderRadius: 12,
        marginTop: 20,
        alignItems: "center",
    },

    btnText: {
        color: "#fff",
        fontWeight: "600",
    },

    otpContainer: {
        writingDirection: "ltr",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginTop: 20,
    },

    otpInput: {
        width: 55,
        height: 55,
        borderRadius: 12,
        textAlign: "center",
        fontSize: 22,
        color: "#fff",
        borderWidth: 1,
        borderColor: "#2a2a2a",
    },

    otpFilled: {
        borderColor: "#3b82f6",
    },

    otpSuccess: {
        borderColor: "#22c55e",
    },

    otpError: {
        borderColor: "#ef4444",
    },

    modalBg: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalBox: {
        width: "80%",
        backgroundColor: "#1a1a1a",
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
    },

    modalText: {
        color: "#fff",
        marginBottom: 20,
    },

    modalBtn: {
        color: "#3b82f6",
    },

});