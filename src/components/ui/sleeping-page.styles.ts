import { StyleSheet } from "react-native";

export default StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#000",
        paddingTop: 32,
    },

    /* CARD */
    card: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: "#111",
        shadowColor: "#fff",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
    },

    logo: {
        width: 35,
        height: 35,
    },

    headerText: {
        color: "rgba(255,255,255,0.5)",
        fontSize: 14,
    },

    infoText: {
        color: "#fff",
        fontSize: 13,
        lineHeight: 22,
    },

    row: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    label: {
        color: "rgba(255,255,255,0.5)",
        fontSize: 13,
    },

    value: {
        color: "#fff",
        fontSize: 14,
    },

    /* INPUTS */
    inputs: {
        marginTop: 16,
        gap: 12,
    },

    inputBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 14,
        borderRadius: 12,
        backgroundColor: "#111",
    },

    inputLabel: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 13,
        width: "85%"
    },

    input: {
        flex: 1,
        color: "#fff",
        textAlign: "right",
        fontSize: 16,
        width: "15%"
    },

    /* CIRCLE (simplified UI version) */
    circleContainer: {
        marginTop: 40,
        alignSelf: "center",
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 6,
        borderColor: "#3b82f6",
        alignItems: "center",
        justifyContent: "center",
    },

    circleValue: {
        fontSize: 28,
        color: "#fff",
    },

    circleLabel: {
        fontSize: 14,
        color: "#fff",
    },
    circleWrapper: {
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    circleText: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
});