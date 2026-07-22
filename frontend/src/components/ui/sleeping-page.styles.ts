import { StyleSheet } from "react-native";

export default StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#000",
        paddingTop: 32,
    },

    /* CARD */
    badge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: "rgba(59,130,246,0.08)",
        marginBottom: 10,
    },

    badgeText: {
        color: "#3b82f6",
        fontSize: 11,
        fontWeight: "600",
    },

    divider: {
        height: 1,
        backgroundColor: "rgba(255,255,255,0.06)",
        marginVertical: 12,
    },

    subLabel: {
        color: "rgba(255,255,255,0.35)",
        fontSize: 12,
        marginTop: 5,
    },

    valueBox: {
        alignItems: "center",
        justifyContent: "center"
    },

    unit: {
        color: "rgba(255,255,255,0.4)",
        fontSize: 12,
        marginTop: 2,
    },
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
        fontSize: 16,
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

        padding: 16,
        borderRadius: 18,

        borderWidth: 1,
        borderColor: "rgba(59,130,246,0.2)",

        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },

    timeInputWrapper: {
        width: 90,
        height: 44,
        borderRadius: 12,

        backgroundColor: "rgba(59,130,246,0.08)",
        borderWidth: 1,
        borderColor: "rgba(59,130,246,0.25)",

        justifyContent: "center",
        alignItems: "center",
    },

    timeInput: {
        width: "100%",
        height: "100%",

        color: "#fff",
        fontSize: 18,
        fontWeight: "700",

        textAlign: "center",
        letterSpacing: 2,
    },

    inputLabel: {
        fontSize: 13,
        color: "#fff"
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

    circleTextWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },

    sleepHours: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#ffffff",
    },
});